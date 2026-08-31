import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { hasAdminSession } from "@/lib/server/admin-auth";

export const metadata: Metadata = {
  title: "Yönetim Girişi",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  if (await hasAdminSession()) redirect("/yonetim");

  return (
    <main className="grid min-h-svh place-items-center bg-[#07090d] px-5 py-16 text-white">
      <section className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/[0.045] p-7 shadow-2xl shadow-black/35 backdrop-blur-xl sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/40">Vice CRM</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-[-0.04em]">Yönetim paneli</h1>
        <p className="mt-2 text-sm leading-6 text-white/50">İletişim taleplerini güvenli biçimde görüntüleyin ve takip edin.</p>
        <AdminLoginForm />
      </section>
    </main>
  );
}
