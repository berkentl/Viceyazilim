"use client";

import Image from "next/image";
import {
  CaretLeft,
  ChartBar,
  ChatCircle,
  DotsThree,
  FilmReel,
  Heart,
  Play,
  SquaresFour,
  UserSquare,
} from "@phosphor-icons/react";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import styles from "./SocialMediaExperience.module.css";

/** Our own Instagram posts, already served from the site's gallery. */
const FEED_POSTS = [
  "/vice-gallery/dijital-guc.png",
  "/vice-gallery/mobil-deneyim.png",
  "/vice-gallery/marka-guveni.png",
  "/vice-gallery/ekip.png",
  "/vice-gallery/hizmet-sistemi.png",
  "/vice-gallery/ui-ux.png",
] as const;

/**
 * The phone shows Vice Yazılım's own Instagram profile, drawn in code with our
 * real posts in the grid (no follower counts, nothing that goes stale). While
 * scrolling, the intro steps aside, the feed inside the phone scrolls, and the
 * four things we produce — post, story, reels, report — open out of the phone.
 *
 * Every card is decorative; the words that matter are the H1 and the resolve
 * line, both rendered as live text in the server HTML.
 */
export function SocialMediaHero() {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const stage = stageRef.current;
      if (!stage) return;

      const intro = stage.querySelector<HTMLElement>("[data-sm-intro]");
      const resolve = stage.querySelector<HTMLElement>("[data-sm-resolve]");
      const rig = stage.querySelector<HTMLElement>("[data-sm-rig]");
      const feed = stage.querySelector<HTMLElement>("[data-sm-feed]");
      const halo = stage.querySelector<HTMLElement>("[data-sm-halo]");
      const progress = stage.querySelector<HTMLElement>("[data-sm-progress]");
      const scrollCue = stage.querySelector<HTMLElement>("[data-sm-scroll-cue]");
      const cards = gsap.utils.toArray<HTMLElement>("[data-sm-card]", stage);
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(resolve, { autoAlpha: 0, y: 42 });
        gsap.set(progress, { scaleX: 0, transformOrigin: "left center" });
        // Each card starts tucked behind the phone, offset towards its centre.
        gsap.set(cards, {
          autoAlpha: 0,
          scale: 0.5,
          xPercent: (_index, card: HTMLElement) => Number(card.dataset.fromX ?? 0),
          yPercent: (_index, card: HTMLElement) => Number(card.dataset.fromY ?? 0),
          rotation: 0,
        });

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
            { autoAlpha: 0, y: -42, scale: 0.975, duration: 0.24, ease: "power3.inOut" },
            0.2,
          )
          .to(rig, { scale: 1.06, rotation: -3, duration: 0.6, ease: "power3.inOut" }, 0.12)
          .to(feed, { yPercent: -8, duration: 0.7, ease: "none" }, 0.1)
          .to(halo, { scale: 1.25, opacity: 0.95, duration: 0.7, ease: "power3.inOut" }, 0.12)
          .to(
            cards,
            {
              autoAlpha: 1,
              scale: 1,
              xPercent: 0,
              yPercent: 0,
              rotation: (_index, card: HTMLElement) => Number(card.dataset.rotate ?? 0),
              duration: 0.34,
              stagger: 0.06,
              ease: "power3.out",
            },
            0.3,
          )
          .to(resolve, { autoAlpha: 1, y: 0, duration: 0.24, ease: "power3.out" }, 0.66)
          .to({}, { duration: 0.14 });

        return () => {
          timeline.scrollTrigger?.kill();
          timeline.kill();
        };
      });

      // Reduced motion is handled entirely in CSS: one static frame with the
      // cards and the resolve line laid out so nothing is hidden or overlaps.
      media.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([intro, rig, feed, halo, resolve, ...cards], { clearProps: "all" });
      });

      return () => media.revert();
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} className={styles.hero} aria-labelledby="social-hero-title">
      <div ref={stageRef} className={styles.heroStage}>
        <div className={styles.heroGrid} aria-hidden="true" />
        <div data-sm-halo className={styles.heroHalo} aria-hidden="true" />

        <div data-sm-intro className={styles.heroIntro}>
          <p>VICE Sosyal Medya</p>
          <h1 id="social-hero-title">Markanız her gün görünür olsun.</h1>
          <span>
            İçerik tasarımı, reels ve Meta reklamlarını tek elden, tutarlı bir marka diliyle
            yönetiyoruz.
          </span>
        </div>

        <div data-sm-rig className={styles.rig} aria-hidden="true">
          <div className={styles.phone}>
            <span className={styles.phoneIsland} />
            <div className={styles.phoneStatus}>
              <span>9:41</span>
              <i />
            </div>
            <div className={styles.phoneScreen}>
              <div data-sm-feed className={styles.phoneFeed}>
                <div className={styles.igTop}>
                  <CaretLeft size={12} weight="bold" />
                  <b>viceyazilim</b>
                  <DotsThree size={14} weight="bold" />
                </div>
                <div className={styles.igProfile}>
                  <span className={styles.igAvatar}>
                    <Image
                      src="/brand/mark-white.png"
                      alt=""
                      width={2048}
                      height={2048}
                      sizes="3rem"
                    />
                  </span>
                  <div>
                    <b>Vice Yazılım</b>
                    <span>Kurumsal Web Tasarım Ajansı</span>
                    <span className={styles.igLink}>viceyazilim.com</span>
                  </div>
                </div>
                <div className={styles.igButtons}>
                  <span>Takip et</span>
                  <span>Mesaj</span>
                </div>
                <div className={styles.igTabs}>
                  <SquaresFour size={13} weight="fill" />
                  <FilmReel size={13} />
                  <UserSquare size={13} />
                </div>
                <div className={styles.igGrid}>
                  {/* Two passes of the six posts fill the screen with room to scroll. */}
                  {[...FEED_POSTS, ...FEED_POSTS].map((src, index) => (
                    <Image
                      key={`${src}-${index}`}
                      src={src}
                      alt=""
                      width={1080}
                      height={1350}
                      loading="eager"
                      sizes="(max-width: 800px) 16vw, 7rem"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div
            data-sm-card
            data-from-x="70"
            data-from-y="55"
            data-rotate="-6"
            className={`${styles.orbitCard} ${styles.cardPost}`}
          >
            <div className={styles.cardHead}>
              <i />
              <b />
            </div>
            <div className={styles.cardMedia} />
            <div className={styles.cardActions}>
              <Heart size={14} weight="fill" />
              <ChatCircle size={14} weight="bold" />
            </div>
            <em>Post</em>
          </div>

          <div
            data-sm-card
            data-from-x="-80"
            data-from-y="40"
            data-rotate="5"
            className={`${styles.orbitCard} ${styles.cardStory}`}
          >
            <div className={styles.storyBars}>
              <i />
              <i />
              <i />
            </div>
            <em>Story</em>
          </div>

          <div
            data-sm-card
            data-from-x="80"
            data-from-y="-50"
            data-rotate="4"
            className={`${styles.orbitCard} ${styles.cardReels}`}
          >
            <span className={styles.reelsPlay}>
              <Play size={18} weight="fill" />
            </span>
            <em>Reels</em>
          </div>

          <div
            data-sm-card
            data-from-x="-70"
            data-from-y="-60"
            data-rotate="-4"
            className={`${styles.orbitCard} ${styles.cardReport}`}
          >
            <div className={styles.reportHead}>
              <ChartBar size={14} weight="bold" />
              <em>Aylık rapor</em>
            </div>
            <div className={styles.reportBars}>
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
          </div>
        </div>

        <div data-sm-resolve className={styles.heroResolve}>
          <span>Paylaşım değil.</span>
          <strong>Tutarlı bir marka dili kuruyoruz.</strong>
        </div>

        <div data-sm-scroll-cue className={styles.scrollCue} aria-hidden="true">
          <span />
          Kaydır
        </div>

        <div className={styles.heroProgress} aria-hidden="true">
          <span data-sm-progress />
        </div>
      </div>
    </section>
  );
}
