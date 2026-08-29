"use client";

import {
  Article,
  BracketsCurly,
  ChartLineUp,
  LinkSimple,
} from "@phosphor-icons/react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./SeoExperience.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const DISCIPLINES = [
  {
    name: "Teknik sağlık",
    title: "Arama motoru önce sistemi anlayabilmeli.",
    text: "Tarama bütçesi, indeks, yönlendirmeler, site mimarisi, Core Web Vitals ve schema katmanını tek teknik denetimde ele alırız.",
    icon: BracketsCurly,
  },
  {
    name: "İçerik mimarisi",
    title: "Her sayfanın net bir arama görevi vardır.",
    text: "Konu kümelerini, kullanıcı niyetini ve iç bağlantıları planlar; tekrar eden sayfaları ayırır, içerik boşluklarını görünür kılarız.",
    icon: Article,
  },
  {
    name: "Otorite",
    title: "Güven, bağlantı sayısından daha değerlidir.",
    text: "Backlink profilini kalite, bağlam ve risk açısından inceler; marka otoritesini nitelikli yayınlar ve dijital PR sinyalleriyle güçlendiririz.",
    icon: LinkSimple,
  },
  {
    name: "Ölçüm",
    title: "SEO, yayına alındığında bitmez.",
    text: "Search Console, analitik ve teknik izleme verisini ortak bir raporda buluşturur; hangi kararın neyi değiştirdiğini düzenli olarak gösteririz.",
    icon: ChartLineUp,
  },
] as const;

export function SeoSignalSystem() {
  const rootRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const sticky = stickyRef.current;
      if (!sticky) return;

      const copies = gsap.utils.toArray<HTMLElement>("[data-signal-copy]", sticky);
      const nodes = gsap.utils.toArray<HTMLElement>("[data-signal-node]", sticky);
      const marker = sticky.querySelector<HTMLElement>("[data-signal-marker]");
      const halo = sticky.querySelector<HTMLElement>("[data-signal-halo]");
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(copies, { autoAlpha: 0, y: 28 });
        gsap.set(copies[0], { autoAlpha: 1, y: 0 });
        gsap.set(nodes, { color: "rgba(217, 230, 242, 0.3)" });
        gsap.set(nodes[0], { color: "#f4f9fd" });
        gsap.set(marker, { rotation: 0, transformOrigin: "center center" });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.45,
            invalidateOnRefresh: true,
          },
        });

        DISCIPLINES.slice(1).forEach((_, disciplineIndex) => {
          const index = disciplineIndex + 1;
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
              at - 0.2,
            )
            .to(
              marker,
              {
                rotation: index * 90,
                duration: 0.62,
                ease: "power3.inOut",
              },
              at - 0.12,
            )
            .to(
              halo,
              {
                rotation: index % 2 === 0 ? -18 : 18,
                scale: index % 2 === 0 ? 0.94 : 1.05,
                duration: 0.62,
                ease: "power3.inOut",
              },
              at - 0.12,
            )
            .to(
              nodes[index - 1],
              {
                color: "rgba(217, 230, 242, 0.3)",
                duration: 0.18,
              },
              at,
            )
            .to(
              nodes[index],
              { color: "#f4f9fd", duration: 0.18 },
              at,
            )
            .to(
              copies[index],
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.22,
                ease: "power3.out",
              },
              at + 0.08,
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
        gsap.set(nodes, { color: "rgba(217, 230, 242, 0.3)" });
        gsap.set(nodes[0], { color: "#f4f9fd" });
        gsap.set(marker, { rotation: 0 });
        gsap.set(halo, { transform: "none" });
      });

      return () => media.revert();
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} className={styles.signalSystem} aria-labelledby="seo-system-title">
      <div ref={stickyRef} className={styles.signalSticky}>
        <div className={styles.signalHeading}>
          <h2 id="seo-system-title">SEO tek bir disiplin değildir.</h2>
          <p>Dört sinyal aynı merkezde birleştiğinde organik büyüme tekrar edilebilir hâle gelir.</p>
        </div>

        <div className={styles.signalStage}>
          <div className={styles.signalSeal} aria-hidden="true">
            <div data-signal-halo className={styles.signalHalo} />
            <div className={styles.signalCore}>
              <span>VICE</span>
              <strong>SEO</strong>
              <i>Ölç / İyileştir</i>
            </div>
            <div data-signal-marker className={styles.signalMarker}>
              <i />
            </div>

            <div className={styles.signalNodes}>
              {DISCIPLINES.map(({ name, icon: Icon }) => (
                <div key={name} data-signal-node>
                  <Icon size={23} weight="light" />
                  <span>{name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.signalCopies}>
            {DISCIPLINES.map((discipline) => (
              <article key={discipline.name} data-signal-copy>
                <span>{discipline.name}</span>
                <h3>{discipline.title}</h3>
                <p>{discipline.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
