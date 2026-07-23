export type NavLink = { label: string; href: string };
export type NavCategory = { label: string; links: NavLink[] };

export type NavItem =
  | { label: string; href: string }
  | { label: string; categories: NavCategory[] }
  | { label: string; links: NavLink[] };

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Hizmetlerimiz",
    categories: [
      {
        label: "Web Hizmetleri",
        links: [
          { label: "Web Tasarım", href: "/hizmetler/web-tasarim" },
          { label: "UI & UX", href: "/hizmetler/ui-ux" },
          { label: "Web Yazılım", href: "/hizmetler/web-yazilim" },
          { label: "E-Ticaret", href: "/hizmetler/e-ticaret" },
        ],
      },
      {
        label: "Dijital Pazarlama",
        links: [
          { label: "SEO", href: "/hizmetler/seo" },
          { label: "Google Ads Reklamları", href: "/hizmetler/google-ads" },
          {
            label: "Sosyal Medya Yönetimi",
            href: "/hizmetler/sosyal-medya-yonetimi",
          },
          {
            label: "Sosyal Medya Reklamları",
            href: "/hizmetler/sosyal-medya-reklamlari",
          },
        ],
      },
      {
        label: "Diğer Hizmetler",
        links: [
          {
            label: "Teknik Destek ve Bakım",
            href: "/hizmetler/teknik-destek-bakim",
          },
          { label: "Hosting ve Sunucu", href: "/hizmetler/hosting-sunucu" },
          { label: "Kurumsal Mail", href: "/hizmetler/kurumsal-mail" },
          { label: "İçerik Hizmeti", href: "/hizmetler/icerik-hizmeti" },
        ],
      },
    ],
  },
  {
    label: "Kurumsal",
    links: [
      { label: "Hakkımızda", href: "/kurumsal/hakkimizda" },
      { label: "VICE Alevi", href: "/kurumsal/vice-alevi" },
      { label: "Proje Süreçleri", href: "/kurumsal/proje-surecleri" },
    ],
  },
  { label: "Referanslar", href: "/referanslar" },
  { label: "Blog", href: "/blog" },
  { label: "İletişim", href: "/iletisim" },
];
