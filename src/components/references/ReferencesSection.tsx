import { FEATURED_REFERENCES } from "@/lib/references";
import { ReferencesStack } from "./ReferencesStack";

/**
 * Homepage portfolio section. One headline, the banners, one way out — the
 * artwork is the content, so nothing else competes with it for attention.
 */
export function ReferencesSection() {
  if (FEATURED_REFERENCES.length === 0) return null;

  return (
    <section className="px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto w-full max-w-[1400px]">
        <h2 className="max-w-3xl text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-fg">
          Seçilmiş işler.
        </h2>

        <div className="mt-12 md:mt-16">
          <ReferencesStack references={FEATURED_REFERENCES} />
        </div>
      </div>
    </section>
  );
}
