"use client";

import Image from "next/image";
import { ArrowUpRight, InstagramLogo } from "@phosphor-icons/react";
import { useEffect, useRef, type ReactNode } from "react";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";
import { useFinePointer } from "@/lib/useFinePointer";

const INSTAGRAM_URL = "https://www.instagram.com/viceyazilim/";
const INSTAGRAM_VIDEO_SRC = "/vice-gallery/instagram-feed.m4v";

const ROADMAP = [
  { number: "01", title: "Altyapı", detail: "Mimari ve teknoloji" },
  { number: "02", title: "Deneyim", detail: "UI, UX ve mobil" },
  { number: "03", title: "Kimlik", detail: "Marka ve iletişim" },
] as const;

const TECH_GROUPS = [
  { label: "Arayüz", items: ["Next.js", "React", "TypeScript"] },
  { label: "Veri ve sunucu", items: ["Node.js", "Supabase", "PostgreSQL"] },
  { label: "Dağıtım", items: ["Vercel", "GitHub", "Cloudflare"] },
] as const;

const BRAND_FRAMES = [
  {
    src: "/vice-gallery/dijital-guc.png",
    alt: "Vice Yazılım dijital güç kurumsal iletişim tasarımı",
  },
  {
    src: "/vice-gallery/ekip.png",
    alt: "Vice Yazılım profesyonel ekip kurumsal iletişim tasarımı",
  },
  {
    src: "/vice-gallery/hizmet-sistemi.png",
    alt: "Vice Yazılım hizmet kategorileri kurumsal iletişim tasarımı",
  },
  {
    src: "/vice-gallery/marka-guveni.png",
    alt: "Vice Yazılım marka güveni kurumsal iletişim tasarımı",
  },
] as const;

export function AgencyFeatures() {
  const shouldReduceMotion = useSafeReducedMotion();
  const finePointer = useFinePointer();

  return (
    <section className="px-6 pb-28 md:px-12 md:pb-40">
      <div className="mx-auto max-w-6xl">
        <header className="grid gap-6 pb-12 md:grid-cols-[minmax(0,1fr)_minmax(18rem,0.48fr)] md:items-end md:gap-12 md:pb-16">
          <div>
            <p className="text-[0.78rem] font-medium tracking-[-0.012em] text-fg-subtle">
              Üretim yaklaşımı
            </p>
            <h2 className="mt-5 max-w-3xl text-[clamp(2.4rem,5.5vw,5rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-fg">
              Fikirden markaya,
              <br />
              tek bir sistem.
            </h2>
          </div>

          <p className="max-w-md text-[1rem] leading-[1.65] tracking-[-0.012em] text-fg-muted md:pb-1 md:text-[1.08rem]">
            Teknik temeli, ürün deneyimini ve marka kimliğini birbirinden ayrı
            değil, aynı yol haritasının devamı olarak tasarlıyoruz.
          </p>
        </header>

        <RoadmapRail />

        <div className="mt-8 rounded-[2rem] bg-white/[0.045] p-1.5 ring-1 ring-white/[0.07] md:mt-10 md:rounded-[2.75rem]">
          <div className="grid overflow-hidden rounded-[calc(2rem-0.375rem)] bg-[#0d1722] lg:grid-cols-6 md:rounded-[calc(2.75rem-0.375rem)]">
            <FeaturePanel
              phase="Altyapı"
              className="min-h-[34rem] border-b border-white/[0.07] lg:col-span-4 lg:border-r"
              title="Doğru teknoloji, doğru ölçek."
              description="İhtiyaca göre seçilen modern araçları; güvenli, hızlı ve sürdürülebilir tek bir mimaride birleştiriyoruz."
            >
              <InfrastructureSurface />
            </FeaturePanel>

            <FeaturePanel
              phase="Deneyim"
              className="min-h-[34rem] border-b border-white/[0.07] lg:col-span-2"
              title="Arayüzden deneyime."
              description="Masaüstü ve mobil davranışı aynı ürün dilinin iki doğal parçası olarak ele alıyoruz."
            >
              <ExperienceSurface />
            </FeaturePanel>

            <FeaturePanel
              phase="Instagram"
              className="min-h-[31rem] border-b border-white/[0.07] lg:col-span-3 lg:border-b-0 lg:border-r"
              title="Süreç, yayına dönüştüğünde."
              description="Stüdyo notlarını ve Vice’ın güncel üretimlerini hareketli içeriklerle paylaşıyoruz."
            >
              <InstagramSurface shouldReduceMotion={shouldReduceMotion || !finePointer} />
            </FeaturePanel>

            <FeaturePanel
              phase="Marka kimliği"
              className="min-h-[43rem] lg:col-span-3 lg:min-h-[31rem]"
              title="Üründen kurumsal kimliğe."
              description="Görsel sistem, iletişim tonu ve içerik dili aynı marka fikrini büyütür."
            >
              <BrandIdentitySurface />
            </FeaturePanel>
          </div>
        </div>
      </div>
    </section>
  );
}

