"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import styles from "./GoogleAdsExperience.module.css";

const AUCTION_PHASES = [
  {
    label: "Arama niyeti",
    title: "Sorgunun arkasındaki kararı okuruz.",
    text: "Kullanıcının yazdığı kelimeyi, çözmeye çalıştığı ihtiyaç ve satın alma aşamasıyla birlikte değerlendiririz.",
  },
  {
    label: "Uygunluk",
    title: "Bütçeyi ilgisiz trafikten koruruz.",
    text: "Eşleme türleri, negatif sorgular, konum, cihaz ve zaman sinyalleri aynı hedefleme mantığında çalışır.",
  },
  {
    label: "Reklam sıralaması",
    title: "Teklif kadar deneyim de yarışır.",
    text: "Reklam kalitesi, mesaj uyumu ve açılış sayfası deneyimini teklif stratejisiyle birlikte yönetiriz.",
  },
  {
    label: "Dönüşüm",
    title: "Kazanan tıklama değil, ticari sonuçtur.",
    text: "Satış, form, telefon ve nitelikli müşteri sinyalini ölçer; sonraki teklif kararına geri besleriz.",
  },
] as const;

export function GoogleAdsAuction() {
  const rootRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const sticky = stickyRef.current;
      if (!sticky) return;

      const copies = gsap.utils.toArray<HTMLElement>("[data-auction-copy]", sticky);
      const labels = gsap.utils.toArray<HTMLElement>("[data-auction-label]", sticky);
      const visual = sticky.querySelector<HTMLElement>("[data-auction-visual]");
      const focus = sticky.querySelector<HTMLElement>("[data-auction-focus]");
      const line = sticky.querySelector<HTMLElement>("[data-auction-line]");
      const media = gsap.matchMedia();

      if (!visual || !focus || !line) return;

      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(copies, { autoAlpha: 0, y: 30 });
        gsap.set(copies[0], { autoAlpha: 1, y: 0 });
        gsap.set(labels, { color: "rgba(220, 232, 245, 0.28)" });
        gsap.set(labels[0], { color: "rgba(247, 250, 255, 0.96)" });
        gsap.set(line, {
          scaleX: 1 / AUCTION_PHASES.length,
          transformOrigin: "left center",
        });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        });

        AUCTION_PHASES.slice(1).forEach((_, phaseIndex) => {
          const index = phaseIndex + 1;
          const at = index;

          timeline
            .to(
              copies[index - 1],
              { autoAlpha: 0, y: -26, duration: 0.2, ease: "power3.inOut" },
              at - 0.2,
            )
            .to(
              copies[index],
              { autoAlpha: 1, y: 0, duration: 0.22, ease: "power3.out" },
              at + 0.04,
            )
            .to(
              labels[index - 1],
              { color: "rgba(220, 232, 245, 0.28)", duration: 0.16 },
              at,
            )
            .to(
              labels[index],
              { color: "rgba(247, 250, 255, 0.96)", duration: 0.16 },
              at,
            )
            .to(
              focus,
              {
                x: () => sticky.clientWidth * 0.2 * index,
                scale: 1 + index * 0.05,
                duration: 0.52,
                ease: "power3.inOut",
              },
              at - 0.08,
            )
            .to(
              visual,
              {
                xPercent: -3.5 * index,
                yPercent: index % 2 === 0 ? 1.5 : -1.5,
                scale: 1 + index * 0.035,
                rotation: index % 2 === 0 ? -1.2 : 1.2,
                duration: 0.52,
                ease: "power3.inOut",
              },
              at - 0.08,
            )
            .to(
              line,
              {
                scaleX: (index + 1) / AUCTION_PHASES.length,
                duration: 0.5,
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
        gsap.set(labels, { color: "rgba(220, 232, 245, 0.28)" });
        gsap.set(labels[0], { color: "rgba(247, 250, 255, 0.96)" });
        gsap.set(line, { scaleX: 1 / AUCTION_PHASES.length });
      });

      return () => media.revert();
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} className={styles.auction} aria-labelledby="ads-auction-title">
      <div ref={stickyRef} className={styles.auctionSticky}>
        <div className={styles.auctionHeader}>
          <span>Google Ads açık artırması</span>
          <div>
            <strong>04</strong>
            <span>Aşama</span>
          </div>
        </div>

        <div className={styles.auctionCopies}>
          {AUCTION_PHASES.map((phase, index) => (
            <article key={phase.label} data-auction-copy>
              <span>{String(index + 1).padStart(2, "0")} · {phase.label}</span>
              <h2 id={index === 0 ? "ads-auction-title" : undefined}>{phase.title}</h2>
              <p>{phase.text}</p>
            </article>
          ))}
        </div>

        <div className={styles.auctionStage} aria-hidden="true">
          <div data-auction-focus className={styles.auctionFocus} />
          <div data-auction-visual className={styles.auctionVisual}>
            <Image
              src="/google-ads/ads-auction-pipeline.png"
              alt=""
              width={1672}
              height={941}
              loading="eager"
              sizes="(max-width: 800px) 140vw, 92vw"
            />
          </div>
        </div>

        <div className={styles.auctionSteps} aria-hidden="true">
          <div className={styles.auctionTrack}>
            <span data-auction-line />
          </div>
          {AUCTION_PHASES.map((phase) => (
            <span key={phase.label} data-auction-label>{phase.label}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
