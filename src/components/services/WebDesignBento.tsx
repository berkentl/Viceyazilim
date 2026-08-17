"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import {
  IconBrandGithub,
  IconBrandVercel,
} from "@tabler/icons-react";
import {
  ChartLineUp,
  CheckCircle,
  CreditCard,
  Database,
  Package,
  ShoppingBag,
  type Icon as PhosphorIcon,
} from "@phosphor-icons/react";
import { Globe3D, type GlobeMarker } from "@/components/ui/3d-globe";
import { gsap, useGSAP } from "@/lib/gsap";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";
import viceLogo from "../../../Gallery/LOGO.png";

const codeLines = [
  "git add .",
  'git commit -m "release"',
  "git push origin main",
];

export function WebDesignBento() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reducedMotion) return;

      const cards = gsap.utils.toArray<HTMLElement>("[data-bento-card]");
      gsap.from(cards, {
        opacity: 0,
        y: 32,
        duration: 0.85,
        stagger: 0.09,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          once: true,
        },
      });

      gsap.fromTo(
        "[data-signal-path]",
        { strokeDashoffset: 760, opacity: 0 },
        {
          strokeDashoffset: -760,
          opacity: 1,
          duration: 2.8,
          repeat: -1,
          repeatDelay: 1.2,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: "[data-speed-card]",
            start: "top 90%",
            end: "bottom 10%",
            toggleActions: "play pause resume pause",
          },
        },
      );

    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      aria-label="VICE web altyapısı ve e-ticaret yetenekleri"
      className="relative mx-auto mt-20 w-full max-w-7xl px-5 pb-4 md:mt-28 md:px-10"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-5">
        <BentoShell
          className="min-h-[31rem] md:col-span-7 md:min-h-[35rem]"
          dataAttributes={{ "data-speed-card": "" }}
        >
          <article className="flex h-full flex-col overflow-hidden rounded-[calc(2rem-0.375rem)] bg-[#111720] px-6 pb-7 pt-7 sm:px-8 sm:pb-8 sm:pt-8">
            <BentoCopy
              eyebrow="Performans altyapısı"
              title="Hız, daha ilk tıklamada hissedilir."
              description="Modern geliştirme, otomatik dağıtım ve global teslim ağıyla her etkileşimi olabilecek en kısa yoldan kullanıcıya ulaştırırız."
            />
            <SpeedPipeline />
          </article>
        </BentoShell>

        <BentoShell className="min-h-[31rem] md:col-span-5 md:min-h-[35rem]">
          <article className="flex h-full flex-col overflow-hidden rounded-[calc(2rem-0.375rem)] bg-[#f2f3f5] px-6 pb-7 pt-7 text-[#101319] sm:px-8 sm:pb-8 sm:pt-8">
            <BentoCopy
              eyebrow="VICE Analiz Merkezi"
              title="Veriyi, net kararlara dönüştürür."
              description="Satış, sipariş ve müşteri davranışlarını tek bakışta okunabilen profesyonel bir yönetim ekranında birleştiririz."
              dark
            />
            <CommerceDashboard />
          </article>
        </BentoShell>

        <BentoShell className="min-h-[29rem] md:col-span-5 md:min-h-[32rem]">
          <article className="flex h-full flex-col overflow-hidden rounded-[calc(2rem-0.375rem)] bg-[#090e16] px-6 pb-7 pt-7 sm:px-8 sm:pb-8 sm:pt-8">
            <BentoCopy
              eyebrow="Global erişim"
              title="Markanız dünyanın her yerinde hızlı."
              description="İçeriğinizi kullanıcıya en yakın noktadan sunan dağıtım mimarisiyle sınırları gecikmeye dönüştürmeyiz."
            />
            <GlobalGlobe />
          </article>
        </BentoShell>

        <BentoShell className="min-h-[29rem] md:col-span-7 md:min-h-[32rem]">
          <article className="flex h-full flex-col overflow-hidden rounded-[calc(2rem-0.375rem)] bg-[#151a22] px-6 pb-7 pt-7 sm:px-8 sm:pb-8 sm:pt-8">
            <BentoCopy
              eyebrow="E-ticaret operasyonu"
              title="Yönetmesi kolay. Büyütmesi güçlü."
              description="Ürünlerden siparişlere, ödemelerden performans raporlarına kadar işinizin tamamını sade bir panelde yönetirsiniz."
            />
            <CommerceFeatures />
          </article>
        </BentoShell>
      </div>
    </section>
  );
}

function BentoShell({
  children,
  className,
  dataAttributes,
}: {
  children: ReactNode;
  className: string;
  dataAttributes?: Record<string, string>;
}) {
  return (
    <div
      data-bento-card
      {...dataAttributes}
      className={`rounded-[2rem] bg-white/[0.045] p-1.5 ring-1 ring-inset ring-white/[0.09] shadow-[0_24px_80px_rgba(0,0,0,0.16)] ${className}`}
    >
      {children}
    </div>
  );
}

