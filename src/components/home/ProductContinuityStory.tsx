"use client";

import Link from "next/link";
import { ArrowUpRight, Check, Pulse } from "@phosphor-icons/react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";
import { useFinePointer } from "@/lib/useFinePointer";
import styles from "./ProductContinuityStory.module.css";

const CONTINUITY_TAGS = [
  "Canlı izleme",
  "Sürüm planı",
  "Güvenlik takibi",
  "Deneyim iyileştirme",
] as const;

export function ProductContinuityStory() {
  const shouldReduceMotion = useSafeReducedMotion();
  const finePointer = useFinePointer();
  const useStaticMotion = shouldReduceMotion || !finePointer;

  return (
    <ProductContinuityShell>
      {useStaticMotion ? <StaticContinuityStage /> : <AnimatedContinuityStage />}
    </ProductContinuityShell>
  );
}

function ProductContinuityShell({ children }: { children: ReactNode }) {
  return (
    <section
      aria-labelledby="continuity-title"
      className={`${styles.section} home-defer home-defer-continuity`}
    >
      <div className={styles.intro}>
        <div>
          <p className={styles.eyebrow}>Yayın sonrası ürün sürekliliği</p>
          <h2 id="continuity-title" className={styles.title}>
            Bir lansman değil,
            <br />
            yaşayan bir ürün.
          </h2>
        </div>

        <div className={styles.introCopy}>
          <p>
            Ürünü yayına almak yalnızca başlangıçtır. Performansı, güvenliği ve
            kullanıcı davranışını izler; veriye dayalı küçük sürümlerle değerini
            büyütürüz.
          </p>
          <ul className={styles.tags} aria-label="Ürün sürekliliği kapsamı">
            {CONTINUITY_TAGS.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>
      </div>

      {children}

      <div className={styles.outro}>
        <p className={styles.outroIndex}>01 / Sürekli</p>
        <h3>Yayından sonra da aynı ekiple, aynı ürün aklında.</h3>
        <p>
          Hata takibi, performans ölçümü, güvenlik güncellemeleri ve deneyim
          iyileştirmeleri tek bir sürdürülebilir geliştirme planında buluşur.
        </p>
        <Link href="/iletisim" className={styles.outroLink}>
          Ürün sürekliliğini konuşalım
          <span aria-hidden="true">
            <ArrowUpRight weight="bold" />
          </span>
        </Link>
      </div>
    </section>
  );
}

function StaticContinuityStage() {
  return (
    <div className={`${styles.scrollStory} ${styles.staticStory}`}>
      <div className={`${styles.stickyStage} ${styles.staticStage}`}>
        <div aria-hidden="true" className={styles.videoMask}>
          <div className={styles.videoShade} />
        </div>

        <div className={styles.orbit} aria-hidden="true">
          <span>VICE</span>
          <span>∞</span>
        </div>

        <div className={styles.ticketPosition}>
          <ProductPassport />
        </div>

        <div className={styles.stageFooter}>
          <p>Her sürüm, bir sonrakine veri bırakır.</p>
          <span>VICE Continuity</span>
        </div>
      </div>
    </div>
  );
}

function AnimatedContinuityStage() {
  const storyRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: storyRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 95,
    damping: 28,
    mass: 0.32,
  });

  const videoClipPath = useTransform(
    progress,
    [0, 0.48, 1],
    ["circle(9% at 50% 48%)", "circle(47% at 50% 48%)", "circle(92% at 50% 48%)"],
  );
  const videoScale = useTransform(progress, [0, 1], [0.92, 1]);
  const introOpacity = useTransform(progress, [0.04, 0.31, 0.46], [1, 1, 0]);
  const introY = useTransform(progress, [0.04, 0.46], [0, -32]);
  const ticketOpacity = useTransform(progress, [0.48, 0.68], [0, 1]);
  const ticketY = useTransform(progress, [0.48, 0.76], [52, 0]);
  const ticketRotate = useTransform(progress, [0.48, 0.76], [4, -1.25]);
  const footerOpacity = useTransform(progress, [0.75, 0.92], [0, 1]);

  return (
    <div ref={storyRef} className={styles.scrollStory}>
      <div className={styles.stickyStage}>
        <motion.div
          aria-hidden="true"
          className={styles.videoMask}
          style={{ clipPath: videoClipPath, scale: videoScale }}
        >
          <ContinuityVideo />
          <div className={styles.videoShade} />
        </motion.div>

        <motion.div
          className={styles.stageIntro}
          style={{ opacity: introOpacity, y: introY }}
        >
          <span className={styles.liveDot} />
          <p>Ürün canlı. Sistem öğrenmeye devam ediyor.</p>
        </motion.div>

        <div className={styles.orbit} aria-hidden="true">
          <span>VICE</span>
          <span>∞</span>
        </div>

        <motion.div
          className={styles.ticketPosition}
          style={{ opacity: ticketOpacity, y: ticketY, rotate: ticketRotate }}
        >
          <ProductPassport />
        </motion.div>

        <motion.div
          className={styles.stageFooter}
          style={{ opacity: footerOpacity }}
        >
          <p>Her sürüm, bir sonrakine veri bırakır.</p>
          <span>VICE Continuity</span>
        </motion.div>
      </div>
    </div>
  );
}

function ContinuityVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let isNearViewport = false;
    const syncPlayback = () => {
      if (!isNearViewport || document.hidden) {
        video.pause();
        return;
      }

      if (!video.getAttribute("src")) {
        video.src = "/web-design/Webtasarimajansi_vice.mp4?v=3fc80653";
        video.load();
      }
      void video.play().catch(() => {
        // The gradient background remains visible if autoplay is unavailable.
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isNearViewport = entry.isIntersecting;
        syncPlayback();
      },
      { rootMargin: "240px 0px", threshold: 0.01 },
    );

    observer.observe(video);
    document.addEventListener("visibilitychange", syncPlayback);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
      video.pause();
      video.removeAttribute("src");
      video.load();
    };
  }, []);

  return (
    <video
      ref={videoRef}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      className={styles.video}
    />
  );
}

function ProductPassport() {
  return (
    <Link
      href="/iletisim"
      aria-label="VICE ürün sürekliliği hakkında iletişime geç"
      className={styles.ticket}
    >
      <div className={styles.ticketTexture} aria-hidden="true" />

      <div className={styles.ticketMain}>
        <div className={styles.ticketHeader}>
          <div>
            <p>VICE YAZILIM SUNAR</p>
            <p>ÜRÜN SÜREKLİLİĞİ / 2026</p>
          </div>
          <span className={styles.ticketStatus}>
            <Pulse weight="fill" />
            Aktif
          </span>
        </div>

        <div className={styles.ticketBody}>
          <span className={styles.ticketIcon} aria-hidden="true">
            <Check weight="bold" />
          </span>
          <h3>ÜRÜN PASAPORTU</h3>
          <p>İzleme · bakım · iyileştirme</p>
        </div>

        <div className={styles.ticketMeta}>
          <span>CANLI SİSTEM</span>
          <span>DEVAM EDEN ÜRÜN</span>
        </div>
      </div>

      <div className={styles.ticketStub}>
        <span className={styles.stubMark}>∫</span>
        <span>YAYIN SONRASI</span>
        <span className={styles.stubNumber}>∞</span>
      </div>
    </Link>
  );
}
