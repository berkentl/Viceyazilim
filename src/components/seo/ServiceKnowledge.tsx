import type { ServiceContent } from "@/lib/services";

export function ServiceKnowledge({ service }: { service: ServiceContent }) {
  return (
    <section
      className="border-t border-white/[0.08] bg-[#05070b] px-6 py-24 text-white md:px-12 md:py-32"
      aria-labelledby="service-knowledge-title"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/42">
              Kısa cevap
            </p>
            <h2
              id="service-knowledge-title"
              className="mt-5 max-w-xl text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[1.04] tracking-[-0.04em]"
            >
              {service.heading}
            </h2>
          </div>
          <p className="max-w-2xl text-[clamp(1.05rem,1.8vw,1.35rem)] leading-8 text-white/64 lg:pt-9">
            {service.answer}
          </p>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-[2rem] bg-white/[0.09] ring-1 ring-white/[0.09] md:grid-cols-3">
          {service.capabilities.map((capability, index) => (
            <article
              key={capability.title}
              className="min-h-56 bg-[#090c12] p-7 md:p-9"
            >
              <span className="text-xs font-medium text-white/28">
                0{index + 1}
              </span>
              <h3 className="mt-12 text-xl font-semibold tracking-[-0.025em]">
                {capability.title}
              </h3>
              <p className="mt-4 text-[15px] leading-7 text-white/48">
                {capability.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-24 grid gap-10 lg:grid-cols-[0.58fr_1.42fr] lg:gap-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/42">
              Sık sorulanlar
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em]">
              Karar vermeden önce.
            </h2>
          </div>
          <dl className="divide-y divide-white/[0.1] border-y border-white/[0.1]">
            {service.questions.map((item) => (
              <div key={item.question} className="grid gap-4 py-7 md:grid-cols-[0.78fr_1.22fr] md:gap-10">
                <dt className="font-medium leading-7 text-white/86">
                  {item.question}
                </dt>
                <dd className="text-[15px] leading-7 text-white/48">
                  {item.answer}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
