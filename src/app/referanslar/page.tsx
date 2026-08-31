import type { Metadata } from "next";
import { REFERENCES } from "@/lib/references";
import { ReferencesStack } from "@/components/references/ReferencesStack";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, SITE } from "@/lib/site";
import { breadcrumbJsonLd, createPageMetadata, webPageJsonLd } from "@/lib/seo";

const description = "Vice Yazılım'ın tasarladığı ve geliştirdiği web siteleri, e-ticaret altyapıları ve dijital ürünlerden seçilmiş referanslar.";

export const metadata: Metadata = createPageMetadata({
  title: "Referanslar",
  description,
  path: "/referanslar",
  keywords: ["web tasarım referansları", "yazılım projeleri", "Vice Yazılım projeleri"],
});

export default function ReferanslarPage() {
  return (
    <main className="flex flex-1 flex-col px-6 pb-24 pt-36 md:px-12 md:pb-32 md:pt-44">
      <JsonLd data={[
        webPageJsonLd({ name: "Vice Yazılım Referansları", description, path: "/referanslar", type: "CollectionPage" }),
        breadcrumbJsonLd([
          { name: "Ana Sayfa", path: "/" },
          { name: "Referanslar", path: "/referanslar" },
        ]),
        {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Vice Yazılım seçilmiş projeleri",
          itemListElement: REFERENCES.map((reference, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "CreativeWork",
              name: reference.client,
              headline: reference.headline,
              description: reference.body,
              url: reference.liveUrl ?? absoluteUrl("/referanslar"),
              creator: { "@id": `${SITE.url}/#organization` },
            },
          })),
        },
      ]} />
      <div className="mx-auto w-full max-w-[1400px]">
        <h1 className="max-w-3xl text-[clamp(2.25rem,5vw,3.75rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-fg">
          Referanslar.
        </h1>

        {REFERENCES.length === 0 ? (
          <p className="mt-8 text-[16px] text-fg-muted">
            Projeler çok yakında burada olacak.
          </p>
        ) : (
          <div className="mt-14 md:mt-20">
            <ReferencesStack references={REFERENCES} preloadFirst />
          </div>
        )}
      </div>
    </main>
  );
}
