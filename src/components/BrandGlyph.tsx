"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MetalFill } from "./MetalFill";
import { ROTATE_KEYFRAMES, rotateTransition } from "@/lib/brandMotion";

const MARK_SRC = "/brand/mark-white.png";

export function BrandGlyph({
  layoutId,
  className = "h-9 w-7",
  entrance = false,
  rotateDelay = false,
}: {
  layoutId?: string;
  className?: string;
  entrance?: boolean;
  /** Seconds to wait (after this instance mounts) before the periodic 180°
   * turn starts. `false` disables the rotation entirely. Keep this generous
   * for instances that just landed via a layoutId dock transition — starting
   * the rotation before that FLIP has settled is what caused the visual glitch. */
  rotateDelay?: number | false;
}) {
  const shouldReduceMotion = useReducedMotion();
  const rotate = rotateDelay !== false && !shouldReduceMotion;

  return (
    <motion.div
      layoutId={layoutId}
      initial={entrance ? { opacity: 0, scale: 0.85, filter: "blur(10px)" } : false}
      animate={entrance ? { opacity: 1, scale: 1, filter: "blur(0px)" } : undefined}
      transition={{
        opacity: { duration: 0.6 },
        filter: { duration: 0.6 },
        scale: { type: "spring", bounce: 0, duration: 0.6 },
        layout: { type: "spring", bounce: 0.15, duration: 0.7 },
      }}
      className={`relative ${className}`}
    >
      <motion.div
        className="relative h-full w-full"
        animate={rotate ? { rotate: ROTATE_KEYFRAMES } : undefined}
        transition={
          rotate ? rotateTransition(rotateDelay as number) : undefined
        }
      >
        <MetalFill maskSrc={MARK_SRC} />
      </motion.div>
    </motion.div>
  );
}
