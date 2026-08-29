"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./EcommerceExperience.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const STATIONS = [
  {
    name: "Ürün",
    title: "Ürün verisi tek kaynaktan yönetilir.",
    text: "Varyant, fiyat, stok ve içerik bilgisi mağaza ile diğer satış kanallarında tutarlı kalır.",
  },
  {
    name: "Ödeme",
    title: "Ödeme akışı güven verir.",
    text: "Sanal POS, 3D Secure, başarısız ödeme ve iade senaryoları aynı akışın içinde çözülür.",
  },
  {
    name: "Sipariş",
    title: "Sipariş doğru sisteme düşer.",
    text: "Mağaza, ERP, muhasebe ve pazaryeri verisi elle taşınmadan birbirine bağlanır.",
  },
  {
    name: "Teslimat",
    title: "Müşteri yolculuğu teslimatta bitmez.",
    text: "Kargo durumu, bildirimler ve satış sonrası deneyim markanın aynı diliyle devam eder.",
  },
] as const;

export function CommerceSystemStory() {
  const rootRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const sticky = stickyRef.current;
      if (!sticky) return;

      const copies = gsap.utils.toArray<HTMLElement>("[data-station-copy]", sticky);
      const markers = gsap.utils.toArray<HTMLElement>("[data-station-marker]", sticky);
      const dots = gsap.utils.toArray<HTMLElement>("[data-station-dot]", sticky);
      const line = sticky.querySelector<HTMLElement>("[data-station-line]");
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(copies, { autoAlpha: 0, yPercent: -50, y: 30 });
        gsap.set(copies[0], { autoAlpha: 1, yPercent: -50, y: 0 });
        gsap.set(markers, { color: "rgba(220, 232, 245, 0.35)" });
        gsap.set(markers[0], { color: "#f7f9fc" });
        gsap.set(dots, { backgroundColor: "#070b11", borderColor: "rgba(220, 235, 250, 0.24)", boxShadow: "none" });
        gsap.set(dots[0], { backgroundColor: "#bfe8ff", borderColor: "#bfe8ff", boxShadow: "0 0 0 8px rgba(112, 196, 255, 0.12)" });
        gsap.set(line, { transformOrigin: "left center", scaleX: 1 / STATIONS.length });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.45,
            invalidateOnRefresh: true,
          },
        });

        dots.slice(1).forEach((dot, dotIndex) => {
          const index = dotIndex + 1;
          const at = index;

          timeline
            .to(copies[index - 1], { autoAlpha: 0, yPercent: -50, y: -28, duration: 0.2, ease: "power3.inOut" }, at - 0.18)
            .to(copies[index], { autoAlpha: 1, yPercent: -50, y: 0, duration: 0.22, ease: "power3.out" }, at + 0.04)
            .to(markers[index - 1], { color: "rgba(220, 232, 245, 0.35)", duration: 0.18 }, at)
            .to(markers[index], { color: "#f7f9fc", duration: 0.18 }, at)
            .to(dot, { backgroundColor: "#bfe8ff", borderColor: "#bfe8ff", boxShadow: "0 0 0 8px rgba(112, 196, 255, 0.12)", duration: 0.14 }, at)
            .to(line, { scaleX: (index + 1) / dots.length, duration: 0.55, ease: "none" }, at);
        });

        timeline.to({}, { duration: 0.6 });

        return () => {
          timeline.scrollTrigger?.kill();
          timeline.kill();
        };
      });

      media.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(copies, { autoAlpha: 0 });
        gsap.set(copies[0], { autoAlpha: 1, yPercent: -50, y: 0 });
        gsap.set(markers, { color: "rgba(220, 232, 245, 0.35)" });
        gsap.set(markers[0], { color: "#f7f9fc" });
        gsap.set(dots, { backgroundColor: "#070b11", boxShadow: "none" });
        gsap.set(dots[0], { backgroundColor: "#bfe8ff", boxShadow: "0 0 0 8px rgba(112, 196, 255, 0.12)" });
        gsap.set(line, { scaleX: 1 / STATIONS.length });
      });

      return () => media.revert();
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} className={styles.systemStory} aria-labelledby="system-story-title">
      <div ref={stickyRef} className={styles.systemSticky}>
        <div className={styles.systemHeading}>
          <span>Tek satış hattı</span>
          <h2 id="system-story-title">Her durak aynı veriye bağlı.</h2>
        </div>

        <div className={styles.stationCopies}>
          {STATIONS.map((station) => (
            <article key={station.name} data-station-copy>
              <span>{station.name}</span>
              <h3>{station.title}</h3>
              <p>{station.text}</p>
            </article>
          ))}
        </div>

        <div className={styles.stationMap}>
          <div className={styles.stationTrack} aria-hidden="true">
            <span data-station-line />
          </div>
          {STATIONS.map((station) => (
            <div key={station.name} className={styles.station} data-station-marker>
              <i data-station-dot aria-hidden="true" />
              <span>{station.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
