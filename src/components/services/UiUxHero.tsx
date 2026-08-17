"use client";

import { ContainerScroll } from "@/components/ui/container-scroll-animation";

const stages = ["Araştırma", "Akış", "Arayüz", "Test"];

export function UiUxHero() {
  return (
    <section className="relative overflow-hidden border-b border-white/[0.06] bg-[#07111f]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[42rem] bg-[radial-gradient(circle_at_50%_8%,rgba(52,111,214,0.16),transparent_54%)]" />
      <ContainerScroll
        titleComponent={
          <div className="relative z-10 mx-auto max-w-4xl px-2">
            <p className="mb-5 text-sm font-medium tracking-[-0.01em] text-white/45">
              UI ve UX tasarım
            </p>
            <h1 className="text-balance text-[clamp(3rem,7.4vw,7.25rem)] font-semibold leading-[0.92] tracking-[-0.065em] text-white">
              İyi tasarım görünmez.
              <span className="mt-2 block text-white/42">Etkisi kalır.</span>
            </h1>
            <p className="mx-auto mt-7 max-w-2xl text-balance text-base leading-7 text-white/55 md:text-xl md:leading-8">
              Kullanıcının yolunu sadeleştiren, markanızı doğru hissettiren ve her ekranda doğal çalışan deneyimler tasarlıyoruz.
            </p>
          </div>
        }
      >
        <DesignCanvas />
      </ContainerScroll>
    </section>
  );
}

function DesignCanvas() {
  return (
    <div className="relative h-full overflow-hidden bg-[#f4f5f7] text-[#11151c]">
      <div className="flex h-12 items-center justify-between border-b border-black/[0.07] px-4 md:h-16 md:px-7">
        <div className="flex items-center gap-3">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-[#111827] text-xs font-semibold text-white md:h-8 md:w-8">V</span>
          <span className="text-xs font-semibold tracking-[-0.02em] md:text-sm">VICE Design System</span>
        </div>
        <div className="hidden items-center gap-1 rounded-full bg-black/[0.045] p-1 md:flex">
          {stages.map((stage, index) => (
            <span key={stage} className={`rounded-full px-4 py-2 text-xs font-medium ${index === 2 ? "bg-white text-black shadow-sm" : "text-black/45"}`}>
              {stage}
            </span>
          ))}
        </div>
        <span className="rounded-full border border-black/10 px-3 py-1.5 text-[10px] font-medium text-black/55 md:text-xs">Prototype 08</span>
      </div>

      <div className="grid h-[calc(100%-3rem)] grid-cols-[3.5rem_1fr] md:h-[calc(100%-4rem)] md:grid-cols-[11rem_1fr]">
        <aside className="border-r border-black/[0.07] p-3 md:p-5">
          <p className="hidden text-[11px] font-medium text-black/35 md:block">Akışlar</p>
          <div className="mt-1 space-y-2 md:mt-5">
            {["Keşif", "Ürün", "Sepet", "Ödeme"].map((item, index) => (
              <div key={item} className={`flex items-center gap-3 rounded-xl p-2.5 text-xs font-medium md:px-3 ${index === 2 ? "bg-[#111827] text-white" : "text-black/45"}`}>
                <span className={`h-2 w-2 rounded-full ${index === 2 ? "bg-[#65a5ff]" : "bg-black/15"}`} />
                <span className="hidden md:inline">{item}</span>
              </div>
            ))}
          </div>
        </aside>

        <div className="relative min-w-0 overflow-hidden p-4 md:p-8">
          <div className="mb-4 flex items-end justify-between md:mb-7">
            <div>
              <p className="text-[10px] font-medium text-black/35 md:text-xs">Checkout experience</p>
              <h2 className="mt-1 text-xl font-semibold tracking-[-0.04em] md:text-3xl">Ödeme, tek nefeste.</h2>
            </div>
            <div className="hidden gap-2 md:flex">
              {["Aa", "12", "⌁"].map((token) => (
                <span key={token} className="grid h-9 min-w-9 place-items-center rounded-lg border border-black/[0.08] bg-white px-2 text-xs font-medium shadow-sm">{token}</span>
              ))}
            </div>
          </div>

          <div className="grid h-[calc(100%-4rem)] gap-3 md:grid-cols-[1.25fr_.75fr] md:gap-5">
            <div className="relative overflow-hidden rounded-2xl border border-black/[0.07] bg-white p-4 shadow-[0_16px_60px_rgba(25,34,48,0.08)] md:rounded-3xl md:p-7">
              <div className="flex items-center justify-between">
                <div className="h-2.5 w-24 rounded-full bg-black/10 md:w-36" />
                <div className="h-8 w-8 rounded-full bg-[#111827]" />
              </div>
              <div className="mt-5 grid grid-cols-[1fr_4rem] gap-3 md:mt-8 md:grid-cols-[1fr_8rem] md:gap-5">
                <div>
                  <div className="h-28 rounded-2xl bg-[linear-gradient(145deg,#e3e9f2,#f7f8fa)] md:h-48" />
                  <div className="mt-4 h-3 w-3/5 rounded-full bg-black/12" />
                  <div className="mt-2 h-2.5 w-2/5 rounded-full bg-black/[0.07]" />
                </div>
                <div className="space-y-2">
                  {["#111827", "#f4f5f7", "#3478f6"].map((color) => (
                    <div key={color} className="rounded-xl border border-black/[0.07] p-2">
                      <span className="block h-6 rounded-md" style={{ background: color }} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-xl bg-[#111827] px-4 py-3 text-white md:inset-x-7 md:bottom-7 md:rounded-2xl md:px-5 md:py-4">
                <span className="text-[10px] font-medium md:text-sm">Devam et</span>
                <span className="text-xs text-white/50">02 / 03</span>
              </div>
            </div>

            <div className="hidden flex-col rounded-3xl border border-black/[0.07] bg-[#111827] p-6 text-white shadow-[0_16px_60px_rgba(25,34,48,0.13)] md:flex">
              <p className="text-xs font-medium text-white/45">Mobil önizleme</p>
              <div className="mx-auto mt-6 w-4/5 flex-1 rounded-[2rem] border border-white/15 bg-[#f7f8fa] p-3">
                <div className="h-28 rounded-2xl bg-[linear-gradient(145deg,#dfe7f5,#ffffff)]" />
                <div className="mt-5 h-2.5 w-2/3 rounded-full bg-black/10" />
                <div className="mt-2 h-2 w-1/2 rounded-full bg-black/[0.06]" />
                <div className="mt-7 h-10 rounded-xl bg-[#3478f6]" />
              </div>
              <div className="mt-5 flex items-center justify-between text-[11px] text-white/42">
                <span>AA erişilebilirlik</span><span>4.8 / 5</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
