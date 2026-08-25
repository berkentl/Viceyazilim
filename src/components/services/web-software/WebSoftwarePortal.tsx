"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowDownRight, ArrowRight } from "@phosphor-icons/react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";

const MASK_SRC = "/brand/mark-white.png";

export function WebSoftwarePortal() {
  const portalRef = useRef<HTMLElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useSafeReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (reduceMotion) {
      video.pause();
      video.currentTime = 0;
      return;
    }

    void video.play().catch(() => undefined);
  }, [reduceMotion]);

  useGSAP(
    () => {
      const portal = portalRef.current;
      const mask = maskRef.current;
      const video = videoRef.current;
      if (!portal || !mask || !video || reduceMotion) return;

      const initialSize = () => {
        if (window.innerWidth < 640) return 210;
        if (window.innerWidth < 1024) return 300;
        return 390;
      };

      const setMaskSize = (size: number) => {
        const value = `${size}px`;
        mask.style.maskSize = value;
        mask.style.webkitMaskSize = value;
      };

      setMaskSize(initialSize());

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: portal,
          start: "top top",
          end: "+=220%",
          pin: true,
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress;
            setMaskSize(initialSize() + Math.pow(progress, 2.25) * 4400);
          },
        },
      });

      timeline.to(video, { scale: 1.16, ease: "none" }, 0);

      return () => timeline.kill();
    },
    { scope: portalRef, dependencies: [reduceMotion], revertOnUpdate: true },
  );

  return (
    <>
      <section className="relative flex min-h-[100dvh] items-center overflow-hidden px-5 pb-16 pt-28 md:px-10 md:pb-20 md:pt-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_32%,rgba(75,111,186,0.2),transparent_32%),radial-gradient(circle_at_28%_74%,rgba(69,44,122,0.22),transparent_36%)]"
        />
        <div className="relative mx-auto grid w-full max-w-7xl items-end gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="max-w-4xl">
            <p className="text-sm font-medium tracking-[-0.01em] text-white/45">
              Web yazılım
            </p>
            <h1 className="mt-5 max-w-[12ch] text-[clamp(3.5rem,8vw,7.5rem)] font-semibold leading-[0.88] tracking-[-0.068em]">
              Fikirden çalışan ürüne.
            </h1>
          </div>

          <div className="max-w-lg pb-2 lg:justify-self-end">
            <p className="text-lg leading-8 text-white/55">
              İşinize göre tasarlanan güvenli ve ölçeklenebilir web uygulamaları geliştiriyoruz.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/iletisim"
                className="group inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#0a0e15] transition-transform duration-150 ease-out-quart active:scale-[0.98]"
              >
                <span>Projeni Konuşalım</span>
                <ArrowDownRight
                  aria-hidden="true"
                  size={17}
                  weight="bold"
                  className="transition-transform duration-200 ease-out-quart group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                />
              </Link>
              <Link
                href="#yazilim-kapsami"
                className="group inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-medium text-white/58 ring-1 ring-inset ring-white/12 transition-colors duration-200 hover:text-white"
              >
                <span>Neler geliştiriyoruz</span>
                <ArrowRight aria-hidden="true" size={16} weight="regular" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={portalRef}
        aria-label="VICE web yazılım deneyimi"
        className="relative h-[100dvh] min-h-[38rem] overflow-hidden bg-[#f1f3f6]"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0 grid place-items-center overflow-hidden"
        >
          <span className="text-[clamp(7rem,23vw,22rem)] font-semibold tracking-[-0.09em] text-[#0b1018]/[0.035]">
            VICE
          </span>
        </div>

        <div
          ref={maskRef}
          className="absolute inset-0 z-10 overflow-hidden bg-[#080c13]"
          style={{
            WebkitMaskImage: `url(${MASK_SRC})`,
            maskImage: `url(${MASK_SRC})`,
            WebkitMaskPosition: "50% 50%",
            maskPosition: "50% 50%",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskSize: reduceMotion ? "min(70vw, 34rem)" : "390px",
            maskSize: reduceMotion ? "min(70vw, 34rem)" : "390px",
          }}
        >
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            autoPlay={!reduceMotion}
            preload="metadata"
            poster="/vice-gallery/instagram-video-poster.png"
            aria-label="VICE Yazılım üretim süreci videosu"
            className="h-full w-full scale-100 object-cover will-change-transform"
          >
            <source src="/web-design/vice-claude.m4v" type="video/mp4" />
          </video>
        </div>

        <div className="pointer-events-none absolute inset-x-5 bottom-5 z-20 flex items-center justify-between text-[11px] font-medium text-[#0b1018]/40 md:inset-x-10 md:bottom-8">
          <span>Özel yazılım</span>
          <span>Güvenli altyapı</span>
        </div>
      </section>

      <section className="relative flex min-h-[85dvh] items-center px-5 py-28 md:px-10 md:py-36">
        <div className="mx-auto w-full max-w-7xl">
          <h2 className="max-w-[13ch] text-[clamp(3rem,7vw,7rem)] font-semibold leading-[0.92] tracking-[-0.065em]">
            Kod sadece çalışmaz.
            <span className="block text-white/40">İşinizi taşır.</span>
          </h2>
          <p className="mt-8 max-w-xl text-base leading-7 text-white/52 md:text-xl md:leading-8">
            Ürünü, veriyi ve operasyonu tek bir sürdürülebilir sistem içinde birleştiriyoruz.
          </p>
        </div>
      </section>
    </>
  );
}
