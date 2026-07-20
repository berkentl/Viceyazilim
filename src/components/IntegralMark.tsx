"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { MetalFill } from "./MetalFill";
import { ROTATE_KEYFRAMES, rotateTransition } from "@/lib/brandMotion";

const MARK_SRC = "/brand/mark-white.png";
const MAX_TILT_DEG = 9;

export function IntegralMark() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

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
    if (shouldReduceMotion || !containerRef.current) return;
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
        initial={{ opacity: 0, scale: 0.92, filter: "blur(12px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ type: "spring", bounce: 0, duration: 0.9, delay: 0.2 }}
        style={{
          rotateX: shouldReduceMotion ? 0 : springRotateX,
          rotateY: shouldReduceMotion ? 0 : springRotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative h-full w-full"
      >
        <motion.div
          className="relative h-full w-full"
          animate={shouldReduceMotion ? undefined : { rotate: ROTATE_KEYFRAMES }}
          transition={shouldReduceMotion ? undefined : rotateTransition(1.4)}
        >
          <MetalFill maskSrc={MARK_SRC} />
        </motion.div>
      </motion.div>
    </div>
  );
}
