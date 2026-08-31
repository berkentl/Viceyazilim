import type { MetadataRoute } from "next";
import {
  absoluteUrl,
  CONTENT_LAST_UPDATED,
  INDEXABLE_ROUTES,
} from "@/lib/site";

const HIGH_PRIORITY = new Set([
  "/",
  "/hizmetler/web-tasarim",
  "/hizmetler/web-yazilim",
  "/hizmetler/e-ticaret",
  "/iletisim",
]);

export default function sitemap(): MetadataRoute.Sitemap {
  return INDEXABLE_ROUTES.map((path) => ({
    url: absoluteUrl(path),
    lastModified: CONTENT_LAST_UPDATED,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : HIGH_PRIORITY.has(path) ? 0.9 : 0.7,
  }));
}
