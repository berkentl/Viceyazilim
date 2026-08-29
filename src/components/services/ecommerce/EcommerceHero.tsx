"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./EcommerceExperience.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function EcommerceHero() {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const openingRef = useRef<HTMLDivElement>(null);
  const cityRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const durationRef = useRef(0);
  const [ready, setReady] = useState(false);

  useGSAP(
    () => {
      const stage = stageRef.current;
      const video = videoRef.current;
      const opening = openingRef.current;
      const city = cityRef.current;
      const progress = progressRef.current;

      if (!stage || !video || !opening || !city || !progress) return;

      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(city, { autoAlpha: 0, filter: "blur(10px)" });
        gsap.set(progress, { transformOrigin: "left center", transform: "scaleX(0)" });

        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: "+=3800",
            pin: stage,
            scrub: 0.35,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            refreshPriority: 10,
          },
        });

        timeline
          .to(progress, { transform: "scaleX(1)", duration: 1 }, 0)
          .to(
            opening,
            {
              autoAlpha: 0,
              filter: "blur(12px)",
              y: -28,
              scale: 0.97,
              duration: 0.24,
            },
            0.08,
          )
          .to(
            city,
            {
              autoAlpha: 1,
              filter: "blur(0px)",
              duration: 0.18,
              ease: "power3.out",
            },
            0.79,
          );

        const refreshFrame = window.requestAnimationFrame(() => {
          ScrollTrigger.sort();
          ScrollTrigger.refresh();
        });

        return () => {
          window.cancelAnimationFrame(refreshFrame);
          timeline.scrollTrigger?.kill();
          timeline.kill();
        };
      });

      media.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(opening, { autoAlpha: 0 });
        gsap.set(city, { autoAlpha: 1, filter: "none" });
        gsap.set(progress, { transform: "scaleX(1)" });
        if (durationRef.current > 0) video.currentTime = durationRef.current * 0.92;
      });

      return () => media.revert();
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} className={styles.metroHero} aria-labelledby="metro-commerce-title">
      <div ref={stageRef} className={styles.metroStage}>
        <video
          ref={videoRef}
          className={styles.metroVideo}
          src="/ecommerce/metro-city-open.mp4"
          autoPlay
          muted
          playsInline
          preload="auto"
          style={{ opacity: ready ? 1 : 0 }}
          onLoadedMetadata={(event) => {
            durationRef.current = event.currentTarget.duration || 0;
            const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            if (reducedMotion) {
              event.currentTarget.pause();
              event.currentTarget.currentTime = durationRef.current * 0.92;
            }
            setReady(true);
            window.requestAnimationFrame(() => {
              ScrollTrigger.sort();
              ScrollTrigger.refresh();
            });
          }}
        />

        <div className={styles.metroShade} aria-hidden="true" />

        <div ref={openingRef} className={styles.metroOpening}>
          <span>VICE E-Ticaret</span>
          <h1 id="metro-commerce-title">Satışa açılan kapı.</h1>
          <p>Kaydırdıkça şehir açılır.</p>
        </div>

        <div ref={cityRef} className={styles.metroCityCopy}>
          <span>Mağaza açıldı</span>
          <strong>Şimdi bütün sistemi birbirine bağlayalım.</strong>
        </div>

        <div className={styles.metroProgress} aria-hidden="true">
          <span ref={progressRef} />
        </div>
      </div>
    </section>
  );
}
