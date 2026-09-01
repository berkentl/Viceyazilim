"use client";

import { motion } from "framer-motion";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";
import { useFinePointer } from "@/lib/useFinePointer";

const METAL_GRADIENT =
  "linear-gradient(135deg, #ffffff 0%, #f2f3f5 32%, #dfe1e5 58%, #c3c6cc 78%, #a3a6ad 100%)";

const MASK_STYLE = {
  WebkitMaskSize: "contain",
  maskSize: "contain",
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  WebkitMaskPosition: "center",
  maskPosition: "center",
} as const;

/**
 * Renders `maskSrc`'s silhouette as a brushed-metal emblem: a dim, flat base
 * coat that a brighter, embossed layer reveals on top of once, on mount —
 * the logo "catching light" moment referenced from pentayazilim.com's
 * preloader. The reveal never repeats; the periodic flair afterwards is the
 * parent's 180° rotation loop.
 */
export function MetalFill({ maskSrc }: { maskSrc: string }) {
  const shouldReduceMotion = useSafeReducedMotion();
  const finePointer = useFinePointer();
  const enableMotion = finePointer && !shouldReduceMotion;

  const maskImage = {
    WebkitMaskImage: `url(${maskSrc})`,
    maskImage: `url(${maskSrc})`,
  };

  return (
    <>
      <div
        aria-hidden="true"
        className="brand-metal-base absolute inset-0"
        style={{
          ...MASK_STYLE,
          ...maskImage,
          backgroundImage: METAL_GRADIENT,
          filter: "brightness(0.32) saturate(0.9)",
        }}
      />
      <motion.div
        aria-hidden="true"
        className="brand-metal-highlight absolute inset-0"
        style={{
          ...MASK_STYLE,
          ...maskImage,
          backgroundImage: METAL_GRADIENT,
          filter:
            "brightness(1.1) contrast(1.05) drop-shadow(-1px -1px 1px rgba(255,255,255,0.7)) drop-shadow(1.5px 2px 3px rgba(0,0,0,0.35))",
        }}
        initial={enableMotion ? { opacity: 0 } : false}
        animate={enableMotion ? { opacity: 1 } : undefined}
        transition={
          enableMotion
            ? { duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.1 }
            : undefined
        }
      />
    </>
  );
}
