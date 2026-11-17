import type { Metadata } from "next";
import { SocialMediaExperience } from "@/components/services/social-media/SocialMediaExperience";
import { ServiceKnowledge } from "@/components/seo/ServiceKnowledge";
import { ServiceSeo } from "@/components/seo/ServiceSeo";
import { createPageMetadata } from "@/lib/seo";
import { SERVICES } from "@/lib/services";

const service = SERVICES.socialMedia;

export const metadata: Metadata = createPageMetadata({
  title: service.title,
  description: service.description,
  path: service.path,
  keywords: service.keywords,
});

export default function SocialMediaPage() {
  return (
    <main>
      <ServiceSeo service={service} />
      <SocialMediaExperience />
      <ServiceKnowledge service={service} />
    </main>
  );
}
