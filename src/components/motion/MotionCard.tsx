"use client";

import { motion } from "framer-motion";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";
import { useFinePointer } from "@/lib/useFinePointer";
import type { ReactNode } from "react";

const GLOW_TINTS = {
  cool: "oklch(0.5 0.08 255 / 60%)",
  warm: "oklch(0.62 0.1 78 / 50%)",
  green: "oklch(0.6 0.09 155 / 45%)",
} as const;

const EASE_OUT_QUART = [0.16, 1, 0.3, 1] as const;

/**
 * Shared card motion: fades/lifts in once on scroll (staggered via `index`),
 * lifts + scales on hover with a spring, and — if `glow` — brightens a
 * corner ambient-glow blob on hover instead of a flat drop-shadow. Purely
 * motion/behavior; visual chrome (background, border, radius) is the
 * consumer's className on the card itself, not hardcoded here.
 */
export function MotionCard({
  children,
  tint = "cool",
  index = 0,
  className = "",
  glow = true,
  reveal = true,
}: {
  children: ReactNode;
  tint?: keyof typeof GLOW_TINTS;
  index?: number;
  className?: string;
  glow?: boolean;
  /** Set false when an outer component (e.g. a GSAP scroll timeline) already
   * owns the entrance animation — avoids two systems writing to the same
   * transform. Hover/glow behavior is unaffected either way. */
  reveal?: boolean;
}) {
  const shouldReduceMotion = useSafeReducedMotion();
  const finePointer = useFinePointer();
  const skipReveal = shouldReduceMotion || !reveal;

  if (shouldReduceMotion || !finePointer) {
    return (
      <div className="group relative h-full">
        {glow ? (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-35"
            style={{
              background: `radial-gradient(closest-side, ${GLOW_TINTS[tint]}, transparent 72%)`,
            }}
          />
        ) : null}
        <div className={`relative h-full ${className}`}>{children}</div>
      </div>
    );
  }

  return (
    <motion.div
      className="group relative h-full"
      initial={skipReveal ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.7,
        delay: skipReveal ? 0 : index * 0.06,
        ease: EASE_OUT_QUART,
      }}
    >
      {glow && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-40 blur-3xl transition-opacity duration-500 group-hover:opacity-90"
          style={{
            background: `radial-gradient(closest-side, ${GLOW_TINTS[tint]}, transparent 72%)`,
          }}
        />
      )}
      <motion.div
        whileHover={shouldReduceMotion ? undefined : { y: -6, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className={`relative h-full ${className}`}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
