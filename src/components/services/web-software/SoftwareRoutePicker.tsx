"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowClockwise,
  ArrowRight,
  Check,
  Code,
  Lightning,
  PlugsConnected,
  Robot,
  ShoppingBag,
  SquaresFour,
} from "@phosphor-icons/react";

const routes = [
  {
    label: "Startup MVP",
    shortLabel: "MVP",
    description:
      "Fikrinizi doğrulayan, hızlı öğrenmenizi sağlayan ve yeni sürümlere sağlam bir temel bırakan ilk ürün.",
    icon: Lightning,
  },
  {
    label: "SaaS Platformu",
    shortLabel: "SaaS",
    description:
      "Üyelik, yetkilendirme, abonelik ve yönetim akışlarıyla ölçeklenmeye hazır dijital platform.",
    icon: SquaresFour,
  },
  {
    label: "E-Ticaret",
    shortLabel: "E-Ticaret",
    description:
      "Markanıza özel alışveriş deneyimi, güvenli ödeme akışı ve operasyon sistemleriyle entegre satış altyapısı.",
    icon: ShoppingBag,
  },
  {
    label: "İç Sistem",
    shortLabel: "İç Sistem",
    description:
      "Ekibinizin tekrar eden işlerini tek yerde toplayan, süreçleri görünür ve ölçülebilir kılan özel yazılım.",
    icon: Code,
  },
  {
    label: "API Entegrasyonu",
    shortLabel: "API",
    description:
      "Kullandığınız servisleri güvenli veri akışlarıyla birbirine bağlayan, sürdürülebilir entegrasyon mimarisi.",
    icon: PlugsConnected,
  },
  {
    label: "Yapay Zekâ",
    shortLabel: "Yapay Zekâ",
    description:
      "Veriyi anlamlandıran, ekip yükünü azaltan ve karar süreçlerini hızlandıran yapay zekâ destekli iş akışları.",
    icon: Robot,
  },
] as const;

const pegRows = [5, 6, 5, 6, 5];

