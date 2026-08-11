import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import { getSupabaseServerClient, type Project } from "@/lib/supabase/server";
import { ReferenceCard } from "@/components/references/ReferenceCard";
import { Reveal } from "@/components/motion/Reveal";

export async function ReferencesPreview() {
  const supabase = getSupabaseServerClient();
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("featured", true)
    .order("sort_order", { ascending: true })
    .limit(3)
    .returns<Project[]>();

  if (!projects?.length) return null;

  return (
    <section className="px-6 py-24 md:px-12 md:py-28">
      <div className="mx-auto flex w-full max-w-6xl flex-col">
        <Reveal className="flex flex-col items-center gap-4 text-center md:flex-row md:items-end md:justify-between md:text-left">
          <div>
            <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-semibold tracking-[-0.03em] text-fg">
              Gerçek markalar, gerçek sonuçlar.
            </h2>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-fg-muted">
              Farklı sektörlerden markalar için tasarladığımız projelerden
              birkaçı.
            </p>
          </div>
          <Link
            href="/referanslar"
            className="group flex shrink-0 items-center gap-1.5 text-[14px] font-medium text-fg-muted transition-colors duration-200 hover:text-fg"
          >
            Tüm Referansları Gör
            <ArrowUpRight
              size={15}
              weight="regular"
              className="transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </Reveal>

        <div className="mt-12 grid w-full grid-cols-1 gap-6 md:grid-cols-3">
          {projects.map((project, index) => (
            <ReferenceCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
