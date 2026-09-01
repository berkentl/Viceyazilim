export type GoogleBusinessSearchResult = {
  placeId: string;
  name: string;
  address: string;
  mapsUrl: string;
  reviewUrl: string;
  businessStatus: string | null;
};

export function buildGoogleReviewUrl(placeId: string) {
  const url = new URL("https://search.google.com/local/writereview");
  url.searchParams.set("placeid", placeId);
  return url.toString();
}
