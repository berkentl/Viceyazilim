"use client";

import { FormEvent, useId, useState } from "react";
import type { GoogleBusinessSearchResult } from "@/lib/google-places";

type SearchState = "idle" | "loading" | "success" | "error";

type GoogleBusinessSearchProps = {
  initialQuery: string;
  configured: boolean;
  onSelect: (result: GoogleBusinessSearchResult) => void;
};

const BUSINESS_STATUS_LABELS: Record<string, string> = {
  OPERATIONAL: "Açık",
  CLOSED_TEMPORARILY: "Geçici kapalı",
  CLOSED_PERMANENTLY: "Kalıcı kapalı",
};

export function GoogleBusinessSearch({
  initialQuery,
  configured,
  onSelect,
}: GoogleBusinessSearchProps) {
  const inputId = useId();
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<GoogleBusinessSearchResult[]>([]);
  const [state, setState] = useState<SearchState>("idle");
  const [message, setMessage] = useState("");

  async function search(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!configured) return;
    const normalizedQuery = query.trim();
    if (normalizedQuery.length < 3) {
      setState("error");
      setMessage("İşletme adıyla birlikte ilçe veya şehir yazın.");
      setResults([]);
      return;
    }

    setState("loading");
    setMessage("");

    try {
      const response = await fetch(
        `/api/admin/google-places?q=${encodeURIComponent(normalizedQuery)}`,
        { cache: "no-store" },
      );
      const payload = (await response.json().catch(() => null)) as
        | { results?: GoogleBusinessSearchResult[]; error?: string }
        | null;

      if (!response.ok) {
        setState("error");
        setResults([]);
        setMessage(payload?.error ?? "İşletme aranamadı.");
        return;
      }

      const nextResults = payload?.results ?? [];
      setResults(nextResults);
      setState("success");
      setMessage(
        nextResults.length
          ? "Doğru şubeyi adresinden kontrol ederek seçin."
          : "Eşleşen işletme bulunamadı. Adın yanına ilçe ve şehir ekleyin.",
      );
    } catch {
      setState("error");
      setResults([]);
      setMessage("Sunucuya bağlanılamadı. Yeniden deneyin.");
    }
  }

  function selectResult(result: GoogleBusinessSearchResult) {
    onSelect(result);
    setQuery(result.name);
    setResults([]);
    setState("success");
    setMessage(`${result.name} seçildi. Kartı kaydederek işlemi tamamlayın.`);
  }

  return (
    <div className="rounded-2xl border border-[#9ecbff]/15 bg-[#9ecbff]/[0.045] p-4">
      <form onSubmit={search}>
        <label htmlFor={inputId} className="block text-xs text-white/65">
          <span className="block font-medium text-white/75">Google’da işletme ara</span>
          <span className="mt-1 block leading-5 text-white/45">
            Doğru şubeyi bulmak için işletme adı, ilçe ve şehir yazın.
          </span>
        </label>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <input
            id={inputId}
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setState("idle");
              setMessage("");
            }}
            maxLength={160}
            autoComplete="off"
            placeholder="Örn. Boğaz Cafe Beşiktaş İstanbul"
            className="admin-nfc-input min-w-0 flex-1"
          />
          <button
            type="submit"
            disabled={!configured || state === "loading"}
            className="h-11 shrink-0 rounded-xl bg-[#dcecff] px-5 text-sm font-semibold text-[#0a1420] transition hover:bg-white disabled:cursor-wait disabled:opacity-60"
          >
            {!configured
              ? "Kurulum gerekli"
              : state === "loading"
                ? "Aranıyor…"
                : "Google’da ara"}
          </button>
        </div>
      </form>

      {!configured ? (
        <p className="mt-3 text-xs leading-5 text-[#ffd37a]" role="status">
          Google Places API anahtarı tanımlandığında işletme araması burada etkinleşecek.
        </p>
      ) : null}

      {configured && message ? (
        <p
          className={`mt-3 text-xs leading-5 ${
            state === "error" ? "text-[#ffb4ae]" : "text-white/55"
          }`}
          role={state === "error" ? "alert" : "status"}
        >
          {message}
        </p>
      ) : null}

      {results.length ? (
        <ul className="mt-3 space-y-2" aria-label="Google işletme sonuçları">
          {results.map((result) => {
            const statusLabel = result.businessStatus
              ? BUSINESS_STATUS_LABELS[result.businessStatus]
              : null;
            const isClosed = result.businessStatus === "CLOSED_PERMANENTLY";

            return (
              <li
                key={result.placeId}
                className="rounded-xl border border-white/9 bg-black/25 p-3"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-semibold text-white/90">{result.name}</p>
                      {statusLabel ? (
                        <span
                          className={`rounded-full border px-2 py-0.5 text-[10px] ${
                            isClosed
                              ? "border-[#ff9188]/25 text-[#ffb4ae]"
                              : "border-white/10 text-white/50"
                          }`}
                        >
                          {statusLabel}
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-1 text-xs leading-5 text-white/50">
                      {result.address || "Adres bilgisi yok"}
                    </p>
                    {result.mapsUrl ? (
                      <a
                        href={result.mapsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-1 inline-block text-xs text-[#9ecbff] underline decoration-[#9ecbff]/35 underline-offset-2"
                      >
                        Google Maps’te doğrula
                      </a>
                    ) : null}
                  </div>
                  <button
                    type="button"
                    onClick={() => selectResult(result)}
                    disabled={isClosed}
                    className="h-10 shrink-0 rounded-lg border border-white/12 px-4 text-xs font-semibold text-white/75 transition hover:bg-white/8 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Bu işletmeyi seç
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
