"use client";

import {
  useEffect,
  useLayoutEffect,
  useState,
  type PropsWithChildren,
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import { BrandGlyph } from "./BrandGlyph";
import { IntegralMark } from "./IntegralMark";
import { NotifyForm } from "./NotifyForm";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const MOBILE_QUERY = "(max-width: 767px)";
const HOLD_MS = 900;
const CONTENT_DELAY_MS = 150;

export function HomeExperience() {
  const shouldReduceMotion = useReducedMotion();
  const [runIntro, setRunIntro] = useState(false);
  const [docked, setDocked] = useState(true);
  const [contentVisible, setContentVisible] = useState(true);

  useIsomorphicLayoutEffect(() => {
    const isMobile = window.matchMedia(MOBILE_QUERY).matches;
    if (!isMobile || shouldReduceMotion) return;

    setDocked(false);
    setContentVisible(false);
    setRunIntro(true);
  }, [shouldReduceMotion]);

  useEffect(() => {
    if (!runIntro) return;
    const dockTimer = setTimeout(() => setDocked(true), HOLD_MS);
    const contentTimer = setTimeout(
      () => setContentVisible(true),
      HOLD_MS + CONTENT_DELAY_MS,
    );
    return () => {
      clearTimeout(dockTimer);
      clearTimeout(contentTimer);
    };
  }, [runIntro]);

  return (
    <main className="relative flex min-h-dvh flex-1 flex-col overflow-hidden">
      <header className="relative z-20 flex items-center px-6 py-6 md:px-12 md:py-8">
        <div className="flex items-center gap-3.5">
          <span className="hidden md:inline-flex">
            <BrandGlyph className="h-14 w-11" />
          </span>
          <span className="relative inline-block h-12 w-9 md:hidden">
            {docked && (
              <BrandGlyph
                layoutId={runIntro ? "brand-mark" : undefined}
                className="h-12 w-9"
                rotateDelay={runIntro ? 2 : 1}
              />
            )}
          </span>
          <span className="text-[22px] font-semibold tracking-tight text-fg md:text-[26px]">
            VICE
          </span>
        </div>
      </header>

      {runIntro && !docked && (
        <div className="pointer-events-none fixed inset-0 z-30 flex items-center justify-center md:hidden">
          <BrandGlyph layoutId="brand-mark" entrance className="h-56 w-44" />
        </div>
      )}

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center gap-14 px-6 pb-16 md:flex-row md:justify-between md:gap-12 md:px-12 md:pb-0">
        <RevealSection visible={contentVisible}>
          <h1 className="text-[clamp(2.75rem,7vw,5.5rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-fg">
            Sessizce inşa ediyoruz.
          </h1>
          <p className="mt-6 max-w-md text-[17px] leading-relaxed text-fg-muted">
            Viceyazilim.com yakında yayında. Marka, ürün ve yazılımı tek bir
            deneyimde buluşturan yeni sitemiz üzerinde çalışıyoruz.
          </p>
          <div className="mt-10">
            <NotifyForm />
          </div>
        </RevealSection>

        <section
          aria-hidden="true"
          className="hidden w-full flex-1 md:flex md:items-center md:justify-end"
        >
          <IntegralMark />
        </section>
      </div>

      <footer className="relative z-10 px-6 pb-8 text-center md:px-12">
        <p className="text-[13px] text-fg-subtle">
          © {new Date().getFullYear()} Vice Yazılım. Tüm hakları saklıdır.
        </p>
      </footer>
    </main>
  );
}

function RevealSection({
  visible,
  children,
}: PropsWithChildren<{ visible: boolean }>) {
  return (
    <motion.section
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 16 }}
      transition={
        visible
          ? { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
          : { duration: 0 }
      }
      className="flex max-w-xl flex-col items-center text-center md:items-start md:text-left"
    >
      {children}
    </motion.section>
  );
}
