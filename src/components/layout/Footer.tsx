import Link from "next/link";
import { BrandGlyph } from "@/components/BrandGlyph";

const COLUMNS = [
  {
    heading: "Hizmetler",
    links: [
      { label: "Web Tasarım", href: "/hizmetler/web-tasarim" },
      { label: "E-Ticaret", href: "/hizmetler/e-ticaret" },
      { label: "UI & UX", href: "/hizmetler/ui-ux" },
      { label: "SEO & Dijital Pazarlama", href: "/hizmetler/seo" },
    ],
  },
  {
    heading: "Kurumsal",
    links: [
      { label: "Hakkımızda", href: "/kurumsal/hakkimizda" },
      { label: "VICE Alevi", href: "/kurumsal/vice-alevi" },
      { label: "Proje Süreçleri", href: "/kurumsal/proje-surecleri" },
    ],
  },
  {
    heading: "Keşfet",
    links: [
      { label: "Referanslar", href: "/referanslar" },
      { label: "Blog", href: "/blog" },
      { label: "İletişim", href: "/iletisim" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-hairline">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-14 px-6 py-20 md:px-12 md:py-24">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2.5">
              <BrandGlyph className="h-8 w-6" />
              <span className="text-[15px] font-semibold tracking-tight text-fg">
                VICE
              </span>
            </Link>
            <p className="max-w-xs text-[14px] leading-relaxed text-fg-subtle">
              Profesyonel web tasarımı, özel yazılım geliştirme ve e-ticaret
              çözümleri.
            </p>
          </div>

          {COLUMNS.map((column) => (
            <div key={column.heading} className="flex flex-col gap-3.5">
              <span className="text-[13px] font-medium tracking-tight text-fg">
                {column.heading}
              </span>
              {column.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[14px] text-fg-subtle transition-colors duration-200 hover:text-fg-muted"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-2 border-t border-hairline pt-8 text-center md:flex-row md:justify-between md:text-left">
          <p className="text-[13px] text-fg-subtle">
            © {new Date().getFullYear()} Vice Yazılım. Tüm hakları saklıdır.
          </p>
          <a
            href="mailto:merhaba@viceyazilim.com"
            className="font-mono text-[12px] text-fg-subtle transition-colors duration-200 hover:text-fg-muted"
          >
            merhaba@viceyazilim.com
          </a>
        </div>
      </div>
    </footer>
  );
}
