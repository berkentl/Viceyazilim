import type { Metadata } from "next";
import { GoogleAdsExperience } from "@/components/services/google-ads/GoogleAdsExperience";

export const metadata: Metadata = {
  title: "Google Ads Yönetimi ve Performans Reklamları | Vice Yazılım",
  description:
    "Arama, Shopping, Performance Max ve yeniden pazarlama kampanyalarını doğru ölçüm, teklif ve dönüşüm mimarisiyle yönetin.",
  alternates: {
    canonical: "/hizmetler/google-ads",
  },
  openGraph: {
    title: "Google Ads Yönetimi ve Performans Reklamları | Vice Yazılım",
    description:
      "Arama niyetini ölçülebilir talebe dönüştüren Google Ads kampanya sistemleri kuruyoruz.",
    url: "/hizmetler/google-ads",
  },
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Google Ads ve Performans Reklamları Yönetimi",
  description:
    "Google Arama Ağı, Shopping, Performance Max, yeniden pazarlama, dönüşüm takibi ve kampanya optimizasyonu hizmetleri.",
  provider: {
    "@type": "Organization",
    name: "Vice Yazılım",
    url: "https://viceyazilim.com",
  },
  areaServed: "TR",
  url: "https://viceyazilim.com/hizmetler/google-ads",
};

export default function GoogleAdsPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <GoogleAdsExperience />
    </main>
  );
}
