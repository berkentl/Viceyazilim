import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { hasAdminSession } from "@/lib/server/admin-auth";
import { listLeads } from "@/lib/server/leads";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Vice CRM",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  if (!(await hasAdminSession())) redirect("/yonetim/giris");
  const leads = await listLeads();
  return <AdminDashboard leads={leads} />;
}
