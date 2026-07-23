import { MotionCard } from "@/components/motion/MotionCard";

export type BentoFeature = {
  title: string;
  description: string;
  tint: "cool" | "warm" | "green";
  size?: "lg" | "md";
};

export function FeatureBentoGrid({ features }: { features: BentoFeature[] }) {
  return (
    <section className="relative px-6 py-24 md:px-12 md:py-28">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
        {features.map((feature, index) => (
          <div
            key={feature.title}
            className={feature.size === "lg" ? "md:col-span-2" : "md:col-span-1"}
          >
            <MotionCard
              index={index}
              tint={feature.tint}
              className="rounded-[1.75rem] bg-bg-elevated p-8 ring-1 ring-hairline transition-colors duration-300 group-hover:ring-hairline-strong"
            >
              <h3 className="text-[19px] font-semibold tracking-tight text-fg">
                {feature.title}
              </h3>
              <p className="mt-3 max-w-sm text-[14px] leading-relaxed text-fg-muted">
                {feature.description}
              </p>
            </MotionCard>
          </div>
        ))}
      </div>
    </section>
  );
}
