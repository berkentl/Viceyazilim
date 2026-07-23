import Link from "next/link";

export function ServiceCTA({ title }: { title: string }) {
  return (
    <section className="px-6 py-24 md:px-12 md:py-28">
      <div className="mx-auto flex max-w-4xl flex-col items-center rounded-[2rem] bg-bg-elevated px-8 py-16 text-center ring-1 ring-hairline">
        <h2 className="max-w-lg text-[clamp(1.5rem,3.5vw,2.25rem)] font-semibold leading-snug tracking-tight text-fg">
          {title}
        </h2>
        <Link
          href="/iletisim"
          className="group mt-8 flex shrink-0 items-center gap-2 rounded-full bg-fg py-2.5 pl-5 pr-2 text-[14px] font-medium text-bg transition-transform duration-150 ease-out active:scale-[0.97]"
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
      </div>
    </section>
  );
}
