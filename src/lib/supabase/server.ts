import { createClient } from "@supabase/supabase-js";

/**
 * Read-only Supabase client (anon key) for Server Components. Content is
 * managed directly in Supabase Studio's table editor — RLS restricts this
 * key to SELECT only, no write path exists from the app.
 */
function getSupabaseServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "Supabase ortam değişkenleri eksik: NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY",
    );
  }

  return createClient(url, anonKey, {
    auth: { persistSession: false },
  });
}

export type Project = {
  id: string;
  slug: string;
  title: string;
  client: string | null;
  year: number | null;
  category: string | null;
  services: string[] | null;
  cover_image_url: string | null;
  mockup_type: "laptop" | "phone" | null;
  mockup_asset_url: string | null;
  live_url: string | null;
  prototype_url: string | null;
  summary: string | null;
  body: string | null;
  featured: boolean;
  sort_order: number;
  created_at: string;
};

/**
 * All Supabase reads go through these three helpers, which never throw —
 * a misconfigured env var or a Supabase outage degrades to an empty list
 * (handled gracefully by each page's UI) instead of crashing the entire
 * page (or, at build time, the whole production build).
 */

export async function fetchAllProjects(): Promise<Project[]> {
  try {
    const { data, error } = await getSupabaseServerClient()
      .from("projects")
      .select("*")
      .order("sort_order", { ascending: true })
      .returns<Project[]>();
    if (error) throw error;
    return data ?? [];
  } catch (error) {
    console.error("[supabase] projects fetch failed:", error);
    return [];
  }
}

export async function fetchFeaturedProjects(limit: number): Promise<Project[]> {
  try {
    const { data, error } = await getSupabaseServerClient()
      .from("projects")
      .select("*")
      .eq("featured", true)
      .order("sort_order", { ascending: true })
      .limit(limit)
      .returns<Project[]>();
    if (error) throw error;
    return data ?? [];
  } catch (error) {
    console.error("[supabase] featured projects fetch failed:", error);
    return [];
  }
}

export async function fetchProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const { data, error } = await getSupabaseServerClient()
      .from("projects")
      .select("*")
      .eq("slug", slug)
      .maybeSingle<Project>();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`[supabase] project fetch failed for slug "${slug}":`, error);
    return null;
  }
}
