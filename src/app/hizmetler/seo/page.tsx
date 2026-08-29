import type { Metadata } from "next";
import { SeoExperience } from "@/components/services/seo/SeoExperience";

export const metadata: Metadata = {
  title: "SEO Hizmetleri ve Organik Büyüme | Vice Yazılım",
  description:
    "Teknik SEO, arama niyeti, içerik mimarisi ve otorite çalışmalarını ölçülebilir bir organik büyüme sisteminde birleştiriyoruz.",
  alternates: {
    canonical: "/hizmetler/seo",
  },
  openGraph: {
    title: "SEO Hizmetleri ve Organik Büyüme | Vice Yazılım",
    description:
      "Arama görünürlüğünü teknik sağlık, doğru içerik ve sürekli ölçümle kalıcı bir büyüme kanalına dönüştürün.",
    url: "/hizmetler/seo",
  },
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "SEO ve Organik Büyüme Hizmetleri",
  description:
    "Teknik SEO, içerik stratejisi, otorite geliştirme, yerel SEO, e-ticaret SEO ve sürekli performans ölçümü.",
  provider: {
    "@type": "Organization",
    name: "Vice Yazılım",
    url: "https://viceyazilim.com",
  },
  areaServed: "TR",
  url: "https://viceyazilim.com/hizmetler/seo",
};

export default function SeoPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <SeoExperience />
    </main>
  );
}
