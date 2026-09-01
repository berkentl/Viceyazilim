import { hasAdminSession } from "@/lib/server/admin-auth";
import { DatabaseConfigurationError } from "@/lib/server/leads";
import { listNfcCards } from "@/lib/server/nfc";

export const runtime = "nodejs";

const STATUS_LABELS: Record<string, string> = {
  inventory: "Stokta",
  active: "Aktif",
  paused: "Duraklatıldı",
  retired: "Kullanım dışı",
};

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
      "Veritabanı ID",
      "Stok kodu",
      "Genel kod",
      "NFC'ye yazılacak URL",
      "Durum kodu",
      "Durum",
      "İşletme adı",
      "Google doğrudan yorum URL",
      "Yetkili adı",
      "E-posta",
      "Telefon",
      "Dahili notlar",
      "Toplam okutma",
      "Bugünkü okutma",
      "Son 30 gün okutma",
      "Son okutma",
      "Etkinleştirilme",
      "Oluşturulma",
      "Son güncelleme",
    ];
    const lines = [headings.map(csvCell).join(",")];
    for (const card of cards) {
      lines.push(
        [
          card.id,
          card.stock_code,
          card.public_code,
          card.nfc_url,
          card.status,
          STATUS_LABELS[card.status] ?? card.status,
          card.business_name,
          card.google_review_url,
          card.contact_name,
          card.contact_email,
          card.contact_phone,
          card.notes,
          card.scan_count,
          card.today_scans,
          card.last_30_day_scans,
          card.last_scanned_at,
          card.activated_at,
          card.created_at,
          card.updated_at,
        ]
          .map(csvCell)
          .join(","),
      );
    }

    return new Response(`\uFEFF${lines.join("\r\n")}`, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="vice-nfc-tam-yedek-${new Date().toISOString().slice(0, 10)}.csv"`,
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
