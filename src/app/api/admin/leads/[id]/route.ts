import { NextResponse } from "next/server";
import { hasAdminSession } from "@/lib/server/admin-auth";
import { LEAD_STATUSES, type LeadStatus } from "@/lib/leads";
import {
  DatabaseConfigurationError,
  isSameOrigin,
  updateLead,
} from "@/lib/server/leads";

export const runtime = "nodejs";

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  if (!isSameOrigin(request) || !(await hasAdminSession())) {
    return NextResponse.json({ error: "Yetkisiz işlem." }, { status: 401 });
  }

  const { id } = await context.params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) {
    return NextResponse.json({ error: "Geçersiz kayıt." }, { status: 400 });
  }

  try {
    const body = (await request.json()) as { status?: unknown; notes?: unknown };
    const status = typeof body.status === "string" ? body.status : "";
    const notes = typeof body.notes === "string" ? body.notes.trim() : "";
    if (!LEAD_STATUSES.includes(status as LeadStatus) || notes.length > 5000) {
      return NextResponse.json({ error: "Alanları kontrol edin." }, { status: 422 });
    }

    const updated = await updateLead(id, { status: status as LeadStatus, notes });
    return updated
      ? NextResponse.json({ ok: true })
      : NextResponse.json({ error: "Kayıt bulunamadı." }, { status: 404 });
  } catch (error) {
    if (error instanceof DatabaseConfigurationError) {
      return NextResponse.json({ error: "Veritabanı yapılandırılmadı." }, { status: 503 });
    }
    console.error("[admin] lead update failed", error);
    return NextResponse.json({ error: "Kayıt güncellenemedi." }, { status: 500 });
  }
}
