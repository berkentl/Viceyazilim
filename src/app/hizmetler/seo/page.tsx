import type { Metadata } from "next";
import { SeoExperience } from "@/components/services/seo/SeoExperience";
import { ServiceKnowledge } from "@/components/seo/ServiceKnowledge";
import { ServiceSeo } from "@/components/seo/ServiceSeo";
import { createPageMetadata } from "@/lib/seo";
import { SERVICES } from "@/lib/services";

const service = SERVICES.seo;

export const metadata: Metadata = createPageMetadata({
  title: service.title,
  description: service.description,
  path: service.path,
  keywords: service.keywords,
});

export default function SeoPage() {
  return (
    <main>
      <ServiceSeo service={service} />
      <SeoExperience />
      <ServiceKnowledge service={service} />
    </main>
  );
}
