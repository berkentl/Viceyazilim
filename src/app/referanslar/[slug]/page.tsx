import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr/ArrowLeft";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import { getSupabaseServerClient, type Project } from "@/lib/supabase/server";
import { DeviceMockup } from "@/components/references/DeviceMockup";
import { Reveal } from "@/components/motion/Reveal";
import { ServiceCTA } from "@/components/services/ServiceCTA";

export const revalidate = 300;

async function getProject(slug: string) {
  const supabase = getSupabaseServerClient();
  const { data } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .maybeSingle<Project>();
  return data;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Vice Yazılım`,
    description: project.summary ?? undefined,
  };
}

export default async function ReferenceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  return (
    <main>
      <section className="px-6 pb-4 pt-32 md:px-12 md:pt-40">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/referanslar"
            className="inline-flex items-center gap-2 text-[14px] text-fg-subtle transition-colors duration-200 hover:text-fg-muted"
          >
            <ArrowLeft size={16} weight="light" />
            Referanslar
          </Link>
        </div>
      </section>

      <section className="px-6 py-10 md:px-12">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] md:items-center">
          <Reveal className="flex flex-col gap-6">
            {project.category && (
              <span className="w-fit rounded-full border border-hairline px-3 py-1 text-[12px] uppercase tracking-[0.08em] text-fg-subtle">
                {project.category}
              </span>
            )}

            <h1 className="text-[clamp(2rem,4.5vw,3rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-fg">
              {project.title}
            </h1>

            {project.summary && (
              <p className="max-w-md text-[16px] leading-relaxed text-fg-muted">
                {project.summary}
              </p>
            )}

            {project.services && project.services.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.services.map((service) => (
                  <span
                    key={service}
                    className="rounded-full bg-bg-elevated px-3 py-1 text-[12px] text-fg-muted ring-1 ring-hairline"
                  >
                    {service}
                  </span>
                ))}
              </div>
            )}

            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-fit items-center gap-2 rounded-full bg-fg py-2.5 pl-5 pr-2 text-[14px] font-medium text-bg transition-transform duration-150 ease-out active:scale-[0.97]"
              >
                <span>Canlı Siteyi Gör</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-bg/10 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight size={16} weight="regular" className="text-bg" />
                </span>
              </a>
            )}
          </Reveal>

          {project.mockup_asset_url && (
            <DeviceMockup
              type={project.mockup_type ?? "laptop"}
              imageSrc={project.mockup_asset_url}
              alt={project.title}
            />
          )}
        </div>
      </section>

      {project.body && (
        <section className="px-6 py-16 md:px-12">
          <Reveal className="mx-auto max-w-2xl">
            <p className="text-[17px] leading-relaxed text-fg-muted">
              {project.body}
            </p>
          </Reveal>
        </section>
      )}

      <ServiceCTA title="Sizin için de benzer bir proje inşa edelim." />
    </main>
  );
}
