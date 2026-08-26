"use client";

import type { ComponentType } from "react";
import {
  IconBrandNextjs,
  IconBrandNodejs,
  IconBrandReact,
  IconBrandSupabase,
  IconBrandTypescript,
  IconDatabase,
  type IconProps,
} from "@tabler/icons-react";
import { BrandGlyph } from "@/components/BrandGlyph";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";
import styles from "./WebSoftwareTechnologies.module.css";

type Technology = {
  name: string;
  Icon: ComponentType<IconProps>;
  position: string;
};

const outerTechnologies: Technology[] = [
  { name: "Next.js", Icon: IconBrandNextjs, position: styles.outerLeft },
  { name: "React", Icon: IconBrandReact, position: styles.outerTop },
  {
    name: "TypeScript",
    Icon: IconBrandTypescript,
    position: styles.outerRight,
  },
];

const innerTechnologies: Technology[] = [
  { name: "Node.js", Icon: IconBrandNodejs, position: styles.innerLeft },
  { name: "Supabase", Icon: IconBrandSupabase, position: styles.innerTop },
  { name: "PostgreSQL", Icon: IconDatabase, position: styles.innerRight },
];

function TechnologyBadge({
  technology,
  className,
}: {
  technology: Technology;
  className?: string;
}) {
  const { Icon, name, position } = technology;

  return (
    <span
      role="img"
      aria-label={name}
      title={name}
      className={cn(styles.badge, position, className)}
    >
      <Icon size={24} stroke={1.45} aria-hidden="true" />
    </span>
  );
}

export function WebSoftwareTechnologies() {
  return (
    <section
      className={styles.section}
      aria-labelledby="web-software-technologies-title"
    >
      <div className={styles.container}>
        <Reveal>
          <div className={styles.stage}>
            <div className={styles.outerRing} aria-hidden="true" />
            <div className={styles.outerGlow} aria-hidden="true" />
            <div className={styles.innerRing} aria-hidden="true" />
            <div className={styles.innerGlow} aria-hidden="true" />

            {outerTechnologies.map((technology) => (
              <TechnologyBadge key={technology.name} technology={technology} />
            ))}

            {innerTechnologies.map((technology) => (
              <TechnologyBadge
                key={technology.name}
                technology={technology}
                className={styles.innerBadge}
              />
            ))}

            <div className={styles.viceCore} aria-label="VICE Yazılım">
              <div className={styles.viceCoreInner}>
                <BrandGlyph className="h-9 w-7" />
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal index={1}>
          <div className={styles.copy}>
            <h2
              id="web-software-technologies-title"
              className={styles.title}
            >
              Doğru teknoloji,
              <span> doğru ölçek.</span>
            </h2>
            <p className={styles.description}>
              Araçları alışkanlığa göre değil, ürünün hedefi ve büyüme planına
              göre seçiyoruz.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
