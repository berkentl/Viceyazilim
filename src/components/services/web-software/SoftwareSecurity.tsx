import { Code } from "@phosphor-icons/react/dist/ssr/Code";
import { Eye } from "@phosphor-icons/react/dist/ssr/Eye";
import { LockKey } from "@phosphor-icons/react/dist/ssr/LockKey";
import { ShieldCheck } from "@phosphor-icons/react/dist/ssr/ShieldCheck";
import { Reveal } from "@/components/motion/Reveal";

const principles = [
  {
    icon: LockKey,
    title: "Şifreleme ve erişim",
    copy: "Kritik veriyi koruyan, rol bazlı ve ihtiyaca göre sınırlandırılmış erişim katmanları kuruyoruz.",
  },
  {
    icon: ShieldCheck,
    title: "Güncel protokoller",
    copy: "Bağımlılıkları, oturum akışlarını ve uygulama yüzeyini güncel güvenlik pratikleriyle ele alıyoruz.",
  },
  {
    icon: Eye,
    title: "Gözlemlenebilir sistem",
    copy: "Hataları büyümeden yakalamak için kayıt, izleme ve anlamlı uyarı mekanizmalarını ürünün parçası yapıyoruz.",
  },
];

export function SoftwareSecurity() {
  return (
    <section className="relative overflow-hidden bg-[#080d14] px-4 py-24 text-white sm:px-6 lg:py-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-20 h-[34rem] w-[34rem] rounded-full bg-[#2859a7]/12 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-0 h-[30rem] w-[30rem] rounded-full bg-[#23a4d9]/10 blur-[140px]"
      />

      <div className="relative mx-auto max-w-[92rem]">
        <Reveal className="mx-auto mb-14 max-w-4xl text-center lg:mb-20">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-[#74c9ff]">
            Güvenlik yaklaşımı
          </p>
          <h2 className="text-balance text-[clamp(2.7rem,6vw,6.5rem)] font-medium leading-[0.93] tracking-[-0.06em]">
            Güvenliği sonradan eklemiyoruz.
          </h2>
          <p className="mx-auto mt-7 max-w-2xl text-pretty text-base leading-7 text-white/52 sm:text-lg sm:leading-8">
            Yetkilendirme, veri koruması ve gözlemlenebilirlik ürün
            mimarisinin en başından itibaren bir parçasıdır.
          </p>
        </Reveal>

        <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr] lg:gap-5">
          <Reveal className="relative min-h-[36rem] overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(145deg,rgba(27,74,118,0.58),rgba(10,17,27,0.94)_50%,rgba(22,45,75,0.65))] p-7 sm:p-10 lg:p-12">
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(circle_at_40%_100%,rgba(81,182,255,0.2),transparent_68%)]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:54px_54px] [mask-image:linear-gradient(to_bottom,transparent,black)]"
            />

            <div className="relative flex h-full flex-col">
              <div className="mb-16 flex items-start justify-between gap-6">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.06] text-[#9bd9ff]">
                  <ShieldCheck size={28} weight="duotone" aria-hidden="true" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/35">
                  Mimari standart
                </span>
              </div>

              <div className="mt-auto max-w-2xl">
                <h3 className="mb-5 text-[clamp(2.5rem,5vw,5.2rem)] font-medium leading-[0.95] tracking-[-0.055em]">
                  Veri koruması ürünün temelidir.
                </h3>
                <p className="max-w-xl text-base leading-7 text-white/58 sm:text-lg sm:leading-8">
                  Müşteri verisini, iş kurallarını ve erişim izinlerini aynı
                  mimari bütünlük içinde ele alıyor, güvenliği günlük geliştirme
                  sürecinin görünür bir parçası yapıyoruz.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-4 lg:gap-5">
            {principles.map((principle, index) => {
              const Icon = principle.icon;

              return (
                <Reveal
                  key={principle.title}
                  index={index}
                  className="group rounded-[2rem] border border-white/10 bg-white/[0.035] p-7 transition-colors hover:bg-white/[0.055] sm:p-9"
                >
                  <div className="grid gap-7 sm:grid-cols-[auto_1fr] sm:items-start">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-[#74c9ff]/8 text-[#8dd4ff] transition-colors group-hover:border-[#74c9ff]/25">
                      <Icon size={24} weight="duotone" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="mb-3 text-2xl font-medium tracking-[-0.035em]">
                        {principle.title}
                      </h3>
                      <p className="text-sm leading-6 text-white/52 sm:text-base sm:leading-7">
                        {principle.copy}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        <Reveal className="mt-5 flex flex-col gap-5 rounded-[2rem] border border-white/10 bg-white/[0.025] p-7 sm:flex-row sm:items-center sm:justify-between sm:p-9">
          <div className="flex items-center gap-4">
            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 text-white/62">
              <Code size={24} aria-hidden="true" />
            </span>
            <div>
              <p className="font-medium text-white/88">Yazılım mükemmelliği</p>
              <p className="mt-1 text-sm text-white/42">
                Okunabilir kod, kontrollü sürümler ve sürdürülebilir bakım.
              </p>
            </div>
          </div>
          <span className="text-sm font-medium text-[#8dd4ff]">
            Baştan sona sorumluluk
          </span>
        </Reveal>
      </div>
    </section>
  );
}
