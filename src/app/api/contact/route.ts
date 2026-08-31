import { NextResponse } from "next/server";
import { CONSENT_SCOPES, KVKK_NOTICE_VERSION } from "@/lib/privacy";
import {
  createLead,
  DatabaseConfigurationError,
  isSameOrigin,
  requestFingerprint,
  SubmissionRateLimitError,
} from "@/lib/server/leads";

export const runtime = "nodejs";

type ContactRequest = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  company?: unknown;
  projectType?: unknown;
  message?: unknown;
  consent?: unknown;
  consentVersion?: unknown;
  source?: unknown;
  website?: unknown;
};

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ ok: false, error: "invalid_origin" }, { status: 403 });
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 12_000) {
    return NextResponse.json({ ok: false, error: "payload_too_large" }, { status: 413 });
  }

  let body: ContactRequest;
  try {
    body = (await request.json()) as ContactRequest;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  if (typeof body.website === "string" && body.website.trim()) {
    return NextResponse.json({ ok: true });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const company = typeof body.company === "string" ? body.company.trim() : "";
  const projectType = typeof body.projectType === "string" ? body.projectType.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const source = typeof body.source === "string" ? body.source.trim() : "";
  const hasInvalidPhone = phone.length > 0 && phone.replace(/\D/g, "").length < 10;

  if (
    name.length < 2 ||
    name.length > 100 ||
    !/^\S+@\S+\.\S+$/.test(email) ||
    email.length > 254 ||
    hasInvalidPhone ||
    phone.length > 40 ||
    company.length > 120 ||
    !projectType ||
    projectType.length > 80 ||
    message.length < 20 ||
    message.length > 3000 ||
    body.consent !== true ||
    body.consentVersion !== KVKK_NOTICE_VERSION ||
    !/^\/[a-z0-9/_-]*$/i.test(source) ||
    source.length > 160
  ) {
    return NextResponse.json({ ok: false, error: "invalid_fields" }, { status: 422 });
  }

  try {
    const id = await createLead({
      kind: "contact",
      source,
      name,
      email,
      phone,
      company,
      projectType,
      message,
      consentScope: CONSENT_SCOPES.contact,
      consentVersion: KVKK_NOTICE_VERSION,
      requestFingerprint: requestFingerprint(request),
    });
    console.info("[lead] contact stored", { id, source });
    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof SubmissionRateLimitError) {
      return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
    }
    if (error instanceof DatabaseConfigurationError) {
      console.error("[lead] database configuration is incomplete");
      return NextResponse.json({ ok: false, error: "service_unavailable" }, { status: 503 });
    }
    console.error("[lead] contact storage failed", error);
    return NextResponse.json({ ok: false, error: "storage_failed" }, { status: 500 });
  }
}
