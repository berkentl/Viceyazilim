import { Reveal } from "@/components/motion/Reveal";
import { ScrollRevealText } from "@/components/home/ScrollRevealText";
import { UiUxHero } from "@/components/services/UiUxHero";
import { UiUxContactForm } from "@/components/services/UiUxContactForm";

const approach = [
  {
    eyebrow: "İnsan",
    title: "Dinler ve gözlemleriz.",
    body: "Kullanıcının gerçek ihtiyacını, karar anlarını ve üründe takıldığı noktaları araştırırız.",
  },
  {
    eyebrow: "Akış",
    title: "Yolu sadeleştiririz.",
    body: "Bilgi mimarisini ve kritik görevleri, kullanıcı düşünmeden ilerleyebileceği açık bir düzene getiririz.",
  },
  {
    eyebrow: "Arayüz",
    title: "Markayı hissettiririz.",
    body: "Tipografi, renk, ritim ve etkileşimi tek bir tutarlı tasarım sistemi içinde birleştiririz.",
  },
  {
    eyebrow: "Doğrulama",
    title: "Gerçek kullanımda sınarız.",
    body: "Prototipleri test eder, geri bildirimi ölçer ve geliştirmeye hazır hâle gelene kadar iyileştiririz.",
  },
];

export function UiUxExperience() {
  return (
    <div className="overflow-clip bg-[#07111f] text-white">
      <UiUxHero />

      <section className="mx-auto max-w-7xl px-5 py-28 md:px-8 md:py-44">
        <ScrollRevealText text="İyi bir deneyim, kullanıcı ne yapacağını düşünmeden yolunu bulduğunda başlar." />
      </section>

      <section className="border-y border-white/[0.06] bg-[#091523] px-5 py-24 md:px-8 md:py-36">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div className="lg:sticky lg:top-36 lg:self-start">
            <p className="text-sm font-medium text-white/40">Yaklaşımımız</p>
            <h2 className="mt-5 max-w-xl text-[clamp(2.8rem,5vw,5.5rem)] font-semibold leading-[0.98] tracking-[-0.055em]">
              Ekrandan önce davranışı tasarlarız.
            </h2>
            <p className="mt-7 max-w-lg text-lg leading-8 text-white/48">
              Güzel görünen bir arayüz ancak doğru problemi çözdüğünde değerlidir. Bu yüzden kararları varsayımla değil, araştırma ve prototiple alırız.
            </p>
          </div>

          <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
            {approach.map((item, index) => (
              <Reveal key={item.title} index={index}>
                <article className="grid gap-5 py-9 md:grid-cols-[8rem_1fr] md:gap-8 md:py-12">
                  <p className="text-sm font-medium text-[#82b4ff]">{item.eyebrow}</p>
                  <div>
                    <h3 className="text-2xl font-semibold tracking-[-0.035em] md:text-4xl">{item.title}</h3>
                    <p className="mt-4 max-w-2xl text-base leading-7 text-white/48 md:text-lg md:leading-8">{item.body}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-24 md:px-8 md:py-40">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="text-sm font-medium text-white/40">Tasarım sistemi</p>
            <h2 className="mt-5 max-w-4xl text-[clamp(2.8rem,5.5vw,6rem)] font-semibold leading-[0.96] tracking-[-0.06em]">
              Bir arayüz değil, büyüyen bir sistem.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-5 lg:grid-cols-[1.25fr_.75fr]">
            <Reveal className="min-h-[34rem] overflow-hidden rounded-[2rem] border border-white/[0.09] bg-[#0d1b2b] p-6 md:min-h-[42rem] md:p-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/38">Component library</p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] md:text-4xl">Her karar aynı dili konuşur.</h3>
                </div>
                <span className="rounded-full border border-white/10 px-3 py-2 text-xs text-white/42">v2.4</span>
              </div>
              <div className="mt-12 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-[#f5f6f8] p-6 text-[#11151c]">
                  <p className="text-xs font-medium text-black/40">Typography</p>
                  <p className="mt-8 text-5xl font-semibold tracking-[-0.06em]">Aa</p>
                  <div className="mt-9 space-y-3">
                    <div className="h-3 w-4/5 rounded-full bg-black/80" />
                    <div className="h-2.5 w-3/5 rounded-full bg-black/14" />
                    <div className="h-2.5 w-2/5 rounded-full bg-black/[0.08]" />
                  </div>
                </div>
                <div className="rounded-3xl border border-white/[0.08] bg-white/[0.035] p-6">
                  <p className="text-xs font-medium text-white/38">Tokens</p>
                  <div className="mt-8 grid grid-cols-3 gap-3">
                    {["#f5f6f8", "#3478f6", "#07111f"].map((color) => <span key={color} className="aspect-square rounded-2xl border border-white/10" style={{ background: color }} />)}
                  </div>
                  <div className="mt-8 flex gap-3">
                    <span className="h-12 flex-1 rounded-full bg-[#3478f6]" />
                    <span className="h-12 w-12 rounded-full border border-white/14" />
                  </div>
                </div>
              </div>
              <div className="mt-4 rounded-3xl border border-white/[0.08] bg-white/[0.035] p-6">
                <div className="flex items-center justify-between text-xs text-white/38"><span>Spacing scale</span><span>8 point grid</span></div>
                <div className="mt-7 flex items-end gap-3">
                  {[8, 16, 24, 32, 48, 64].map((size) => <span key={size} className="flex-1 rounded-t-lg bg-[#65a5ff]/70" style={{ height: `${size}px` }} />)}
                </div>
              </div>
            </Reveal>

            <div className="grid gap-5">
              <Reveal index={1} className="rounded-[2rem] border border-white/[0.09] bg-[#f4f5f7] p-7 text-[#11151c] md:p-9">
                <p className="text-sm font-medium text-black/40">Erişilebilirlik</p>
                <h3 className="mt-5 text-3xl font-semibold tracking-[-0.045em] md:text-4xl">Herkes için açık.</h3>
                <p className="mt-4 text-base leading-7 text-black/52">Kontrast, klavye kullanımı, okunabilirlik ve hareket tercihleri tasarımın başından itibaren sistemin parçasıdır.</p>
                <div className="mt-10 flex items-center gap-3"><span className="grid h-12 w-12 place-items-center rounded-full bg-[#111827] text-sm font-semibold text-white">AA</span><span className="text-sm text-black/42">WCAG odaklı kararlar</span></div>
              </Reveal>
              <Reveal index={2} className="rounded-[2rem] border border-white/[0.09] bg-[#0d1b2b] p-7 md:p-9">
                <p className="text-sm font-medium text-white/38">Geliştirmeye hazır</p>
                <h3 className="mt-5 text-3xl font-semibold tracking-[-0.045em] md:text-4xl">Detay kaybolmaz.</h3>
                <p className="mt-4 text-base leading-7 text-white/48">Bileşen durumları, responsive davranışlar ve etkileşim notları geliştiriciye açık bir teslim sistemiyle aktarılır.</p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.06] bg-[#091523] px-5 py-24 md:px-8 md:py-36">
        <div className="mx-auto max-w-7xl">
          <Reveal className="grid items-end gap-10 lg:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-white/40">Responsive deneyim</p>
              <h2 className="mt-5 text-[clamp(2.8rem,5vw,5.5rem)] font-semibold leading-[0.98] tracking-[-0.055em]">Her ekranda aynı ürün hissi.</h2>
            </div>
            <p className="max-w-xl text-lg leading-8 text-white/48 lg:justify-self-end">Masaüstünü küçültmeyiz. İçeriğin önceliğini, dokunma alanlarını ve akışın ritmini her ekran için yeniden ele alırız.</p>
          </Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-[.68fr_1.32fr]">
            <Reveal className="relative min-h-[34rem] overflow-hidden rounded-[2rem] border border-white/[0.09] bg-[#0d1b2b] p-7">
              <div className="mx-auto mt-8 h-[28rem] max-w-[16rem] rounded-[2.7rem] border-[7px] border-[#1d232b] bg-[#f4f5f7] p-4 shadow-2xl">
                <div className="mx-auto h-1.5 w-16 rounded-full bg-black/10" />
                <div className="mt-8 h-36 rounded-3xl bg-[linear-gradient(145deg,#dce6f5,#ffffff)]" />
                <div className="mt-6 h-3 w-3/4 rounded-full bg-black/12" />
                <div className="mt-3 h-2.5 w-1/2 rounded-full bg-black/[0.07]" />
                <div className="mt-9 h-12 rounded-2xl bg-[#3478f6]" />
              </div>
            </Reveal>
            <Reveal index={1} className="relative min-h-[34rem] overflow-hidden rounded-[2rem] border border-white/[0.09] bg-[#f4f5f7] p-7 text-[#11151c]">
              <div className="flex items-center justify-between"><span className="text-sm font-medium text-black/38">Desktop flow</span><span className="rounded-full bg-black/[0.05] px-3 py-2 text-xs text-black/45">1440 px</span></div>
              <div className="mt-12 rounded-3xl border border-black/[0.07] bg-white p-5 shadow-[0_20px_70px_rgba(25,34,48,.09)] md:p-8">
                <div className="flex items-center justify-between"><div className="h-3 w-28 rounded-full bg-black/12" /><div className="flex gap-2"><span className="h-8 w-8 rounded-full bg-black/[0.05]" /><span className="h-8 w-20 rounded-full bg-[#111827]" /></div></div>
                <div className="mt-8 grid gap-5 sm:grid-cols-[1.15fr_.85fr]">
                  <div className="h-56 rounded-3xl bg-[linear-gradient(145deg,#e1e9f6,#ffffff)]" />
                  <div className="flex flex-col justify-center"><div className="h-4 w-4/5 rounded-full bg-black/80" /><div className="mt-4 h-3 w-3/5 rounded-full bg-black/10" /><div className="mt-3 h-3 w-2/5 rounded-full bg-black/[0.06]" /><div className="mt-9 h-12 rounded-2xl bg-[#3478f6]" /></div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="px-5 py-24 md:px-8 md:py-40">
        <div className="mx-auto grid max-w-7xl gap-12 rounded-[2.25rem] border border-white/[0.09] bg-[#0d1b2b] p-6 md:p-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-20 lg:p-14">
          <Reveal>
            <p className="text-sm font-medium text-[#82b4ff]">Bir sonraki ürününüz</p>
            <h2 className="mt-5 text-[clamp(2.7rem,4.5vw,4.8rem)] font-semibold leading-[0.98] tracking-[-0.055em]">Ürününüzü birlikte sadeleştirelim.</h2>
            <p className="mt-6 max-w-md text-base leading-7 text-white/48">İhtiyacınızı dinleyelim, doğru kapsamı birlikte belirleyelim. İlk görüşmede satış sunumu değil, probleminizi konuşalım.</p>
            <div className="mt-12 border-t border-white/[0.08] pt-7 text-sm leading-7 text-white/40">
              <p>merhaba@viceyazilim.com</p>
              <p>Genellikle bir iş günü içinde dönüş yapıyoruz.</p>
            </div>
          </Reveal>
          <Reveal index={1}><UiUxContactForm /></Reveal>
        </div>
      </section>
    </div>
  );
}
