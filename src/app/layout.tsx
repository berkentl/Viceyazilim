import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { SITE } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Vice Yazılım — Web Tasarım, Yazılım ve Dijital Büyüme Ajansı",
    template: "%s | Vice Yazılım",
  },
  description: SITE.description,
  applicationName: SITE.name,
  creator: SITE.name,
  publisher: SITE.name,
  category: "technology",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  keywords: [
    "web tasarım ajansı",
    "web yazılım şirketi",
    "e-ticaret ajansı",
    "UI UX tasarım",
    "SEO ajansı",
    "Google Ads yönetimi",
    "Vice Yazılım",
  ],
  alternates: {
    canonical: SITE.url,
    languages: {
      "tr-TR": SITE.url,
      "x-default": SITE.url,
    },
  },
  openGraph: {
    title: "Vice Yazılım — Web Tasarım, Yazılım ve Dijital Büyüme Ajansı",
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    locale: SITE.locale,
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Vice Yazılım — Dijital ürün ve büyüme ajansı",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vice Yazılım — Web Tasarım, Yazılım ve Dijital Büyüme Ajansı",
    description: SITE.description,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    ...(process.env.GOOGLE_SITE_VERIFICATION
      ? { google: process.env.GOOGLE_SITE_VERIFICATION }
      : {}),
    ...(process.env.BING_SITE_VERIFICATION
      ? { other: { "msvalidate.01": process.env.BING_SITE_VERIFICATION } }
      : {}),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className="h-full overflow-x-clip antialiased"
    >
      <body className="min-h-full flex flex-col overflow-x-clip bg-bg text-fg">
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        <div className="grain-overlay" aria-hidden="true" />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
