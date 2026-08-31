import type { Metadata } from "next";
import Link from "next/link";
import {
  EditorialPage,
  EditorialSection,
} from "@/components/content/EditorialPage";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  breadcrumbJsonLd,
  createPageMetadata,
  webPageJsonLd,
} from "@/lib/seo";

const description =
  "Vice Yazılım; tasarım, yazılım ve dijital büyümeyi tek ürün disiplini altında birleştiren Türkiye merkezli bir dijital ürün ajansıdır.";

export const metadata: Metadata = createPageMetadata({
  title: "Hakkımızda",
  description,
  path: "/kurumsal/hakkimizda",
  keywords: [
    "Vice Yazılım hakkında",
    "dijital ürün ajansı",
    "web tasarım ve yazılım ekibi",
  ],
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            name: "Vice Yazılım Hakkında",
            description,
            path: "/kurumsal/hakkimizda",
            type: "AboutPage",
          }),
          breadcrumbJsonLd([
            { name: "Ana Sayfa", path: "/" },
            { name: "Hakkımızda", path: "/kurumsal/hakkimizda" },
          ]),
        ]}
      />
      <EditorialPage
        eyebrow="Vice Yazılım"
        title="Dijital ürünleri tek bir sistem gibi tasarlıyoruz."
        lead="Vice Yazılım; marka, arayüz, yazılım ve büyüme kararlarının birbirinden kopmadığı dijital deneyimler üretir. Amacımız yalnızca yayına çıkan değil, kullanıldıkça değer üreten ürünler kurmaktır."
      >
        <EditorialSection title="Biz kimiz?">
          <p>
            Türkiye genelindeki markalara web tasarım, özel web yazılım,
            e-ticaret, UI/UX, SEO ve Google Ads hizmetleri sunan bir dijital
            ürün ekibiyiz. Her projeyi estetik, teknik kalite ve ticari sonuç
            arasında kurulan ortak bir sistem olarak ele alırız.
          </p>
          <p>
            Tasarım kararlarını geliştirilebilirlikten; yazılım kararlarını
            kullanıcı deneyiminden; pazarlama kararlarını ise ölçümden ayrı
            düşünmeyiz. Böylece proje tesliminde kopuk parçalar yerine aynı
            hedefe çalışan bir ürün ortaya çıkar.
          </p>
        </EditorialSection>

        <EditorialSection title="Nasıl çalışırız?">
          <ul>
            <li>
              <strong>Önce problemi tanımlarız:</strong> hedef, kullanıcı,
              içerik, veri ve teknik sınırlar netleşmeden çözüm üretmeyiz.
            </li>
            <li>
              <strong>Kararları görünür kılarız:</strong> akış, prototip ve
              ölçüm planıyla riskleri geliştirmeden önce azaltırız.
            </li>
            <li>
              <strong>Tek sistem kurarız:</strong> marka dili, arayüz,
              yazılım, SEO ve kampanya verisi aynı ürün hedefini destekler.
            </li>
            <li>
              <strong>Yayın sonrasını planlarız:</strong> performans, bakım ve
              geliştirme kararlarını gerçek kullanım verisiyle sürdürürüz.
            </li>
          </ul>
        </EditorialSection>

        <EditorialSection title="Neye inanıyoruz?">
          <p>
            İyi dijital ürün; gereksiz karmaşıklığı azaltır, ne yaptığını açık
            anlatır ve kullanıcıya saygılı davranır. Bu nedenle erişilebilirlik,
            performans, güvenlik ve veri sorumluluğu bizim için sonradan eklenen
            kontroller değil, ürün kalitesinin temel parçalarıdır.
          </p>
        </EditorialSection>

        <EditorialSection title="Birlikte çalışalım">
          <p>
            Yeni bir ürün kuruyor veya mevcut deneyiminizi iyileştirmek
            istiyorsanız ihtiyacınızı birkaç cümleyle paylaşabilirsiniz.
          </p>
          <p>
            <Link href="/iletisim">Projenizi anlatın →</Link>
          </p>
        </EditorialSection>
      </EditorialPage>
    </>
  );
}
