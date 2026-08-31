"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import styles from "./GoogleAdsExperience.module.css";

export function GoogleAdsHero() {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const stage = stageRef.current;
      if (!stage) return;

      const intro = stage.querySelector<HTMLElement>("[data-ads-intro]");
      const resolve = stage.querySelector<HTMLElement>("[data-ads-resolve]");
      const visual = stage.querySelector<HTMLElement>("[data-ads-hero-visual]");
      const halo = stage.querySelector<HTMLElement>("[data-ads-hero-halo]");
      const grid = stage.querySelector<HTMLElement>("[data-ads-hero-grid]");
      const progress = stage.querySelector<HTMLElement>("[data-ads-hero-progress]");
      const scrollCue = stage.querySelector<HTMLElement>("[data-ads-scroll-cue]");
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(resolve, { autoAlpha: 0, y: 42 });
        gsap.set(progress, { scaleX: 0, transformOrigin: "left center" });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
            invalidateOnRefresh: true,
            refreshPriority: 14,
          },
        });

        timeline
          .to(progress, { scaleX: 1, duration: 1, ease: "none" }, 0)
          .to(scrollCue, { autoAlpha: 0, y: 14, duration: 0.16 }, 0.12)
          .to(
            intro,
            {
              autoAlpha: 0,
              y: -42,
              scale: 0.975,
              duration: 0.24,
              ease: "power3.inOut",
            },
            0.23,
          )
          .to(
            visual,
            {
              xPercent: -34,
              yPercent: 5,
              scale: 1.3,
              rotation: -8,
              duration: 0.7,
              ease: "power3.inOut",
            },
            0.12,
          )
          .to(
            halo,
            {
              xPercent: -28,
              scale: 1.28,
              opacity: 0.88,
              duration: 0.7,
              ease: "power3.inOut",
            },
            0.12,
          )
          .to(
            grid,
            {
              opacity: 0.22,
              scale: 1.08,
              duration: 0.65,
              ease: "none",
            },
            0.18,
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
          .to({}, { duration: 0.14 });

        return () => {
          timeline.scrollTrigger?.kill();
          timeline.kill();
        };
      });

      media.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(intro, { autoAlpha: 1, transform: "none" });
        gsap.set(resolve, { autoAlpha: 0 });
        gsap.set(visual, { transform: "none" });
        gsap.set(halo, { transform: "none" });
        gsap.set(progress, { scaleX: 1 });
      });

      return () => media.revert();
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} className={styles.hero} aria-labelledby="google-ads-hero-title">
      <div ref={stageRef} className={styles.heroStage}>
        <div data-ads-hero-grid className={styles.heroGrid} aria-hidden="true" />
        <div data-ads-hero-halo className={styles.heroHalo} aria-hidden="true" />

        <div data-ads-intro className={styles.heroIntro}>
          <p>VICE Google Ads</p>
          <h1 id="google-ads-hero-title">Arayan müşteriyi kaçırmayın.</h1>
          <span>
            Arama niyetini doğru kampanya, doğru teklif ve ölçülebilir dönüşümle buluşturuyoruz.
          </span>
        </div>

        <div data-ads-hero-visual className={styles.heroVisual} aria-hidden="true">
          <Image
            src="/google-ads/ads-signal-cluster.png"
            alt=""
            width={1536}
            height={1024}
            priority
            sizes="(max-width: 800px) 100vw, 64vw"
          />
        </div>

        <div data-ads-resolve className={styles.heroResolve}>
          <span>Bir tık değil.</span>
          <strong>Satın alma niyetini yönetiyoruz.</strong>
        </div>

        <div data-ads-scroll-cue className={styles.scrollCue} aria-hidden="true">
          <span />
          Kaydır
        </div>

        <div className={styles.heroProgress} aria-hidden="true">
          <span data-ads-hero-progress />
        </div>
      </div>
    </section>
  );
}
