import "server-only";

import { neon } from "@neondatabase/serverless";
import {
  buildNfcPublicUrl,
  type NfcCard,
  type NfcCardStatus,
  validateGoogleReviewUrl,
} from "@/lib/nfc";
import { DatabaseConfigurationError } from "./leads";

type QueryRow = Record<string, unknown>;
let sqlClient: ReturnType<typeof neon> | undefined;

function getSql() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new DatabaseConfigurationError("DATABASE_URL is not configured.");
  }

  sqlClient ??= neon(databaseUrl);
  return sqlClient;
}

function publicBaseUrl() {
  const configured = process.env.NFC_PUBLIC_BASE_URL?.trim();
  if (!configured) return "https://yorum.viceyazilim.com";

  try {
    const url = new URL(configured);
    if (url.protocol !== "https:") throw new Error("HTTPS required");
    return url.origin;
  } catch {
    throw new DatabaseConfigurationError(
      "NFC_PUBLIC_BASE_URL is not configured correctly.",
    );
  }
}

function toNfcCard(row: QueryRow): NfcCard {
  const publicCode = String(row.public_code);
  return {
    ...(row as unknown as Omit<NfcCard, "nfc_url">),
    scan_count: Number(row.scan_count ?? 0),
    today_scans: Number(row.today_scans ?? 0),
    last_30_day_scans: Number(row.last_30_day_scans ?? 0),
    nfc_url: buildNfcPublicUrl(publicCode, publicBaseUrl()),
  };
}

const cardSelect = `
  SELECT
    c.id,
    c.stock_code,
    c.public_code,
    c.business_name,
    c.google_review_url,
    c.contact_name,
    c.contact_email,
    c.contact_phone,
    c.status,
    c.notes,
    c.scan_count,
    COALESCE(today.scan_count, 0) AS today_scans,
    COALESCE(recent.scan_count, 0) AS last_30_day_scans,
    c.last_scanned_at,
    c.activated_at,
    c.created_at,
    c.updated_at
  FROM nfc_cards c
  LEFT JOIN nfc_daily_scans today
    ON today.card_id = c.id
    AND today.scan_date = (now() AT TIME ZONE 'Europe/Istanbul')::date
  LEFT JOIN LATERAL (
    SELECT COALESCE(sum(d.scan_count), 0) AS scan_count
    FROM nfc_daily_scans d
    WHERE d.card_id = c.id
      AND d.scan_date >= (now() AT TIME ZONE 'Europe/Istanbul')::date - 29
  ) recent ON true
`;

export async function listNfcCards() {
  const sql = getSql();
  const rows = (await sql.query(`${cardSelect} ORDER BY c.stock_code ASC`)) as QueryRow[];
  return rows.map(toNfcCard);
}

export async function createNfcCard() {
  const sql = getSql();
  const rows = (await sql`
    WITH next_number AS (
      SELECT COALESCE(
        max(NULLIF(regexp_replace(stock_code, '[^0-9]', '', 'g'), '')::integer),
        0
      ) + 1 AS value
      FROM nfc_cards
    )
    INSERT INTO nfc_cards (stock_code, public_code)
    SELECT
      'V' || lpad(next_number.value::text, 3, '0'),
      upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 12))
    FROM next_number
    RETURNING id
  `) as QueryRow[];

  return String(rows[0]?.id ?? "");
}

export type UpdateNfcCardInput = {
  businessName: string;
  googleReviewUrl: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  status: NfcCardStatus;
  notes: string;
};

export function validateNfcCardInput(input: UpdateNfcCardInput) {
  const businessName = input.businessName.trim();
  const contactName = input.contactName.trim();
  const contactEmail = input.contactEmail.trim().toLowerCase();
  const contactPhone = input.contactPhone.trim();
  const notes = input.notes.trim();
  const reviewValidation = validateGoogleReviewUrl(input.googleReviewUrl);

  if (!reviewValidation.valid) return reviewValidation;
  if (businessName.length > 160) {
    return { valid: false as const, error: "İşletme adı çok uzun." };
  }
  if (contactName.length > 160 || contactEmail.length > 254) {
    return { valid: false as const, error: "İletişim bilgileri çok uzun." };
  }
  if (contactPhone.length > 40 || notes.length > 3000) {
    return { valid: false as const, error: "Alan uzunluklarını kontrol edin." };
  }
  if (contactEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail)) {
    return { valid: false as const, error: "Geçerli bir e-posta girin." };
  }
  if (input.status === "active" && (!businessName || !reviewValidation.normalizedUrl)) {
    return {
      valid: false as const,
      error: "Aktif kart için işletme adı ve Google yorum bağlantısı zorunludur.",
    };
  }

  return {
    valid: true as const,
    value: {
      businessName,
      googleReviewUrl: reviewValidation.normalizedUrl,
      contactName,
      contactEmail,
      contactPhone,
      status: input.status,
      notes,
    },
  };
}

export async function updateNfcCard(id: string, input: UpdateNfcCardInput) {
  const validation = validateNfcCardInput(input);
  if (!validation.valid) return validation;

  const sql = getSql();
  const value = validation.value;
  const rows = (await sql`
    UPDATE nfc_cards
    SET
      business_name = ${value.businessName || null},
      google_review_url = ${value.googleReviewUrl || null},
      contact_name = ${value.contactName || null},
      contact_email = ${value.contactEmail || null},
      contact_phone = ${value.contactPhone || null},
      status = ${value.status},
      notes = ${value.notes},
      activated_at = CASE
        WHEN ${value.status} = 'active' AND activated_at IS NULL THEN now()
        ELSE activated_at
      END,
      updated_at = now()
    WHERE id = ${id}
    RETURNING id
  `) as QueryRow[];

  return rows.length
    ? { valid: true as const }
    : { valid: false as const, error: "Kart bulunamadı." };
}

export type NfcRedirectRecord = {
  id: string;
  stock_code: string;
  business_name: string | null;
  google_review_url: string | null;
  status: NfcCardStatus;
};

export async function getNfcRedirect(publicCode: string) {
  const sql = getSql();
  const rows = (await sql`
    SELECT id, stock_code, business_name, google_review_url, status
    FROM nfc_cards
    WHERE public_code = ${publicCode}
    LIMIT 1
  `) as QueryRow[];

  return (rows[0] as unknown as NfcRedirectRecord | undefined) ?? null;
}

export async function recordNfcScan(cardId: string) {
  const sql = getSql();
  await sql.transaction([
    sql`
      UPDATE nfc_cards
      SET scan_count = scan_count + 1, last_scanned_at = now()
      WHERE id = ${cardId}
    `,
    sql`
      INSERT INTO nfc_daily_scans (card_id, scan_date, scan_count)
      VALUES (
        ${cardId},
        (now() AT TIME ZONE 'Europe/Istanbul')::date,
        1
      )
      ON CONFLICT (card_id, scan_date) DO UPDATE
      SET scan_count = nfc_daily_scans.scan_count + 1
    `,
  ]);
}
