import "server-only";

import { createHmac } from "node:crypto";
import { neon } from "@neondatabase/serverless";
import type { Lead, LeadKind, LeadStatus } from "@/lib/leads";

export class DatabaseConfigurationError extends Error {}
export class SubmissionRateLimitError extends Error {}

let sqlClient: ReturnType<typeof neon> | undefined;
type QueryRow = Record<string, unknown>;

function getSql() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new DatabaseConfigurationError("DATABASE_URL is not configured.");
  }

  sqlClient ??= neon(databaseUrl);
  return sqlClient;
}

export function requestFingerprint(request: Request) {
  const secret = process.env.SUBMISSION_HASH_SECRET;
  if (!secret) {
    throw new DatabaseConfigurationError(
      "SUBMISSION_HASH_SECRET is not configured.",
    );
  }

  const forwardedFor = request.headers.get("x-forwarded-for") ?? "unknown";
  const clientAddress = forwardedFor.split(",")[0]?.trim() || "unknown";
  const userAgent = request.headers.get("user-agent") ?? "unknown";

  return createHmac("sha256", secret)
    .update(`${clientAddress}\n${userAgent}`)
    .digest("hex");
}

export function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  const forwardedHost = request.headers.get("x-forwarded-host");
  const host = forwardedHost ?? request.headers.get("host");
  if (!host) return false;

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export async function createLead(input: {
  kind: LeadKind;
  source: string;
  name?: string;
  email: string;
  phone?: string;
  company?: string;
  projectType?: string;
  message?: string;
  consentScope: string;
  consentVersion: string;
  requestFingerprint: string;
}) {
  const sql = getSql();
  const rows = (await sql`
    WITH recent AS (
      SELECT count(*)::int AS count
      FROM lead_submissions
      WHERE request_fingerprint = ${input.requestFingerprint}
        AND created_at > now() - interval '15 minutes'
    )
    INSERT INTO lead_submissions (
      kind,
      source,
      name,
      email,
      phone,
      company,
      project_type,
      message,
      consent_scope,
      consent_version,
      request_fingerprint
    )
    SELECT
      ${input.kind},
      ${input.source},
      ${input.name || null},
      ${input.email},
      ${input.phone || null},
      ${input.company || null},
      ${input.projectType || null},
      ${input.message || null},
      ${input.consentScope},
      ${input.consentVersion},
      ${input.requestFingerprint}
    FROM recent
    WHERE recent.count < 5
    RETURNING id
  `) as QueryRow[];

  if (rows.length === 0) throw new SubmissionRateLimitError();
  return String(rows[0].id);
}

export async function listLeads() {
  const sql = getSql();
  const rows = (await sql`
    SELECT
      id,
      kind,
      source,
      name,
      email,
      phone,
      company,
      project_type,
      message,
      consent_scope,
      consent_version,
      consented_at,
      status,
      notes,
      created_at,
      updated_at
    FROM lead_submissions
    ORDER BY created_at DESC
    LIMIT 1000
  `) as QueryRow[];

  return rows as unknown as Lead[];
}

export async function updateLead(
  id: string,
  input: { status: LeadStatus; notes: string },
) {
  const sql = getSql();
  const rows = (await sql`
    UPDATE lead_submissions
    SET
      status = ${input.status},
      notes = ${input.notes},
      updated_at = now()
    WHERE id = ${id}
    RETURNING id
  `) as QueryRow[];

  return rows.length > 0;
}

export async function registerLoginAttempt(fingerprint: string) {
  const sql = getSql();
  const rows = (await sql`
    INSERT INTO admin_login_attempts (fingerprint, attempts, window_started_at)
    VALUES (${fingerprint}, 1, now())
    ON CONFLICT (fingerprint) DO UPDATE SET
      attempts = CASE
        WHEN admin_login_attempts.window_started_at < now() - interval '15 minutes'
          THEN 1
        ELSE admin_login_attempts.attempts + 1
      END,
      window_started_at = CASE
        WHEN admin_login_attempts.window_started_at < now() - interval '15 minutes'
          THEN now()
        ELSE admin_login_attempts.window_started_at
      END,
      updated_at = now()
    RETURNING attempts
  `) as QueryRow[];

  return Number(rows[0]?.attempts ?? 1);
}

export async function clearLoginAttempts(fingerprint: string) {
  const sql = getSql();
  await sql`DELETE FROM admin_login_attempts WHERE fingerprint = ${fingerprint}`;
}
