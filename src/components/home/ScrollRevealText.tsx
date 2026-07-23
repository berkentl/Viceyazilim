"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

export function ScrollRevealText({ text }: { text: string }) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "start 0.2"],
  });

  const words = text.split(" ");

  return (
    <p
      ref={containerRef}
      className="mx-auto max-w-4xl text-center text-[clamp(1.5rem,4vw,2.75rem)] font-medium leading-snug tracking-tight text-fg"
    >
      {words.map((word, index) => (
        <Word
          key={`${word}-${index}`}
          word={word}
          progress={scrollYProgress}
          range={[index / words.length, (index + 1) / words.length]}
          staticOpacity={Boolean(shouldReduceMotion)}
        />
      ))}
    </p>
  );
}

function Word({
  word,
  progress,
  range,
  staticOpacity,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
  staticOpacity: boolean;
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);

  return (
    <motion.span
      style={{ opacity: staticOpacity ? 1 : opacity }}
      className="mr-[0.28em] inline-block"
    >
      {word}
    </motion.span>
  );
}
