# Sosyal Medya Yönetimi sayfası — tasarım

Tarih: 2026-11-17 · Durum: onay bekliyor

## Amaç ve neden

Vice Yazılım sosyal medya yönetimi hizmeti veriyor ama sitede bunun bir sayfası yok.
Hizmetlerimiz menüsündeki **Dijital Pazarlama** kategorisinde, SEO ve Google Ads'in
yanında `/hizmetler/sosyal-medya-yonetimi` sayfası olacak. Sayfanın amacı, kurumların
(sektörden bağımsız) bu hizmetin neyi kapsadığını görüp iletişime geçmesi.

İçerik kaynağı: `Vice_Yazilim_Sosyal_Medya_Paketleri.pdf` (Kasım 2026). Bu PDF
denizcilik kurumlarına göre yazılmış, sayfa ise genel olacak.

## Hedefler

- Diğer hizmet sayfalarıyla (özellikle Google Ads ve SEO) aynı kalitede, aynı hareket
  dilinde ve aynı yapıda özel bir deneyim.
- Sektörden bağımsız metin. "Denizcilik" kelimesi sayfa metninde geçmeyecek.
- Gerçek işi gösterme: `public/vice-gallery/instagram-feed.m4v` videosu ve Özel Bodrum
  Denizcilik referansı.
- Diğer hizmetlerle aynı SEO altyapısı: metadata, `ServiceSeo` (JSON-LD),
  `ServiceKnowledge` (SSS bölümü).

## Kapsam dışı

- **Paket ve fiyat gösterilmeyecek** (kullanıcının kararı). Başlangıç, Standart ve
  Premium adları, adetler, TL tutarları, %15 çoklu kurum indirimi ve "fiyatlar 6 ayda
  bir güncellenir" notu sayfada yer almayacak.
- Yeni görsel üretimi yok. Görseller kodla (CSS/SVG) çizilecek, gerisi elimizdeki
  malzemeyle yapılacak.
- Ana sayfa ve diğer hizmet sayfaları değişmeyecek (sadece menü ve footer'a link
  eklenecek).

## Bunlar olursa iş başarısız sayılır

- PDF'te olmayan bir platform (TikTok, LinkedIn, YouTube, X) ya da bir vaat (takipçi
  sayısı, etkileşim oranı, garanti, "ücretsiz") sayfada geçerse.
- Sayfa diğer hizmet sayfalarının yanında sade ya da şablon gibi görünürse.
- Mobil Safari'de takılırsa. Repo'da yakın zamanda bu konuda düzeltmeler yapıldı,
  video ve sticky animasyonlar dikkat istiyor.

## Yaklaşımlar

| | Yaklaşım | Ödün | Karar |
|---|---|---|---|
| A | Google Ads iskeleti + kodla çizilmiş giriş görseli (CSS telefon, içinde Instagram feed videosu, etrafında post / story / reels / rapor kartları) | En çok emek isteyen yol, ama yeni görsel gerektirmiyor ve gerçek işi gösteriyor | **Seçildi** |
| B | Aynı iskelet + yapay zekâyla üretilmiş tek bir giriş görseli | Görsele bağımlı, beğenilmezse giriş yeniden yapılır | Seçilmedi |
| C | Kullanılmayan genel bileşenler (`ServiceHero`, `ProcessSteps`…) | Hızlı, ama diğer sayfaların yanında belirgin şekilde sade | Seçilmedi |

## Sayfa yapısı (yukarıdan aşağıya)

1. **Giriş (sticky, kaydırmayla ilerleyen, ~220svh)**. `GoogleAdsHero` ile aynı GSAP
   kalıbı.
   - Başlangıç: üst etiket "VICE Sosyal Medya", H1 "Markanız her gün görünür olsun.",
     altında kısa açıklama. Sağda CSS ile çizilmiş telefon. Telefonun ekranında
     `instagram-feed.m4v` sessiz ve döngüde oynar, poster olarak
     `instagram-video-poster.png` kullanılır.
   - Kaydırınca: giriş metni kaybolur, telefon büyüyüp öne gelir, etrafına 4 küçük kart
     açılır: Post, Story, Reels, Rapor. Ardından çözüm cümlesi gelir: "Paylaşım değil.
     Tutarlı bir marka dili kuruyoruz."
   - Hareket azaltma tercihi açıksa her şey statik, video otomatik oynamaz (poster
     gösterilir).
2. **Manifesto**: "Paylaşmak görünürlük sağlar. Güven, her gönderi aynı markayı
   anlattığında oluşur."
3. **Ne üretiyoruz**: 4 numaralı kart, Google Ads'teki `surfaces` bölümüyle aynı düzende,
   ikonlar Phosphor'dan.
   - 01 Post ve story tasarımı: markaya özel şablonlarla tutarlı görsel dil.
   - 02 Reels ve video: tanıtım, eğitim ve quiz formatında kısa videolar.
   - 03 Meta reklamları: kurulum, yönetim, reklam kreatifleri ve A/B testleri.
   - 04 Raporlama: aylık rapor ve strateji görüşmesi.
