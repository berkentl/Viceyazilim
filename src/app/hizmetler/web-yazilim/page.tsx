import type { Metadata } from "next";
import { WebSoftwareExperience } from "@/components/services/web-software/WebSoftwareExperience";
import { ServiceKnowledge } from "@/components/seo/ServiceKnowledge";
import { ServiceSeo } from "@/components/seo/ServiceSeo";
import { createPageMetadata } from "@/lib/seo";
import { SERVICES } from "@/lib/services";

const service = SERVICES.webSoftware;

export const metadata: Metadata = createPageMetadata({
  title: service.title,
  description: service.description,
  path: service.path,
  keywords: service.keywords,
});

export default function WebYazilimPage() {
  return (
    <main>
      <ServiceSeo service={service} />
      <WebSoftwareExperience />
      <ServiceKnowledge service={service} />
    </main>
  );
}
