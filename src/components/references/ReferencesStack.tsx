"use client";

import { useRef } from "react";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";
import { gsap, useGSAP } from "@/lib/gsap";
import type { Reference } from "@/lib/references";
import { ReferenceBanner } from "./ReferenceBanner";

/**
 * A restrained desktop card stack. CSS sticky establishes the physical
 * relationship; GSAP only adds a small, scroll-scrubbed depth response to the
 * card being covered. The artwork, logo and copy never fade or reveal.
 *
 * Phones and reduced-motion users get the same cards in normal document flow.
 */
export function ReferencesStack({
  references,
  preloadFirst = false,
}: {
  references: readonly Reference[];
  preloadFirst?: boolean;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useSafeReducedMotion();

  useGSAP(
    () => {
      if (shouldReduceMotion) return;

      const media = gsap.matchMedia();

      media.add("(min-width: 768px)", () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-stack-card]");

        cards.slice(0, -1).forEach((card, index) => {
          const nextCard = cards[index + 1];

          gsap.set(card, {
            transformOrigin: "top center",
            willChange: "transform",
          });

          gsap.to(card, {
            scale: 0.96,
            y: -16,
            ease: "none",
            scrollTrigger: {
              trigger: nextCard,
              start: "top 88%",
              end: () => {
                const stickyTop = Number.parseFloat(getComputedStyle(nextCard).top) || 96;
                return `top ${stickyTop}px`;
              },
              scrub: 0.7,
              invalidateOnRefresh: true,
            },
          });
        });

        return () => {
          gsap.set(cards, {
            clearProps: "transform,transformOrigin,willChange",
          });
        };
      });

      return () => media.revert();
    },
    { scope: rootRef, dependencies: [shouldReduceMotion] },
  );

  return (
    <div ref={rootRef} className="flex flex-col gap-6 md:gap-0">
      {references.map((reference, index) => {
        const hasFollowingCard = index < references.length - 1;
        const stackEnabled = !shouldReduceMotion;

        return (
          <div
            key={reference.slug}
            data-stack-card
            className={`relative ${
              stackEnabled ? "md:sticky md:top-24 lg:top-28" : ""
            } ${stackEnabled && hasFollowingCard ? "md:mb-[18vh]" : ""}`}
            style={{ zIndex: index + 1 }}
          >
            <ReferenceBanner
              reference={reference}
              preload={preloadFirst && index === 0}
            />
          </div>
        );
      })}
    </div>
  );
}
