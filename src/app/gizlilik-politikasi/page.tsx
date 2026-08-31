import type { Metadata } from "next";
import {
  EditorialPage,
  EditorialSection,
} from "@/components/content/EditorialPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata, webPageJsonLd } from "@/lib/seo";
import { DATA_CONTROLLER, SITE } from "@/lib/site";

const description =
  "Vice Yazılım web sitesinin veri güvenliği, çerezler, formlar, üçüncü taraf bağlantıları ve gizlilik yaklaşımı.";

export const metadata: Metadata = createPageMetadata({
  title: "Gizlilik Politikası",
  description,
  path: "/gizlilik-politikasi",
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd
        data={webPageJsonLd({
          name: "Gizlilik Politikası",
          description,
          path: "/gizlilik-politikasi",
        })}
      />
      <EditorialPage
        eyebrow="Gizlilik"
        title="Gizlilik Politikası"
        lead="Veri minimizasyonunu temel alır; yalnızca açık bir amaç için gereken bilgiyi toplar ve erişimi sınırlandırırız."
        updated="31 Ağustos 2026"
      >
        <EditorialSection title="Toplanan bilgiler">
          <p>
            Siteyi yalnızca ziyaret ettiğinizde tarafımızca reklam veya davranış
            profili çerezi kurulmaz. İletişim ya da duyuru formunu gönderdiğinizde
            forma yazdığınız bilgiler, onay kapsamı ve güvenlik için gerekli
            teknik kayıtlar işlenir.
          </p>
        </EditorialSection>

        <EditorialSection title="Çerezler">
          <p>
            Genel site deneyiminde zorunlu olmayan pazarlama çerezi kullanılmaz.
            Yönetim panelindeki oturum çerezi yalnızca yetkili kullanıcının
            oturumunu güvenli biçimde sürdürmek için kullanılır; HttpOnly ve
            SameSite korumalarıyla tarayıcıya kaydedilir.
          </p>
        </EditorialSection>

        <EditorialSection title="Güvenlik ve saklama">
          <p>
            Kayıtlar erişim kontrolü bulunan veritabanında saklanır. Yönetim
            ekranı arama motorlarına kapalıdır ve yalnızca yetkili oturumla
            açılır. Saklama süreleri, silme yaklaşımı ve KVKK hakları için
            <a href="/kvkk-aydinlatma-metni"> KVKK Aydınlatma Metni’ni</a>
            {" "}inceleyebilirsiniz.
          </p>
        </EditorialSection>

        <EditorialSection title="Üçüncü taraf bağlantıları">
          <p>
            Referans, sosyal medya ve iletişim bağlantıları üçüncü taraf
            sitelere yönlendirebilir. Bu sitelerin gizlilik uygulamaları kendi
            sorumluluklarındadır; bağlantı açılmadan önce hedef adresi tarayıcıda
            görebilirsiniz.
          </p>
        </EditorialSection>

        <EditorialSection title="İletişim">
          <p>
            Veri sorumlusu {DATA_CONTROLLER.displayName}’dır; adresi
            {" "}{DATA_CONTROLLER.address}’dir. Gizlilik veya kişisel verilerle
            ilgili sorularınızı
            {" "}<a href={`mailto:${SITE.email}`}>{SITE.email}</a> adresine
            iletebilirsiniz.
          </p>
        </EditorialSection>
      </EditorialPage>
    </>
  );
}
