export const SITE = {
  name: "Vice Yazılım",
  shortName: "VICE",
  url: "https://viceyazilim.com",
  locale: "tr_TR",
  language: "tr-TR",
  description:
    "Vice Yazılım; web tasarım, özel web yazılım, e-ticaret, UI/UX, SEO ve performans reklamlarını tek bir dijital büyüme sistemi olarak tasarlar.",
  email: "info@viceyazilim.com",
  phoneDisplay: "+90 552 688 75 56",
  phone: "+905526887556",
  whatsappDisplay: "+90 530 138 21 59",
  whatsapp: "+905301382159",
  instagram: "https://www.instagram.com/viceyazilim",
  facebook:
    "https://www.facebook.com/profile.php?id=61591721100777",
} as const;

export const DATA_CONTROLLER = {
  name: "Berken Timur",
  role: "Vice Yazılım sahibi",
  displayName: "Berken Timur — Vice Yazılım sahibi",
  address: "İstanbul / Küçükçekmece",
} as const;

export const CONTENT_LAST_UPDATED = "2026-08-31";

export const INDEXABLE_ROUTES = [
  "/",
  "/hizmetler/web-tasarim",
  "/hizmetler/ui-ux",
  "/hizmetler/web-yazilim",
  "/hizmetler/e-ticaret",
  "/hizmetler/seo",
  "/hizmetler/google-ads",
  "/referanslar",
  "/kurumsal/hakkimizda",
  "/iletisim",
  "/kvkk-aydinlatma-metni",
  "/gizlilik-politikasi",
] as const;

export function absoluteUrl(path = "/") {
  return new URL(path, SITE.url).toString();
}
