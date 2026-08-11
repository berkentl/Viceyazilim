import { createClient } from "@supabase/supabase-js";

/**
 * Read-only Supabase client (anon key) for Server Components. Content is
 * managed directly in Supabase Studio's table editor — RLS restricts this
 * key to SELECT only, no write path exists from the app.
 */
export function getSupabaseServerClient() {
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
