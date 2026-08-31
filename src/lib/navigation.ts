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
        ],
      },
    ],
  },
  {
    label: "Kurumsal",
    links: [
      { label: "Hakkımızda", href: "/kurumsal/hakkimizda" },
    ],
  },
  { label: "Referanslar", href: "/referanslar" },
  { label: "İletişim", href: "/iletisim" },
];
