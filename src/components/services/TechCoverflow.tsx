"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";

export function TechCoverflow({ items }: { items: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const rafRef = useRef<number | null>(null);

  const updateActive = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const containerCenter = container.scrollLeft + container.clientWidth / 2;
    let closestIndex = 0;
    let closestDistance = Infinity;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(cardCenter - containerCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex((prev) => (prev === closestIndex ? prev : closestIndex));
  }, []);

  useEffect(() => {
    updateActive();
  }, [updateActive]);

  function handleScroll() {
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      updateActive();
      rafRef.current = null;
    });
  }

  return (
    <section className="py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <Reveal>
          <h2 className="text-[13px] font-medium tracking-tight text-fg-subtle">
            Kullandığımız Teknolojiler
          </h2>
        </Reveal>
      </div>

      <div
        ref={containerRef}
        onScroll={handleScroll}
        style={{ perspective: 1200 }}
        className="mt-8 flex snap-x snap-mandatory gap-8 overflow-x-auto px-28 pb-6 [scrollbar-width:none] md:px-40 [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, index) => {
          const offset = index - activeIndex;
          const isActive = offset === 0;

          return (
            <motion.div
              key={item}
              ref={(node) => {
                cardRefs.current[index] = node;
              }}
              animate={
                shouldReduceMotion
                  ? { scale: 1, opacity: 1, rotateY: 0 }
                  : {
                      scale: isActive ? 1.15 : 0.88,
                      opacity: isActive ? 1 : 0.5,
                      rotateY: offset === 0 ? 0 : offset < 0 ? 22 : -22,
                    }
              }
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              className="flex w-40 shrink-0 snap-center items-center justify-center rounded-2xl bg-bg-elevated px-8 py-10 ring-1 ring-hairline md:w-48"
            >
              <span className="whitespace-nowrap text-[16px] font-medium tracking-tight text-fg-muted">
                {item}
              </span>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
