import Link from "next/link";
import { IntegralMark } from "@/components/IntegralMark";

export function Hero() {
  return (
    <section className="relative flex min-h-[92dvh] flex-col overflow-hidden">
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col items-center gap-14 px-6 pb-16 pt-36 md:flex-row md:items-center md:justify-between md:gap-12 md:px-12 md:pt-40">
        <div className="flex max-w-xl flex-col items-center text-center md:items-start md:text-left">
          <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-fg">
            Markanızı, ürününüzü ve yazılımınızı tek bir deneyimde
            birleştiriyoruz.
          </h1>
          <p className="mt-6 max-w-md text-[17px] leading-relaxed text-fg-muted">
            Vice Yazılım; profesyonel web tasarımı, özel yazılım geliştirme ve
            e-ticaret çözümleriyle markanızı dijitalde en iyi hâliyle inşa
            eder.
          </p>

          <div className="mt-10 flex flex-col items-center gap-5 sm:flex-row">
            <Link
              href="/iletisim"
              className="group flex shrink-0 items-center gap-2 rounded-full bg-fg py-2.5 pl-5 pr-2 text-[14px] font-medium text-bg transition-transform duration-150 ease-out active:scale-[0.97]"
            >
              <span>Projeni Konuşalım</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-bg/10 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  className="h-3.5 w-3.5 text-bg"
                  aria-hidden="true"
                >
                  <path
                    d="M4.5 11.5L11.5 4.5M11.5 4.5H5.5M11.5 4.5V10.5"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>

            <Link
              href="/referanslar"
              className="text-[14px] font-medium text-fg-muted transition-colors duration-200 hover:text-fg"
            >
              Referanslarımızı İnceleyin ↗
            </Link>
          </div>
        </div>

        <div className="flex w-full flex-1 items-center justify-center md:justify-end">
          <IntegralMark />
        </div>
      </div>
    </section>
  );
}
