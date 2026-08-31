"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";
import { useFinePointer } from "@/lib/useFinePointer";
import { MetalFill } from "./MetalFill";
import { ROTATE_KEYFRAMES, rotateTransition } from "@/lib/brandMotion";

const MARK_SRC = "/brand/mark-white.png";
const MAX_TILT_DEG = 9;

export function IntegralMark() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useSafeReducedMotion();
  const finePointer = useFinePointer();
  const enableMotion = finePointer && !shouldReduceMotion;

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, {
    stiffness: 300,
    damping: 30,
    mass: 0.6,
  });
  const springRotateY = useSpring(rotateY, {
    stiffness: 300,
    damping: 30,
    mass: 0.6,
  });

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!enableMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const relativeX = (event.clientX - rect.left) / rect.width - 0.5;
    const relativeY = (event.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(relativeX * MAX_TILT_DEG * 2);
    rotateX.set(relativeY * -MAX_TILT_DEG * 2);
  }

  function handlePointerLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative mx-auto aspect-[3/4] w-full max-w-[260px] md:max-w-[360px]"
      style={{ perspective: 1400 }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-[-25%] rounded-full opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, oklch(0.4 0.06 255 / 55%), transparent 72%)",
        }}
      />

      <motion.div
        initial={enableMotion ? { opacity: 0, scale: 0.92, filter: "blur(12px)" } : false}
        animate={enableMotion ? { opacity: 1, scale: 1, filter: "blur(0px)" } : undefined}
        transition={{ type: "spring", bounce: 0, duration: 0.9, delay: 0.2 }}
        style={{
          rotateX: enableMotion ? springRotateX : 0,
          rotateY: enableMotion ? springRotateY : 0,
          transformStyle: "preserve-3d",
        }}
        className="relative h-full w-full"
      >
        <motion.div
          className="relative h-full w-full"
          animate={enableMotion ? { rotate: ROTATE_KEYFRAMES } : undefined}
          transition={enableMotion ? rotateTransition(1.4) : undefined}
        >
          <MetalFill maskSrc={MARK_SRC} />
        </motion.div>
      </motion.div>
    </div>
  );
}
