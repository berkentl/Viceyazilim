import type { Metadata } from "next";
import { EcommerceExperience } from "@/components/services/ecommerce/EcommerceExperience";

export const metadata: Metadata = {
  title: "E-Ticaret Çözümleri | Vice Yazılım",
  description:
    "Dönüşüm odaklı arayüzlerden ödeme, stok, kargo ve pazaryeri entegrasyonlarına kadar e-ticaret sisteminizi uçtan uca tasarlıyor ve geliştiriyoruz.",
  alternates: {
    canonical: "/hizmetler/e-ticaret",
  },
  openGraph: {
    title: "E-Ticaret Çözümleri | Vice Yazılım",
    description:
      "Mağazanızı, operasyonunuzu ve müşteri deneyiminizi birlikte çalışan tek bir satış sisteminde buluşturun.",
    url: "/hizmetler/e-ticaret",
  },
};

export default function ETicaretPage() {
  return (
    <main>
      <EcommerceExperience />
    </main>
  );
}
