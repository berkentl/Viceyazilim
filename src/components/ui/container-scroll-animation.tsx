"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: ReactNode;
  children: ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useSafeReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const rotate = useTransform(scrollYProgress, [0, 0.82], [9, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.82], [0.9, 1]);
  const translate = useTransform(scrollYProgress, [0, 0.82], [34, -48]);

  return (
    <div className="relative flex min-h-[58rem] items-center justify-center px-4 md:min-h-[76rem] md:px-8" ref={containerRef}>
      <div
        className="relative w-full py-20 md:py-36"
        style={{ perspective: "1600px" }}
      >
        <Header translate={translate} reducedMotion={shouldReduceMotion} titleComponent={titleComponent} />
        <Card rotate={rotate} scale={scale} reducedMotion={shouldReduceMotion}>
          {children}
        </Card>
      </div>
    </div>
  );
};

function Header({
  translate,
  titleComponent,
  reducedMotion,
}: {
  translate: MotionValue<number>;
  titleComponent: ReactNode;
  reducedMotion: boolean;
}) {
  return (
    <motion.div
      style={{ translateY: reducedMotion ? 0 : translate }}
      className="mx-auto max-w-5xl text-center"
    >
      {titleComponent}
    </motion.div>
  );
}

function Card({
  rotate,
  scale,
  children,
  reducedMotion,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  children: ReactNode;
  reducedMotion: boolean;
}) {
  return (
    <motion.div
      style={{
        rotateX: reducedMotion ? 0 : rotate,
        scale: reducedMotion ? 1 : scale,
        boxShadow:
          "0 1px 0 rgba(255,255,255,.16) inset, 0 28px 90px rgba(0,0,0,.42), 0 80px 160px rgba(0,0,0,.28)",
      }}
      className="relative mx-auto mt-3 h-[25rem] w-full max-w-6xl rounded-[1.9rem] border border-white/20 bg-[#171a20] p-[7px] md:mt-0 md:h-[40rem] md:rounded-[2.4rem] md:p-[9px]"
    >
      <span className="absolute left-1/2 top-[3px] z-20 h-1.5 w-1.5 -translate-x-1/2 rounded-full border border-white/10 bg-black/80 md:top-1 md:h-2 md:w-2" />
      <div className="h-full w-full overflow-hidden rounded-[1.45rem] border border-black/80 bg-[#07111f] md:rounded-[1.9rem]">
        {children}
      </div>
    </motion.div>
  );
}
