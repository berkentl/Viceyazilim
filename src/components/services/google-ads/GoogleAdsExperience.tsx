import {
  ArrowsClockwise,
  ChartLineUp,
  MagnifyingGlass,
  ShoppingBagOpen,
} from "@phosphor-icons/react/dist/ssr";
import { ServiceCTA } from "@/components/services/ServiceCTA";
import { GoogleAdsAuction } from "./GoogleAdsAuction";
import { GoogleAdsConversionLoop } from "./GoogleAdsConversionLoop";
import { GoogleAdsHero } from "./GoogleAdsHero";
import styles from "./GoogleAdsExperience.module.css";

const CAMPAIGN_SURFACES = [
  {
    index: "01",
    title: "Arama Ağı",
    text: "Aktif talebi; sorgu, konum, cihaz ve zaman sinyalleriyle yakalarız. Negatif kelimeler bütçeyi, mesaj mimarisi ise niyeti korur.",
    icon: MagnifyingGlass,
  },
  {
    index: "02",
    title: "Shopping",
    text: "Ürün verisini Merchant Center ile düzenler, fiyat ve stok sinyallerini satın alma niyetiyle aynı akışta buluştururuz.",
    icon: ShoppingBagOpen,
  },
  {
    index: "03",
    title: "Performance Max",
    text: "Google envanterini tek hedef etrafında yönetir; kreatif, kitle ve dönüşüm verisinin aynı ticari sonuca çalışmasını sağlarız.",
    icon: ChartLineUp,
  },
  {
    index: "04",
    title: "Yeniden Pazarlama",
    text: "Kararını tamamlamayan ziyaretçiyi aynı reklamla takip etmeyiz. Yolculuğun kaldığı noktaya göre yeni bir mesaj kurarız.",
    icon: ArrowsClockwise,
  },
] as const;

const OPERATING_SYSTEM = [
  {
    index: "01",
    title: "Talep haritası",
    text: "Anahtar kelimeyi tek başına değil; arama niyeti, rekabet, maliyet ve iş değeriyle birlikte değerlendiririz.",
  },
  {
    index: "02",
    title: "Mesaj ve açılış sayfası",
    text: "Reklam vaadi ile açılış sayfasındaki içerik, hız ve aksiyonu aynı karar akışına bağlarız.",
  },
  {
    index: "03",
    title: "Teklif ve bütçe yönetimi",
    text: "Bütçeyi günlük harcama hedefi gibi değil, nitelikli dönüşüme ulaşan kontrollü bir kaynak olarak yönetiriz.",
  },
  {
    index: "04",
    title: "Ölçüm ve geri besleme",
    text: "Form, arama, satış ve nitelikli müşteri sinyallerini kampanyaya geri taşıyarak sistemi her döngüde iyileştiririz.",
  },
] as const;

const GOOGLE_STACK = [
  "Google Ads",
  "Google Analytics 4",
  "Tag Manager",
  "Merchant Center",
  "Looker Studio",
] as const;

export function GoogleAdsExperience() {
  return (
    <div className={styles.page}>
      <GoogleAdsHero />

      <section className={styles.manifesto} aria-labelledby="ads-manifesto-title">
        <p id="ads-manifesto-title">
          Gösterim görünürlük sağlar.
          <span>
            Büyüme, doğru arama ile doğru teklif aynı anda buluştuğunda başlar.
          </span>
        </p>
        <div className={styles.manifestoSignals} aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
      </section>

      <GoogleAdsAuction />

      <section className={styles.surfaces} aria-labelledby="ads-surfaces-title">
        <div className={styles.surfacesHeading}>
          <h2 id="ads-surfaces-title">Google’ın yüzeyleri farklı. Hedef tek.</h2>
          <p>
            Her kampanya türünü ayrı bir taktik gibi değil, aynı ticari hedefe bağlanan bir medya sistemi olarak kurarız.
          </p>
        </div>

        <div className={styles.surfaceList}>
          {CAMPAIGN_SURFACES.map(({ index, title, text, icon: Icon }) => (
            <article key={title}>
              <span>{index}</span>
              <Icon size={34} weight="light" aria-hidden="true" />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <GoogleAdsConversionLoop />

      <section className={styles.operatingSystem} aria-labelledby="ads-system-title">
        <div className={styles.systemHeading}>
          <span>VICE performans sistemi</span>
          <h2 id="ads-system-title">Kampanya yayına girdiğinde işimiz yeni başlar.</h2>
          <p>
            Hesabı bir kez kurup bırakmayız. Arama davranışı, dönüşüm kalitesi ve satış geri bildirimi değiştikçe sistem de gelişir.
          </p>
        </div>

        <ol className={styles.systemList}>
          {OPERATING_SYSTEM.map((item) => (
            <li key={item.index}>
              <span>{item.index}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.stack} aria-labelledby="ads-stack-title">
        <div className={styles.stackGlow} aria-hidden="true" />
        <h2 id="ads-stack-title">Kararı tek panelden değil, bağlı veriden alırız.</h2>
        <p>
          Reklam, davranış, etiket, ürün ve raporlama verisini aynı ölçüm dilinde bir araya getiririz.
        </p>
        <div className={styles.stackRail} role="list" aria-label="Kullandığımız Google ürünleri">
          {GOOGLE_STACK.map((item, index) => (
            <div key={item} role="listitem">
              <i data-color={index} aria-hidden="true" />
              <span>{item}</span>
            </div>
          ))}
        </div>
        <small>
          Google ürün adları Google LLC’nin ticari markalarıdır. VICE Yazılım bağımsız bir hizmet sağlayıcıdır.
        </small>
      </section>

      <section className={styles.assurance} aria-label="VICE Google Ads yaklaşımı">
        <p>
          Daha fazla tıklama değil,
          <span> işinize değer üreten daha doğru talep.</span>
        </p>
      </section>

      <ServiceCTA title="Reklam bütçenizi ölçülebilir talebe dönüştürelim." />
    </div>
  );
}
