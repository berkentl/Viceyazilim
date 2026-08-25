import Link from "next/link";

export function ReferencesCTA() {
  return (
    <section className="relative overflow-hidden px-6 py-20 md:px-12 md:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-[34rem] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(58,114,181,0.2)_0%,rgba(34,56,112,0.1)_42%,transparent_72%)] blur-2xl"
      />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
        <h2 className="text-[clamp(2rem,5vw,3.75rem)] font-medium leading-[1.08] tracking-[-0.04em] text-fg">
          Her projenin arkasında bir hikâye vardır.
        </h2>

        <Link
          href="/referanslar"
          className="mt-10 flex w-full max-w-sm items-center justify-center rounded-full border border-white/25 bg-[linear-gradient(100deg,#7428c9_0%,#5548dc_100%)] px-8 py-4 text-[17px] font-medium text-white shadow-[0_18px_55px_rgba(73,67,218,0.2)] transition-transform duration-150 ease-out-quart active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8c78ff] md:mt-12 md:py-5 md:text-lg"
        >
          Tüm Referanslar
        </Link>

        <Link
          href="/iletisim"
          className="mt-7 text-base font-medium text-fg-muted transition-colors duration-200 hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg/50 md:text-lg"
        >
          Projenizi Başlatın
        </Link>
      </div>
    </section>
  );
}
