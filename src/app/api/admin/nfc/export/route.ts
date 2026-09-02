import ExcelJS from "exceljs";
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

const STATUS_COLORS: Record<string, { fill: string; font: string }> = {
  inventory: { fill: "E2E8F0", font: "334155" },
  active: { fill: "DCFCE7", font: "166534" },
  paused: { fill: "FEF3C7", font: "92400E" },
  retired: { fill: "FEE2E2", font: "991B1B" },
};

function istanbulDateStamp() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Istanbul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

function excelDate(value: string | null) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

export async function GET() {
  if (!(await hasAdminSession())) {
    return Response.json({ error: "Yetkisiz işlem." }, { status: 401 });
  }

  try {
    const cards = await listNfcCards();
    const workbook = new ExcelJS.Workbook();
    workbook.creator = "Vice Yazılım";
    workbook.company = "Vice Yazılım";
    workbook.title = "NFC kart envanteri ve tam veri yedeği";
    workbook.subject = "Vice NFC kartları, işletme bilgileri ve yönlendirme bağlantıları";
    workbook.created = new Date();
    workbook.modified = new Date();
    workbook.calcProperties.fullCalcOnLoad = true;

    const worksheet = workbook.addWorksheet("NFC Kart Envanteri", {
      properties: { defaultRowHeight: 22, tabColor: { argb: "FF22C55E" } },
      pageSetup: {
        orientation: "landscape",
        fitToPage: true,
        fitToWidth: 1,
        fitToHeight: 0,
        margins: {
          left: 0.25,
          right: 0.25,
          top: 0.5,
          bottom: 0.5,
          header: 0.2,
          footer: 0.2,
        },
      },
      views: [
        {
          state: "frozen",
          xSplit: 2,
          ySplit: 6,
          showGridLines: false,
        },
      ],
    });

    worksheet.columns = [
      { key: "stockCode", width: 12 },
      { key: "publicCode", width: 18 },
      { key: "status", width: 18 },
      { key: "businessName", width: 30 },
      { key: "googleReviewUrl", width: 48 },
      { key: "nfcUrl", width: 44 },
      { key: "contactName", width: 22 },
      { key: "contactEmail", width: 30 },
      { key: "contactPhone", width: 18 },
      { key: "notes", width: 34 },
      { key: "scanCount", width: 16 },
      { key: "todayScans", width: 16 },
      { key: "last30DayScans", width: 18 },
      { key: "lastScannedAt", width: 22 },
      { key: "activatedAt", width: 22 },
      { key: "createdAt", width: 22 },
      { key: "updatedAt", width: 22 },
      { key: "statusCode", width: 16, hidden: true },
      { key: "databaseId", width: 38, hidden: true },
    ];

    worksheet.mergeCells("A1:S1");
    const titleCell = worksheet.getCell("A1");
    titleCell.value = "VİCE NFC — KART ENVANTERİ VE TAM YEDEK";
    titleCell.font = { name: "Aptos Display", size: 20, bold: true, color: { argb: "FFFFFFFF" } };
    titleCell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF0B1220" } };
    titleCell.alignment = { vertical: "middle", horizontal: "left" };
    worksheet.getRow(1).height = 42;

    worksheet.mergeCells("A2:S2");
    const generatedCell = worksheet.getCell("A2");
    generatedCell.value = `Oluşturulma: ${new Intl.DateTimeFormat("tr-TR", {
      dateStyle: "long",
      timeStyle: "short",
      timeZone: "Europe/Istanbul",
    }).format(new Date())} • Gizli teknik sütunlar R ve S'de tam yedek kapsamında korunur.`;
    generatedCell.font = { name: "Aptos", size: 10, color: { argb: "FF64748B" } };
    generatedCell.alignment = { vertical: "middle", horizontal: "left" };
    worksheet.getRow(2).height = 24;

    const summaryItems = [
      { labelCell: "A4", valueCell: "B4", label: "Toplam kart", formula: "COUNTA(A7:A5000)", result: cards.length, color: "DBEAFE" },
      { labelCell: "D4", valueCell: "E4", label: "Aktif", formula: 'COUNTIF(C7:C5000,"Aktif")', result: cards.filter((card) => card.status === "active").length, color: "DCFCE7" },
      { labelCell: "G4", valueCell: "H4", label: "Stokta", formula: 'COUNTIF(C7:C5000,"Stokta")', result: cards.filter((card) => card.status === "inventory").length, color: "E2E8F0" },
      { labelCell: "J4", valueCell: "K4", label: "Duraklatıldı", formula: 'COUNTIF(C7:C5000,"Duraklatıldı")', result: cards.filter((card) => card.status === "paused").length, color: "FEF3C7" },
      { labelCell: "M4", valueCell: "N4", label: "Kullanım dışı", formula: 'COUNTIF(C7:C5000,"Kullanım dışı")', result: cards.filter((card) => card.status === "retired").length, color: "FEE2E2" },
    ];
    for (const item of summaryItems) {
      const label = worksheet.getCell(item.labelCell);
      label.value = item.label;
      label.font = { name: "Aptos", size: 10, bold: true, color: { argb: "FF475569" } };
      label.fill = { type: "pattern", pattern: "solid", fgColor: { argb: `FF${item.color}` } };
      label.alignment = { vertical: "middle", horizontal: "left" };
      const value = worksheet.getCell(item.valueCell);
      value.value = { formula: item.formula, result: item.result };
      value.font = { name: "Aptos Display", size: 16, bold: true, color: { argb: "FF0F172A" } };
      value.fill = { type: "pattern", pattern: "solid", fgColor: { argb: `FF${item.color}` } };
      value.numFmt = "#,##0";
      value.alignment = { vertical: "middle", horizontal: "center" };
    }
    worksheet.getRow(4).height = 32;

    const headings = [
      "Stok kodu",
      "Kart kodu",
      "Durum",
      "İşletme adı",
      "Google doğrudan yorum bağlantısı",
      "NFC'ye yazılacak sabit adres",
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
      "Durum kodu",
      "Veritabanı ID",
    ];
    const headerRow = worksheet.getRow(6);
    headerRow.values = headings;
    headerRow.height = 34;
    headerRow.eachCell((cell) => {
      cell.font = { name: "Aptos", size: 10, bold: true, color: { argb: "FFFFFFFF" } };
      cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF172033" } };
      cell.alignment = { vertical: "middle", horizontal: "left", wrapText: true };
      cell.border = { bottom: { style: "medium", color: { argb: "FF22C55E" } } };
    });

    for (const card of cards) {
      const row = worksheet.addRow({
        stockCode: card.stock_code,
        publicCode: card.public_code,
        status: STATUS_LABELS[card.status] ?? card.status,
        businessName: card.business_name ?? "",
        googleReviewUrl: card.google_review_url ?? "",
        nfcUrl: card.nfc_url,
        contactName: card.contact_name ?? "",
        contactEmail: card.contact_email ?? "",
        contactPhone: card.contact_phone ?? "",
        notes: card.notes ?? "",
        scanCount: Number(card.scan_count),
        todayScans: Number(card.today_scans),
        last30DayScans: Number(card.last_30_day_scans),
        lastScannedAt: excelDate(card.last_scanned_at),
        activatedAt: excelDate(card.activated_at),
        createdAt: excelDate(card.created_at),
        updatedAt: excelDate(card.updated_at),
        statusCode: card.status,
        databaseId: card.id,
      });

      if (card.google_review_url) {
        row.getCell(5).value = { text: card.google_review_url, hyperlink: card.google_review_url };
      }
      row.getCell(6).value = { text: card.nfc_url, hyperlink: card.nfc_url };

      row.eachCell({ includeEmpty: true }, (cell) => {
        cell.font = { name: "Aptos", size: 10, color: { argb: "FF1E293B" } };
        cell.alignment = { vertical: "middle", horizontal: "left" };
        cell.border = { bottom: { style: "hair", color: { argb: "FFE2E8F0" } } };
        if (row.number % 2 === 0) {
          cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFF8FAFC" } };
        }
      });
      for (const column of [5, 6]) {
        row.getCell(column).font = { name: "Aptos", size: 10, color: { argb: "FF2563EB" }, underline: true };
      }
      const statusStyle = STATUS_COLORS[card.status] ?? STATUS_COLORS.inventory;
      row.getCell(3).fill = { type: "pattern", pattern: "solid", fgColor: { argb: `FF${statusStyle.fill}` } };
      row.getCell(3).font = { name: "Aptos", size: 10, bold: true, color: { argb: `FF${statusStyle.font}` } };
      row.getCell(3).alignment = { vertical: "middle", horizontal: "center" };
      row.getCell(10).alignment = { vertical: "top", horizontal: "left", wrapText: true };
      for (const column of [11, 12, 13]) {
        row.getCell(column).numFmt = "#,##0";
        row.getCell(column).alignment = { vertical: "middle", horizontal: "right" };
      }
      for (const column of [14, 15, 16, 17]) {
        row.getCell(column).numFmt = "dd mmm yyyy hh:mm";
        row.getCell(column).alignment = { vertical: "middle", horizontal: "center" };
      }
      row.height = card.notes ? 34 : 24;
    }

    const lastRow = Math.max(6, worksheet.rowCount);
    worksheet.autoFilter = {
      from: { row: 6, column: 1 },
      to: { row: lastRow, column: headings.length },
    };
    worksheet.getColumn(18).hidden = true;
    worksheet.getColumn(19).hidden = true;
    worksheet.headerFooter.oddFooter = "&LVice Yazılım&C&P / &N&R&F";

    const buffer = await workbook.xlsx.writeBuffer();
    return new Response(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="vice-nfc-tam-yedek-${istanbulDateStamp()}.xlsx"`,
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    if (error instanceof DatabaseConfigurationError) {
      return Response.json({ error: "Veritabanı yapılandırılmadı." }, { status: 503 });
    }
    console.error("[admin] nfc export failed", error);
    return Response.json({ error: "Excel yedeği hazırlanamadı." }, { status: 500 });
  }
}
