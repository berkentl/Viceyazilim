import { ScrollRevealText } from "@/components/home/ScrollRevealText";
import { UiUxContactChoice } from "@/components/services/UiUxContactChoice";
import { UiUxHero } from "@/components/services/UiUxHero";
import { UiUxLaserJourney } from "@/components/services/UiUxLaserJourney";

export function UiUxExperience() {
  return (
    <div className="overflow-clip bg-[#07111f] text-white">
      <UiUxHero />

      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
        <ScrollRevealText text="Kullanıcı yolunu düşünmüyorsa, tasarım işini doğru yapıyordur." />
      </section>

      <UiUxLaserJourney />

      <section
        className="relative px-5 pb-24 pt-28 md:px-8 md:pb-36 md:pt-40"
        aria-labelledby="ui-ux-contact-title"
      >
        <div className="pointer-events-none absolute left-1/2 top-0 h-24 w-px -translate-x-1/2 bg-gradient-to-b from-[#72a9ff]/70 to-transparent shadow-[0_0_16px_rgba(84,148,255,0.46)] md:h-32" />
        <span className="pointer-events-none absolute left-1/2 top-20 h-2 w-2 -translate-x-1/2 rounded-full bg-[#82b4ff] shadow-[0_0_22px_rgba(83,148,255,0.82)] md:top-28" />

        <div className="mx-auto max-w-7xl border-t border-white/[0.075] pt-16 lg:pt-20">
          <UiUxContactChoice />
        </div>
      </section>
    </div>
  );
}
