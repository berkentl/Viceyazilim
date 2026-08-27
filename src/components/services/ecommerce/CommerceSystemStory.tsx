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
      const dots = gsap.utils.toArray<HTMLElement>("[data-station-dot]", sticky);
      const line = sticky.querySelector<HTMLElement>("[data-station-line]");
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(copies.slice(1), { autoAlpha: 0, transform: "translate3d(0, 30px, 0)" });
        gsap.set(line, { transformOrigin: "left center", transform: "scaleX(0)" });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.45,
          },
        });

        dots.forEach((dot, index) => {
          const at = index;
          if (index > 0) {
            timeline
              .to(copies[index - 1], { autoAlpha: 0, transform: "translate3d(0, -28px, 0)", duration: 0.2, ease: "power3.inOut" }, at - 0.12)
              .to(copies[index], { autoAlpha: 1, transform: "translate3d(0, 0, 0)", duration: 0.22, ease: "power3.out" }, at + 0.08);
          }
          timeline.to(dot, { backgroundColor: "#bfe8ff", boxShadow: "0 0 0 8px rgba(112, 196, 255, 0.12)", duration: 0.12 }, at);
          timeline.to(line, { transform: `scaleX(${(index + 1) / dots.length})`, duration: 0.8, ease: "none" }, at);
        });

        return () => timeline.kill();
      });

      media.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(copies, { autoAlpha: 0 });
        gsap.set(copies[0], { autoAlpha: 1, transform: "none" });
        gsap.set(dots[0], { backgroundColor: "#bfe8ff" });
        gsap.set(line, { transform: "scaleX(0.25)" });
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
            <div key={station.name} className={styles.station}>
              <i data-station-dot aria-hidden="true" />
              <span>{station.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
