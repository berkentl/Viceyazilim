import type { Metadata } from "next";
import { ServiceHero } from "@/components/services/ServiceHero";
import { FeatureBentoGrid } from "@/components/services/FeatureBentoGrid";
import { ProcessSteps } from "@/components/services/ProcessSteps";
import { TechCoverflow } from "@/components/services/TechCoverflow";
import { ServiceCTA } from "@/components/services/ServiceCTA";

export const metadata: Metadata = {
  title: "UI & UX Tasarım — Vice Yazılım",
  description:
    "Karmaşık akışları sade, anlaşılır ve keyifli deneyimlere dönüştürüyoruz — her tasarım kararının arkasında bir kullanıcı araştırması var.",
};

export default function UiUxPage() {
  return (
    <main>
      <ServiceHero
        category="UI & UX"
        title="Kullanıcıyı merkeze alan arayüz tasarımı"
        description="Karmaşık akışları sade, anlaşılır ve keyifli deneyimlere dönüştürüyoruz — her tasarım kararının arkasında bir kullanıcı araştırması var."
      />

      <FeatureBentoGrid
        features={[
          {
            title: "Kullanıcı Araştırması",
            description:
              "Varsayımlarla değil, gerçek kullanıcı davranışlarıyla tasarlıyoruz.",
            tint: "cool",
            size: "lg",
          },
          {
            title: "Wireframe & Prototip",
            description:
              "Geliştirmeye geçmeden önce akışı birlikte test ediyoruz.",
            tint: "warm",
          },
          {
            title: "Erişilebilirlik",
            description:
              "Herkesin rahatça kullanabildiği, standartlara uygun arayüzler.",
            tint: "green",
          },
          {
            title: "Tasarım Sistemi",
            description:
              "Tutarlı bileşenlerle büyüyen, sürdürülebilir bir tasarım dili kuruyoruz.",
            tint: "cool",
            size: "lg",
          },
        ]}
      />

      <ProcessSteps
        steps={[
          {
            number: "01",
            title: "Araştırma & Keşif",
            description: "Kullanıcılarınızı ve hedeflerini anlıyoruz.",
          },
          {
            number: "02",
            title: "Bilgi Mimarisi",
            description: "İçeriği ve akışı mantıklı bir yapıya oturtuyoruz.",
          },
          {
            number: "03",
            title: "Wireframe",
            description: "Düşük detaylı taslaklarla akışı test ediyoruz.",
          },
          {
            number: "04",
            title: "Görsel Tasarım",
            description:
              "Marka kimliğinizle uyumlu yüksek detaylı arayüzler tasarlıyoruz.",
          },
          {
            number: "05",
            title: "Prototip & Test",
            description:
              "Gerçek kullanıcılarla test edip son rötuşları yapıyoruz.",
          },
        ]}
      />

      <TechCoverflow items={["Figma", "Framer Motion", "Next.js", "Tailwind CSS"]} />

      <ServiceCTA title="Kullanıcılarınızın seveceği bir arayüz için konuşalım." />
    </main>
  );
}
