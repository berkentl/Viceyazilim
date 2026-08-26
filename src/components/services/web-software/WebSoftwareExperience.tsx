import { ServiceCTA } from "@/components/services/ServiceCTA";
import { SoftwareCapabilitiesBento } from "@/components/services/web-software/SoftwareCapabilitiesBento";
import { WebSoftwareBrandMarquee } from "@/components/services/web-software/WebSoftwareBrandMarquee";
import { WebSoftwareTechnologies } from "@/components/services/web-software/WebSoftwareTechnologies";
import { WebSoftwarePortal } from "@/components/services/web-software/WebSoftwarePortal";
import { WebSoftwareReveal } from "@/components/services/web-software/WebSoftwareReveal";

export function WebSoftwareExperience() {
  return (
    <div className="overflow-clip bg-[#080c13] text-white">
      <WebSoftwarePortal />
      <WebSoftwareReveal />
      <SoftwareCapabilitiesBento />
      <WebSoftwareBrandMarquee />
      <WebSoftwareTechnologies />
      <ServiceCTA title="Web yazılım fikrinizi çalışan bir ürüne dönüştürelim." />
    </div>
  );
}
