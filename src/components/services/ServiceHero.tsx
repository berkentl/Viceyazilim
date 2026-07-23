import Link from "next/link";

export function ServiceHero({
  category,
  title,
  description,
}: {
  category: string;
  title: string;
  description: string;
}) {
  return (
    <section className="px-6 pb-16 pt-40 text-center md:px-12 md:pt-48">
      <div className="mx-auto flex max-w-3xl flex-col items-center">
        <div className="flex items-center gap-2 text-[13px] text-fg-subtle">
          <Link href="/" className="transition-colors duration-200 hover:text-fg-muted">
            Anasayfa
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-fg-muted">{category}</span>
        </div>

        <h1 className="mt-6 text-[clamp(2.25rem,5.5vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-fg">
          {title}
        </h1>
        <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-fg-muted">
          {description}
        </p>
      </div>
    </section>
  );
}
