import Image from "next/image";
import Link from "next/link";
import { MotionCard } from "@/components/motion/MotionCard";
import type { Project } from "@/lib/supabase/server";

export function ReferenceCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <Link href={`/referanslar/${project.slug}`} className="contents">
      <MotionCard
        index={index}
        tint={index % 2 === 0 ? "cool" : "warm"}
        className="overflow-hidden rounded-[1.75rem] bg-bg-elevated ring-1 ring-hairline transition-colors duration-300 group-hover:ring-hairline-strong"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          {project.cover_image_url && (
            <Image
              src={project.cover_image_url}
              alt={project.title}
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
            />
          )}
        </div>
        <div className="flex flex-col gap-2 p-6">
          {project.category && (
            <span className="text-[12px] font-medium uppercase tracking-[0.08em] text-fg-subtle">
              {project.category}
            </span>
          )}
          <h3 className="text-[19px] font-semibold tracking-tight text-fg">
            {project.title}
          </h3>
          {project.summary && (
            <p className="line-clamp-2 text-[14px] leading-relaxed text-fg-muted">
              {project.summary}
            </p>
          )}
        </div>
      </MotionCard>
    </Link>
  );
}