function BentoCopy({
  eyebrow,
  title,
  description,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  dark?: boolean;
}) {
  return (
    <div className="relative z-[1]">
      <p
        className={`text-[0.78rem] font-medium leading-[1.25] tracking-[-0.012em] ${dark ? "text-black/48" : "text-white/46"}`}
      >
        {eyebrow}
      </p>
      <h3
        className={`mt-3 max-w-[22ch] text-[clamp(1.7rem,3vw,2.55rem)] font-semibold leading-[1.02] tracking-[-0.045em] ${dark ? "text-[#101319]" : "text-white"}`}
      >
        {title}
      </h3>
      <p
        className={`mt-4 max-w-[46ch] text-[0.95rem] leading-relaxed ${dark ? "text-black/52" : "text-white/48"}`}
      >
        {description}
      </p>
    </div>
  );
}

function SpeedPipeline() {
  return (
    <div className="relative mt-auto min-h-[14rem] pt-10">
      <svg
        aria-hidden="true"
        viewBox="0 0 760 240"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[14rem] w-full"
      >
        <path
          d="M80 130 C180 130 172 42 280 42 S380 198 480 198 S556 112 680 112"
          fill="none"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth="1"
        />
        <path
          data-signal-path
          d="M80 130 C180 130 172 42 280 42 S380 198 480 198 S556 112 680 112"
          fill="none"
          stroke="url(#signalGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="110 650"
        />
        <defs>
          <linearGradient id="signalGradient" x1="0" x2="1">
            <stop offset="0" stopColor="#5c7cff" stopOpacity="0" />
            <stop offset="0.48" stopColor="#b8c6ff" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      <div className="relative z-[1] grid grid-cols-3 gap-2.5 sm:gap-4">
        <PipelineTile label="Kod">
          <div className="space-y-1 font-mono text-[0.48rem] leading-tight text-white/42 sm:text-[0.56rem]">
            {codeLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </PipelineTile>
        <PipelineTile label="Vercel">
          <IconBrandVercel aria-hidden="true" stroke={1.35} className="h-9 w-9 text-white" />
        </PipelineTile>
        <PipelineTile label="GitHub">
          <IconBrandGithub aria-hidden="true" stroke={1.35} className="h-10 w-10 text-white" />
        </PipelineTile>
      </div>
      <p className="relative z-[1] mt-5 text-center text-[0.72rem] font-medium tracking-[-0.01em] text-white/36">
        Koddan yayına, kesintisiz akış
      </p>
    </div>
  );
}

function PipelineTile({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  return (
    <div className="flex aspect-square flex-col items-center justify-center rounded-[1.15rem] bg-white/[0.055] px-2 ring-1 ring-inset ring-white/[0.075] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
      {children}
      <span className="mt-3 text-[0.62rem] font-medium text-white/36">{label}</span>
    </div>
  );
}

function CommerceDashboard() {
  const bars = [42, 68, 51, 82, 62, 91, 74];

  return (
    <div className="relative mt-auto pt-9">
      <div className="rounded-[1.45rem] bg-[#11151b] p-3 ring-1 ring-black/10 shadow-[0_22px_55px_rgba(24,31,42,0.18)]">
        <div className="flex items-center justify-between border-b border-white/[0.07] pb-3">
          <Image src={viceLogo} alt="VICE" className="h-auto w-[3.8rem] object-contain" />
          <span className="rounded-full bg-white/[0.06] px-2.5 py-1 text-[0.52rem] font-medium text-white/46">
            Canlı veriler
          </span>
        </div>
        <div className="grid grid-cols-[0.9fr_1.1fr] gap-2.5 pt-3">
          <div className="rounded-xl bg-white/[0.045] p-3">
            <p className="text-[0.54rem] text-white/38">Toplam satış</p>
            <p className="mt-1 text-lg font-semibold tracking-[-0.04em] text-white">₺842.610</p>
            <p className="mt-1 text-[0.52rem] font-medium text-emerald-300/80">+18,4%</p>
          </div>
          <div className="rounded-xl bg-white/[0.045] p-3">
            <p className="text-[0.54rem] text-white/38">Satış performansı</p>
            <div className="mt-3 flex h-12 items-end gap-1.5">
              {bars.map((bar, index) => (
                <span
                  key={`${bar}-${index}`}
                  className="flex-1 rounded-t-sm bg-gradient-to-t from-[#5770db] to-[#b2c0ff]"
                  style={{ height: `${bar}%` }}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="mt-2.5 grid grid-cols-3 gap-2">
          {["Sipariş 1.284", "Dönüşüm %4,8", "Sepet ₺1.920"].map((item) => (
            <div key={item} className="rounded-lg bg-white/[0.035] px-2 py-2 text-center text-[0.5rem] text-white/42">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function GlobalGlobe() {
  const reduceMotion = useSafeReducedMotion();
  const markers: GlobeMarker[] = [
    {
      lat: 41.0082,
      lng: 28.9784,
      label: "İstanbul",
      size: 0.075,
    },
    {
      lat: 50.1109,
      lng: 8.6821,
      label: "Frankfurt",
      size: 0.066,
    },
    {
      lat: 38.9696,
      lng: -77.3861,
      label: "Virginia",
      size: 0.066,
    },
    {
      lat: 1.3521,
      lng: 103.8198,
      label: "Singapur",
      size: 0.06,
    },
  ];

  return (
    <div className="relative mt-auto min-h-[17rem] overflow-hidden pt-5">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[8%] bottom-[-18%] h-[54%] rounded-full bg-[#3457e5]/20 blur-[58px]"
      />
      <Globe3D
        className="absolute -bottom-[16.5rem] left-1/2 h-[37rem] w-[37rem] -translate-x-1/2 sm:-bottom-[17.5rem] sm:h-[40rem] sm:w-[40rem]"
        markers={markers}
        config={{
          radius: 2,
          textureUrl: "/web-design/globe/earth-blue-marble.jpg",
          bumpMapUrl: "/web-design/globe/earth-topology.png",
          showAtmosphere: true,
          atmosphereColor: "#6f8fff",
          atmosphereIntensity: 0.72,
          atmosphereBlur: 3.2,
          bumpScale: 1.8,
          autoRotateSpeed: reduceMotion ? 0 : 0.38,
          enableZoom: false,
          enablePan: false,
          initialRotation: { x: -0.12, y: -0.44 },
          showWireframe: false,
          ambientIntensity: 0.34,
          pointLightIntensity: 1.65,
          backgroundColor: null,
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#090e16] to-transparent" />
      <div className="absolute bottom-4 left-0 right-0 flex justify-between text-[0.64rem] font-medium tracking-[-0.01em] text-white/40">
        <span>İstanbul</span>
        <span>Frankfurt</span>
        <span>Virginia</span>
      </div>
    </div>
  );
}

function CommerceFeatures() {
  const items = [
    { label: "Ürün ve stok", detail: "Anlık takip", icon: Package },
    { label: "Sipariş akışı", detail: "Tek ekranda", icon: ShoppingBag },
    { label: "Satış verileri", detail: "Canlı rapor", icon: ChartLineUp },
    { label: "Güvenli ödeme", detail: "Korumalı akış", icon: CreditCard },
    { label: "Merkezi veri", detail: "Tek kaynak", icon: Database },
  ];

  return (
    <div className="relative mt-auto pt-9">
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
        {items.map((item) => (
          <CommerceFeatureCard key={item.label} {...item} />
        ))}
        <CommerceFeatureCard
          label="Tüm sistemler aktif"
          detail="Panel durumu"
          icon={CheckCircle}
          status
        />
      </div>
    </div>
  );
}

function CommerceFeatureCard({
  label,
  detail,
  icon: Icon,
  status = false,
}: {
  label: string;
  detail: string;
  icon: PhosphorIcon;
  status?: boolean;
}) {
  return (
    <div
      className={`group relative min-h-[7.35rem] overflow-hidden rounded-[1.3rem] p-px shadow-[0_14px_34px_rgba(2,6,14,0.14)] ${
        status
          ? "bg-[linear-gradient(145deg,rgba(148,224,190,0.26),rgba(255,255,255,0.08)_42%,rgba(255,255,255,0.035))]"
          : "bg-[linear-gradient(145deg,rgba(255,255,255,0.14),rgba(255,255,255,0.045)_45%,rgba(255,255,255,0.025))]"
      }`}
    >
      <div
        className={`flex h-full min-h-[7.35rem] flex-col rounded-[calc(1.3rem-1px)] px-3.5 pb-3.5 pt-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.055)] sm:px-4 sm:pb-4 ${
          status
            ? "bg-[radial-gradient(circle_at_18%_10%,rgba(96,163,136,0.16),transparent_54%),#1c232b]"
            : "bg-[#1d232c]"
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          <span
            className={`flex h-9 w-9 items-center justify-center rounded-[0.82rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] ring-1 ring-inset ${
              status
                ? "bg-emerald-300/[0.09] text-emerald-200/86 ring-emerald-200/15"
                : "bg-white/[0.055] text-white/68 ring-white/[0.075]"
            }`}
          >
            <Icon aria-hidden="true" size={18} weight="regular" />
          </span>
          {status ? (
            <span className="mt-1.5 h-2 w-2 rounded-full bg-emerald-300/90 shadow-[0_0_0_4px_rgba(110,231,183,0.08)]" />
          ) : null}
        </div>
        <div className="mt-auto pt-4">
          <p className="text-[0.68rem] font-normal leading-none tracking-[-0.008em] text-white/38">
            {detail}
          </p>
          <p
            className={`mt-1.5 text-[0.86rem] font-semibold leading-[1.16] tracking-[-0.018em] sm:text-[0.9rem] ${
              status ? "text-emerald-200/88" : "text-white/82"
            }`}
          >
            {label}
          </p>
        </div>
      </div>
    </div>
  );
}
