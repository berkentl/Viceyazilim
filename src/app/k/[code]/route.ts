import { after } from "next/server";
import {
  getNfcRedirect,
  recordNfcScan,
} from "@/lib/server/nfc";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function statusUrl(request: Request, status: string, stockCode?: string) {
  const url = new URL("/kart", request.url);
  url.searchParams.set("durum", status);
  if (stockCode) url.searchParams.set("kart", stockCode);
  return url;
}

function redirectResponse(location: URL | string) {
  return new Response(null, {
    status: 302,
    headers: {
      Location: String(location),
      "Cache-Control": "private, no-store, max-age=0",
      "Referrer-Policy": "no-referrer",
      "X-Robots-Tag": "noindex, nofollow, noarchive",
    },
  });
}

export async function GET(
  request: Request,
  context: { params: Promise<{ code: string }> },
) {
  const { code: rawCode } = await context.params;
  const code = rawCode.trim().toUpperCase();
  if (!/^[A-Z0-9]{12}$/.test(code)) {
    return redirectResponse(statusUrl(request, "bulunamadi"));
  }

  try {
    const card = await getNfcRedirect(code);
    if (!card) {
      return redirectResponse(statusUrl(request, "bulunamadi"));
    }
    if (card.status !== "active" || !card.google_review_url) {
      return redirectResponse(statusUrl(request, card.status, card.stock_code));
    }

    after(async () => {
      try {
        await recordNfcScan(card.id);
      } catch (error) {
        console.error("[nfc] scan count failed", error);
      }
    });

    return redirectResponse(card.google_review_url);
  } catch (error) {
    console.error("[nfc] redirect lookup failed", error);
    return redirectResponse(statusUrl(request, "bakim"));
  }
}
