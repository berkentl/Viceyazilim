import type { ReactNode } from "react";

export function EditorialPage({
  eyebrow,
  title,
  lead,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  updated?: string;
  children: ReactNode;
}) {
  return (
    <main className="relative flex-1 overflow-hidden bg-[#05070b] px-6 pb-28 pt-36 text-white md:px-12 md:pb-36 md:pt-44">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_72%_12%,rgba(83,122,191,0.2),transparent_48%)]"
        aria-hidden="true"
      />
      <article className="relative mx-auto max-w-5xl">
        <header className="max-w-3xl border-b border-white/[0.1] pb-14 md:pb-20">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/42">
            {eyebrow}
          </p>
          <h1 className="mt-6 text-[clamp(2.7rem,7vw,5.7rem)] font-semibold leading-[0.98] tracking-[-0.055em]">
            {title}
          </h1>
          <p className="mt-8 max-w-2xl text-[clamp(1.05rem,2vw,1.32rem)] leading-8 text-white/58">
            {lead}
          </p>
          {updated ? (
            <p className="mt-8 text-xs text-white/32">Son güncelleme: {updated}</p>
          ) : null}
        </header>

        <div className="editorial-content mt-14 grid gap-14 md:mt-20 md:gap-20">
          {children}
        </div>
      </article>
    </main>
  );
}

export function EditorialSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="grid gap-6 md:grid-cols-[0.62fr_1.38fr] md:gap-14">
      <h2 className="text-xl font-semibold tracking-[-0.025em] text-white/88">
        {title}
      </h2>
      <div className="grid gap-5 text-[15px] leading-7 text-white/54 [&_a]:text-white/84 [&_a]:underline [&_a]:decoration-white/25 [&_a]:underline-offset-4 [&_li]:pl-1 [&_strong]:font-semibold [&_strong]:text-white/82 [&_ul]:grid [&_ul]:list-disc [&_ul]:gap-2 [&_ul]:pl-5">
        {children}
      </div>
    </section>
  );
}
