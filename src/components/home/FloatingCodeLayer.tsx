"use client";

import { useRef } from "react";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";
import { gsap, useGSAP } from "@/lib/gsap";

const FRAGMENTS = [
  { text: "<Navbar />", top: "10%", left: "4%", speed: 55 },
  { text: "oklch(0.2 0.045 255)", top: "16%", left: "76%", speed: -40 },
  { text: "cart.total()", top: "58%", left: "8%", speed: 75 },
  { text: "ScrollTrigger.create()", top: "72%", left: "70%", speed: -55 },
  { text: "∫ vice.build()", top: "38%", left: "46%", speed: 45 },
  { text: "figma.sync()", top: "85%", left: "28%", speed: -30 },
  { text: "meta.description", top: "6%", left: "54%", speed: 40 },
  { text: "git push origin main", top: "62%", left: "86%", speed: -50 },
];

/**
 * Decorative code fragments behind ServicesStrip, each drifting at its own
 * scroll-scrubbed speed (GSAP parallax) — moves only while the user is
 * actually scrolling past this section, never a perpetual ambient loop.
 */
export function FloatingCodeLayer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useSafeReducedMotion();

  useGSAP(
    () => {
      if (shouldReduceMotion || !containerRef.current) return;

      const fragments =
        containerRef.current.querySelectorAll<HTMLElement>("[data-fragment]");

      fragments.forEach((el) => {
        const speed = Number(el.dataset.speed ?? 0);
        gsap.to(el, {
          y: speed,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });
    },
    { scope: containerRef, dependencies: [shouldReduceMotion] },
  );

  if (shouldReduceMotion) return null;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {FRAGMENTS.map((fragment) => (
        <span
          key={fragment.text}
          data-fragment
          data-speed={fragment.speed}
          className="absolute whitespace-nowrap font-mono text-[13px] text-fg-subtle/25"
          style={{ top: fragment.top, left: fragment.left }}
        >
          {fragment.text}
        </span>
      ))}
    </div>
  );
}
