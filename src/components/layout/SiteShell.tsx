"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { AmbientGlow } from "@/components/motion/AmbientGlow";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isOperationalPage =
    pathname.startsWith("/yonetim") || pathname.startsWith("/kart");

  if (isOperationalPage) return children;

  return (
    <>
      <AmbientGlow />
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
