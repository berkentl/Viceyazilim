import type { Metadata } from "next";
import {
  EditorialPage,
  EditorialSection,
} from "@/components/content/EditorialPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata, webPageJsonLd } from "@/lib/seo";
import { CONTENT_LAST_UPDATED, DATA_CONTROLLER, SITE } from "@/lib/site";

const description =
  "Vice Yazılım iletişim ve duyuru formlarında işlenen kişisel verilere ilişkin KVKK aydınlatma metni.";

export const metadata: Metadata = createPageMetadata({
  title: "KVKK Aydınlatma Metni",
  description,
  path: "/kvkk-aydinlatma-metni",
});

export default function KvkkNoticePage() {
  return (
    <>
      <JsonLd
        data={webPageJsonLd({
          name: "KVKK Aydınlatma Metni",
          description,
          path: "/kvkk-aydinlatma-metni",
        })}
      />
      <EditorialPage
        eyebrow="Kişisel veriler"
        title="KVKK Aydınlatma Metni"
        lead="Bu metin, viceyazilim.com üzerindeki iletişim ve duyuru formları aracılığıyla paylaştığınız kişisel verilerin hangi amaçlarla işlendiğini açıklar."
        updated="31 Ağustos 2026"
      >
        <EditorialSection title="1. Veri sorumlusu">
          <p>
            Kişisel verileriniz, veri sorumlusu sıfatıyla
            {" "}<strong>{DATA_CONTROLLER.name}</strong> ({DATA_CONTROLLER.role})
            {" "}tarafından işlenir. Veri sorumlusunun adresi
            {" "}<strong>{DATA_CONTROLLER.address}</strong>’dir.
          </p>
          <p>
            Sorularınız ve KVKK kapsamındaki başvurularınız için
            {" "}<a href={`mailto:${SITE.email}`}>{SITE.email}</a> adresini veya
            {" "}<a href={`tel:${SITE.phone}`}>{SITE.phoneDisplay}</a> numarasını
            kullanabilirsiniz. Başvurunuzda adınızı, talebinizi ve kimliğinizi
            doğrulamaya yardımcı iletişim bilgilerinizi belirtmeniz gerekir.
          </p>
        </EditorialSection>

        <EditorialSection title="2. İşlenen veriler">
          <ul>
            <li>Ad ve soyad</li>
            <li>E-posta adresi ve isteğe bağlı telefon numarası</li>
            <li>Proje türü, talep ve mesaj içeriği</li>
            <li>Formun gönderildiği sayfa, onay kapsamı ve onay zamanı</li>
            <li>
              Kötüye kullanımı önlemek için ham IP adresi saklanmadan üretilen
              geri döndürülemez güvenlik özeti
            </li>
          </ul>
        </EditorialSection>

        <EditorialSection title="3. İşleme amaçları">
          <ul>
            <li>Talebinizi değerlendirmek ve sizinle iletişime geçmek</li>
            <li>Proje kapsamı, teklif ve hizmet sürecini planlamak</li>
            <li>Form güvenliğini sağlamak ve kötüye kullanımı önlemek</li>
            <li>
              Ayrı açık rıza verdiğinizde duyuru ve bilgilendirme e-postaları
              göndermek
            </li>
            <li>Hukuki yükümlülükleri yerine getirmek ve hakları korumak</li>
          </ul>
        </EditorialSection>

        <EditorialSection title="4. Hukuki sebepler">
          <p>
            İletişim talebine yanıt verilmesi için gerekli veriler; KVKK’nın 5.
            maddesinin ikinci fıkrasında yer alan bir sözleşmenin kurulması veya
            ifasıyla doğrudan ilgili olma, veri sorumlusunun hukuki yükümlülüğünü
            yerine getirmesi ve temel haklarınıza zarar vermemek kaydıyla meşru
            menfaat hukuki sebeplerine dayanılarak işlenir. Duyuru ve pazarlama
            amaçlı iletişim ise açık rızanıza dayanır; rızanızı dilediğiniz zaman
            geri çekebilirsiniz.
          </p>
        </EditorialSection>

        <EditorialSection title="5. Aktarım ve altyapı">
          <p>
            Veriler; web barındırma ve dağıtım, veritabanı, güvenlik ve teknik
            bakım hizmeti sunan altyapı tedarikçileriyle yalnızca ilgili hizmetin
            gerektirdiği ölçüde paylaşılabilir. Bu alıcı grupları verileri
            bağımsız pazarlama amacıyla kullanamaz; veri sorumlusunun talimatları
            ve hizmetin teknik gereklilikleri kapsamında işler.
          </p>
          <p>
            Altyapı sağlayıcılarının yurt dışındaki veri merkezleri veya alt
            işleyenleri kullanması hâlinde aktarım, KVKK’nın 9. maddesindeki
            şartlardan uygulanabilir olanı ve gerekli güvence mekanizmaları
            sağlanarak yürütülür.
          </p>
        </EditorialSection>

        <EditorialSection title="6. Saklama süresi">
          <p>
            Proje ve iletişim talepleri, son anlamlı iletişim tarihinden itibaren
            en fazla 24 ay saklanır; devam eden sözleşme veya hukuki yükümlülük
            bulunması hâlinde ilgili süre boyunca korunur. Duyuru kayıtları,
            rızanızı geri çekene kadar veya 24 aylık hareketsizlik sonrasında
            silinir ya da anonimleştirilir.
          </p>
        </EditorialSection>

        <EditorialSection title="7. Haklarınız">
          <p>
            KVKK’nın 11. maddesi kapsamında verilerinizin işlenip işlenmediğini
            öğrenme, bilgi talep etme, düzeltme, silme veya yok etme isteme,
            aktarılan üçüncü kişilere bildirilmesini talep etme ve kanuni şartlar
            oluştuğunda itiraz etme haklarına sahipsiniz. Başvurunuzda kimliğinizi
            doğrulamaya yetecek bilgi ile talebinizi açıkça belirtmeniz gerekir.
          </p>
        </EditorialSection>

        <EditorialSection title="8. Toplama yöntemi">
          <p>
            Veriler elektronik ortamda, web formlarını sizin doldurmanız yoluyla
            doğrudan elde edilir. İletişim formundaki aydınlatma onayı, bu metni
            okuduğunuzu kaydeder; pazarlama amacı taşımayan iletişim talebinin tek
            hukuki dayanağı olarak yorumlanmaz.
          </p>
          <p className="text-xs text-white/34">
            Metin sürümü: KVKK-{CONTENT_LAST_UPDATED}
          </p>
        </EditorialSection>
      </EditorialPage>
    </>
  );
}
