import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
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
  title: "Vice Yazılım — Web Tasarım ve E-Ticaret Ajansı",
  description:
    "Vice Yazılım; profesyonel web tasarımı, özel yazılım geliştirme ve e-ticaret çözümleriyle markanızı dijitalde en iyi hâliyle inşa eder.",
  openGraph: {
    title: "Vice Yazılım — Web Tasarım ve E-Ticaret Ajansı",
    description:
      "Profesyonel web tasarımı, özel yazılım geliştirme ve e-ticaret çözümleri.",
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
        <Navbar />
        {children}
      </body>
    </html>
  );
}
