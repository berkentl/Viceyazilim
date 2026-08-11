"use client";

import Image from "next/image";
import { useRef, type PointerEvent } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

const MAX_TILT_DEG = 6;

export function DeviceMockup({
  type,
  imageSrc,
  alt,
}: {
  type: "laptop" | "phone";
  imageSrc: string;
  alt: string;
}) {
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

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
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
      className="relative mx-auto w-full"
      style={{ perspective: 1600 }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ type: "spring", bounce: 0, duration: 0.8 }}
        style={{
          rotateX: shouldReduceMotion ? 0 : springRotateX,
          rotateY: shouldReduceMotion ? 0 : springRotateY,
          transformStyle: "preserve-3d",
        }}
      >
        {type === "laptop" ? (
          <LaptopFrame imageSrc={imageSrc} alt={alt} />
        ) : (
          <PhoneFrame imageSrc={imageSrc} alt={alt} />
        )}
      </motion.div>
    </div>
  );
}

function LaptopFrame({ imageSrc, alt }: { imageSrc: string; alt: string }) {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-t-2xl rounded-b-md bg-[#0b0d12] p-2.5 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] ring-1 ring-white/10">
        <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-bg">
          <Image
            src={imageSrc}
            alt={alt}
            fill
            sizes="(min-width: 768px) 720px, 90vw"
            className="object-cover object-top"
            priority
          />
        </div>
      </div>
      <div className="relative mx-auto h-4 w-[104%] -translate-x-[2%] rounded-b-xl bg-gradient-to-b from-[#1a1d24] to-[#0b0d12]">
        <div className="absolute left-1/2 top-0 h-1.5 w-24 -translate-x-1/2 rounded-b-md bg-black/40" />
      </div>
    </div>
  );
}

function PhoneFrame({ imageSrc, alt }: { imageSrc: string; alt: string }) {
  return (
    <div className="mx-auto w-full max-w-[280px]">
      <div className="rounded-[2.5rem] bg-[#0b0d12] p-2.5 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] ring-1 ring-white/10">
        <div className="relative aspect-[9/19.5] overflow-hidden rounded-[2rem] bg-bg">
          <Image
            src={imageSrc}
            alt={alt}
            fill
            sizes="280px"
            className="object-cover object-top"
            priority
          />
          <div className="absolute left-1/2 top-2 h-5 w-24 -translate-x-1/2 rounded-full bg-[#0b0d12]" />
        </div>
      </div>
    </div>
  );
}
