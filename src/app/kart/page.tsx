import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "NFC Yorum Kartı",
  robots: { index: false, follow: false, noarchive: true },
};

const CONTENT = {
  inventory: {
    eyebrow: "Kurulum bekliyor",
    title: "Bu kart henüz etkinleştirilmedi.",
    body: "Kartın işletme bağlantısı Vice Yazılım tarafından tanımlandığında kullanıma hazır olacaktır.",
  },
  paused: {
    eyebrow: "Geçici olarak durduruldu",
    title: "Bu kart şu anda kullanılamıyor.",
    body: "İşletme bağlantısı kontrol ediliyor. Kısa süre sonra yeniden deneyebilirsiniz.",
  },
  retired: {
    eyebrow: "Kullanım dışı",
    title: "Bu kart artık aktif değil.",
    body: "Destek için kart üzerindeki işletme veya Vice Yazılım ile iletişime geçebilirsiniz.",
  },
  bulunamadi: {
    eyebrow: "Kart bulunamadı",
    title: "Bağlantıyı doğrulayamadık.",
    body: "NFC etiketini yeniden okutun. Sorun devam ederse Vice Yazılım ile iletişime geçin.",
  },
  bakim: {
    eyebrow: "Kısa bir teknik mola",
    title: "Yönlendirme şu anda tamamlanamadı.",
    body: "Lütfen birkaç dakika sonra kartı yeniden okutun.",
  },
} as const;

type StatusKey = keyof typeof CONTENT;

export default async function NfcStatusPage({
  searchParams,
}: {
  searchParams: Promise<{ durum?: string; kart?: string }>;
}) {
  const params = await searchParams;
  const status = (params.durum ?? "bulunamadi") as StatusKey;
  const content = CONTENT[status] ?? CONTENT.bulunamadi;
  const stockCode = /^V\d{3,}$/.test(params.kart ?? "") ? params.kart : null;

  return (
    <main className="grid min-h-svh place-items-center bg-[#07090d] px-5 py-16 text-white">
      <section className="w-full max-w-lg rounded-[2rem] border border-white/10 bg-white/[0.045] p-7 text-center shadow-2xl shadow-black/35 backdrop-blur-xl sm:p-11">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-white/12 bg-white/[0.055] text-lg font-semibold tracking-[-0.06em]">
          V
        </div>
        <p className="mt-7 text-xs font-semibold uppercase tracking-[0.22em] text-white/65">
          {content.eyebrow}
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
          {content.title}
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-white/70 sm:text-base sm:leading-7">
          {content.body}
        </p>
        {stockCode && (
          <p className="mt-6 font-mono text-xs tracking-[0.15em] text-white/60">
            {stockCode}
          </p>
        )}
        <Link
          href="https://viceyazilim.com/iletisim"
          className="mt-8 inline-flex h-11 items-center justify-center rounded-full border border-white/12 px-5 text-sm font-medium text-white/70 transition hover:bg-white/7 hover:text-white"
        >
          Destek al
        </Link>
      </section>
    </main>
  );
}
