import type { Metadata } from "next";
import { UiUxExperience } from "@/components/services/UiUxExperience";
import { ServiceKnowledge } from "@/components/seo/ServiceKnowledge";
import { ServiceSeo } from "@/components/seo/ServiceSeo";
import { createPageMetadata } from "@/lib/seo";
import { SERVICES } from "@/lib/services";

const service = SERVICES.uiUx;

export const metadata: Metadata = createPageMetadata({
  title: service.title,
  description: service.description,
  path: service.path,
  keywords: service.keywords,
});

export default function UiUxPage() {
  return (
    <main>
      <ServiceSeo service={service} />
      <UiUxExperience />
      <ServiceKnowledge service={service} />
    </main>
  );
}
