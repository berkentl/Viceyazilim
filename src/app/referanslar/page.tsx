import type { Metadata } from "next";
import { fetchAllProjects } from "@/lib/supabase/server";
import { ReferenceCard } from "@/components/references/ReferenceCard";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Referanslar — Vice Yazılım",
  description:
    "Vice Yazılım'ın tamamladığı web tasarım ve e-ticaret projelerinden seçkiler.",
};

export const revalidate = 300;

export default async function ReferanslarPage() {
  const projects = await fetchAllProjects();

  return (
    <main>
      <section className="px-6 pb-16 pt-40 text-center md:px-12 md:pt-48">
        <Reveal className="mx-auto flex max-w-3xl flex-col items-center">
          <h1 className="text-[clamp(2.25rem,5.5vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-fg">
            Tamamladığımız projeler
          </h1>
          <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-fg-muted">
            Farklı sektörlerden gerçek markalar için tasarladığımız ve
            geliştirdiğimiz web deneyimlerinden bir seçki.
          </p>
        </Reveal>
      </section>

      <section className="px-6 pb-28 md:px-12">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <ReferenceCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {!projects.length && (
          <p className="mx-auto max-w-md text-center text-[15px] text-fg-subtle">
            Referanslar yakında burada olacak.
          </p>
        )}
      </section>
    </main>
  );
}
