"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./EcommerceExperience.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const CHAPTERS = [
  {
    index: "01 / 03",
    label: "Marka deneyimi",
    title: "İlk bakış, satın alma kararının başlangıcıdır.",
    text: "Vitrini yalnızca güzel değil; ürünü bulmayı, karşılaştırmayı ve karar vermeyi kolaylaştıran bir arayüz olarak kuruyoruz.",
  },
  {
    index: "02 / 03",
    label: "Satın alma akışı",
    title: "Sepetten ödemeye tek ritim.",
    text: "Gereksiz adımları azaltıyor, mobilde ve masaüstünde aynı güven duygusunu koruyan bir ödeme akışı tasarlıyoruz.",
  },
  {
    index: "03 / 03",
    label: "Operasyon sistemi",
    title: "Sipariş geldiğinde arka taraf da hazırdır.",
    text: "Stok, kargo, pazaryeri ve yönetim verisini sonradan eklenen parçalar değil, ürünün temel mimarisi olarak ele alıyoruz.",
  },
] as const;

export function CommerceChromaticStory() {
  const rootRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const frame = frameRef.current;
      if (!frame) return;

      const copies = gsap.utils.toArray<HTMLElement>("[data-chromatic-copy]", frame);
      const layers = gsap.utils.toArray<HTMLElement>("[data-chromatic-layer]", frame);
      const meter = frame.querySelector<HTMLElement>("[data-chromatic-meter]");
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(copies.slice(1), { autoAlpha: 0, transform: "translate3d(0, 42px, 0)" });
        gsap.set(meter, { transformOrigin: "left center", transform: "scaleX(0)" });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
          },
        });

        timeline
          .to(meter, { transform: "scaleX(0.5)", duration: 1, ease: "none" }, 0)
          .to(copies[0], { autoAlpha: 0, transform: "translate3d(0, -36px, 0)", duration: 0.22, ease: "power3.inOut" }, 0.7)
          .to(layers[0], { transform: "translate3d(-22%, -6%, 0) rotate(-5deg) scale(1.12)", duration: 1, ease: "power3.inOut" }, 0.55)
          .to(layers[1], { transform: "translate3d(18%, 8%, 0) rotate(7deg) scale(1.08)", duration: 1, ease: "power3.inOut" }, 0.55)
          .to(copies[1], { autoAlpha: 1, transform: "translate3d(0, 0, 0)", duration: 0.25, ease: "power3.out" }, 0.9)
          .to(meter, { transform: "scaleX(0.78)", duration: 1, ease: "none" }, 1)
          .to(copies[1], { autoAlpha: 0, transform: "translate3d(0, -36px, 0)", duration: 0.22, ease: "power3.inOut" }, 1.7)
          .to(layers[2], { transform: "translate3d(-16%, 10%, 0) rotate(4deg) scale(1.18)", duration: 1, ease: "power3.inOut" }, 1.55)
          .to(layers[3], { transform: "translate3d(13%, -12%, 0) rotate(-6deg) scale(1.12)", duration: 1, ease: "power3.inOut" }, 1.55)
          .to(copies[2], { autoAlpha: 1, transform: "translate3d(0, 0, 0)", duration: 0.25, ease: "power3.out" }, 1.9)
          .to(meter, { transform: "scaleX(1)", duration: 0.9, ease: "none" }, 2);

        return () => timeline.kill();
      });

      media.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(copies, { autoAlpha: 0 });
        gsap.set(copies[0], { autoAlpha: 1, transform: "none" });
        gsap.set(meter, { transform: "scaleX(1)" });
      });

      return () => media.revert();
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} className={styles.chromaticSection} aria-labelledby="chromatic-title">
      <div ref={frameRef} className={styles.chromaticFrame}>
        <div className={styles.chromaticBeam} aria-hidden="true" />
        <div className={styles.chromaticSurface}>
          <div data-chromatic-layer className={`${styles.colorLayer} ${styles.colorAmber}`} />
          <div data-chromatic-layer className={`${styles.colorLayer} ${styles.colorCobalt}`} />
          <div data-chromatic-layer className={`${styles.colorLayer} ${styles.colorCyan}`} />
          <div data-chromatic-layer className={`${styles.colorLayer} ${styles.colorCoral}`} />
          <div className={styles.chromaticNoise} aria-hidden="true" />

          <div className={styles.chromaticTopline}>
            <span>VICE Commerce System</span>
            <span>Deneyim / Teknoloji / Operasyon</span>
          </div>

          <div className={styles.chromaticCopies}>
            {CHAPTERS.map((chapter, index) => (
              <article key={chapter.index} data-chromatic-copy>
                <div>
                  <span>{chapter.index}</span>
                  <span>{chapter.label}</span>
                </div>
                <h2 id={index === 0 ? "chromatic-title" : undefined}>{chapter.title}</h2>
                <p>{chapter.text}</p>
              </article>
            ))}
          </div>

          <div className={styles.chromaticMeter} aria-hidden="true">
            <span data-chromatic-meter />
          </div>
        </div>
      </div>
    </section>
  );
}
