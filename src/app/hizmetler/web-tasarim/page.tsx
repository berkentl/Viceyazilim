import type { Metadata } from "next";
import { WebDesignExperience } from "@/components/services/WebDesignExperience";
import { ServiceKnowledge } from "@/components/seo/ServiceKnowledge";
import { ServiceSeo } from "@/components/seo/ServiceSeo";
import { createPageMetadata } from "@/lib/seo";
import { SERVICES } from "@/lib/services";

const service = SERVICES.webDesign;

export const metadata: Metadata = createPageMetadata({
  title: service.title,
  description: service.description,
  path: service.path,
  keywords: service.keywords,
});

export default function WebTasarimPage() {
  return (
    <main>
      <ServiceSeo service={service} />
      <WebDesignExperience />
      <ServiceKnowledge service={service} />
    </main>
  );
}
