import { JsonLd } from "@/components/seo/JsonLd";
import {
  breadcrumbJsonLd,
  faqJsonLd,
  serviceJsonLd,
  webPageJsonLd,
} from "@/lib/seo";
import type { ServiceContent } from "@/lib/services";

export function ServiceSeo({ service }: { service: ServiceContent }) {
  return (
    <JsonLd
      data={[
        webPageJsonLd({
          name: service.title,
          description: service.description,
          path: service.path,
        }),
        serviceJsonLd({
          name: service.title,
          description: service.description,
          path: service.path,
          serviceType: service.serviceType,
        }),
        breadcrumbJsonLd([
          { name: "Ana Sayfa", path: "/" },
          { name: service.title, path: service.path },
        ]),
        faqJsonLd(service.questions),
      ]}
    />
  );
}
