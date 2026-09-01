export const NFC_CARD_STATUSES = [
  "inventory",
  "active",
  "paused",
  "retired",
] as const;

export type NfcCardStatus = (typeof NFC_CARD_STATUSES)[number];

export type NfcCard = {
  id: string;
  stock_code: string;
  public_code: string;
  business_name: string | null;
  google_review_url: string | null;
  contact_name: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  status: NfcCardStatus;
  notes: string;
  scan_count: number;
  today_scans: number;
  last_30_day_scans: number;
  last_scanned_at: string | null;
  activated_at: string | null;
  created_at: string;
  updated_at: string;
  nfc_url: string;
};

export const DEFAULT_NFC_PUBLIC_BASE_URL = "https://yorum.viceyazilim.com";

export function buildNfcPublicUrl(
  publicCode: string,
  baseUrl = DEFAULT_NFC_PUBLIC_BASE_URL,
) {
  return `${baseUrl.replace(/\/$/, "")}/k/${publicCode}`;
}

export function validateGoogleReviewUrl(value: string) {
  const trimmed = value.trim();
  if (!trimmed) {
    return { valid: true as const, normalizedUrl: "" };
  }
  if (trimmed.length > 2048) {
    return { valid: false as const, error: "Bağlantı çok uzun." };
  }

  let url: URL;
  try {
    url = new URL(trimmed);
  } catch {
    return { valid: false as const, error: "Geçerli bir bağlantı girin." };
  }

  if (
    url.protocol !== "https:" ||
    url.username ||
    url.password ||
    url.port
  ) {
    return {
      valid: false as const,
      error: "Bağlantı HTTPS ile başlamalıdır.",
    };
  }

  const hostname = url.hostname.toLowerCase();
  const pathname = url.pathname.replace(/\/$/, "");
  const isGPageReview =
    hostname === "g.page" && /^\/r\/[^/]+\/review$/i.test(pathname);
  const isSearchGoogleReview =
    hostname === "search.google.com" &&
    pathname === "/local/writereview" &&
    url.searchParams.has("placeid");
  const isLegacyGoogleReview =
    (hostname === "google.com" || hostname === "www.google.com") &&
    pathname === "/local/writereview" &&
    url.searchParams.has("placeid");

  if (!isGPageReview && !isSearchGoogleReview && !isLegacyGoogleReview) {
    return {
      valid: false as const,
      error:
        "Google İşletme Profili > Daha fazla yorum al bölümündeki doğrudan yorum bağlantısını kullanın.",
    };
  }

  url.hash = "";
  return { valid: true as const, normalizedUrl: url.toString() };
}
