import { ServiceCTA } from "@/components/services/ServiceCTA";
import { TechCoverflow } from "@/components/services/TechCoverflow";
import { SoftwareCapabilitiesBento } from "@/components/services/web-software/SoftwareCapabilitiesBento";
import { SoftwareRoutePicker } from "@/components/services/web-software/SoftwareRoutePicker";
import { SoftwareSecurity } from "@/components/services/web-software/SoftwareSecurity";
import { WebSoftwarePortal } from "@/components/services/web-software/WebSoftwarePortal";
import { WebSoftwareReveal } from "@/components/services/web-software/WebSoftwareReveal";

const technologies = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "Supabase",
  "PostgreSQL",
  "Vercel",
  "Cloudflare",
];

export function WebSoftwareExperience() {
  return (
    <div className="overflow-clip bg-[#080c13] text-white">
      <WebSoftwarePortal />
      <WebSoftwareReveal />
      <SoftwareCapabilitiesBento />
      <SoftwareRoutePicker />

      <section className="border-y border-white/[0.07] py-10 md:py-16">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="max-w-3xl">
            <h2 className="text-[clamp(2.2rem,5vw,4.75rem)] font-semibold leading-[0.96] tracking-[-0.055em]">
              Doğru teknoloji,
              <span className="block text-white/42">doğru ölçek.</span>
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/52 md:text-lg md:leading-8">
              Araçları alışkanlığa göre değil, ürünün hedefi ve büyüme planına göre seçiyoruz.
            </p>
          </div>
        </div>
        <TechCoverflow items={technologies} />
      </section>

      <SoftwareSecurity />
      <ServiceCTA title="Web yazılım fikrinizi çalışan bir ürüne dönüştürelim." />
    </div>
  );
}
