import { ArrowsClockwise } from "@phosphor-icons/react/dist/ssr/ArrowsClockwise";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr/CheckCircle";
import { CreditCard } from "@phosphor-icons/react/dist/ssr/CreditCard";
import { Package } from "@phosphor-icons/react/dist/ssr/Package";
import { Storefront } from "@phosphor-icons/react/dist/ssr/Storefront";
import { Truck } from "@phosphor-icons/react/dist/ssr/Truck";
import { ServiceCTA } from "@/components/services/ServiceCTA";
import { CommerceChromaticStory } from "./CommerceChromaticStory";
import { CommerceSystemStory } from "./CommerceSystemStory";
import { EcommerceHero } from "./EcommerceHero";
import styles from "./EcommerceExperience.module.css";

const PLATFORM_ROW_ONE = [
  "Shopify",
  "WooCommerce",
  "Ideasoft",
  "Ticimax",
  "T-Soft",
] as const;

const PLATFORM_ROW_TWO = [
  "Sanal POS",
  "Pazaryeri",
  "ERP",
  "Kargo",
  "CRM",
  "Muhasebe",
] as const;

const DELIVERY_STEPS = [
  {
    number: "01",
    title: "İş modelini çözümleriz",
    text: "Ürünü, hedef pazarı ve operasyon yükünü birlikte inceleriz. Platform kararı teknoloji modasına göre değil, işin gerçeklerine göre verilir.",
  },
  {
    number: "02",
    title: "Deneyimi tasarlarız",
    text: "Ürün keşfi, sepet ve ödeme adımlarını aynı davranış dili içinde kurarız. Mobilde başlayan yol masaüstünde kopmaz.",
  },
  {
    number: "03",
    title: "Sistemleri bağlarız",
    text: "Ödeme, stok, kargo, pazaryeri ve yönetim araçlarını tek veri akışında buluştururuz.",
  },
  {
    number: "04",
    title: "Canlıya çıkar, geliştiririz",
    text: "Gerçek sipariş senaryolarını test eder, yayından sonra darboğazları ölçerek sistemi büyütürüz.",
  },
] as const;

export function EcommerceExperience() {
  return (
    <div className={styles.page}>
      <EcommerceHero />

      <section className={styles.openingStatement} aria-labelledby="commerce-statement-title">
        <p>VICE E-Ticaret</p>
        <h2 id="commerce-statement-title">
          Kapıyı açmak yetmez.
          <span>Şehrin tamamına bağlanmak gerekir.</span>
        </h2>
        <div className={styles.statementDetail}>
          <span>Vitrin</span>
          <i aria-hidden="true" />
          <span>Ödeme</span>
          <i aria-hidden="true" />
          <span>Operasyon</span>
          <i aria-hidden="true" />
          <span>Büyüme</span>
        </div>
      </section>

      <CommerceChromaticStory />
      <CommerceSystemStory />

      <section className={styles.operationConsole} aria-labelledby="operation-console-title">
        <header>
          <p>Canlı operasyon</p>
          <h2 id="operation-console-title">Arka plandaki karmaşa müşteriye yansımaz.</h2>
        </header>

        <div className={styles.consoleCanvas}>
          <div className={styles.consoleLead}>
            <span>Yönetim merkezi</span>
            <strong>Tek ekran</strong>
            <p>Sipariş, stok, kampanya ve müşteri verisi aynı çalışma alanında görünür.</p>
          </div>

          <div className={styles.consoleSignal} aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>

          <div className={styles.consoleStatus}>
            <CheckCircle size={30} weight="light" aria-hidden="true" />
            <div>
              <strong>Canlıya hazır</strong>
              <span>Ödeme ve sipariş senaryoları test edildi</span>
            </div>
          </div>

          <div className={styles.consoleFlows}>
            <div><CreditCard size={25} weight="light" aria-hidden="true" /><span>Ödeme</span></div>
            <div><Package size={25} weight="light" aria-hidden="true" /><span>Stok</span></div>
            <div><Truck size={25} weight="light" aria-hidden="true" /><span>Teslimat</span></div>
            <div><ArrowsClockwise size={25} weight="light" aria-hidden="true" /><span>Kanallar</span></div>
          </div>
        </div>
      </section>

      <section className={styles.platformRail} aria-labelledby="platform-rail-title">
        <div className={styles.platformHeading}>
          <p>Doğru teknoloji</p>
          <h2 id="platform-rail-title">Tek bir altyapıyı herkese önermiyoruz.</h2>
          <span>İş modeliniz hangi yolu gerektiriyorsa sistemi orada kuruyoruz.</span>
        </div>

        <div className={styles.marquee} role="group" aria-label="Desteklenen e-ticaret platformları">
          <div className={styles.marqueeTrack} aria-hidden="true">
            {[...PLATFORM_ROW_ONE, ...PLATFORM_ROW_ONE].map((name, index) => (
              <span key={`${name}-${index}`}>{name}</span>
            ))}
          </div>
        </div>
        <div className={`${styles.marquee} ${styles.marqueeReverse}`} role="group" aria-label="E-ticaret entegrasyon alanları">
          <div className={styles.marqueeTrack} aria-hidden="true">
            {[...PLATFORM_ROW_TWO, ...PLATFORM_ROW_TWO].map((name, index) => (
              <span key={`${name}-${index}`}>{name}</span>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.delivery} aria-labelledby="delivery-title">
        <div className={styles.deliveryHeading}>
          <span>Anahtar teslim süreç</span>
          <h2 id="delivery-title">Mağazayı açar, kontrolü size bırakırız.</h2>
        </div>

        <ol>
          {DELIVERY_STEPS.map((step) => (
            <li key={step.number}>
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.assurance} aria-label="VICE e-ticaret yaklaşımı">
        <Storefront size={30} weight="light" aria-hidden="true" />
        <p>
          Tasarım kararını operasyon kararından ayırmıyoruz.
          <span> Müşterinin gördüğü yüz ile ekibinizin yönettiği sistem aynı ürünün parçalarıdır.</span>
        </p>
      </section>

      <ServiceCTA title="E-ticaret fikrinizi çalışan bir satış sistemine dönüştürelim." />
    </div>
  );
}
