"use client";

import { MagnifyingGlass } from "@phosphor-icons/react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./SeoExperience.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PHASES = [
  {
    title: "Niyeti çözümleriz.",
    text: "İnsanların ne yazdığını değil, o sorguyla hangi kararı vermeye çalıştığını araştırırız.",
    rank: "5. sıra",
    slot: 4,
  },
  {
    title: "Teknik engelleri kaldırırız.",
    text: "Tarama, indeks, site mimarisi, Core Web Vitals ve yapılandırılmış veriyi aynı teknik planda iyileştiririz.",
    rank: "4. sıra",
    slot: 3,
  },
  {
    title: "İçeriği derinleştiririz.",
    text: "Konu kümelerini, sayfa amacını ve iç bağlantıları arama niyetiyle eşleştiririz.",
    rank: "2. sıra",
    slot: 1,
  },
  {
    title: "Otoriteyi büyütürüz.",
    text: "Marka sinyallerini ve nitelikli referansları güçlendirir, her kazanımı gerçek veride yeniden ölçeriz.",
    rank: "1. sıra",
    slot: 0,
  },
] as const;

const GHOST_RESULTS = [
  "Dijital ürün geliştirme çözümleri",
  "Kurumsal yazılım hizmetleri",
  "Web proje danışmanlığı",
  "Dijital deneyim stüdyosu",
  "Teknoloji çözüm ortakları",
] as const;

export function SeoSearchJourney() {
  const rootRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const sticky = stickyRef.current;
      if (!sticky) return;

      const copies = gsap.utils.toArray<HTMLElement>("[data-search-copy]", sticky);
      const ranks = gsap.utils.toArray<HTMLElement>("[data-search-rank]", sticky);
      const result = sticky.querySelector<HTMLElement>("[data-vice-result]");
      const viewport = sticky.querySelector<HTMLElement>("[data-results-viewport]");
      const progress = sticky.querySelector<HTMLElement>("[data-search-progress]");
      const signal = sticky.querySelector<HTMLElement>("[data-search-signal]");
      const media = gsap.matchMedia();

      if (!result || !viewport) return;

      const rowStep = () => {
        const row = viewport.querySelector<HTMLElement>("[data-result-row]");
        return row?.getBoundingClientRect().height || 84;
      };

      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(copies, { autoAlpha: 0, y: 28 });
        gsap.set(copies[0], { autoAlpha: 1, y: 0 });
        gsap.set(ranks, { autoAlpha: 0, y: 8 });
        gsap.set(ranks[0], { autoAlpha: 1, y: 0 });
        gsap.set(result, { y: () => rowStep() * PHASES[0].slot });
        gsap.set(progress, {
          scaleX: 1 / PHASES.length,
          transformOrigin: "left center",
        });
        gsap.set(signal, {
          y: () => rowStep() * PHASES[0].slot,
          opacity: 0.2,
        });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.45,
            invalidateOnRefresh: true,
          },
        });

        PHASES.slice(1).forEach((phase, phaseIndex) => {
          const index = phaseIndex + 1;
          const previousPhase = PHASES[index - 1];
          const at = index;

          timeline
            .to(
              copies[index - 1],
              {
                autoAlpha: 0,
                y: -24,
                duration: 0.2,
                ease: "power3.inOut",
              },
              at - 0.22,
            )
            .to(
              ranks[index - 1],
              {
                autoAlpha: 0,
                y: -8,
                duration: 0.14,
                ease: "power3.in",
              },
              at - 0.18,
            )
            .fromTo(
              result,
              {
                y: () => rowStep() * previousPhase.slot,
              },
              {
                y: () => rowStep() * phase.slot,
                duration: 0.55,
                ease: "power3.inOut",
                immediateRender: false,
              },
              at - 0.08,
            )
            .fromTo(
              signal,
              {
                y: () => rowStep() * previousPhase.slot,
              },
              {
                y: () => rowStep() * phase.slot,
                opacity: 0.65,
                duration: 0.5,
                ease: "power3.inOut",
                immediateRender: false,
              },
              at - 0.08,
            )
            .to(
              copies[index],
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.22,
                ease: "power3.out",
              },
              at + 0.05,
            )
            .to(
              ranks[index],
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.18,
                ease: "power3.out",
              },
              at + 0.08,
            )
            .to(
              progress,
              {
                scaleX: (index + 1) / PHASES.length,
                duration: 0.45,
                ease: "none",
              },
              at,
            );
        });

        timeline.to({}, { duration: 0.65 });

        return () => {
          timeline.scrollTrigger?.kill();
          timeline.kill();
        };
      });

      media.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(copies, { autoAlpha: 0 });
        gsap.set(copies[0], { autoAlpha: 1, transform: "none" });
        gsap.set(ranks, { autoAlpha: 0 });
        gsap.set(ranks[0], { autoAlpha: 1, transform: "none" });
        gsap.set(result, { y: () => rowStep() * PHASES[0].slot });
        gsap.set(progress, { scaleX: 1 / PHASES.length });
        gsap.set(signal, { opacity: 0 });
      });

      return () => media.revert();
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} className={styles.searchJourney} aria-labelledby="seo-search-title">
      <div ref={stickyRef} className={styles.searchSticky}>
        <div className={styles.searchNarrative}>
          <h2 id="seo-search-title">Arama sonucu tesadüfen yükselmez.</h2>
          <div className={styles.searchCopies}>
            {PHASES.map((phase) => (
              <article key={phase.title} data-search-copy>
                <h3>{phase.title}</h3>
                <p>{phase.text}</p>
              </article>
            ))}
          </div>
          <div className={styles.searchProgress} aria-hidden="true">
            <span data-search-progress />
          </div>
        </div>

        <div className={styles.serpPanel} aria-label="Temsili arama sonucu görünümü">
          <div className={styles.serpChrome}>
            <span>Temsili arama görünümü</span>
            <span>Organik sonuçlar</span>
          </div>

          <div className={styles.searchBar}>
            <span>özel yazılım ajansı</span>
            <MagnifyingGlass size={24} weight="regular" aria-hidden="true" />
          </div>

          <div
            data-results-viewport
            className={styles.resultsViewport}
            aria-hidden="true"
          >
            <div data-search-signal className={styles.resultSignal} />
            {GHOST_RESULTS.map((title) => (
              <div key={title} data-result-row className={styles.ghostResult}>
                <span>example.com</span>
                <strong>{title}</strong>
                <i />
              </div>
            ))}

            <div data-vice-result className={styles.viceResult}>
              <div>
                <span>viceyazilim.com</span>
                <strong>VICE Yazılım | Dijital Ürün ve Yazılım Ajansı</strong>
              </div>
              <div className={styles.rankStack}>
                {PHASES.map((phase) => (
                  <span key={phase.rank} data-search-rank>
                    {phase.rank}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
