import { NextResponse } from "next/server";
import {
  buildGoogleReviewUrl,
  type GoogleBusinessSearchResult,
} from "@/lib/google-places";
import { hasAdminSession } from "@/lib/server/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const GOOGLE_PLACES_SEARCH_URL =
  "https://places.googleapis.com/v1/places:searchText";
const GOOGLE_PLACES_FIELD_MASK = [
  "places.id",
  "places.displayName",
  "places.formattedAddress",
  "places.googleMapsUri",
  "places.businessStatus",
].join(",");

type GooglePlacesResponse = {
  places?: Array<{
    id?: unknown;
    displayName?: { text?: unknown };
    formattedAddress?: unknown;
    googleMapsUri?: unknown;
    businessStatus?: unknown;
  }>;
  error?: {
    code?: unknown;
    status?: unknown;
    message?: unknown;
  };
};

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function noStoreJson(body: object, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "private, no-store" },
  });
}

export async function GET(request: Request) {
  if (!(await hasAdminSession())) {
    return noStoreJson({ error: "Yetkisiz işlem." }, 401);
  }

  const query = new URL(request.url).searchParams
    .get("q")
    ?.trim()
    .replace(/\s+/g, " ");

  if (!query || query.length < 3) {
    return noStoreJson(
      { error: "İşletme adı ve konum için en az 3 karakter girin." },
      422,
    );
  }
  if (query.length > 160) {
    return noStoreJson({ error: "Arama metni çok uzun." }, 422);
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    return noStoreJson(
      {
        error:
          "Google işletme araması henüz yapılandırılmadı. GOOGLE_PLACES_API_KEY eksik.",
        code: "GOOGLE_PLACES_NOT_CONFIGURED",
      },
      503,
    );
  }

  try {
    const googleResponse = await fetch(GOOGLE_PLACES_SEARCH_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": GOOGLE_PLACES_FIELD_MASK,
      },
      body: JSON.stringify({
        textQuery: query,
        languageCode: "tr",
        regionCode: "TR",
        pageSize: 6,
        includePureServiceAreaBusinesses: true,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(8_000),
    });

    const payload = (await googleResponse.json().catch(() => ({}))) as GooglePlacesResponse;

    if (!googleResponse.ok) {
      const providerStatus = text(payload.error?.status);
      console.error("[admin] Google Places search failed", {
        status: googleResponse.status,
        providerStatus,
      });

      if (googleResponse.status === 429) {
        return noStoreJson(
          { error: "Google arama kotası doldu. Biraz sonra yeniden deneyin." },
          429,
        );
      }
      if (googleResponse.status === 400) {
        return noStoreJson(
          { error: "Google bu aramayı işleyemedi. İşletme adı ve şehri kontrol edin." },
          422,
        );
      }
      if (googleResponse.status === 401 || googleResponse.status === 403) {
        return noStoreJson(
          {
            error:
              "Google Places erişimi reddedildi. API anahtarı, Places API (New) ve faturalandırma ayarlarını kontrol edin.",
          },
          503,
        );
      }

      return noStoreJson(
        { error: "Google işletme araması şu anda kullanılamıyor." },
        502,
      );
    }

    const results = (payload.places ?? []).flatMap<GoogleBusinessSearchResult>(
      (place) => {
        const placeId = text(place.id);
        const name = text(place.displayName?.text);
        if (!placeId || !name) return [];

        return [
          {
            placeId,
            name,
            address: text(place.formattedAddress),
            mapsUrl: text(place.googleMapsUri),
            reviewUrl: buildGoogleReviewUrl(placeId),
            businessStatus: text(place.businessStatus) || null,
          },
        ];
      },
    );

    return noStoreJson({ results });
  } catch (error) {
    const timedOut =
      error instanceof DOMException &&
      (error.name === "TimeoutError" || error.name === "AbortError");
    console.error("[admin] Google Places search request failed", {
      timedOut,
      name: error instanceof Error ? error.name : "UnknownError",
    });
    return noStoreJson(
      {
        error: timedOut
          ? "Google işletme araması zaman aşımına uğradı. Yeniden deneyin."
          : "Google işletme aramasına bağlanılamadı.",
      },
      502,
    );
  }
}
