import type { Metadata } from "next";
import { EcommerceExperience } from "@/components/services/ecommerce/EcommerceExperience";
import { ServiceKnowledge } from "@/components/seo/ServiceKnowledge";
import { ServiceSeo } from "@/components/seo/ServiceSeo";
import { createPageMetadata } from "@/lib/seo";
import { SERVICES } from "@/lib/services";

const service = SERVICES.ecommerce;

export const metadata: Metadata = createPageMetadata({
  title: service.title,
  description: service.description,
  path: service.path,
  keywords: service.keywords,
});

export default function ETicaretPage() {
  return (
    <main>
      <ServiceSeo service={service} />
      <EcommerceExperience />
      <ServiceKnowledge service={service} />
    </main>
  );
}
