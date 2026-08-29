import Image from "next/image";
import { ArrowsClockwise } from "@phosphor-icons/react/dist/ssr/ArrowsClockwise";
import { Globe } from "@phosphor-icons/react/dist/ssr/Globe";
import { MapPin } from "@phosphor-icons/react/dist/ssr/MapPin";
import { Storefront } from "@phosphor-icons/react/dist/ssr/Storefront";
import { ServiceCTA } from "@/components/services/ServiceCTA";
import { SeoHero } from "./SeoHero";
import { SeoSearchJourney } from "./SeoSearchJourney";
import { SeoSignalSystem } from "./SeoSignalSystem";
import styles from "./SeoExperience.module.css";

const PROGRAMS = [
  {
    title: "E-Ticaret SEO",
    text: "Kategori, ürün ve filtre sayfalarını arama talebiyle eşleştirir; indeks yükünü, içerik tekrarını ve ürün keşfini birlikte yönetiriz.",
    icon: Storefront,
  },
  {
    title: "Yerel SEO",
    text: "Konum sinyallerini, Google Business Profile içeriğini ve yerel sayfaları tutarlı bir güven ağına dönüştürürüz.",
    icon: MapPin,
  },
  {
    title: "Uluslararası SEO",
    text: "Dil, ülke hedefleme ve hreflang mimarisini pazarın arama davranışına göre kurar; aynı içeriğin bölgeler arasında çakışmasını önleriz.",
    icon: Globe,
  },
  {
    title: "SEO Taşıma ve Denetim",
    text: "Yeni site, alan adı veya altyapı geçişinde URL değerini korur; yönlendirme, indeks ve ölçüm planını yayından önce doğrularız.",
    icon: ArrowsClockwise,
  },
] as const;

const TOOLS = [
  { name: "Search Console", src: "/seo/tools/search-console.svg" },
  { name: "Google Analytics", src: "/seo/tools/google-analytics.svg" },
  { name: "Lighthouse", src: "/seo/tools/lighthouse.svg" },
  { name: "PageSpeed Insights", src: "/seo/tools/pagespeed-insights.svg" },
  { name: "Semrush", src: "/seo/tools/semrush.svg" },
  { name: "Tag Manager", src: "/seo/tools/tag-manager.svg" },
] as const;

export function SeoExperience() {
  return (
    <div className={styles.page}>
      <SeoHero />

      <section className={styles.manifesto} aria-labelledby="seo-manifesto-title">
        <p id="seo-manifesto-title">
          Sıralama bir çıktıdır.
          <span>
            Kalıcı görünürlük; teknik zemin, doğru içerik ve güvenilir otorite aynı yönde çalıştığında oluşur.
          </span>
        </p>
        <div className={styles.manifestoAxis} aria-hidden="true">
          <span>Teknik sağlık</span>
          <i />
          <span>Arama niyeti</span>
          <i />
          <span>Otorite</span>
        </div>
      </section>

      <SeoSearchJourney />
      <SeoSignalSystem />

      <section className={styles.programs} aria-labelledby="seo-programs-title">
        <div className={styles.programsHeading}>
          <h2 id="seo-programs-title">İş modeline göre derinleşir.</h2>
          <p>
            Her markaya aynı kontrol listesini uygulamayız. Arama alanını, satış modelini ve büyüme hedefini birlikte okuruz.
          </p>
        </div>

        <div className={styles.programList}>
          {PROGRAMS.map(({ title, text, icon: Icon }) => (
            <article key={title}>
              <Icon size={30} weight="light" aria-hidden="true" />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.tools} aria-labelledby="seo-tools-title">
        <div className={styles.toolsHeading}>
          <h2 id="seo-tools-title">Kararları tahminle değil, veriyle alırız.</h2>
          <p>
            Arama görünürlüğünü, teknik sağlığı ve kullanıcı davranışını aynı raporlama ritminde buluştururuz.
          </p>
        </div>

        <div className={styles.toolMarquee} role="group" aria-label="SEO analiz araçları">
          <div className={styles.toolTrack}>
            {[...TOOLS, ...TOOLS].map((tool, index) => (
              <div key={`${tool.name}-${index}`} aria-hidden={index >= TOOLS.length}>
                <Image
                  src={tool.src}
                  alt={index < TOOLS.length ? `${tool.name} logosu` : ""}
                  width={34}
                  height={34}
                />
                <span>{tool.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.assurance} aria-label="VICE SEO yaklaşımı">
        <p>
          Hızlı bir sıralama vaadi değil,
          <span> değişen arama davranışına uyum sağlayan ölçülebilir bir sistem kurarız.</span>
        </p>
      </section>

      <ServiceCTA title="Organik görünürlüğünüzü çalışan bir büyüme sistemine dönüştürelim." />
    </div>
  );
}
