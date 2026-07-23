"use client";

import { motion, useReducedMotion } from "framer-motion";
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
}: {
  children: ReactNode;
  tint?: keyof typeof GLOW_TINTS;
  index?: number;
  className?: string;
  glow?: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="group relative h-full"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.7,
        delay: shouldReduceMotion ? 0 : index * 0.06,
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
