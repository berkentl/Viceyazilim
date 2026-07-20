import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://viceyazilim.com"),
  title: "Vice Yazılım — Çok Yakında",
  description:
    "Vice Yazılım'ın yeni web sitesi üzerinde çalışıyoruz. Marka, ürün ve yazılımı bir araya getiren deneyim çok yakında viceyazilim.com'da.",
  openGraph: {
    title: "Vice Yazılım — Çok Yakında",
    description:
      "Vice Yazılım'ın yeni web sitesi üzerinde çalışıyoruz. Çok yakında viceyazilim.com'da.",
    url: "https://viceyazilim.com",
    siteName: "Vice Yazılım",
    locale: "tr_TR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-fg">
        <div className="grain-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