function RoadmapRail() {
  return (
    <ol className="relative grid grid-cols-3 border-y border-white/[0.09] py-5 md:py-6">
      <span
        aria-hidden="true"
        className="absolute left-[16.66%] right-[16.66%] top-[2.55rem] h-px bg-white/[0.12] md:top-[2.95rem]"
      />
      {ROADMAP.map((step) => (
        <li
          key={step.number}
          className="relative flex flex-col items-center px-1 text-center"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-bg font-sans text-[0.72rem] font-semibold tracking-[-0.01em] text-fg ring-1 ring-inset ring-white/25 md:h-11 md:w-11">
            {step.number}
          </span>
          <p className="mt-3 text-[0.78rem] font-semibold tracking-[-0.015em] text-fg md:text-[0.9rem]">
            {step.title}
          </p>
          <p className="mt-0.5 hidden text-[0.72rem] text-fg-subtle sm:block">
            {step.detail}
          </p>
        </li>
      ))}
    </ol>
  );
}

function FeaturePanel({
  phase,
  title,
  description,
  className,
  children,
}: {
  phase: string;
  title: string;
  description: string;
  className: string;
  children: ReactNode;
}) {
  return (
    <article className={`relative flex flex-col overflow-hidden ${className}`}>
      <div className="relative z-10 px-7 pb-3 pt-8 sm:px-9 sm:pt-10">
        <p className="mb-4 text-[0.74rem] font-medium tracking-[-0.012em] text-fg-subtle">
          {phase}
        </p>
        <h3 className="max-w-lg text-[1.45rem] font-semibold leading-[1.12] tracking-[-0.035em] text-fg md:text-[1.7rem]">
          {title}
        </h3>
        <p className="mt-3 max-w-md text-[0.94rem] leading-[1.6] text-fg-muted">
          {description}
        </p>
      </div>
      <div className="relative min-h-0 flex-1">{children}</div>
    </article>
  );
}

