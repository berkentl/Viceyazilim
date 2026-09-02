"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
  NFC_CARD_STATUSES,
  type NfcCard,
  type NfcCardStatus,
} from "@/lib/nfc";
import type { GoogleBusinessSearchResult } from "@/lib/google-places";
import { GoogleBusinessSearch } from "@/components/admin/GoogleBusinessSearch";

const STATUS_LABELS: Record<NfcCardStatus, string> = {
  inventory: "Stokta",
  active: "Aktif",
  paused: "Duraklatıldı",
  retired: "Kullanım dışı",
};

const STATUS_COLORS: Record<NfcCardStatus, string> = {
  inventory: "bg-white/25",
  active: "bg-[#73df9d]",
  paused: "bg-[#ffd37a]",
  retired: "bg-[#ff9188]",
};

const DATE_FORMATTER = new Intl.DateTimeFormat("tr-TR", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Europe/Istanbul",
});
const NUMBER_FORMATTER = new Intl.NumberFormat("tr-TR");

function formatDate(value: string | null) {
  return value ? DATE_FORMATTER.format(new Date(value)) : "Henüz yok";
}

export function AdminNfcDashboard({
  cards,
  googlePlacesConfigured,
}: {
  cards: NfcCard[];
  googlePlacesConfigured: boolean;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<NfcCardStatus | "all">("all");
  const [createState, setCreateState] = useState<"idle" | "loading" | "error">("idle");

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("tr-TR");
    return cards.filter((card) => {
      const matchesStatus = status === "all" || card.status === status;
      const haystack = [
        card.stock_code,
        card.public_code,
        card.business_name,
        card.contact_name,
        card.contact_email,
        card.contact_phone,
      ]
        .filter(Boolean)
        .join(" ")
        .toLocaleLowerCase("tr-TR");
      return matchesStatus && (!normalizedQuery || haystack.includes(normalizedQuery));
    });
  }, [cards, query, status]);

  const activeCount = cards.filter((card) => card.status === "active").length;
  const inventoryCount = cards.filter((card) => card.status === "inventory").length;
  const totalScans = cards.reduce((sum, card) => sum + card.scan_count, 0);
  const todayScans = cards.reduce((sum, card) => sum + card.today_scans, 0);

  async function createCard() {
    setCreateState("loading");
    try {
      const response = await fetch("/api/admin/nfc", { method: "POST" });
      if (!response.ok) throw new Error("Create failed");
      setCreateState("idle");
      router.refresh();
    } catch {
      setCreateState("error");
    }
  }

  async function logout() {
    await fetch("/api/admin/session", { method: "DELETE" });
    window.location.assign("/yonetim/giris");
  }

  return (
    <main className="min-h-svh bg-[#07090d] px-4 py-5 text-white sm:px-7 lg:px-10 lg:py-8">
      <div className="mx-auto max-w-[1500px]">
        <header className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">
              Vice NFC
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
              Google yorum kartları
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-white/60">
              Kartları işletmelere ata, yönlendirme bağlantılarını güncelle ve okutulmaları takip et.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/yonetim"
              className="rounded-full border border-white/12 px-4 py-2.5 text-sm text-white/70 transition hover:bg-white/7 hover:text-white"
            >
              Talepler
            </Link>
            <a
              href="/api/admin/nfc/export"
              download
              className="rounded-full border border-white/12 px-4 py-2.5 text-sm text-white/70 transition hover:bg-white/7 hover:text-white"
            >
              NFC tam yedeğini indir (CSV)
            </a>
            <button
              type="button"
              onClick={createCard}
              disabled={createState === "loading"}
              className="rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-[#090b10] transition hover:bg-white/90 disabled:cursor-wait disabled:opacity-55"
            >
              {createState === "loading" ? "Oluşturuluyor…" : "Yeni stok kartı"}
            </button>
            <button
              type="button"
              onClick={logout}
              className="rounded-full border border-white/12 px-4 py-2.5 text-sm text-white/70 transition hover:bg-white/7 hover:text-white"
            >
              Çıkış
            </button>
          </div>
        </header>

        {createState === "error" && (
          <p className="mt-4 rounded-xl border border-[#ff9188]/25 bg-[#ff9188]/8 px-4 py-3 text-sm text-[#ffb4ae]">
            Yeni kart oluşturulamadı. Lütfen yeniden deneyin.
          </p>
        )}

        <p className="mt-4 rounded-xl border border-[#73df9d]/15 bg-[#73df9d]/[0.045] px-4 py-3 text-xs leading-5 text-white/58">
          NFC kartları veritabanından silinemez. İşletme ve yönlendirme değişikliklerinin
          önceki hâlleri otomatik olarak saklanır; CSV yedeği tüm kart, işletme, bağlantı
          ve iletişim bilgilerini bilgisayarınıza indirir.
        </p>

        <section className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4" aria-label="Özet">
          <Metric label="Stoktaki kart" value={inventoryCount} accent="text-white" />
          <Metric label="Aktif kart" value={activeCount} accent="text-[#8ff0b3]" />
          <Metric label="Bugünkü okutma" value={todayScans} accent="text-[#9ecbff]" />
          <Metric label="Toplam okutma" value={totalScans} accent="text-[#d2b3ff]" />
        </section>

        <section className="mt-6 rounded-[1.75rem] border border-white/9 bg-white/[0.035] p-3 sm:p-4">
          <div className="grid gap-2 md:grid-cols-[minmax(14rem,1fr)_auto]">
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Kart kodu, işletme veya yetkili ara"
              className="h-11 rounded-xl border border-white/9 bg-black/20 px-4 text-sm outline-none placeholder:text-white/25 focus:border-white/20"
            />
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value as typeof status)}
              aria-label="Kart durumuna göre filtrele"
              className="h-11 rounded-xl border border-white/9 bg-[#101318] px-4 text-sm text-white/70 outline-none"
            >
              <option value="all">Tüm kartlar</option>
              {NFC_CARD_STATUSES.map((item) => (
                <option key={item} value={item}>
                  {STATUS_LABELS[item]}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-4 space-y-2">
            {filtered.length ? (
              filtered.map((card) => (
                <NfcCardEditor
                  key={card.id}
                  card={card}
                  googlePlacesConfigured={googlePlacesConfigured}
                />
              ))
            ) : (
              <div className="grid min-h-48 place-items-center rounded-2xl border border-dashed border-white/10 text-sm text-white/35">
                Eşleşen kart bulunamadı.
              </div>
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
      <p className="text-xs font-medium text-white/60">{label}</p>
      <p className={`mt-4 text-4xl font-semibold tracking-[-0.05em] ${accent}`}>
        {NUMBER_FORMATTER.format(value)}
      </p>
    </div>
  );
}

function NfcCardEditor({
  card,
  googlePlacesConfigured,
}: {
  card: NfcCard;
  googlePlacesConfigured: boolean;
}) {
  const router = useRouter();
  const [businessName, setBusinessName] = useState(card.business_name ?? "");
  const [googleReviewUrl, setGoogleReviewUrl] = useState(card.google_review_url ?? "");
  const [contactName, setContactName] = useState(card.contact_name ?? "");
  const [contactEmail, setContactEmail] = useState(card.contact_email ?? "");
  const [contactPhone, setContactPhone] = useState(card.contact_phone ?? "");
  const [status, setStatus] = useState<NfcCardStatus>(card.status);
  const [notes, setNotes] = useState(card.notes);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  function changed() {
    setSaveState("idle");
    setMessage("");
  }

  function selectGoogleBusiness(result: GoogleBusinessSearchResult) {
    setBusinessName(result.name);
    setGoogleReviewUrl(result.reviewUrl);
    changed();
  }

  async function copyNfcUrl() {
    await navigator.clipboard.writeText(card.nfc_url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  async function save() {
    setSaveState("saving");
    setMessage("");
    try {
      const response = await fetch(`/api/admin/nfc/${card.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName,
          googleReviewUrl,
          contactName,
          contactEmail,
          contactPhone,
          status,
          notes,
        }),
      });
      const payload = (await response.json().catch(() => null)) as { error?: string } | null;
      if (!response.ok) {
        setSaveState("error");
        setMessage(payload?.error ?? "Kart güncellenemedi.");
        return;
      }
      setSaveState("saved");
      router.refresh();
      window.setTimeout(() => setSaveState("idle"), 1800);
    } catch {
      setSaveState("error");
      setMessage("Sunucuya bağlanılamadı.");
    }
  }

  return (
    <details className="group rounded-2xl border border-white/8 bg-black/18 open:border-white/14 open:bg-black/28">
      <summary className="grid cursor-pointer list-none gap-3 px-4 py-4 sm:grid-cols-[8rem_minmax(0,1fr)_auto] sm:items-center sm:px-5">
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${STATUS_COLORS[card.status]}`} />
          <p className="font-mono text-sm font-semibold tracking-[0.08em]">{card.stock_code}</p>
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{card.business_name || "Atanmamış kart"}</p>
          <p className="mt-1 truncate text-xs text-white/55">
            {card.business_name ? `${card.scan_count} toplam okutma` : card.public_code}
          </p>
        </div>
        <span className="w-fit rounded-full border border-white/9 px-2.5 py-1 text-[11px] text-white/68">
          {STATUS_LABELS[card.status]}
        </span>
      </summary>

      <div className="border-t border-white/8 px-4 py-5 sm:px-5">
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1.2fr)_minmax(19rem,.8fr)]">
          <div className="space-y-5">
            <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-4">
              <p className="text-xs font-medium text-white/60">NFC etiketine yazılacak sabit adres</p>
              <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                <input
                  readOnly
                  value={card.nfc_url}
                  aria-label={`${card.stock_code} NFC adresi`}
                  className="h-11 min-w-0 flex-1 rounded-xl border border-white/9 bg-black/20 px-3 font-mono text-xs text-white/68 outline-none"
                />
                <button
                  type="button"
                  onClick={copyNfcUrl}
                  className="h-11 rounded-xl border border-white/10 px-4 text-sm font-medium text-white/72 transition hover:bg-white/7 hover:text-white"
                >
                  {copied ? "Kopyalandı" : "Adresi kopyala"}
                </button>
              </div>
              <p className="mt-2 text-xs leading-5 text-white/55">
                Bu adres değişmez. İşletmenin Google bağlantısını aşağıdan istediğiniz zaman güncelleyebilirsiniz.
              </p>
            </div>

            <GoogleBusinessSearch
              initialQuery={businessName}
              onSelect={selectGoogleBusiness}
              configured={googlePlacesConfigured}
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="İşletme adı">
                <input
                  value={businessName}
                  onChange={(event) => { setBusinessName(event.target.value); changed(); }}
                  maxLength={160}
                  placeholder="Örn. Boğaz Cafe"
                  className="admin-nfc-input"
                />
              </Field>
              <Field label="Durum">
                <select
                  value={status}
                  onChange={(event) => { setStatus(event.target.value as NfcCardStatus); changed(); }}
                  className="admin-nfc-input"
                >
                  {NFC_CARD_STATUSES.map((item) => (
                    <option key={item} value={item}>{STATUS_LABELS[item]}</option>
                  ))}
                </select>
              </Field>
            </div>

            <Field label="Google doğrudan yorum bağlantısı">
              <div className="flex flex-col gap-2 sm:flex-row">
                <input
                  type="url"
                  value={googleReviewUrl}
                  onChange={(event) => { setGoogleReviewUrl(event.target.value); changed(); }}
                  maxLength={2048}
                  placeholder="https://g.page/r/.../review"
                  className="admin-nfc-input min-w-0 flex-1"
                />
                {googleReviewUrl && (
                  <a
                    href={googleReviewUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="grid h-11 place-items-center rounded-xl border border-white/10 px-4 text-sm text-white/68 transition hover:bg-white/7 hover:text-white"
                  >
                    Bağlantıyı test et
                  </a>
                )}
              </div>
            </Field>

            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="Yetkili adı">
                <input value={contactName} onChange={(event) => { setContactName(event.target.value); changed(); }} maxLength={160} className="admin-nfc-input" />
              </Field>
              <Field label="E-posta">
                <input type="email" value={contactEmail} onChange={(event) => { setContactEmail(event.target.value); changed(); }} maxLength={254} className="admin-nfc-input" />
              </Field>
              <Field label="Telefon">
                <input type="tel" value={contactPhone} onChange={(event) => { setContactPhone(event.target.value); changed(); }} maxLength={40} className="admin-nfc-input" />
              </Field>
            </div>

            <Field label="Dahili not">
              <textarea
                value={notes}
                onChange={(event) => { setNotes(event.target.value); changed(); }}
                maxLength={3000}
                className="admin-nfc-input min-h-24 resize-y py-3"
                placeholder="Teslimat, kurulum veya müşteri notu…"
              />
            </Field>
          </div>

          <aside className="space-y-3 rounded-2xl border border-white/8 bg-white/[0.025] p-4">
            <div className="grid grid-cols-2 gap-2">
              <Stat label="Bugün" value={card.today_scans} />
              <Stat label="Son 30 gün" value={card.last_30_day_scans} />
              <Stat label="Toplam" value={card.scan_count} />
              <Stat label="Durum" value={STATUS_LABELS[card.status]} />
            </div>
            <dl className="space-y-3 border-t border-white/8 pt-4 text-xs">
              <Data label="Son okutma" value={formatDate(card.last_scanned_at)} />
              <Data label="Etkinleştirme" value={formatDate(card.activated_at)} />
              <Data label="Genel kod" value={card.public_code} mono />
            </dl>
            {message && <p className="text-sm leading-5 text-[#ffb4ae]" role="alert">{message}</p>}
            <button
              type="button"
              onClick={save}
              disabled={saveState === "saving"}
              className="h-11 w-full rounded-xl bg-white text-sm font-semibold text-[#090b10] disabled:cursor-wait disabled:opacity-60"
            >
              {saveState === "saving"
                ? "Kaydediliyor…"
                : saveState === "saved"
                  ? "Kaydedildi"
                  : saveState === "error"
                    ? "Tekrar dene"
                    : "Kartı kaydet"}
            </button>
          </aside>
        </div>
      </div>
    </details>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-xs text-white/65">
      <span className="mb-2 block">{label}</span>
      {children}
    </label>
  );
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-xl border border-white/7 bg-black/16 p-3">
      <p className="text-[10px] text-white/60">{label}</p>
      <p className="mt-2 text-lg font-semibold tracking-[-0.03em] text-white/82">
        {typeof value === "number" ? NUMBER_FORMATTER.format(value) : value}
      </p>
    </div>
  );
}

function Data({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <dt className="text-white/60">{label}</dt>
      <dd className={`mt-1 text-white/75 ${mono ? "font-mono tracking-[0.08em]" : ""}`}>{value}</dd>
    </div>
  );
}
