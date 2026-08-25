"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";

const steps = [
  {
    number: "01",
    eyebrow: "Dinle",
    title: "Gerçek davranışı buluruz.",
    body: "Kullanıcının karar anlarını ve akışta kaybolduğu noktaları görürüz.",
  },
  {
    number: "02",
    eyebrow: "Kur",
    title: "Yolu tek bir sisteme çeviririz.",
    body: "Bilgi mimarisini, arayüzü ve marka dilini aynı ritimde birleştiririz.",
  },
  {
    number: "03",
    eyebrow: "Doğrula",
    title: "Gerçek kullanımda sınarız.",
    body: "Prototipi test eder, gereksiz adımları çıkarır ve geliştirmeye hazırlarız.",
  },
];

export function UiUxLaserJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useSafeReducedMotion();

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section || reduceMotion) return;

      const card = section.querySelector<HTMLElement>("[data-laser-card]");
      const beam = section.querySelector<HTMLElement>("[data-laser-beam]");
      const core = section.querySelector<HTMLElement>("[data-laser-core]");
      const stepElements = gsap.utils.toArray<HTMLElement>("[data-laser-step]");

      if (!card || !beam || !core || stepElements.length === 0) return;

      gsap.set(stepElements, { autoAlpha: 0, y: 34 });
      gsap.set(stepElements[0], { autoAlpha: 1, y: 0 });
      gsap.set(beam, { scaleY: 0, transformOrigin: "top center" });

      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${Math.max(window.innerHeight * 3.15, 2100)}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .fromTo(
          card,
          { yPercent: 8, rotateX: 13, rotateY: -9, scale: 0.94 },
          { yPercent: 0, rotateX: 0, rotateY: 0, scale: 1, duration: 0.8 },
        )
        .to(core, { scale: 1.12, duration: 0.35, ease: "power2.inOut" }, 0.15)
        .to(core, { scale: 1, duration: 0.35, ease: "power2.inOut" }, 0.5)
        .to(beam, { scaleY: 0.42, duration: 0.7, ease: "power2.inOut" }, 0.18)
        .to(stepElements[0], { autoAlpha: 0, y: -28, duration: 0.32 }, 0.88)
        .to(stepElements[1], { autoAlpha: 1, y: 0, duration: 0.38 }, 0.98)
        .to(card, { rotateY: 7, rotateX: -3, duration: 0.62 }, 0.94)
        .to(beam, { scaleY: 0.72, duration: 0.6, ease: "power2.inOut" }, 1.02)
        .to(stepElements[1], { autoAlpha: 0, y: -28, duration: 0.32 }, 1.72)
        .to(stepElements[2], { autoAlpha: 1, y: 0, duration: 0.38 }, 1.82)
        .to(card, { rotateY: -5, rotateX: 2, duration: 0.62 }, 1.78)
        .to(beam, { scaleY: 1, duration: 0.64, ease: "power2.inOut" }, 1.86)
        .to(card, { rotateY: 0, rotateX: 0, yPercent: -2, duration: 0.55 }, 2.38);

      return () => timeline.kill();
    },
    { scope: sectionRef, dependencies: [reduceMotion], revertOnUpdate: true },
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] overflow-hidden border-y border-white/[0.065] bg-[#081422]"
      aria-labelledby="ui-ux-journey-title"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_74%_45%,rgba(54,123,255,0.12),transparent_28%)]" />
      <div className="relative mx-auto grid min-h-[100svh] max-w-7xl items-center gap-12 px-5 py-24 md:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20 lg:py-16">
        <div className="relative z-10 self-center">
          <p className="text-[0.82rem] font-medium text-white/42">Tek bir akış</p>
          <h2
            id="ui-ux-journey-title"
            className="mt-5 max-w-xl text-[clamp(2.9rem,5.5vw,5.9rem)] font-semibold leading-[0.94] tracking-[-0.06em]"
          >
            Ekrandan önce davranışı tasarlarız.
          </h2>
          <p className="mt-7 max-w-md text-base leading-7 text-white/48 md:text-lg md:leading-8">
            Üç karar. Tek sistem. Kullanıcının düşünmeden ilerlediği bir deneyim.
          </p>
        </div>

        <div className="relative flex min-h-[34rem] items-center justify-center [perspective:1400px] sm:min-h-[38rem] lg:min-h-[43rem]">
          <div
            data-laser-card
            className="relative z-10 h-[28rem] w-full max-w-[29rem] rounded-[2.25rem] border border-white/[0.13] bg-[linear-gradient(150deg,rgba(23,39,59,0.98),rgba(7,15,26,0.98))] p-7 shadow-[0_34px_90px_rgba(0,0,0,0.34)] [transform-style:preserve-3d] sm:h-[32rem] sm:p-9"
          >
            <div className="absolute inset-[0.42rem] rounded-[1.9rem] border border-white/[0.045]" />
            <div className="relative flex items-center justify-between text-[0.76rem] text-white/38">
              <span>VICE experience system</span>
              <span>03 adım</span>
            </div>

            <div className="relative mt-16 h-52 sm:mt-20 sm:h-56">
              {steps.map((step, index) => (
                <article
                  key={step.number}
                  data-laser-step
                  aria-hidden={reduceMotion && index !== 0}
                  className={`absolute inset-0 flex flex-col justify-center ${
                    reduceMotion && index !== 0 ? "hidden" : ""
                  }`}
                >
                  <div className="flex items-center gap-3 text-sm font-medium text-[#8cb8ff]">
                    <span className="grid h-9 w-9 place-items-center rounded-full border border-[#8cb8ff]/28 text-[0.72rem] tabular-nums">
                      {step.number}
                    </span>
                    <span>{step.eyebrow}</span>
                  </div>
                  <h3 className="mt-6 max-w-sm text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[0.98] tracking-[-0.05em]">
                    {step.title}
                  </h3>
                  <p className="mt-5 max-w-sm text-[0.98rem] leading-7 text-white/48">
                    {step.body}
                  </p>
                </article>
              ))}
            </div>

            <div className="absolute inset-x-7 bottom-7 flex items-center gap-4 sm:inset-x-9 sm:bottom-9">
              <span
                data-laser-core
                className="relative block h-3.5 w-3.5 shrink-0 rounded-full bg-[#8cb8ff] shadow-[0_0_22px_rgba(105,164,255,0.85)]"
              >
                <span className="absolute inset-[-0.5rem] rounded-full border border-[#8cb8ff]/20" />
              </span>
              <span className="h-px flex-1 bg-gradient-to-r from-[#8cb8ff]/60 to-white/[0.06]" />
              <span className="text-[0.72rem] text-white/32">Geliştirmeye hazır</span>
            </div>
          </div>

          <div
            data-laser-beam
            aria-hidden="true"
            className={`pointer-events-none absolute left-1/2 top-[calc(50%+14rem)] z-0 h-[48vh] w-px -translate-x-1/2 bg-gradient-to-b from-[#8cb8ff] via-[#5b9cff]/70 to-transparent shadow-[0_0_18px_rgba(77,145,255,0.62)] sm:top-[calc(50%+16rem)] ${
              reduceMotion ? "hidden" : ""
            }`}
          />
        </div>
      </div>
    </section>
  );
}
