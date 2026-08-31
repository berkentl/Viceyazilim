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

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Geçersiz istek kaynağı." }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz istek gövdesi." }, { status: 400 });
  }

  const payload = typeof body === "object" && body !== null
    ? (body as Record<string, unknown>)
    : {};
  if (typeof payload.website === "string" && payload.website.trim()) {
    return NextResponse.json({ ok: true });
  }

  const email = typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";
  const source = typeof payload.source === "string" ? payload.source.trim() : "";

  if (
    !email ||
    email.length > 254 ||
    !EMAIL_PATTERN.test(email) ||
    payload.consent !== true ||
    payload.consentVersion !== KVKK_NOTICE_VERSION ||
    !/^\/[a-z0-9/_-]*$/i.test(source) ||
    source.length > 160
  ) {
    return NextResponse.json({ error: "Bilgileri ve onay alanını kontrol edin." }, { status: 422 });
  }

  try {
    const id = await createLead({
      kind: "notify",
      source,
      email,
      consentScope: CONSENT_SCOPES.launch,
      consentVersion: KVKK_NOTICE_VERSION,
      requestFingerprint: requestFingerprint(request),
    });
    console.info("[lead] notification stored", { id, source });
    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof SubmissionRateLimitError) {
      return NextResponse.json({ error: "Çok fazla deneme yaptınız. Lütfen daha sonra tekrar deneyin." }, { status: 429 });
    }
    if (error instanceof DatabaseConfigurationError) {
      console.error("[lead] database configuration is incomplete");
      return NextResponse.json({ error: "Kayıt hizmeti şu anda kullanılamıyor." }, { status: 503 });
    }
    console.error("[lead] notification storage failed", error);
    return NextResponse.json({ error: "Kayıt şu anda tamamlanamadı." }, { status: 500 });
  }
}
