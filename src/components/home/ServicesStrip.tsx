import Link from "next/link";
import type { Icon } from "@phosphor-icons/react";
import { Browser } from "@phosphor-icons/react/dist/ssr/Browser";
import { ShoppingCartSimple } from "@phosphor-icons/react/dist/ssr/ShoppingCartSimple";
import { PenNib } from "@phosphor-icons/react/dist/ssr/PenNib";
import { ChartLineUp } from "@phosphor-icons/react/dist/ssr/ChartLineUp";
import { MotionCard } from "@/components/motion/MotionCard";

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
  return (
    <section className="relative border-y border-hairline py-20 md:py-24">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 divide-y divide-hairline px-6 sm:grid-cols-2 sm:divide-x sm:divide-y-0 md:grid-cols-4 md:px-12">
        {ITEMS.map(({ label, description, href, icon: Icon, tint }, index) => (
          <Link
            key={label}
            href={href}
            className="contents"
          >
            <MotionCard
              index={index}
              tint={tint}
              className="flex flex-col items-center gap-4 px-6 py-10 text-center first:pt-0 sm:first:pt-10 md:first:pl-0 md:last:pr-0"
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
          </Link>
        ))}
      </div>
    </section>
  );
}
