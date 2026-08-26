import { IconArrowUpRight } from "@tabler/icons-react";
import Link from "next/link";
import { BrandGlyph } from "@/components/BrandGlyph";
import styles from "./ServiceCTA.module.css";

export function ServiceCTA({ title }: { title: string }) {
  return (
    <section className={styles.section} aria-labelledby="service-cta-title">
      <div className={styles.card}>
        <div className={styles.grid} aria-hidden="true" />
        <div className={styles.aurora} aria-hidden="true" />

        <div className={styles.content}>
          <div className={styles.visual} aria-hidden="true">
            <span className={styles.orbitOuter} />
            <span className={styles.orbitTrace} />
            <span className={styles.orbitInner} />
            <span className={styles.core}>
              <BrandGlyph className={styles.glyph} />
            </span>
          </div>

          <p className={styles.eyebrow}>Bir sonraki ürününüz</p>
          <h2 id="service-cta-title" className={styles.title}>
            {title}
          </h2>
          <p className={styles.description}>
            Fikrinizi, kapsamı net ve büyümeye hazır bir ürüne birlikte
            dönüştürelim.
          </p>

          <Link href="/iletisim" className={styles.button}>
            <span className={styles.buttonBeam} aria-hidden="true" />
            <span className={styles.buttonSurface}>
              <span>Projeni Konuşalım</span>
              <span className={styles.buttonIcon} aria-hidden="true">
                <IconArrowUpRight size={20} stroke={1.7} />
              </span>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
