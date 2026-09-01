"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";
import { useFinePointer } from "@/lib/useFinePointer";

export function ScrollRevealText({ text }: { text: string }) {
  const shouldReduceMotion = useSafeReducedMotion();
  const finePointer = useFinePointer();

  if (shouldReduceMotion || !finePointer) {
    return (
      <p className="mobile-copy-reveal mx-auto max-w-4xl text-center text-[clamp(1.5rem,4vw,2.75rem)] font-medium leading-snug tracking-tight text-fg">
        {text}
      </p>
    );
  }

  return <AnimatedScrollRevealText text={text} />;
}

function AnimatedScrollRevealText({ text }: { text: string }) {
  const containerRef = useRef<HTMLParagraphElement>(null);
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
        />
      ))}
    </p>
  );
}

function Word({
  word,
  progress,
  range,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);

  return (
    <motion.span
      style={{ opacity }}
      className="mr-[0.28em] inline-block"
    >
      {word}
    </motion.span>
  );
}
