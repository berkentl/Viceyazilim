"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SeoShaderBackground } from "./SeoShaderBackground";
import styles from "./SeoExperience.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function SeoHero() {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const stage = stageRef.current;
      if (!stage) return;

      const intro = stage.querySelector<HTMLElement>("[data-seo-hero-intro]");
      const resolve = stage.querySelector<HTMLElement>("[data-seo-hero-resolve]");
      const lens = stage.querySelector<HTMLElement>("[data-seo-lens]");
      const orbit = stage.querySelector<HTMLElement>("[data-seo-orbit]");
      const progress = stage.querySelector<HTMLElement>("[data-seo-hero-progress]");
      const shade = stage.querySelector<HTMLElement>("[data-seo-hero-shade]");
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(resolve, { autoAlpha: 0, y: 36 });
        gsap.set(progress, { scaleX: 0, transformOrigin: "left center" });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.45,
            invalidateOnRefresh: true,
            refreshPriority: 12,
          },
        });

        timeline
          .to(progress, { scaleX: 1, duration: 1, ease: "none" }, 0)
          .to(
            intro,
            {
              autoAlpha: 0,
              y: -36,
              scale: 0.975,
              duration: 0.24,
              ease: "power3.inOut",
            },
            0.24,
          )
          .to(
            lens,
            {
              xPercent: -42,
              yPercent: 5,
              scale: 1.42,
              rotation: 18,
              duration: 0.72,
              ease: "power3.inOut",
            },
            0.12,
          )
          .to(
            orbit,
            {
              rotation: 86,
              scale: 1.2,
              opacity: 0.38,
              duration: 0.72,
              ease: "power3.inOut",
            },
            0.12,
          )
          .to(
            shade,
            {
              opacity: 0.96,
              duration: 0.44,
              ease: "none",
            },
            0.42,
          )
          .to(
            resolve,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.24,
              ease: "power3.out",
            },
            0.66,
          )
          .to({}, { duration: 0.15 });

        return () => {
          timeline.scrollTrigger?.kill();
          timeline.kill();
        };
      });

      media.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(intro, { autoAlpha: 1, transform: "none" });
        gsap.set(resolve, { autoAlpha: 0 });
        gsap.set(lens, { transform: "none" });
        gsap.set(orbit, { transform: "none" });
        gsap.set(progress, { scaleX: 1 });
        gsap.set(shade, { opacity: 0.92 });
      });

      return () => media.revert();
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} className={styles.hero} aria-labelledby="seo-hero-title">
      <div ref={stageRef} className={styles.heroStage}>
        <SeoShaderBackground className={styles.heroShader} />
        <div className={styles.heroGrid} aria-hidden="true" />
        <div data-seo-hero-shade className={styles.heroShade} aria-hidden="true" />

        <div data-seo-hero-intro className={styles.heroIntro}>
          <p>VICE SEO</p>
          <h1 id="seo-hero-title">Bulunmak tesadüf değildir.</h1>
          <span>
            Teknik zemini, içeriği ve otoriteyi tek büyüme sisteminde birleştiriyoruz.
          </span>
        </div>

        <div className={styles.heroVisual} aria-hidden="true">
          <div data-seo-orbit className={styles.heroOrbit}>
            <i />
            <i />
            <i />
          </div>
          <div data-seo-lens className={styles.heroLens}>
            <Image
              src="/seo/search-lens.png"
              alt=""
              width={1254}
              height={1254}
              priority
              sizes="(max-width: 800px) 92vw, 58vw"
            />
          </div>
        </div>

        <div data-seo-hero-resolve className={styles.heroResolve}>
          <span>Arama niyetini okuruz.</span>
          <strong>Niyeti görünürlüğe, görünürlüğü büyümeye dönüştürürüz.</strong>
        </div>

        <div className={styles.heroProgress} aria-hidden="true">
          <span data-seo-hero-progress />
        </div>
      </div>
    </section>
  );
}
