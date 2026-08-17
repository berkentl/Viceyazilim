import type { Metadata } from "next";
import { REFERENCES } from "@/lib/references";
import { ReferencesStack } from "@/components/references/ReferencesStack";

export const metadata: Metadata = {
  title: "Referanslar — Vice Yazılım",
  description:
    "Vice Yazılım'ın tasarladığı ve geliştirdiği web siteleri, e-ticaret altyapıları ve dijital ürünler.",
};

export default function ReferanslarPage() {
  return (
    <main className="flex flex-1 flex-col px-6 pb-24 pt-36 md:px-12 md:pb-32 md:pt-44">
      <div className="mx-auto w-full max-w-[1400px]">
        <h1 className="max-w-3xl text-[clamp(2.25rem,5vw,3.75rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-fg">
          Referanslar.
        </h1>

        {REFERENCES.length === 0 ? (
          <p className="mt-8 text-[16px] text-fg-muted">
            Projeler çok yakında burada olacak.
          </p>
        ) : (
          <div className="mt-14 md:mt-20">
            <ReferencesStack references={REFERENCES} preloadFirst />
          </div>
        )}
      </div>
    </main>
  );
}