function InfrastructureSurface() {
  return (
    <div className="absolute inset-x-7 bottom-0 top-6 overflow-hidden rounded-t-[1.65rem] bg-[#edf2f4] p-1.5 text-[#111820] ring-1 ring-inset ring-white/50 sm:inset-x-9">
      <div className="flex h-full flex-col rounded-t-[1.3rem] bg-white/55 px-5 pb-6 pt-5 sm:px-7 sm:pt-6">
        <div className="flex items-center justify-between border-b border-[#111820]/10 pb-4">
          <div>
            <p className="text-[0.74rem] font-medium tracking-[-0.01em] text-[#59656d]">
              Ürün mimarisi
            </p>
            <p className="mt-1 text-[0.88rem] font-semibold tracking-[-0.02em]">
              Teknoloji katmanları
            </p>
          </div>
          <span className="h-2.5 w-2.5 rounded-full bg-[#335f4a] ring-4 ring-[#335f4a]/10" />
        </div>

        <div className="grid flex-1 grid-cols-3 divide-x divide-[#111820]/10">
          {TECH_GROUPS.map((group) => (
            <div
              key={group.label}
              className="px-2 py-5 first:pl-0 last:pr-0 sm:px-5 sm:first:pl-0 sm:last:pr-0"
            >
              <p className="text-[0.58rem] font-semibold leading-tight text-[#6c767d] sm:text-[0.68rem]">
                {group.label}
              </p>
              <ul className="mt-4 space-y-3">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-1.5 text-[0.68rem] font-semibold tracking-[-0.02em] sm:gap-2.5 sm:text-[0.92rem]"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#111820]/35" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="border-t border-[#111820]/10 pt-4 text-[0.72rem] leading-relaxed text-[#69747b]">
          Araçlar sabit bir paket değil; ürünün hedefi ve büyüme planına göre
          seçilir.
        </p>
      </div>
    </div>
  );
}

function ExperienceSurface() {
  return (
    <div className="absolute inset-x-5 bottom-0 top-6 flex items-end justify-center gap-2 overflow-hidden sm:inset-x-7">
      <div className="relative aspect-[4/5] w-[48%] translate-y-5 overflow-hidden rounded-t-[1.2rem] bg-[#dfe5e8] p-1 ring-1 ring-white/20 md:-rotate-[3deg]">
        <div className="relative h-full overflow-hidden rounded-t-[0.95rem]">
          <Image
            src="/vice-gallery/ui-ux.png"
            alt="Vice Yazılım UI ve UX kurumsal tasarımı"
            fill
            sizes="(min-width: 1024px) 14vw, 44vw"
            className="object-cover object-top"
          />
        </div>
      </div>
      <div className="relative aspect-[4/5] w-[48%] translate-y-10 overflow-hidden rounded-t-[1.2rem] bg-[#dfe5e8] p-1 ring-1 ring-white/20 md:rotate-[3deg]">
        <div className="relative h-full overflow-hidden rounded-t-[0.95rem]">
          <Image
            src="/vice-gallery/mobil-deneyim.png"
            alt="Vice Yazılım mobil deneyim kurumsal tasarımı"
            fill
            sizes="(min-width: 1024px) 14vw, 44vw"
            className="object-cover object-top"
          />
        </div>
      </div>
    </div>
  );
}

function InstagramSurface({
  shouldReduceMotion,
}: {
  shouldReduceMotion: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || shouldReduceMotion) return;

    let isNearViewport = false;

    const syncPlayback = () => {
      if (!isNearViewport || document.hidden) {
        video.pause();
        return;
      }

      if (!video.getAttribute("src")) {
        video.src = INSTAGRAM_VIDEO_SRC;
        video.load();
      }

      void video.play().catch(() => {
        // The poster remains visible if a browser blocks muted autoplay.
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isNearViewport = entry.isIntersecting;
        syncPlayback();
      },
      {
        rootMargin: "240px 0px",
        threshold: 0.01,
      },
    );

    observer.observe(video);
    document.addEventListener("visibilitychange", syncPlayback);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
      video.pause();
    };
  }, [shouldReduceMotion]);

  return (
    <a
      href={INSTAGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Vice Yazılım Instagram profilini aç"
      className="group absolute inset-x-7 bottom-0 top-6 overflow-hidden rounded-t-[1.65rem] bg-black outline-none ring-1 ring-inset ring-white/[0.1] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-accent sm:inset-x-9"
    >
      <video
        ref={videoRef}
        poster="/vice-gallery/instagram-video-poster.png"
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        className="h-full w-full object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-black/25" />
      <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4 sm:p-5">
        <div className="flex items-center gap-3 text-white">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/12 ring-1 ring-inset ring-white/20">
            <InstagramLogo size={18} weight="regular" />
          </span>
          <div>
            <p className="text-[0.8rem] font-semibold tracking-[-0.015em]">
              @viceyazilim
            </p>
            <p className="text-[0.66rem] text-white/55">Creative development</p>
          </div>
        </div>
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/12 text-white ring-1 ring-inset ring-white/15 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
          <ArrowUpRight size={15} weight="regular" />
        </span>
      </div>
    </a>
  );
}

function BrandIdentitySurface() {
  return (
    <div className="absolute inset-x-5 bottom-0 top-6 grid grid-cols-2 gap-2 overflow-hidden sm:inset-x-7 md:gap-3">
      {BRAND_FRAMES.map((frame, index) => (
        <div
          key={frame.src}
          className={`relative aspect-[4/5] overflow-hidden rounded-[1rem] bg-[#dfe5e8] ring-1 ring-white/[0.1] ${
            index % 2 === 0 ? "translate-y-5" : "-translate-y-2"
          }`}
        >
          <Image
            src={frame.src}
            alt={frame.alt}
            fill
            sizes="(min-width: 1024px) 15vw, 44vw"
            className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.025]"
          />
        </div>
      ))}
    </div>
  );
}
