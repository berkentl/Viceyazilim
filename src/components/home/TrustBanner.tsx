const PRINCIPLES = [
  {
    number: "01",
    title: "Güvenlik, hız ve sürdürülebilirlik.",
    body: "Her projeyi test edilebilir ve ölçeklenebilir bir mimariyle kuruyoruz. Temiz kod ve ölçülebilir performans, ürününüzün uzun vadede sorunsuz çalışmasını sağlar.",
  },
  {
    number: "02",
    title: "Süreç boyunca aynı masadayız.",
    body: "Takvim, kapsam ve fiyatlandırma en başından nettir. Doğrudan iletişim kurar, ilerlemeyi görünür tutar ve her kararı birlikte alırız.",
  },
] as const;

/**
 * A single editorial surface instead of a row of generic feature cards.
 * The restrained hierarchy keeps the section calm after the portfolio's
 * image-heavy sequence and lets the copy do the work.
 */
export function TrustBanner() {
  return (
    <section className="px-6 pb-28 pt-16 md:px-12 md:pb-36 md:pt-20">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-[#edf2f5] text-[#101820] md:rounded-[2.75rem]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(circle at 12% 18%, rgba(255,255,255,0.94), transparent 32%), radial-gradient(circle at 88% 8%, rgba(209,223,232,0.72), transparent 34%), radial-gradient(circle at 68% 92%, rgba(255,255,255,0.78), transparent 38%)",
          }}
        />

        <div className="relative px-7 py-10 sm:px-10 sm:py-12 md:px-16 md:py-16 lg:px-20 lg:py-20">
          <header className="grid gap-7 pb-12 md:grid-cols-[minmax(0,1.15fr)_minmax(17rem,0.65fr)] md:items-end md:gap-12 md:pb-16">
            <div>
              <p className="text-[0.78rem] font-medium tracking-[-0.012em] text-[#52606a]">
                Çalışma ilkelerimiz
              </p>
              <h2 className="mt-5 max-w-3xl text-[clamp(2.35rem,5.5vw,5.25rem)] font-semibold leading-[0.98] tracking-[-0.055em]">
                Sağlam işler,
                <br />
                açık süreçler.
              </h2>
            </div>

            <p className="max-w-md text-[1rem] font-medium leading-[1.65] tracking-[-0.012em] text-[#53606a] md:pb-1 md:text-[1.08rem]">
              İyi bir dijital ürün yalnızca güzel görünmez. Güven verir,
              hızlı çalışır ve geliştikçe değerini korur.
            </p>
          </header>

          <div className="border-t border-[#101820]/15">
            {PRINCIPLES.map((principle) => (
              <article
                key={principle.number}
                className="grid gap-6 border-b border-[#101820]/15 py-10 last:border-b-0 md:grid-cols-[4.5rem_minmax(0,0.85fr)_minmax(20rem,1fr)] md:gap-10 md:py-14"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 font-sans text-[0.75rem] font-semibold tracking-[-0.01em] text-[#3f4b54] ring-1 ring-inset ring-[#101820]/30 md:h-11 md:w-11">
                  {principle.number}
                </span>

                <h3 className="max-w-md text-[clamp(1.65rem,3vw,2.75rem)] font-semibold leading-[1.06] tracking-[-0.042em]">
                  {principle.title}
                </h3>

                <p className="max-w-[34rem] text-[1rem] leading-[1.72] tracking-[-0.01em] text-[#56636c] md:text-[1.08rem]">
                  {principle.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
