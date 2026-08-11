"use client";

import Link from "next/link";
import { useRef } from "react";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";
import type { Icon } from "@phosphor-icons/react";
import { Browser } from "@phosphor-icons/react/dist/ssr/Browser";
import { ShoppingCartSimple } from "@phosphor-icons/react/dist/ssr/ShoppingCartSimple";
import { PenNib } from "@phosphor-icons/react/dist/ssr/PenNib";
import { ChartLineUp } from "@phosphor-icons/react/dist/ssr/ChartLineUp";
import { MotionCard } from "@/components/motion/MotionCard";
import { FloatingCodeLayer } from "@/components/home/FloatingCodeLayer";
import { gsap, useGSAP } from "@/lib/gsap";

const ITEMS: {
  label: string;
  description: string;
  href: string;
  icon: Icon;
  tint: "cool" | "warm" | "green";
}[] = [
  {
    label: "Web Tasarım",
    description: "Marka kimliğinizi yansıtan, özel tasarlanmış arayüzler",
    href: "/hizmetler/web-tasarim",
    icon: Browser,
    tint: "cool",
  },
  {
    label: "E-Ticaret",
    description: "Satışa odaklı, ölçeklenebilir e-ticaret altyapıları",
    href: "/hizmetler/e-ticaret",
    icon: ShoppingCartSimple,
    tint: "warm",
  },
  {
    label: "UI & UX",
    description: "Kullanıcıyı merkeze alan, sade ve etkileyici deneyimler",
    href: "/hizmetler/ui-ux",
    icon: PenNib,
    tint: "green",
  },
  {
    label: "SEO & Dijital Pazarlama",
    description: "Doğru kitleye ulaşan, ölçülebilir büyüme stratejileri",
    href: "/hizmetler/seo",
    icon: ChartLineUp,
    tint: "cool",
  },
];

export function ServicesStrip() {
  const gridRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useSafeReducedMotion();

  useGSAP(
    () => {
      if (shouldReduceMotion || !gridRef.current) return;

      const cards =
        gridRef.current.querySelectorAll<HTMLElement>("[data-service-card]");

      gsap.set(cards, { transformPerspective: 900 });

      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { rotateY: 90, opacity: 0 },
          {
            rotateY: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power2.out",
            delay: index * 0.08,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      });
    },
    { scope: gridRef, dependencies: [shouldReduceMotion] },
  );

  return (
    <section className="relative border-y border-hairline py-20 md:py-24">
      <FloatingCodeLayer />

      <div
        ref={gridRef}
        className="relative mx-auto grid w-full max-w-6xl grid-cols-1 divide-y divide-hairline px-6 sm:grid-cols-2 sm:divide-x sm:divide-y-0 md:grid-cols-4 md:px-12"
      >
        {ITEMS.map(({ label, description, href, icon: Icon, tint }, index) => {
          const isFirst = index === 0;
          const isLast = index === ITEMS.length - 1;

          return (
            <Link key={label} href={href} className="contents">
              <div data-service-card className="h-full">
                <MotionCard
                  index={index}
                  tint={tint}
                  reveal={false}
                  className={`flex flex-col items-center gap-4 px-6 py-10 text-center ${
                    isFirst ? "pt-0 sm:pt-10 md:pl-0" : ""
                  } ${isLast ? "md:pr-0" : ""}`}
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-bg-elevated ring-1 ring-hairline transition-all duration-300 ease-out group-hover:ring-hairline-strong group-hover:scale-[1.12] group-hover:-translate-y-0.5 group-hover:rotate-3">
                    <Icon size={20} weight="thin" />
                  </span>
                  <span className="text-[16px] font-medium tracking-tight text-fg">
                    {label}
                  </span>
                  <span className="max-w-[22ch] text-[13px] leading-relaxed text-fg-subtle">
                    {description}
                  </span>
                </MotionCard>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
