"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";
import { gsap, useGSAP } from "@/lib/gsap";
import type { Project } from "@/lib/supabase/server";

export function PinnedShowcase({ project }: { project: Project | null }) {
  const shouldReduceMotion = useSafeReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const lidRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (shouldReduceMotion || !project) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin: pinRef.current,
        },
      });

      tl.to(lidRef.current, { rotateX: 0, duration: 0.6, ease: "power2.out" }).to(
        screenRef.current,
        { opacity: 1, scale: 1, duration: 0.3 },
        "-=0.2",
      );
    },
    { scope: containerRef, dependencies: [shouldReduceMotion, project] },
  );

  if (!project) return null;

  return (
    <section
      ref={containerRef}
      className={`relative ${shouldReduceMotion ? "" : "h-[250vh]"}`}
    >
      <div
        ref={pinRef}
        className="relative z-10 flex h-screen flex-col items-center justify-center overflow-hidden px-6"
      >
        <div style={{ perspective: 1800 }} className="relative w-full max-w-3xl">
          <div className="relative mx-auto aspect-[16/10] w-full">
            <div
              ref={lidRef}
              className="absolute inset-0 origin-bottom rounded-xl bg-[#0b0d12] p-2.5 shadow-[0_60px_100px_-20px_rgba(0,0,0,0.7)] ring-1 ring-white/10"
              style={{
                transform: shouldReduceMotion ? "rotateX(0deg)" : "rotateX(-95deg)",
                transformStyle: "preserve-3d",
              }}
            >
              <div
                ref={screenRef}
                className="relative h-full w-full overflow-hidden rounded-lg bg-bg"
                style={{
                  opacity: shouldReduceMotion ? 1 : 0,
                  transform: shouldReduceMotion ? "scale(1)" : "scale(0.96)",
                }}
              >
                {project.cover_image_url && (
                  <Image
                    src={project.cover_image_url}
                    alt={project.title}
                    fill
                    sizes="(min-width: 768px) 720px, 90vw"
                    className="object-cover object-top"
                    priority
                  />
                )}
              </div>
            </div>
          </div>
          <div className="relative mx-auto h-5 w-[104%] -translate-x-[2%] rounded-b-2xl bg-gradient-to-b from-[#1a1d24] to-[#0b0d12]" />
        </div>

        <div className="mt-10 flex flex-col items-center gap-2 text-center">
          <p className="text-[14px] text-fg-subtle">
            Gerçek bir proje, gerçek bir sonuç.
          </p>
          <Link
            href={`/referanslar/${project.slug}`}
            className="text-[16px] font-medium text-fg underline decoration-hairline-strong underline-offset-4 transition-colors duration-200 hover:text-fg-muted"
          >
            {project.title} →
          </Link>
        </div>
      </div>
    </section>
  );
}
