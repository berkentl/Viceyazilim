import {
  ChartBar,
  FilmSlate,
  ImageSquare,
  Megaphone,
} from "@phosphor-icons/react/dist/ssr";
import { ReferenceBanner } from "@/components/references/ReferenceBanner";
import { ServiceCTA } from "@/components/services/ServiceCTA";
import { getReference } from "@/lib/references";
import { SocialMediaHero } from "./SocialMediaHero";
import styles from "./SocialMediaExperience.module.css";

const DELIVERABLES = [
  {
    index: "01",
    title: "Post ve story tasarımı",
    text: "Kurumunuza özel şablonlarla hazırlanan, akışta her gönderinin aynı markayı anlattığı tutarlı bir görsel dil kurarız.",
    icon: ImageSquare,
  },
  {
    index: "02",
    title: "Reels ve video",
    text: "Tanıtım, eğitim ve quiz formatında kısa videolar üretiriz. Kurumun ne yaptığını birkaç saniyede anlatan içerikler.",
    icon: FilmSlate,
  },
  {
    index: "03",
    title: "Meta reklamları",
    text: "Reklam kurulumunu ve yönetimini üstleniriz. Kreatifleri hazırlar, A/B testleriyle doğru kitleye ulaşan mesajı buluruz.",
    icon: Megaphone,
  },
  {
    index: "04",
    title: "Raporlama",
    text: "Her ay sonunda ne yaptığımızı ve ne öğrendiğimizi raporlar, bir sonraki ayın planını strateji görüşmesinde birlikte çıkarırız.",
    icon: ChartBar,
  },
] as const;

const PROCESS = [
  {
    index: "01",
    title: "Tanışma ve ihtiyaç analizi",
    text: "Kurumunuzu, hedef kitlenizi ve sosyal medyadan ne beklediğinizi dinleriz. İçerik adetleri buna göre belirlenir.",
  },
  {
    index: "02",
    title: "Aylık içerik takvimi onayı",
    text: "Her ay paylaşımlar başlamadan önce içerik takvimini hazırlar, onayınıza sunarız. Sürpriz paylaşım olmaz.",
  },
  {
    index: "03",
    title: "Üretim, paylaşım ve reklam",
    text: "Onaylanan plana göre tasarımları ve videoları üretir, paylaşımları yapar, reklamları yayına alırız.",
  },
  {
    index: "04",
    title: "Ay sonu raporu ve yeni plan",
    text: "Ayın sonuçlarını raporlar, öğrendiklerimizi bir sonraki ayın içerik planına taşırız.",
  },
] as const;

const TOOLS = [
  "Instagram",
  "Facebook",
  "Meta Business Suite",
  "Canva",
  "Remotion",
] as const;

export function SocialMediaExperience() {
  const caseStudy = getReference("ozel-bodrum-denizcilik");

  return (
    <div className={styles.page}>
      <SocialMediaHero />

      <section className={styles.manifesto} aria-labelledby="social-manifesto-title">
        <p id="social-manifesto-title">
          Paylaşmak görünürlük sağlar.
          <span>Güven, her gönderi aynı markayı anlattığında oluşur.</span>
        </p>
        <div className={styles.manifestoSignals} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </section>

      <section className={styles.surfaces} aria-labelledby="social-deliverables-title">
        <div className={styles.surfacesHeading}>
          <h2 id="social-deliverables-title">Tasarım, video ve reklam. Hepsi tek elden.</h2>
          <p>
            Farklı ekiplerle uğraşmazsınız. İçeriği planlayan, tasarlayan, videoya dönüştüren ve
            reklamını yöneten aynı ekip olur.
          </p>
        </div>

        <div className={styles.surfaceList}>
          {DELIVERABLES.map(({ index, title, text, icon: Icon }) => (
            <article key={title}>
              <span>{index}</span>
              <Icon size={34} weight="light" aria-hidden="true" />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      {caseStudy ? (
        <section className={styles.caseStudy} aria-labelledby="social-case-title">
          <div className={styles.caseHeading}>
            <span className={styles.eyebrow}>Gerçek iş</span>
            <h2 id="social-case-title">Bir kurum, tek görsel dil.</h2>
          </div>
          <ReferenceBanner reference={caseStudy} />
        </section>
      ) : null}

      <section className={styles.operatingSystem} aria-labelledby="social-process-title">
        <div className={styles.systemHeading}>
          <span className={styles.eyebrow}>Nasıl çalışırız</span>
          <h2 id="social-process-title">Her ay aynı ritim, her ay daha iyi.</h2>
          <p>
            Sosyal medyayı tek seferlik bir iş gibi değil, her ay planlanan, üretilen ve ölçülen bir
            döngü olarak yönetiriz.
          </p>
        </div>

        <ol className={styles.systemList}>
          {PROCESS.map((item) => (
            <li key={item.index}>
              <span>{item.index}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.clarity} aria-labelledby="social-clarity-title">
        <span className={styles.eyebrow}>Baştan net</span>
        <h2 id="social-clarity-title">Sürpriz yok, gizli kalem yok.</h2>
        <div className={styles.clarityGrid}>
          <p>
            Sözleşme, içerik adetleri ve revizyon hakları çalışmaya başlamadan önce yazılı olarak
            netleşir.
          </p>
          <p>
            Reklam bütçesi hizmet bedelinden ayrıdır ve doğrudan kurumun kendi Meta hesabından
            ödenir.
          </p>
        </div>
      </section>

      <section className={styles.stack} aria-labelledby="social-stack-title">
        <div className={styles.stackGlow} aria-hidden="true" />
        <h2 id="social-stack-title">Doğru araç, tutarlı üretim.</h2>
        <p>
          Tasarımdan videoya, paylaşımdan reklama kadar her adımı aynı araç setiyle ve aynı
          görsel standartla yürütürüz.
        </p>
        <div className={styles.stackRail} role="list" aria-label="Kullandığımız araçlar">
          {TOOLS.map((item) => (
            <div key={item} role="listitem">
              <i aria-hidden="true" />
              <span>{item}</span>
            </div>
          ))}
        </div>
        <small>
          Ürün adları sahiplerinin ticari markalarıdır. VICE Yazılım bağımsız bir hizmet
          sağlayıcıdır.
        </small>
      </section>

      <section className={styles.assurance} aria-label="VICE sosyal medya yaklaşımı">
        <p>
          Daha fazla paylaşım değil,
          <span> markanızı her gün aynı güvenle anlatan içerik.</span>
        </p>
      </section>

      <ServiceCTA title="Kurumunuza özel içerik planını birlikte çıkaralım." />
    </div>
  );
}
