import { Reveal } from "@/components/motion/Reveal";

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export function ProcessSteps({ steps }: { steps: ProcessStep[] }) {
  return (
    <section className="px-6 py-24 md:px-12 md:py-28">
      <div className="mx-auto flex w-full max-w-4xl flex-col">
        {steps.map((step, index) => (
          <Reveal key={step.number} index={index}>
            <div
              className={`flex flex-col gap-2 py-8 sm:flex-row sm:items-baseline sm:gap-8 ${
                index !== steps.length - 1 ? "border-b border-hairline" : ""
              }`}
            >
              <span className="font-mono text-[14px] text-fg-subtle">
                {step.number}
              </span>
              <div className="flex-1">
                <h3 className="text-[19px] font-semibold tracking-tight text-fg">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-fg-muted">
                  {step.description}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
