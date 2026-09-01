import Image from "next/image";

/**
 * The site's one deliberately "committed" color moment (per our own
 * restrained-elsewhere palette rule) — a bold panel carrying a single
 * confident statement. A radial warm glow (not a two-hue linear gradient,
 * which read muddy at the OKLCH midpoint) keeps it consistent with the
 * glow language used everywhere else on the site.
 */
export function StatementBanner() {
  return (
    <section className="home-defer home-defer-statement px-6 py-8 md:px-12">
      <div
        className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] px-8 py-20 text-center md:py-28"
        style={{ background: "oklch(0.2 0.045 255)" }}
      >
        <div
          aria-hidden="true"
          className="home-soft-glow pointer-events-none absolute -right-24 -top-24 h-[26rem] w-[26rem] rounded-full opacity-70 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, oklch(0.55 0.11 78 / 55%), transparent 72%)",
          }}
        />
        <div
          aria-hidden="true"
          className="home-soft-glow pointer-events-none absolute -bottom-32 -left-16 h-[22rem] w-[22rem] rounded-full opacity-60 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, oklch(0.45 0.08 255 / 60%), transparent 72%)",
          }}
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-24 h-[680px] w-[520px] opacity-[0.05] md:-right-8 md:-top-32"
        >
          <Image
            src="/brand/mark-white.png"
            alt=""
            fill
            sizes="520px"
            className="object-cover"
          />
        </div>

        <div className="relative mx-auto max-w-2xl">
          <h2 className="text-[clamp(1.75rem,4.5vw,3rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-fg">
            Bir web sitesi ilk izlenimdir; biz onu unutulmaz kılıyoruz.
          </h2>
        </div>
      </div>
    </section>
  );
}
