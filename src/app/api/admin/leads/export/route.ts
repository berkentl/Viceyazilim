import { hasAdminSession } from "@/lib/server/admin-auth";
import { DatabaseConfigurationError, listLeads } from "@/lib/server/leads";

export const runtime = "nodejs";

function csvCell(value: unknown) {
  let text = value == null ? "" : String(value);
  if (/^[=+\-@]/.test(text)) text = `'${text}`;
  return `"${text.replaceAll('"', '""')}"`;
}

export async function GET() {
  if (!(await hasAdminSession())) {
    return Response.json({ error: "Yetkisiz işlem." }, { status: 401 });
  }

  try {
    const leads = await listLeads();
    const headings = [
      "ID",
      "Tür",
      "Kaynak",
      "Ad soyad",
      "E-posta",
      "Telefon",
      "Şirket",
      "Proje türü",
      "Mesaj",
      "Durum",
      "Notlar",
      "KVKK kapsamı",
      "KVKK sürümü",
      "Onay zamanı",
      "Oluşturulma",
    ];
    const lines = [headings.map(csvCell).join(",")];
    for (const lead of leads) {
      lines.push(
        [
          lead.id,
          lead.kind,
          lead.source,
          lead.name,
          lead.email,
          lead.phone,
          lead.company,
          lead.project_type,
          lead.message,
          lead.status,
          lead.notes,
          lead.consent_scope,
          lead.consent_version,
          lead.consented_at,
          lead.created_at,
        ].map(csvCell).join(","),
      );
    }

    return new Response(`\uFEFF${lines.join("\r\n")}`, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="vice-leads-${new Date().toISOString().slice(0, 10)}.csv"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    if (error instanceof DatabaseConfigurationError) {
      return Response.json({ error: "Veritabanı yapılandırılmadı." }, { status: 503 });
    }
    console.error("[admin] lead export failed", error);
    return Response.json({ error: "Dışa aktarım hazırlanamadı." }, { status: 500 });
  }
}