export function SoftwareRoutePicker() {
  const boardRef = useRef<HTMLDivElement>(null);
  const ballRef = useRef<HTMLSpanElement>(null);
  const animationRef = useRef<Animation | null>(null);
  const [selected, setSelected] = useState(1);
  const [status, setStatus] = useState<"ready" | "running" | "landed">(
    "ready",
  );

  const dropBall = useCallback((targetIndex?: number) => {
    const board = boardRef.current;
    const ball = ballRef.current;

    if (!board || !ball) return;

    animationRef.current?.cancel();

    const nextIndex =
      typeof targetIndex === "number"
        ? targetIndex
        : Math.floor(Math.random() * routes.length);
    const { width, height } = board.getBoundingClientRect();
    const targetX =
      ((nextIndex + 0.5) / routes.length - 0.5) * Math.max(width - 44, 0);
    const travelY = Math.max(height - 76, 210);
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    setStatus("running");

    const finalTransform = `translate3d(${targetX}px, ${travelY}px, 0) translateX(-50%)`;

    if (reducedMotion) {
      ball.style.transform = finalTransform;
      setSelected(nextIndex);
      setStatus("landed");
      return;
    }

    const drift = Math.min(width * 0.12, 76);
    const direction = nextIndex < routes.length / 2 ? -1 : 1;
    const frames = [
      "translate3d(0px, 0px, 0) translateX(-50%)",
      `translate3d(${direction * drift * 0.42}px, ${travelY * 0.17}px, 0) translateX(-50%)`,
      `translate3d(${-direction * drift * 0.28}px, ${travelY * 0.35}px, 0) translateX(-50%)`,
      `translate3d(${direction * drift * 0.72}px, ${travelY * 0.53}px, 0) translateX(-50%)`,
      `translate3d(${targetX * 0.58}px, ${travelY * 0.72}px, 0) translateX(-50%)`,
      `translate3d(${targetX * 0.86}px, ${travelY * 0.9}px, 0) translateX(-50%)`,
      finalTransform,
    ];

    const animation = ball.animate(
      frames.map((transform, index) => ({
        transform,
        offset: index / (frames.length - 1),
      })),
      {
        duration: 1250,
        easing: "cubic-bezier(0.65, 0, 0.35, 1)",
        fill: "forwards",
      },
    );

    animationRef.current = animation;
    animation.onfinish = () => {
      ball.style.transform = finalTransform;
      setSelected(nextIndex);
      setStatus("landed");
    };
  }, []);

  const reset = useCallback(() => {
    animationRef.current?.cancel();
    if (ballRef.current) {
      ballRef.current.style.transform =
        "translate3d(0px, 0px, 0) translateX(-50%)";
    }
    setStatus("ready");
  }, []);

  useEffect(() => {
    return () => animationRef.current?.cancel();
  }, []);

  const SelectedIcon = routes[selected].icon;

  return (
    <section className="relative overflow-hidden bg-[#080d14] px-4 py-24 text-white sm:px-6 lg:py-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[18%] top-20 h-80 rounded-full bg-[radial-gradient(circle,rgba(39,169,255,0.13),transparent_68%)] blur-3xl"
      />

      <div className="relative mx-auto max-w-[92rem]">
        <div className="mx-auto mb-12 max-w-3xl text-center lg:mb-16">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-[#74c9ff]">
            Doğru başlangıç noktası
          </p>
          <h2 className="text-balance text-[clamp(2.5rem,6vw,5.8rem)] font-medium leading-[0.93] tracking-[-0.06em]">
            Projenizin rotasını birlikte belirleyelim.
          </h2>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b121c]/90 shadow-[0_40px_120px_rgba(0,0,0,0.35)]">
          <div className="flex flex-col gap-5 border-b border-white/10 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <div className="flex items-center gap-3">
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  status === "running"
                    ? "animate-pulse bg-[#74c9ff]"
                    : status === "landed"
                      ? "bg-emerald-400"
                      : "bg-white/35"
                }`}
              />
              <p className="text-sm text-white/58">
                {status === "running"
                  ? "VICE rotayı hesaplıyor"
                  : status === "landed"
                    ? `${routes[selected].label} rotası hazır`
                    : "Bir rota oluşturun veya doğrudan seçim yapın"}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {status !== "ready" && (
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/10 px-4 text-sm text-white/62 transition-colors hover:border-white/25 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#74c9ff]"
                >
                  <ArrowClockwise size={17} aria-hidden="true" />
                  Sıfırla
                </button>
              )}
              <button
                type="button"
                onClick={() => dropBall()}
                disabled={status === "running"}
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-[#07101b] transition-[transform,background-color] hover:scale-[1.02] hover:bg-[#dff4ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#74c9ff] disabled:cursor-wait disabled:opacity-60"
              >
                {status === "landed" ? "Yeniden seç" : "Rota oluştur"}
                <ArrowRight size={17} weight="bold" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div
            ref={boardRef}
            className="relative h-[31rem] overflow-hidden sm:h-[35rem] lg:h-[39rem]"
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:linear-gradient(to_bottom,black,transparent_92%)]"
            />

            <span
              ref={ballRef}
              aria-hidden="true"
              className="absolute left-1/2 top-7 z-20 h-8 w-8 rounded-full border border-white/60 bg-[radial-gradient(circle_at_32%_28%,#ffffff_0_9%,#8cd8ff_22%,#288fd4_55%,#0b4e84_100%)] shadow-[0_0_28px_rgba(73,177,255,0.75)] will-change-transform"
              style={{
                transform: "translate3d(0px, 0px, 0) translateX(-50%)",
              }}
            />

            <div className="absolute inset-x-[8%] top-24 bottom-32">
              {pegRows.map((pegCount, rowIndex) => (
                <div
                  key={`${pegCount}-${rowIndex}`}
                  className="absolute left-0 right-0 flex justify-around"
                  style={{ top: `${rowIndex * 20}%` }}
                >
                  {Array.from({ length: pegCount }).map((_, pegIndex) => (
                    <span
                      key={pegIndex}
                      className="h-3 w-3 rounded-full border border-white/20 bg-white/8 shadow-[0_0_16px_rgba(116,201,255,0.08)]"
                    />
                  ))}
                </div>
              ))}
            </div>

            <div className="absolute inset-x-2 bottom-0 grid h-28 grid-cols-6 sm:inset-x-6">
              {routes.map((route, index) => {
                const Icon = route.icon;
                const isSelected = status === "landed" && selected === index;

                return (
                  <button
                    key={route.label}
                    type="button"
                    onClick={() => dropBall(index)}
                    disabled={status === "running"}
                    aria-label={`${route.label} rotasını seç`}
                    className={`group relative flex min-w-0 flex-col items-center justify-center gap-2 border-l border-white/8 px-1 text-center transition-colors first:border-l-0 focus-visible:z-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#74c9ff] ${
                      isSelected
                        ? "bg-[#74c9ff]/10 text-white"
                        : "text-white/40 hover:bg-white/[0.035] hover:text-white/72"
                    }`}
                  >
                    <Icon
                      size={20}
                      weight={isSelected ? "fill" : "regular"}
                      aria-hidden="true"
                    />
                    <span className="max-w-full truncate text-[10px] font-medium sm:text-xs">
                      {route.shortLabel}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-3 bottom-0 h-px transition-colors ${
                        isSelected ? "bg-[#74c9ff]" : "bg-transparent"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid border-t border-white/10 lg:grid-cols-[0.78fr_1.22fr]">
            <div className="flex min-h-48 items-center justify-center border-b border-white/10 p-8 lg:border-b-0 lg:border-r">
              <div className="flex h-24 w-24 items-center justify-center rounded-[1.75rem] border border-[#74c9ff]/30 bg-[#74c9ff]/10 text-[#9bd9ff] shadow-[0_0_40px_rgba(53,168,237,0.11)]">
                <SelectedIcon size={42} weight="duotone" aria-hidden="true" />
              </div>
            </div>
            <div className="flex min-h-48 flex-col justify-center p-7 sm:p-10 lg:p-12">
              <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#74c9ff]">
                <Check size={15} weight="bold" aria-hidden="true" />
                Önerilen rota
              </div>
              <h3 className="mb-3 text-3xl font-medium tracking-[-0.04em] sm:text-4xl">
                {routes[selected].label}
              </h3>
              <p className="max-w-2xl text-base leading-7 text-white/55 sm:text-lg sm:leading-8">
                {routes[selected].description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