4. **Gerçek iş**: Özel Bodrum Denizcilik. `REFERENCES` içinden kendi kaydı
   (`getReference("ozel-bodrum-denizcilik")`) mevcut `ReferenceBanner` ile gösterilir.
   Kart Instagram'a gider, ayrı görsel gerekmez. Üstünde kısa başlık: "Bir kurum, tek
   görsel dil."
5. **Nasıl çalışırız**: PDF'teki 4 adım, Google Ads `operatingSystem` düzeninde.
   - 01 Tanışma ve ihtiyaç analizi
   - 02 Aylık içerik takvimi onayı
   - 03 Üretim, paylaşım ve reklam
   - 04 Ay sonu raporu ve yeni plan
6. **Netlik / güven**: "Sözleşme, içerik adetleri ve revizyon hakları baştan yazılı
   olarak netleşir. Reklam bütçesi doğrudan kurumun Meta hesabından ödenir." PDF'teki
   "sürpriz yok, gizli kalem yok" fikri fiyat vermeden anlatılır.
7. **Araçlar**: Instagram, Facebook, Meta Business Suite, Canva, Remotion. Google Ads
   `stack` rayı gibi. Altında marka sahipliği notu.
8. **Kapanış cümlesi + `ServiceCTA`**: "Kurumunuza özel içerik planını birlikte
   çıkaralım."
9. `ServiceKnowledge`: `SERVICES.socialMedia` içinden SSS bölümü.

Metinler bu dokümandaki taslaktır. Ton diğer sayfalarla aynı (kısa, iddialı ama ölçülü
cümleler). Yazarken küçük ifade değişiklikleri yapılabilir, ama kapsam ve vaat bu listeyi
aşmaz.

## `SERVICES.socialMedia` içeriği

- path `/hizmetler/sosyal-medya-yonetimi`, title "Sosyal Medya Yönetimi",
  serviceType "Sosyal medya yönetimi ve içerik üretimi".
- keywords: sosyal medya yönetimi, sosyal medya ajansı, Instagram yönetimi, reels
  video üretimi, Meta reklam yönetimi.
- capabilities: İçerik tasarımı / Video ve reels / Meta reklamları.
- SSS (taslak):
  - İçerik takvimi nasıl hazırlanıyor? → Her ay paylaşımlardan önce takvim
    hazırlanır ve onayınıza sunulur.
  - Reklam bütçesi hizmet bedeline dahil mi? → Hayır. Meta'ya ödenen reklam bütçesi
    doğrudan kurumun hesabından ödenir.
  - İçerik adetleri ve revizyonlar nasıl belirleniyor? → Kurumun ihtiyacına göre
    belirlenir, sözleşmede baştan yazılı olarak netleşir.

## Kayıt noktaları

- `src/lib/navigation.ts`: Dijital Pazarlama kategorisine "Sosyal Medya Yönetimi"
  (Google Ads'in altına).
- `src/components/layout/Footer.tsx`: hizmet listesine "Sosyal Medya".
- `src/lib/site.ts`: `INDEXABLE_ROUTES` listesine eklenir. Site haritası bu listeden
  otomatik üretilir.
- `public/llms.txt`: hizmet listesine satır.

## Teknik kararlar (benim kararlarım)

- Dosyalar: `src/app/hizmetler/sosyal-medya-yonetimi/page.tsx`,
  `src/components/services/social-media/{SocialMediaExperience.tsx,
  SocialMediaHero.tsx, SocialMediaExperience.module.css}`. Dosya yapısı Google Ads ile
  aynı.
- Renk paleti: koyu zemin (diğer sayfalarla aynı aile) ve Instagram'ı çağrıştıran
  sıcak bir vurgu degradesi (mor, pembe, turuncu). Logo kullanılmaz.
- Video: `muted playsInline loop`, `preload="none"`. Ekrana girince oynar,
  çıkınca durur (IntersectionObserver). Mobil Safari dostu.
- Animasyon: mevcut `@/lib/gsap` ve `useGSAP`. `gsap.matchMedia` ile hareket
  azaltma ayrı tutulur.
- Ek bağımlılık yok.

## Uygulayıcıya bırakılanlar

- Kartların mobildeki dizilimi, boşluklar ve tipografi ölçüleri: Google Ads modülündeki
  değerler referans alınır.
- Telefonun etrafındaki 4 kartın tam yerleşimi ve animasyon zamanlaması.

## Doğrulama

- `tsc` ve `eslint` temiz geçmeli.
- Yerel önizleme: masaüstü 1440px ve mobil 375px'te ekran görüntüsü, konsolda hata
  yok, hareket azaltma modu kontrol edilir.
- Menüde, footer'da ve `/sitemap.xml`'de yeni sayfa görünmeli.
- Canlıya alma ayrı onayla yapılır.
