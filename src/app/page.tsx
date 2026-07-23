import { Hero } from "@/components/home/Hero";
import { ScrollRevealText } from "@/components/home/ScrollRevealText";
import { ServicesStrip } from "@/components/home/ServicesStrip";
import { TrustBanner } from "@/components/home/TrustBanner";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <section className="px-6 py-24 md:px-12 md:py-28">
        <ScrollRevealText text="Bir web sitesi sadece bir vitrin değildir; markanızın dijitaldeki sesi, güveni ve büyüme motorudur." />
      </section>
      <ServicesStrip />
      <TrustBanner />
    </main>
  );
}
