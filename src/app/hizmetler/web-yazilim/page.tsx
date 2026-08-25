import type { Metadata } from "next";
import { WebSoftwareExperience } from "@/components/services/web-software/WebSoftwareExperience";

export const metadata: Metadata = {
  title: "Web Yazılım | Vice Yazılım",
  description:
    "İşinize göre tasarlanan özel web uygulamaları, SaaS platformları, API entegrasyonları ve güvenli veri altyapıları geliştiriyoruz.",
  alternates: {
    canonical: "/hizmetler/web-yazilim",
  },
  openGraph: {
    title: "Web Yazılım | Vice Yazılım",
    description:
      "Fikirden çalışan ürüne uzanan, güvenli ve ölçeklenebilir web yazılım çözümleri.",
    url: "/hizmetler/web-yazilim",
  },
};

export default function WebYazilimPage() {
  return (
    <main>
      <WebSoftwareExperience />
    </main>
  );
}
