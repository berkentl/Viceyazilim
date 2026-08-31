import type { Metadata } from "next";
import { GoogleAdsExperience } from "@/components/services/google-ads/GoogleAdsExperience";
import { ServiceKnowledge } from "@/components/seo/ServiceKnowledge";
import { ServiceSeo } from "@/components/seo/ServiceSeo";
import { createPageMetadata } from "@/lib/seo";
import { SERVICES } from "@/lib/services";

const service = SERVICES.googleAds;

export const metadata: Metadata = createPageMetadata({
  title: service.title,
  description: service.description,
  path: service.path,
  keywords: service.keywords,
});

export default function GoogleAdsPage() {
  return (
    <main>
      <ServiceSeo service={service} />
      <GoogleAdsExperience />
      <ServiceKnowledge service={service} />
    </main>
  );
}
