import { createSupabaseServer } from "./supabase";

export type Room = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  price_per_night: number;
  max_guests: number;
  featured: boolean;
};

export async function getHomepageSettings() {
  const supabase = await createSupabaseServer();
  const { data } = await supabase.from("site_settings").select("key,value");
  const map = new Map<string, string>();
  (data ?? []).forEach((entry: { key: string; value: string }) => {
    map.set(entry.key, entry.value);
  });
  return map;
}

export async function getFeaturedRooms() {
  const supabase = await createSupabaseServer();
  const { data } = await supabase
    .from("rooms")
    .select("id,slug,title,summary,description,price_per_night,max_guests,featured")
    .eq("is_published", true)
    .eq("featured", true)
    .order("created_at", { ascending: false })
    .limit(3);
  return (data ?? []) as Room[];
}

export async function getRooms() {
  const supabase = await createSupabaseServer();
  const { data } = await supabase
    .from("rooms")
    .select("id,slug,title,summary,description,price_per_night,max_guests,featured")
    .eq("is_published", true)
    .order("price_per_night", { ascending: true });
  return (data ?? []) as Room[];
}

export async function getRoomBySlug(slug: string) {
  const supabase = await createSupabaseServer();
  const { data } = await supabase
    .from("rooms")
    .select("id,slug,title,summary,description,price_per_night,max_guests,featured")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();
  return data as Room | null;
}

export async function getTestimonials() {
  const supabase = await createSupabaseServer();
  const { data } = await supabase
    .from("testimonials")
    .select("id,guest_name,quote,rating")
    .eq("is_published", true)
    .order("created_at", { ascending: false })
    .limit(4);
  return data ?? [];
}

export async function getAmenities() {
  const supabase = await createSupabaseServer();
  const { data } = await supabase
    .from("amenities")
    .select("id,title,description")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });
  return data ?? [];
}

export async function getFaqs() {
  const supabase = await createSupabaseServer();
  const { data } = await supabase
    .from("site_settings")
    .select("key,value")
    .like("key", "faq_%")
    .order("key");
  return data ?? [];
}

export async function getOffers() {
  const supabase = await createSupabaseServer();
  const { data } = await supabase
    .from("offers")
    .select("id,title,description,price_hint,is_active")
    .eq("is_active", true);
  return data ?? [];
}
