import { NextResponse } from "next/server";
import { hasAdminSession } from "@/lib/server/admin-auth";
import {
  NFC_CARD_STATUSES,
  type NfcCardStatus,
} from "@/lib/nfc";
import {
  DatabaseConfigurationError,
  isSameOrigin,
} from "@/lib/server/leads";
import { updateNfcCard } from "@/lib/server/nfc";

export const runtime = "nodejs";

function stringValue(value: unknown) {
  return typeof value === "string" ? value : "";
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  if (!isSameOrigin(request) || !(await hasAdminSession())) {
    return NextResponse.json({ error: "Yetkisiz işlem." }, { status: 401 });
  }

  const { id } = await context.params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) {
    return NextResponse.json({ error: "Geçersiz kart." }, { status: 400 });
  }

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const status = stringValue(body.status);
    if (!NFC_CARD_STATUSES.includes(status as NfcCardStatus)) {
      return NextResponse.json({ error: "Geçersiz kart durumu." }, { status: 422 });
    }

    const result = await updateNfcCard(id, {
      businessName: stringValue(body.businessName),
      googleReviewUrl: stringValue(body.googleReviewUrl),
      contactName: stringValue(body.contactName),
      contactEmail: stringValue(body.contactEmail),
      contactPhone: stringValue(body.contactPhone),
      status: status as NfcCardStatus,
      notes: stringValue(body.notes),
    });

    return result.valid
      ? NextResponse.json({ ok: true })
      : NextResponse.json({ error: result.error }, { status: 422 });
  } catch (error) {
    if (error instanceof DatabaseConfigurationError) {
      return NextResponse.json(
        { error: "Veritabanı yapılandırılmadı." },
        { status: 503 },
      );
    }
    console.error("[admin] nfc update failed", error);
    return NextResponse.json({ error: "Kart güncellenemedi." }, { status: 500 });
  }
}
