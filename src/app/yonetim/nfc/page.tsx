import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminNfcDashboard } from "@/components/admin/AdminNfcDashboard";
import { hasAdminSession } from "@/lib/server/admin-auth";
import { listNfcCards } from "@/lib/server/nfc";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "NFC Yorum Kartları",
  robots: { index: false, follow: false },
};

export default async function AdminNfcPage() {
  if (!(await hasAdminSession())) redirect("/yonetim/giris");
  const cards = await listNfcCards();
  return (
    <AdminNfcDashboard
      cards={cards}
      googlePlacesConfigured={Boolean(process.env.GOOGLE_PLACES_API_KEY)}
    />
  );
}
