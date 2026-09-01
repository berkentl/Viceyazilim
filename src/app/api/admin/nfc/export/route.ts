import { hasAdminSession } from "@/lib/server/admin-auth";
import { DatabaseConfigurationError } from "@/lib/server/leads";
import { listNfcCards } from "@/lib/server/nfc";

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
    const cards = await listNfcCards();
    const headings = [
      "Stok kodu",
      "NFC'ye yazılacak URL",
      "Durum",
      "İşletme",
      "Google yorum URL",
      "Yetkili",
      "E-posta",
      "Telefon",
      "Toplam okutma",
      "Bugünkü okutma",
      "Son okutma",
      "Notlar",
    ];
    const lines = [headings.map(csvCell).join(",")];
    for (const card of cards) {
      lines.push(
        [
          card.stock_code,
          card.nfc_url,
          card.status,
          card.business_name,
          card.google_review_url,
          card.contact_name,
          card.contact_email,
          card.contact_phone,
          card.scan_count,
          card.today_scans,
          card.last_scanned_at,
          card.notes,
        ]
          .map(csvCell)
          .join(","),
      );
    }

    return new Response(`\uFEFF${lines.join("\r\n")}`, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="vice-nfc-kartlar-${new Date().toISOString().slice(0, 10)}.csv"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    if (error instanceof DatabaseConfigurationError) {
      return Response.json({ error: "Veritabanı yapılandırılmadı." }, { status: 503 });
    }
    console.error("[admin] nfc export failed", error);
    return Response.json({ error: "Dışa aktarım hazırlanamadı." }, { status: 500 });
  }
}
