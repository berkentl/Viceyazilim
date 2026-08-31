import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { ScrollRevealText } from "@/components/home/ScrollRevealText";
import { ServicesStrip } from "@/components/home/ServicesStrip";
import { ReferencesSection } from "@/components/references/ReferencesSection";
import { ReferencesCTA } from "@/components/home/ReferencesCTA";
import { StatementBanner } from "@/components/home/StatementBanner";
import { TrustBanner } from "@/components/home/TrustBanner";
import { AgencyFeatures } from "@/components/home/AgencyFeatures";
import { ProductContinuityStory } from "@/components/home/ProductContinuityStory";
import { JsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata, webPageJsonLd } from "@/lib/seo";

const homeDescription =
  "Web tasarım, özel yazılım, e-ticaret, UI/UX, SEO ve Google Ads hizmetlerini markanız için tek bir ölçülebilir büyüme sisteminde birleştiriyoruz.";

export const metadata: Metadata = createPageMetadata({
  title: "Vice Yazılım — Web Tasarım, Yazılım ve Dijital Büyüme Ajansı",
  description: homeDescription,
  path: "/",
  absoluteTitle: true,
  keywords: [
    "web tasarım ajansı",
    "özel web yazılım",
    "e-ticaret çözümleri",
    "SEO ve Google Ads ajansı",
  ],
});

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <JsonLd
        data={webPageJsonLd({
          name: "Vice Yazılım",
          description: homeDescription,
          path: "/",
          type: "HomePage",
        })}
      />
      <Hero />
      <section className="px-6 py-24 md:px-12 md:py-28">
        <ScrollRevealText text="Bir web sitesi sadece bir vitrin değildir; markanızın dijitaldeki sesi, güveni ve büyüme motorudur." />
      </section>
      <ServicesStrip />
      <ReferencesSection />
      <ReferencesCTA />
      <StatementBanner />
      <TrustBanner />
      <AgencyFeatures />
      <ProductContinuityStory />
    </main>
  );
}
