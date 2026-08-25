import Image from "next/image";
import { ArrowsOut } from "@phosphor-icons/react/dist/ssr/ArrowsOut";
import { Brain } from "@phosphor-icons/react/dist/ssr/Brain";
import { CloudArrowUp } from "@phosphor-icons/react/dist/ssr/CloudArrowUp";
import { Code } from "@phosphor-icons/react/dist/ssr/Code";
import { Database } from "@phosphor-icons/react/dist/ssr/Database";
import { PlugsConnected } from "@phosphor-icons/react/dist/ssr/PlugsConnected";
import { ShieldCheck } from "@phosphor-icons/react/dist/ssr/ShieldCheck";
import { Storefront } from "@phosphor-icons/react/dist/ssr/Storefront";
import { Reveal } from "@/components/motion/Reveal";

const cardClass =
  "relative h-full overflow-hidden rounded-[2rem] bg-[#111720] ring-1 ring-inset ring-white/[0.09] shadow-[0_24px_80px_rgba(0,0,0,0.17)]";

export function SoftwareCapabilitiesBento() {
  return (
    <section
      id="yazilim-kapsami"
      className="relative px-5 py-28 md:px-10 md:py-40"
      aria-labelledby="software-capabilities-title"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[44rem] bg-[radial-gradient(circle_at_24%_30%,rgba(63,93,168,0.15),transparent_38%),radial-gradient(circle_at_78%_58%,rgba(89,54,144,0.14),transparent_34%)]"
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="max-w-4xl">
          <h2
            id="software-capabilities-title"
            className="text-[clamp(2.8rem,6vw,6.5rem)] font-semibold leading-[0.91] tracking-[-0.065em]"
          >
            Hazır kalıp değil.
            <span className="block text-white/40">İşinize ait sistem.</span>
          </h2>
          <p className="mt-7 max-w-2xl text-base leading-7 text-white/52 md:text-xl md:leading-8">
            Startup ürünlerinden kurumsal platformlara kadar her yapıyı gerçek ihtiyaca göre tasarlıyoruz.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-6 md:mt-20 md:gap-5">
          <Reveal className="sm:col-span-6 lg:col-span-2" index={0}>
            <article className={`${cardClass} min-h-[27rem] p-7 md:p-8`}>
              <div className="relative flex h-28 items-center justify-center">
                <span className="absolute h-24 w-52 rounded-[50%] border border-white/12" />
                <span className="absolute h-16 w-36 rounded-[50%] border border-[#7894ff]/30" />
                <ArrowsOut size={48} weight="light" className="relative text-white/82" />
              </div>
              <div className="mt-12">
                <h3 className="text-2xl font-semibold tracking-[-0.04em]">
                  Tam ihtiyaca göre
                </h3>
                <p className="mt-4 text-sm leading-6 text-white/48">
                  Startup MVP, içerik yönetimi veya iç operasyon sistemi. Kapsamı iş modeliniz belirler.
                </p>
              </div>
            </article>
          </Reveal>

          <Reveal className="sm:col-span-3 lg:col-span-2" index={1}>
            <article className={`${cardClass} min-h-[27rem] p-7 md:p-8`}>
              <div className="relative mx-auto grid h-32 w-32 place-items-center rounded-full border border-white/10 before:absolute before:-inset-3 before:rounded-full before:border before:border-white/[0.055]">
                <ShieldCheck size={56} weight="light" className="text-[#9bacff]" />
              </div>
              <div className="mt-12">
                <h3 className="text-2xl font-semibold tracking-[-0.04em]">
                  Güvenli veri mimarisi
                </h3>
                <p className="mt-4 text-sm leading-6 text-white/48">
                  Yetkilendirme, veri bütünlüğü ve erişim kontrollerini ürünün temeline yerleştiriyoruz.
                </p>
              </div>
            </article>
          </Reveal>

          <Reveal className="sm:col-span-3 lg:col-span-2" index={2}>
            <article className={`${cardClass} min-h-[27rem] p-7 md:p-8`}>
              <div className="relative flex h-36 items-end justify-center overflow-hidden rounded-2xl bg-[linear-gradient(180deg,rgba(112,137,255,0.13),rgba(112,137,255,0.02))] ring-1 ring-inset ring-white/[0.06]">
                <CloudArrowUp size={76} weight="thin" className="mb-7 text-white/72" />
                <span className="absolute inset-x-5 bottom-5 h-px bg-gradient-to-r from-transparent via-[#8ea4ff]/55 to-transparent" />
              </div>
              <div className="mt-8">
                <h3 className="text-2xl font-semibold tracking-[-0.04em]">
                  Ölçeklenen SaaS altyapısı
                </h3>
                <p className="mt-4 text-sm leading-6 text-white/48">
                  Kullanıcı, abonelik ve operasyon katmanları büyürken yönetilebilir kalan platformlar kuruyoruz.
                </p>
              </div>
            </article>
          </Reveal>

          <Reveal className="sm:col-span-6 lg:col-span-3" index={3}>
            <article className={`${cardClass} min-h-[30rem] p-7 md:p-8`}>
              <div className="grid grid-cols-4 gap-2 sm:gap-3">
                {[
                  { label: "API", Icon: PlugsConnected },
                  { label: "Veri", Icon: Database },
                  { label: "Kod", Icon: Code },
                  { label: "Ticaret", Icon: Storefront },
                ].map(({ label, Icon }) => (
                  <div
                    key={label}
                    className="flex aspect-square flex-col items-center justify-center rounded-2xl bg-white/[0.045] ring-1 ring-inset ring-white/[0.07]"
                  >
                    <Icon size={30} weight="light" className="text-white/72" />
                    <span className="mt-3 text-[10px] font-medium text-white/36">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-14 max-w-xl">
                <h3 className="text-[clamp(1.8rem,3vw,2.7rem)] font-semibold leading-[1.02] tracking-[-0.05em]">
                  API ve e-ticaret entegrasyonları
                </h3>
                <p className="mt-5 max-w-lg text-sm leading-6 text-white/48 md:text-base md:leading-7">
                  Ödeme, stok, CRM ve üçüncü taraf servisleri güvenilir veri akışlarıyla tek sisteme bağlıyoruz.
                </p>
              </div>
            </article>
          </Reveal>

          <Reveal className="sm:col-span-6 lg:col-span-3" index={4}>
            <article className={`${cardClass} min-h-[30rem]`}>
              <Image
                src="/vice-gallery/ekip.png"
                alt="VICE Yazılım ekibinin üretim yaklaşımı"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover opacity-34"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,12,19,0.12),rgba(8,12,19,0.94))]" />
              <div className="relative flex min-h-[30rem] flex-col justify-between p-7 md:p-8">
                <div className="grid h-14 w-14 place-items-center rounded-full bg-white/[0.07] ring-1 ring-inset ring-white/10 backdrop-blur-md">
                  <Brain size={31} weight="light" className="text-white/82" />
                </div>
                <div className="max-w-xl">
                  <h3 className="text-[clamp(1.8rem,3vw,2.7rem)] font-semibold leading-[1.02] tracking-[-0.05em]">
                    Yapay zekâ destekli iş akışları
                  </h3>
                  <p className="mt-5 max-w-lg text-sm leading-6 text-white/55 md:text-base md:leading-7">
                    Tekrarlanan işleri azaltan, veriyi anlamlandıran ve ekibin karar hızını artıran çözümler geliştiriyoruz.
                  </p>
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
