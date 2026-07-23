import type { Metadata } from "next";
import { ServiceHero } from "@/components/services/ServiceHero";
import { FeatureBentoGrid } from "@/components/services/FeatureBentoGrid";
import { ProcessSteps } from "@/components/services/ProcessSteps";
import { TechCoverflow } from "@/components/services/TechCoverflow";
import { ServiceCTA } from "@/components/services/ServiceCTA";

export const metadata: Metadata = {
  title: "Web Tasarım — Vice Yazılım",
  description:
    "Markanızın karakterini yansıtan, kullanıcıyı ilk saniyede etkileyen, özel tasarlanmış web deneyimleri.",
};

export default function WebTasarimPage() {
  return (
    <main>
      <ServiceHero
        category="Web Tasarım"
        title="Markanızın karakterini yansıtan web deneyimleri"
        description="Şablon değil; hedef kitlenizi, sektörünüzü ve marka kimliğinizi merkeze alarak sıfırdan tasarlanmış, kullanıcıyı ilk saniyede etkileyen web siteleri üretiyoruz."
      />

      <FeatureBentoGrid
        features={[
          {
            title: "Özgün ve Kişiye Özel Tasarım",
            description:
              "Şablon değil; markanızın kimliğine göre sıfırdan tasarlanmış arayüzler.",
            tint: "cool",
            size: "lg",
          },
          {
            title: "Hız ve Performans",
            description:
              "Next.js altyapısıyla saniyeler içinde açılan, arama motorlarının sevdiği siteler.",
            tint: "warm",
          },
          {
            title: "Her Ekranda Kusursuz",
            description:
              "Mobil, tablet ve masaüstünde aynı özenle çalışan responsive tasarım.",
            tint: "green",
          },
          {
            title: "SEO'ya Hazır Altyapı",
            description:
              "Baştan doğru kurulmuş semantik yapı ve meta veri yönetimiyle arama motorlarında görünürlük.",
            tint: "cool",
            size: "lg",
          },
        ]}
      />

      <ProcessSteps
        steps={[
          {
            number: "01",
            title: "Keşif & Strateji",
            description:
              "İhtiyaçlarınızı, hedef kitlenizi ve rakiplerinizi analiz ediyoruz.",
          },
          {
            number: "02",
            title: "Tasarım (UI/UX)",
            description:
              "Marka kimliğinize uygun arayüz taslaklarını birlikte şekillendiriyoruz.",
          },
          {
            number: "03",
            title: "Geliştirme",
            description:
              "Next.js ve modern web teknolojileriyle tasarımı hayata geçiriyoruz.",
          },
          {
            number: "04",
            title: "Test & Optimizasyon",
            description:
              "Performans, güvenlik ve kullanılabilirlik testlerinden geçiriyoruz.",
          },
          {
            number: "05",
            title: "Yayına Alma & Destek",
            description: "Siteyi yayına alıyor, sonrasında da yanınızda oluyoruz.",
          },
        ]}
      />

      <TechCoverflow
        items={["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel"]}
      />

      <ServiceCTA title="Markanıza özel bir web sitesi için konuşalım." />
    </main>
  );
}
