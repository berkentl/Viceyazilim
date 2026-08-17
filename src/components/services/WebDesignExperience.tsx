"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { MacbookScroll } from "@/components/ui/macbook-scroll";
import {
  Card,
  Carousel,
  type AppleCardData,
} from "@/components/ui/apple-cards-carousel";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";
import viceMacbookLogo from "../../../Gallery/LOGO.png";
import viceCaresCard from "../../../Gallery/kartlar/vice-card-01-vice-sizi-dusunur.png";
import approvalCard from "../../../Gallery/kartlar/vice-card-02-begenme-garantisi.png";
import deliveryCard from "../../../Gallery/kartlar/vice-card-03-zamaninda-teslimat.png";
import supportCard from "../../../Gallery/kartlar/vice-card-04-724-hizmet-guvenlik.png";
import commerceCard from "../../../Gallery/kartlar/vice-card-05-eticaret-panel-veri.png";
import controlCard from "../../../Gallery/kartlar/vice-card-06-sistematik-kontrol.png";

const approachCards: AppleCardData[] = [
  {
    category: "Marka odaklı yaklaşım",
    title: "VICE sizi düşünür",
    description:
      "Kararları markanızın hedefi ve müşterinizin gerçek ihtiyaçlarıyla birlikte alırız.",
    src: viceCaresCard,
    textTone: "dark",
    details: [
      {
        title: "Önce dinleriz.",
        description:
          "Markanızı, hedefinizi ve müşterinizin beklentisini anlamadan tasarıma başlamayız.",
      },
      {
        title: "Size göre tasarlarız.",
        description:
          "Hazır kalıpları değil, markanıza ait doğru deneyimi kurarız.",
      },
    ],
  },
  {
    category: "Tasarım memnuniyeti",
    title: "Beğenme garantisi",
    description:
      "Tasarımı onayınıza sunar, doğru hissettiren sonuca birlikte ulaşırız.",
    src: approvalCard,
    textTone: "light",
    details: [
      {
        title: "Net sunumlar.",
        description:
          "Her yönü anlaşılır biçimde gösterir, karar vermenizi kolaylaştırırız.",
      },
      {
        title: "Kontrollü revizyon.",
        description:
          "Geri bildiriminizi tasarım sistemini bozmadan doğru noktaya uygularız.",
      },
    ],
  },
  {
    category: "Planlı üretim",
    title: "Zamanında teslimat",
    description:
      "Kapsamı, sorumlulukları ve teslim tarihini baştan netleştiririz.",
    src: deliveryCard,
    textTone: "dark",
    details: [
      {
        title: "Planlı ilerleme.",
        description:
          "Projenin her bölümünü gerçekçi bir takvimle yönetiriz.",
      },
      {
        title: "Görünür süreç.",
        description:
          "Nerede olduğumuzu ve sırada ne bulunduğunu her zaman bilirsiniz.",
      },
    ],
  },
  {
    category: "Kesintisiz destek",
    title: "7/24 + güvenlik",
    description:
      "Kesintisiz destek ile performans ve güvenliği birlikte koruruz.",
    src: supportCard,
    textTone: "light",
    details: [
      {
        title: "Ulaşılabilir destek.",
        description:
          "Kritik durumlarda hızlı iletişim ve doğrudan müdahale sağlarız.",
      },
      {
        title: "Katmanlı güvenlik.",
        description:
          "Güncellemeleri, erişimleri ve temel güvenlik kontrollerini düzenli izleriz.",
      },
    ],
  },
  {
    category: "E-ticaret yönetimi",
    title: "E-ticaret paneli",
    description:
      "Ürünleri, siparişleri ve performans verilerini tek yerden anlaşılır biçimde yönetirsiniz.",
    src: commerceCard,
    textTone: "dark",
    details: [
      {
        title: "Kolay yönetim.",
        description:
          "Günlük işlemleri teknik desteğe ihtiyaç duymadan tamamlayabileceğiniz bir panel kurarız.",
      },
      {
        title: "Anlaşılır veri.",
        description:
          "Satış ve kullanıcı verilerini karar almayı kolaylaştıran raporlara dönüştürürüz.",
      },
    ],
  },
  {
    category: "Uçtan uca kontrol",
    title: "Sistematik kontrol",
    description:
      "Tasarımdan yayına kadar tüm üretimi VICE ekibi tek sistem içinde yönetir.",
    src: controlCard,
    textTone: "light",
    details: [
      {
        title: "Tek sorumlu ekip.",
        description:
          "Tasarım, geliştirme ve yayına alma adımları aynı kontrol yapısında ilerler.",
      },
      {
        title: "Düzenli takip.",
        description:
          "İşleri, sorumlulukları ve kalite kontrollerini görünür bir süreçte birleştiririz.",
      },
    ],
  },
];

function ViceScreen() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useSafeReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (reduceMotion) {
      video.pause();
      video.currentTime = 0;
      return;
    }

    void video.play().catch(() => undefined);
  }, [reduceMotion]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#05070a]">
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        autoPlay={!reduceMotion}
        preload="metadata"
        aria-label="Vice Yazılım web deneyimi videosu"
        className="h-full w-full object-cover"
      >
        <source src="/web-design/vice-claude.m4v" type="video/mp4" />
      </video>
    </div>
  );
}

function ViceMacBrand() {
  return (
    <Image
      src={viceMacbookLogo}
      alt="Vice Yazılım"
      className="h-auto w-[5.25rem] object-contain"
    />
  );
}

export function WebDesignExperience() {
  const cards = approachCards.map((card, index) => (
    <Card key={card.title} card={card} index={index} />
  ));

  return (
    <>
      <section
        aria-labelledby="web-design-hero-title"
        className="relative isolate overflow-hidden bg-[#070b12] text-white"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[64rem] bg-[radial-gradient(circle_at_50%_28%,rgba(33,45,63,0.34),rgba(11,17,27,0.12)_44%,transparent_72%)]"
        />
        <MacbookScroll
          title={
            <span id="web-design-hero-title">
              İlk izlenim,
              <br />
              <span className="text-white/48">son şansınız olabilir.</span>
            </span>
          }
          brand={<ViceMacBrand />}
          screen={<ViceScreen />}
        />
      </section>

      <section
        aria-labelledby="web-design-approach-title"
        className="relative -mt-16 overflow-hidden rounded-t-[2.5rem] bg-[#07101d] pb-28 pt-28 text-white sm:-mt-24 sm:rounded-t-[3.5rem] sm:pb-36 sm:pt-36"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[36rem] bg-[radial-gradient(circle_at_24%_10%,rgba(75,96,124,0.2),transparent_50%)]"
        />
        <div className="relative mx-auto max-w-7xl px-5 md:px-10">
          <p className="text-sm font-medium tracking-[-0.01em] text-white/48">
            Web tasarım yaklaşımımız
          </p>
          <h2
            id="web-design-approach-title"
            className="mt-5 max-w-5xl text-[clamp(3rem,7.5vw,7.25rem)] font-semibold leading-[0.92] tracking-[-0.06em]"
          >
            Biz farklıyız.
            <br />
            <span className="text-white/42">Sizi düşünürüz.</span>
          </h2>
        </div>

        <div className="relative mt-8 sm:mt-12">
          <Carousel items={cards} />
        </div>
      </section>
    </>
  );
}
