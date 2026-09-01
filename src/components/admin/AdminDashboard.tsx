"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  LEAD_STATUSES,
  type Lead,
  type LeadStatus,
} from "@/lib/leads";

const STATUS_LABELS: Record<LeadStatus, string> = {
  new: "Yeni",
  contacted: "İletişime geçildi",
  qualified: "Nitelikli",
  won: "Kazanıldı",
  archived: "Arşiv",
};

const DATE_FORMATTER = new Intl.DateTimeFormat("tr-TR", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Europe/Istanbul",
});

export function AdminDashboard({ leads }: { leads: Lead[] }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<LeadStatus | "all">("all");
  const [kind, setKind] = useState<"all" | "contact" | "notify">("all");

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("tr-TR");
    return leads.filter((lead) => {
      const matchesStatus = status === "all" || lead.status === status;
      const matchesKind = kind === "all" || lead.kind === kind;
      const haystack = [lead.name, lead.email, lead.phone, lead.company, lead.message, lead.project_type]
        .filter(Boolean)
        .join(" ")
        .toLocaleLowerCase("tr-TR");
      return matchesStatus && matchesKind && (!normalizedQuery || haystack.includes(normalizedQuery));
    });
  }, [kind, leads, query, status]);

  const newCount = leads.filter((lead) => lead.status === "new").length;
  const contactCount = leads.filter((lead) => lead.kind === "contact").length;
  const notifyCount = leads.filter((lead) => lead.kind === "notify").length;

  async function logout() {
    await fetch("/api/admin/session", { method: "DELETE" });
    window.location.assign("/yonetim/giris");
  }

  return (
    <main className="min-h-svh bg-[#07090d] px-4 py-5 text-white sm:px-7 lg:px-10 lg:py-8">
      <div className="mx-auto max-w-[1500px]">
        <header className="flex flex-wrap items-center justify-between gap-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/35">Vice CRM</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">İletişim talepleri</h1>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/yonetim/nfc" className="rounded-full border border-white/12 px-4 py-2.5 text-sm text-white/70 transition hover:bg-white/7 hover:text-white">
              NFC Kartlar
            </Link>
            <Link href="/api/admin/leads/export" className="rounded-full border border-white/12 px-4 py-2.5 text-sm text-white/70 transition hover:bg-white/7 hover:text-white">
              CSV indir
            </Link>
            <button onClick={logout} className="rounded-full border border-white/12 px-4 py-2.5 text-sm text-white/70 transition hover:bg-white/7 hover:text-white">
              Çıkış
            </button>
          </div>
        </header>

        <section className="mt-8 grid gap-3 sm:grid-cols-3" aria-label="Özet">
          <Metric label="Yeni talep" value={newCount} accent="text-[#9ecbff]" />
          <Metric label="Proje talebi" value={contactCount} accent="text-white" />
          <Metric label="Bildirim kaydı" value={notifyCount} accent="text-[#d2b3ff]" />
        </section>

        <section className="mt-6 rounded-[1.75rem] border border-white/9 bg-white/[0.035] p-3 sm:p-4">
          <div className="grid gap-2 md:grid-cols-[minmax(14rem,1fr)_auto_auto]">
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Ad, e-posta, telefon veya mesaj ara"
              className="h-11 rounded-xl border border-white/9 bg-black/20 px-4 text-sm outline-none placeholder:text-white/25 focus:border-white/20"
            />
            <select value={kind} onChange={(event) => setKind(event.target.value as typeof kind)} className="h-11 rounded-xl border border-white/9 bg-[#101318] px-4 text-sm text-white/70 outline-none">
              <option value="all">Tüm türler</option>
              <option value="contact">Proje talepleri</option>
              <option value="notify">Bildirim kayıtları</option>
            </select>
            <select value={status} onChange={(event) => setStatus(event.target.value as typeof status)} className="h-11 rounded-xl border border-white/9 bg-[#101318] px-4 text-sm text-white/70 outline-none">
              <option value="all">Tüm durumlar</option>
              {LEAD_STATUSES.map((item) => <option key={item} value={item}>{STATUS_LABELS[item]}</option>)}
            </select>
          </div>

          <div className="mt-4 space-y-2">
            {filtered.length ? filtered.map((lead) => <LeadCard key={lead.id} lead={lead} />) : (
              <div className="grid min-h-48 place-items-center rounded-2xl border border-dashed border-white/10 text-sm text-white/35">Eşleşen kayıt bulunamadı.</div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

function Metric({ label, value, accent }: { label: string; value: number; accent: string }) {
  return (
    <div className="rounded-[1.5rem] border border-white/9 bg-white/[0.035] p-5">
      <p className="text-xs font-medium text-white/40">{label}</p>
      <p className={`mt-4 text-4xl font-semibold tracking-[-0.05em] ${accent}`}>{value}</p>
    </div>
  );
}

function LeadCard({ lead }: { lead: Lead }) {
  const router = useRouter();
  const [status, setStatus] = useState<LeadStatus>(lead.status);
  const [notes, setNotes] = useState(lead.notes);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");

  async function save() {
    setSaveState("saving");
    try {
      const response = await fetch(`/api/admin/leads/${lead.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, notes }),
      });
      if (!response.ok) throw new Error("Update failed");
      setSaveState("saved");
      router.refresh();
      window.setTimeout(() => setSaveState("idle"), 1600);
    } catch {
      setSaveState("error");
    }
  }

  return (
    <details className="group rounded-2xl border border-white/8 bg-black/18 open:border-white/14 open:bg-black/28">
      <summary className="grid cursor-pointer list-none gap-3 px-4 py-4 sm:grid-cols-[minmax(0,1.5fr)_minmax(10rem,.8fr)_auto] sm:items-center sm:px-5">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${lead.status === "new" ? "bg-[#8dc3ff]" : "bg-white/25"}`} />
            <p className="truncate text-sm font-semibold">{lead.name || lead.email}</p>
            <span className="rounded-full bg-white/7 px-2 py-0.5 text-[10px] uppercase tracking-wider text-white/40">{lead.kind === "contact" ? "Proje" : "Bildirim"}</span>
          </div>
          {lead.name && <p className="mt-1 truncate pl-4 text-xs text-white/38">{lead.email}</p>}
        </div>
        <p className="text-xs text-white/38">{DATE_FORMATTER.format(new Date(lead.created_at))}</p>
        <span className="w-fit rounded-full border border-white/9 px-2.5 py-1 text-[11px] text-white/52">{STATUS_LABELS[lead.status]}</span>
      </summary>

      <div className="border-t border-white/8 px-4 py-5 sm:px-5">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,.8fr)]">
          <dl className="grid content-start gap-x-5 gap-y-4 text-sm sm:grid-cols-2">
            <Data label="Ad soyad" value={lead.name} />
            <Data label="E-posta" value={lead.email} href={`mailto:${lead.email}`} />
            <Data label="Telefon" value={lead.phone} href={lead.phone ? `tel:${lead.phone.replace(/\s/g, "")}` : undefined} />
            <Data label="Şirket" value={lead.company} />
            <Data label="Proje türü" value={lead.project_type} />
            <Data label="Kaynak sayfa" value={lead.source} href={lead.source} />
            {lead.message && <div className="sm:col-span-2"><dt className="text-xs text-white/35">Mesaj</dt><dd className="mt-1.5 whitespace-pre-wrap leading-6 text-white/72">{lead.message}</dd></div>}
            <div className="sm:col-span-2 rounded-xl border border-white/7 bg-white/[0.025] p-3 text-xs leading-5 text-white/35">
              KVKK kayıt izi: {lead.consent_scope} · {lead.consent_version} · {DATE_FORMATTER.format(new Date(lead.consented_at))}
            </div>
          </dl>

          <div className="space-y-3 rounded-2xl border border-white/8 bg-white/[0.025] p-4">
            <label className="block text-xs text-white/40">
              Durum
              <select value={status} onChange={(event) => { setStatus(event.target.value as LeadStatus); setSaveState("idle"); }} className="mt-2 h-10 w-full rounded-xl border border-white/9 bg-[#111419] px-3 text-sm text-white outline-none">
                {LEAD_STATUSES.map((item) => <option key={item} value={item}>{STATUS_LABELS[item]}</option>)}
              </select>
            </label>
            <label className="block text-xs text-white/40">
              Dahili not
              <textarea value={notes} onChange={(event) => { setNotes(event.target.value); setSaveState("idle"); }} maxLength={5000} className="mt-2 min-h-28 w-full resize-y rounded-xl border border-white/9 bg-[#111419] p-3 text-sm leading-6 text-white outline-none" placeholder="Görüşme sonucu, takip tarihi…" />
            </label>
            <button onClick={save} disabled={saveState === "saving"} className="h-10 w-full rounded-xl bg-white text-sm font-semibold text-[#090b10] disabled:cursor-wait disabled:opacity-60">
              {saveState === "saving" ? "Kaydediliyor…" : saveState === "saved" ? "Kaydedildi" : saveState === "error" ? "Tekrar dene" : "Değişiklikleri kaydet"}
            </button>
          </div>
        </div>
      </div>
    </details>
  );
}

function Data({ label, value, href }: { label: string; value: string | null; href?: string }) {
  return (
    <div>
      <dt className="text-xs text-white/35">{label}</dt>
      <dd className="mt-1.5 break-words text-white/70">
        {value ? (href ? <a className="underline decoration-white/15 underline-offset-4 hover:text-white" href={href}>{value}</a> : value) : "—"}
      </dd>
    </div>
  );
}
