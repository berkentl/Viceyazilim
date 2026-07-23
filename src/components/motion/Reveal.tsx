"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const EASE_OUT_QUART = [0.16, 1, 0.3, 1] as const;

export function Reveal({
  children,
  index = 0,
  className,
}: {
  children: ReactNode;
  index?: number;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.7,
        delay: shouldReduceMotion ? 0 : index * 0.06,
        ease: EASE_OUT_QUART,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
