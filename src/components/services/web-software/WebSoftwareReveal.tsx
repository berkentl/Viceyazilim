"use client";

import { useRef, useState, type PointerEvent } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";

const lines = [
  {
    prefix: "Fikri",
    image: "/vice-gallery/dijital-guc.png",
    alt: "VICE Yazılım dijital ürün yaklaşımı",
    suffix: "ürüne,",
  },
  {
    prefix: "veriyi",
    image: "/vice-gallery/ui-ux.png",
    alt: "VICE Yazılım arayüz ve veri deneyimi",
    suffix: "karara,",
  },
  {
    prefix: "sistemi",
    image: "/vice-gallery/hizmet-sistemi.png",
    alt: "VICE Yazılım hizmet sistemi",
    suffix: "ölçeğe",
  },
  { fullText: "dönüştürüyoruz." },
] as const;

export function WebSoftwareReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const xToRef = useRef<((value: number) => void) | null>(null);
  const yToRef = useRef<((value: number) => void) | null>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const reduceMotion = useSafeReducedMotion();

  useGSAP(
    () => {
      const section = sectionRef.current;
      const follower = followerRef.current;
      if (!section || !follower) return;

      xToRef.current = gsap.quickTo(follower, "x", {
        duration: 0.45,
        ease: "power3.out",
      });
      yToRef.current = gsap.quickTo(follower, "y", {
        duration: 0.45,
        ease: "power3.out",
      });

      if (reduceMotion) {
        gsap.set("[data-reveal-image]", { width: "clamp(5.5rem, 17vw, 16rem)" });
        return;
      }

      const tweens = gsap.utils
        .toArray<HTMLElement>("[data-reveal-row]")
        .flatMap((row) => {
          const image = row.querySelector<HTMLElement>("[data-reveal-image]");
          if (!image) return [];

          return [
            gsap.to(image, {
              width: "clamp(5.5rem, 17vw, 16rem)",
              ease: "none",
              scrollTrigger: {
                trigger: row,
                start: "top 86%",
                end: "top 42%",
                scrub: 1,
                invalidateOnRefresh: true,
              },
            }),
          ];
        });

      return () => tweens.forEach((tween) => tween.kill());
    },
    { scope: sectionRef, dependencies: [reduceMotion], revertOnUpdate: true },
  );

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    xToRef.current?.(event.clientX);
    yToRef.current?.(event.clientY);
  }

  return (
    <section
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      className="relative overflow-hidden border-y border-white/[0.07] bg-[#edf0f4] px-4 py-28 text-[#0b1018] md:py-44"
      aria-labelledby="software-reveal-title"
    >
      <h2 id="software-reveal-title" className="sr-only">
        VICE Yazılım geliştirme yaklaşımı
      </h2>

      <div
        ref={followerRef}
        aria-hidden="true"
        className={`pointer-events-none fixed left-0 top-0 z-30 hidden h-64 w-96 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl bg-[#dfe4eb] shadow-[0_30px_80px_rgba(8,12,19,0.22)] ring-1 ring-black/10 transition-[opacity,scale] duration-200 ease-out-quart lg:block ${
          activeImage ? "scale-100 opacity-100" : "scale-[0.94] opacity-0"
        }`}
      >
        {activeImage && (
          <Image
            src={activeImage}
            alt=""
            fill
            sizes="384px"
            className="object-cover"
          />
        )}
      </div>

      <div className="mx-auto flex max-w-[94rem] flex-col items-center gap-3 md:gap-5">
        {lines.map((line, index) => {
          if ("fullText" in line) {
            return (
              <div
                key={line.fullText}
                data-reveal-row
                className="flex justify-center text-center"
              >
                <span className="text-[clamp(2.7rem,7.4vw,7.6rem)] font-semibold leading-[0.9] tracking-[-0.07em]">
                  {line.fullText}
                </span>
              </div>
            );
          }

          return (
            <div
              key={`${line.prefix}-${index}`}
              data-reveal-row
              className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center md:flex-nowrap md:gap-6"
            >
              <span className="text-[clamp(2.7rem,7.4vw,7.6rem)] font-semibold leading-[0.9] tracking-[-0.07em]">
                {line.prefix}
              </span>
              <span
                data-reveal-image
                onMouseEnter={() => setActiveImage(line.image)}
                onMouseLeave={() => setActiveImage(null)}
                className="relative h-[clamp(3rem,7vw,6.5rem)] w-0 shrink-0 cursor-default overflow-hidden rounded-xl bg-[#dfe4eb] shadow-inner md:rounded-2xl"
              >
                <Image
                  src={line.image}
                  alt={line.alt}
                  fill
                  sizes="(max-width: 768px) 110px, 256px"
                  className="object-cover opacity-85 transition-opacity duration-200 hover:opacity-100"
                />
              </span>
              <span className="text-[clamp(2.7rem,7.4vw,7.6rem)] font-semibold leading-[0.9] tracking-[-0.07em]">
                {line.suffix}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
