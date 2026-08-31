export type ServiceContent = {
  path: string;
  title: string;
  heading: string;
  description: string;
  serviceType: string;
  keywords: string[];
  answer: string;
  capabilities: Array<{ title: string; description: string }>;
  questions: Array<{ question: string; answer: string }>;
};

export const SERVICES = {
  webDesign: {
    path: "/hizmetler/web-tasarim",
    title: "Web Tasarım Ajansı",
    heading: "Web tasarım, markanın dijitalde nasıl hissedildiğini belirler.",
    description:
      "Vice Yazılım; marka stratejisi, özgün arayüz, mobil uyumluluk, erişilebilirlik ve performansı birlikte ele alan profesyonel web tasarım hizmeti sunar.",
    serviceType: "Profesyonel web tasarım",
    keywords: [
      "web tasarım ajansı",
      "kurumsal web tasarım",
      "profesyonel web sitesi",
      "mobil uyumlu web tasarım",
    ],
    answer:
      "İyi bir web tasarım yalnızca estetik bir ekran değildir. Ziyaretçinin markayı saniyeler içinde anlamasını, aradığı bilgiye doğal biçimde ulaşmasını ve güvenle aksiyon almasını sağlayan ölçülebilir bir deneyimdir. Vice Yazılım; içerik hiyerarşisini, tasarım sistemini, hareket dilini, mobil davranışı ve teknik performansı aynı ürün sürecinde çözer.",
    capabilities: [
      {
        title: "Markaya özgü arayüz",
        description:
          "Hazır tema yerine markanın tonu, hedef kitlesi ve ticari hedefleri için tasarlanan özgün sistem.",
      },
      {
        title: "Mobil ve erişilebilir",
        description:
          "Telefon, tablet ve masaüstünde tutarlı; klavye ve ekran okuyucu kullanımını gözeten deneyim.",
      },
      {
        title: "Hız ve dönüşüm",
        description:
          "Core Web Vitals, içerik akışı ve çağrı noktalarını birlikte iyileştiren performans yaklaşımı.",
      },
    ],
    questions: [
      {
        question: "Web tasarım projesi ne kadar sürer?",
        answer:
          "Kapsama göre değişmekle birlikte kurumsal projeler çoğunlukla keşif, içerik, tasarım, geliştirme ve kalite kontrol adımlarıyla 4–10 hafta arasında tamamlanır.",
      },
      {
        question: "Tasarımlar hazır tema mı?",
        answer:
          "Hayır. Bilgi mimarisi ve görsel sistem markanın ihtiyaçlarına göre sıfırdan oluşturulur; gerektiğinde mevcut marka sistemiyle uyumlandırılır.",
      },
      {
        question: "SEO ve performans tasarıma dahil mi?",
        answer:
          "Teknik indekslenebilirlik, semantik HTML, mobil kullanım ve temel performans bütçesi tasarım kararlarının parçasıdır. Sürekli SEO çalışması ayrıca planlanabilir.",
      },
    ],
  },
  uiUx: {
    path: "/hizmetler/ui-ux",
    title: "UI ve UX Tasarım",
    heading: "UI ve UX tasarımı, karmaşık ürünleri anlaşılır davranışlara dönüştürür.",
    description:
      "Kullanıcı araştırması, ürün akışları, prototip, kullanılabilirlik ve tasarım sistemiyle sade, erişilebilir ve dönüşüm odaklı dijital ürünler tasarlıyoruz.",
    serviceType: "UI ve UX tasarım",
    keywords: [
      "UI UX tasarım ajansı",
      "kullanıcı deneyimi tasarımı",
      "ürün tasarımı",
      "tasarım sistemi",
    ],
    answer:
      "UI, bir ürünün nasıl göründüğünü; UX ise kullanıcının hedefe ne kadar kolay ulaştığını belirler. Etkili ürün tasarımı bu iki alanı araştırma, gerçek kullanım senaryoları ve ölçülebilir iş hedefleriyle birleştirir. Vice Yazılım; belirsiz fikirleri test edilebilir akışlara, prototiplere ve geliştirilebilir tasarım sistemlerine dönüştürür.",
    capabilities: [
      {
        title: "Araştırma ve akış",
        description:
          "Kullanıcı ihtiyacı, görev akışları ve karar noktalarının ürün hedefleriyle birlikte modellenmesi.",
      },
      {
        title: "Prototip ve test",
        description:
          "Kodlamadan önce davranışların görünür hâle getirildiği, hızlı öğrenmeye odaklı prototipler.",
      },
      {
        title: "Tasarım sistemi",
        description:
          "Ürün büyürken tutarlılığı koruyan erişilebilir bileşenler, kurallar ve tasarım tokenları.",
      },
    ],
    questions: [
      {
        question: "Mevcut bir ürünü iyileştirebilir misiniz?",
        answer:
          "Evet. Mevcut akışları, kullanıcı geri bildirimlerini ve analitik verileri inceleyerek sorunları önceliklendirir; aşamalı bir iyileştirme planı çıkarırız.",
      },
      {
        question: "Geliştirme ekibine nasıl teslim yapılır?",
        answer:
          "Akışlar, responsive durumlar, bileşen davranışları ve tasarım tokenları geliştiricinin uygulayabileceği açıklıkta belgelenir.",
      },
      {
        question: "Kullanılabilirlik testi yapıyor musunuz?",
        answer:
          "Projenin riskine göre moderasyonlu veya görev bazlı testler planlanır; bulgular etki ve uygulama maliyetine göre sıralanır.",
      },
    ],
  },
  webSoftware: {
    path: "/hizmetler/web-yazilim",
    title: "Özel Web Yazılım",
    heading: "Özel web yazılım, iş modelinize göre çalışan güvenli bir ürün altyapısıdır.",
    description:
      "SaaS platformları, yönetim panelleri, müşteri portalları, API entegrasyonları ve iş akışı otomasyonları için güvenli ve ölçeklenebilir web yazılımları geliştiriyoruz.",
    serviceType: "Özel web yazılım geliştirme",
    keywords: [
      "özel web yazılım",
      "web yazılım şirketi",
      "SaaS geliştirme",
      "yönetim paneli geliştirme",
      "API entegrasyonu",
    ],
    answer:
      "Hazır paketlerin sınırına takılan iş süreçleri için özel web yazılım; veri modelini, kullanıcı rollerini, entegrasyonları ve operasyon akışını doğrudan işletmeye göre kurar. Vice Yazılım, fikir aşamasından canlı ürüne kadar mimari, arayüz, güvenlik, test ve yayına alma süreçlerini tek ekip disipliniyle yönetir.",
    capabilities: [
      {
        title: "Ürün ve mimari",
        description:
          "İş hedeflerini kullanıcı rolleri, veri modeli, yetkilendirme ve sürdürülebilir teknik mimariye dönüştürme.",
      },
      {
        title: "Entegrasyon ve otomasyon",
        description:
          "Ödeme, ERP, CRM, kargo, e-posta ve üçüncü taraf API'leriyle güvenli veri akışları.",
      },
      {
        title: "Güvenli süreklilik",
        description:
          "Doğrulama, erişim kontrolü, gözlemlenebilirlik, yedekleme ve kontrollü sürümleme yaklaşımı.",
      },
    ],
    questions: [
      {
        question: "Hangi tür web yazılımları geliştiriyorsunuz?",
        answer:
          "SaaS ürünleri, müşteri ve bayi portalları, operasyon panelleri, rezervasyon sistemleri, iş akışı araçları ve API tabanlı platformlar geliştiriyoruz.",
      },
      {
        question: "Mevcut sistemlerle entegrasyon yapılabilir mi?",
        answer:
          "Dokümante edilmiş API veya güvenli veri aktarım yöntemi bulunan sistemlerle entegrasyon planlanabilir. Keşifte veri sahipliği ve hata senaryoları ayrıca değerlendirilir.",
      },
      {
        question: "Yayın sonrası bakım sunuyor musunuz?",
        answer:
          "Evet. İzleme, güvenlik güncellemeleri, hata çözümü ve ürün geliştirmeyi kapsayan ihtiyaca göre bakım planları oluşturulur.",
      },
    ],
  },
  ecommerce: {
    path: "/hizmetler/e-ticaret",
    title: "E-Ticaret Çözümleri",
    heading: "E-ticaret, vitrinden operasyona kadar tek bir satış sistemi olarak çalışmalıdır.",
    description:
      "Dönüşüm odaklı mağaza deneyimi, ödeme, stok, kargo, pazaryeri ve analitik entegrasyonlarıyla uçtan uca e-ticaret sistemleri kuruyoruz.",
    serviceType: "E-ticaret tasarım ve geliştirme",
    keywords: [
      "e-ticaret sitesi",
      "e-ticaret ajansı",
      "özel e-ticaret yazılımı",
      "dönüşüm optimizasyonu",
    ],
    answer:
      "Başarılı bir e-ticaret sistemi yalnızca ürün listelemez. Doğru ürünü bulmayı, güvenle ödeme yapmayı, siparişi eksiksiz işletmeyi ve müşteriyi ölçülebilir biçimde yeniden kazanmayı sağlar. Vice Yazılım; mağaza arayüzünü, ödeme ve lojistik akışlarını, ürün verisini ve pazarlama ölçümünü aynı sistem içinde tasarlar.",
    capabilities: [
      {
        title: "Dönüşüm deneyimi",
        description:
          "Kategori, arama, ürün, sepet ve ödeme adımlarında kararsızlığı azaltan mobil öncelikli alışveriş akışı.",
      },
      {
        title: "Operasyon bağlantıları",
        description:
          "Ödeme, stok, kargo, fatura ve pazaryeri süreçlerinin tutarlı veriyle birbirine bağlanması.",
      },
      {
        title: "Ölçüm ve büyüme",
        description:
          "Ürün performansı, dönüşüm hunisi ve kampanya verisini güvenilir biçimde ölçen analitik altyapı.",
      },
    ],
    questions: [
      {
        question: "Hazır altyapı mı özel yazılım mı seçilmeli?",
        answer:
          "Ürün sayısı, operasyon karmaşıklığı, entegrasyon ihtiyacı ve büyüme planına göre karar verilir. Gereksiz özel geliştirme yerine toplam sahip olma maliyetini optimize ederiz.",
      },
      {
        question: "Pazaryeri ve kargo entegrasyonu yapılır mı?",
        answer:
          "Seçilen altyapının ve sağlayıcının API imkânlarına göre stok, sipariş, kargo ve pazaryeri veri akışları kurulabilir.",
      },
      {
        question: "E-ticaret SEO çalışması dahil mi?",
        answer:
          "Teknik temel, ürün/kategori indekslenebilirliği ve yapılandırılmış veri kurulur. Kategori içerikleri, otorite ve sürekli büyüme ayrı SEO planında yürütülür.",
      },
    ],
  },
  seo: {
    path: "/hizmetler/seo",
    title: "SEO Hizmetleri ve Organik Büyüme",
    heading: "SEO, arama talebini sürdürülebilir ve ölçülebilir bir büyüme kanalına dönüştürür.",
    description:
      "Teknik SEO, arama niyeti, içerik mimarisi, yerel görünürlük, otorite ve ölçümü tek bir organik büyüme sisteminde birleştiriyoruz.",
    serviceType: "SEO ve organik büyüme danışmanlığı",
    keywords: [
      "SEO ajansı",
      "teknik SEO",
      "organik büyüme",
      "e-ticaret SEO",
      "GEO optimizasyonu",
    ],
    answer:
      "SEO; arama motorlarının siteyi doğru taraması, insanların gerçek sorularına güvenilir yanıt bulması ve bu görünürlüğün ticari sonuca bağlanmasıdır. Vice Yazılım, teknik sağlık, içerik kümeleri, sayfa deneyimi, kurum sinyalleri ve dönüşüm ölçümünü birlikte yönetir. GEO çalışmaları da aynı doğrulanabilir içerik ve indekslenebilirlik temelinin üzerine kurulur.",
    capabilities: [
      {
        title: "Teknik temel",
        description:
          "Tarama, indeksleme, canonical, sitemap, yapılandırılmış veri, render ve Core Web Vitals denetimi.",
      },
      {
        title: "Arama niyeti ve içerik",
        description:
          "Gerçek kullanıcı sorularına göre konu kümeleri, sayfa mimarisi ve cevap odaklı içerik planı.",
      },
      {
        title: "Otorite ve ölçüm",
        description:
          "Marka varlığı, güven sinyalleri, nitelikli bağlantılar ve organik dönüşümlerin düzenli izlenmesi.",
      },
    ],
    questions: [
      {
        question: "SEO sonucu ne zaman görülür?",
        answer:
          "Teknik düzeltmeler daha erken sinyal verebilir; rekabet, alan adı geçmişi ve içerik kapsamına bağlı olarak anlamlı organik büyüme çoğunlukla birkaç aylık düzenli çalışma gerektirir.",
      },
      {
        question: "GEO, klasik SEO'dan farklı mı?",
        answer:
          "GEO; içeriğin AI destekli arama ve yanıt sistemleri tarafından anlaşılmasını ve kaynak gösterilebilir olmasını hedefler. Temeli yine indekslenebilirlik, özgün bilgi, kurum güveni ve güçlü SEO'dur.",
      },
      {
        question: "Sıralama garantisi veriyor musunuz?",
        answer:
          "Hayır. Arama sonuçları üçüncü taraf algoritmalarına bağlıdır. Bunun yerine teknik kalite, görünürlük, nitelikli trafik ve dönüşüm gibi ölçülebilir göstergeler üzerinde çalışırız.",
      },
    ],
  },
  googleAds: {
    path: "/hizmetler/google-ads",
    title: "Google Ads Yönetimi",
    heading: "Google Ads, doğru arama niyetini ölçülebilir talebe dönüştürmelidir.",
    description:
      "Arama, Shopping, Performance Max ve yeniden pazarlama kampanyalarını doğru dönüşüm ölçümü, teklif ve optimizasyon sistemiyle yönetiyoruz.",
    serviceType: "Google Ads ve performans reklamları yönetimi",
    keywords: [
      "Google Ads ajansı",
      "Google reklam yönetimi",
      "Performance Max",
      "Google Shopping",
      "dönüşüm takibi",
    ],
    answer:
      "Etkili Google Ads yönetimi bütçe harcamak değil; doğru arama niyetini, güvenilir dönüşüm verisini ve sürdürülebilir teklif stratejisini aynı sistemde buluşturmaktır. Vice Yazılım; hesap yapısını, anahtar kelime ve kreatifleri, izleme altyapısını, açılış sayfasını ve optimizasyon ritmini ticari hedefe göre yönetir.",
    capabilities: [
      {
        title: "Ölçüm mimarisi",
        description:
          "Form, telefon, satış ve nitelikli talep sinyallerini kampanya kararlarına güvenilir biçimde taşıyan kurulum.",
      },
      {
        title: "Kampanya sistemi",
        description:
          "Arama, Shopping, Performance Max ve yeniden pazarlamanın hedefe göre ayrıştırılması.",
      },
      {
        title: "Sürekli optimizasyon",
        description:
          "Arama terimleri, teklifler, bütçe, kreatif ve açılış sayfası verisinin düzenli iyileştirilmesi.",
      },
    ],
    questions: [
      {
        question: "Google Ads bütçesi nasıl belirlenir?",
        answer:
          "Arama hacmi, tıklama maliyeti, hedef bölge, dönüşüm oranı ve müşteri değerine göre başlangıç bütçesi modellenir; yeterli veri geldikçe yeniden dağıtılır.",
      },
      {
        question: "Reklam hesabı kimin adına olur?",
        answer:
          "Hesap ve veriler müşterinin sahipliğinde kalır. Ajans erişimi rol bazlı verilir; şeffaf raporlama ve taşınabilirlik korunur.",
      },
      {
        question: "SEO ile Google Ads birlikte çalışır mı?",
        answer:
          "Evet. Reklamlar kısa vadeli talebi yakalarken arama terimi ve dönüşüm verisi içerik/SEO kararlarını besler; organik görünürlük de uzun vadede medya bağımlılığını azaltır.",
      },
    ],
  },
} satisfies Record<string, ServiceContent>;
