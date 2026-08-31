"use client";

import { ArrowsClockwise } from "@phosphor-icons/react/dist/csr/ArrowsClockwise";
import { ChartLineUp } from "@phosphor-icons/react/dist/csr/ChartLineUp";
import { CursorClick } from "@phosphor-icons/react/dist/csr/CursorClick";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/csr/MagnifyingGlass";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import styles from "./GoogleAdsExperience.module.css";

const LOOP_PHASES = [
  {
    label: "Arama",
    title: "Niyet kampanyaya girer.",
    text: "Sorgu ve kitle sinyali doğru reklam grubuna yönlenir.",
    icon: MagnifyingGlass,
  },
  {
    label: "Açılış",
    title: "Mesaj deneyimle devam eder.",
    text: "Reklam vaadi, sayfa içeriği ve aksiyon aynı kararı destekler.",
    icon: CursorClick,
  },
  {
    label: "Dönüşüm",
    title: "Gerçek değer ölçülür.",
    text: "Mikro etkileşimler değil; satışa ve nitelikli talebe yaklaşan olaylar izlenir.",
    icon: ChartLineUp,
  },
  {
    label: "Optimizasyon",
    title: "Sonuç sisteme geri döner.",
    text: "Dönüşüm kalitesi yeni teklif, hedefleme ve bütçe kararını besler.",
    icon: ArrowsClockwise,
  },
] as const;

export function GoogleAdsConversionLoop() {
  const rootRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const sticky = stickyRef.current;
      if (!sticky) return;

      const copies = gsap.utils.toArray<HTMLElement>("[data-loop-copy]", sticky);
      const nodes = gsap.utils.toArray<HTMLElement>("[data-loop-node]", sticky);
      const line = sticky.querySelector<HTMLElement>("[data-loop-line]");
      const signal = sticky.querySelector<HTMLElement>("[data-loop-signal]");
      const orbit = sticky.querySelector<HTMLElement>("[data-loop-orbit]");
      const media = gsap.matchMedia();

      if (!line || !signal || !orbit) return;

      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(copies, { autoAlpha: 0, y: 28 });
        gsap.set(copies[0], { autoAlpha: 1, y: 0 });
        gsap.set(nodes, {
          scale: 1,
          color: "rgba(220, 232, 245, 0.36)",
          backgroundColor: "rgba(13, 21, 31, 0.86)",
          borderColor: "rgba(190, 215, 243, 0.12)",
          boxShadow: "none",
        });
        gsap.set(nodes[0], {
          scale: 1.08,
          color: "#f8fbff",
          backgroundColor: "rgba(34, 87, 142, 0.56)",
          borderColor: "rgba(143, 205, 255, 0.72)",
          boxShadow: "0 0 0 10px rgba(76, 155, 230, 0.08), 0 20px 52px rgba(0, 0, 0, 0.28)",
        });
        gsap.set(line, {
          scaleX: 1 / LOOP_PHASES.length,
          transformOrigin: "left center",
        });
        gsap.set(signal, { xPercent: 0 });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.48,
            invalidateOnRefresh: true,
          },
        });

        LOOP_PHASES.slice(1).forEach((_, phaseIndex) => {
          const index = phaseIndex + 1;
          const at = index;

          timeline
            .to(
              copies[index - 1],
              { autoAlpha: 0, y: -24, duration: 0.2, ease: "power3.inOut" },
              at - 0.2,
            )
            .to(
              copies[index],
              { autoAlpha: 1, y: 0, duration: 0.22, ease: "power3.out" },
              at + 0.04,
            )
            .to(
              nodes[index - 1],
              {
                scale: 1,
                color: "rgba(220, 232, 245, 0.36)",
                backgroundColor: "rgba(13, 21, 31, 0.86)",
                borderColor: "rgba(190, 215, 243, 0.12)",
                boxShadow: "none",
                duration: 0.2,
              },
              at,
            )
            .to(
              nodes[index],
              {
                scale: 1.08,
                color: "#f8fbff",
                backgroundColor: "rgba(34, 87, 142, 0.56)",
                borderColor: "rgba(143, 205, 255, 0.72)",
                boxShadow: "0 0 0 10px rgba(76, 155, 230, 0.08), 0 20px 52px rgba(0, 0, 0, 0.28)",
                duration: 0.22,
              },
              at,
            )
            .to(
              line,
              {
                scaleX: (index + 1) / LOOP_PHASES.length,
                duration: 0.5,
                ease: "none",
              },
              at,
            )
            .to(
              signal,
              {
                x: () => sticky.clientWidth * 0.225 * index,
                duration: 0.5,
                ease: "power3.inOut",
              },
              at - 0.05,
            )
            .to(
              orbit,
              {
                rotation: index * 54,
                scale: 1 + index * 0.03,
                duration: 0.52,
                ease: "power3.inOut",
              },
              at - 0.08,
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
        gsap.set(line, { scaleX: 1 / LOOP_PHASES.length });
        gsap.set(nodes[0], { color: "#f8fbff" });
      });

      return () => media.revert();
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} className={styles.conversionLoop} aria-labelledby="ads-loop-title">
      <div ref={stickyRef} className={styles.loopSticky}>
        <div className={styles.loopHeading}>
          <span>Ölçüm mimarisi</span>
          <h2 id="ads-loop-title">Dönüşüm son nokta değil, yeni kararın başlangıcıdır.</h2>
        </div>

        <div className={styles.loopCopies}>
          {LOOP_PHASES.map((phase) => (
            <article key={phase.label} data-loop-copy>
              <span>{phase.label}</span>
              <h3>{phase.title}</h3>
              <p>{phase.text}</p>
            </article>
          ))}
        </div>

        <div className={styles.loopMap}>
          <div data-loop-orbit className={styles.loopOrbit} aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <div className={styles.loopTrack} aria-hidden="true">
            <span data-loop-line />
            <i data-loop-signal />
          </div>
          {LOOP_PHASES.map(({ label, icon: Icon }) => (
            <div key={label} data-loop-node className={styles.loopNode}>
              <Icon size={28} weight="light" aria-hidden="true" />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
