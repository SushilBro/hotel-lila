"use server";

import { roomSchema } from "@hotellilain/domain";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServer } from "./supabase";
import { requireAdmin } from "./auth";

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const supabase = await createSupabaseServer();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    redirect("/login");
  }
  revalidatePath("/");
  redirect("/rooms");
}

export async function logoutAction() {
  const supabase = await createSupabaseServer();
  await supabase.auth.signOut();
  revalidatePath("/");
  redirect("/login");
}

export async function upsertRoomAction(formData: FormData) {
  await requireAdmin();
  const parsed = roomSchema.safeParse({
    id: formData.get("id") ? String(formData.get("id")) : undefined,
    slug: formData.get("slug"),
    title: formData.get("title"),
    summary: formData.get("summary"),
    description: formData.get("description"),
    pricePerNight: formData.get("pricePerNight"),
    maxGuests: formData.get("maxGuests"),
    isPublished: formData.get("isPublished") === "on",
    featured: formData.get("featured") === "on"
  });
  if (!parsed.success) return;

  const supabase = await createSupabaseServer();
  await supabase.from("rooms").upsert(
    {
      id: parsed.data.id,
      slug: parsed.data.slug,
      title: parsed.data.title,
      summary: parsed.data.summary,
      description: parsed.data.description,
      price_per_night: parsed.data.pricePerNight,
      max_guests: parsed.data.maxGuests,
      is_published: parsed.data.isPublished,
      featured: parsed.data.featured
    },
    { onConflict: "id" }
  );
  revalidatePath("/rooms");
}

export async function updateInquiryStatusAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  const supabase = await createSupabaseServer();
  await supabase.from("inquiries").update({ status }).eq("id", id);
  revalidatePath("/inquiries");
}

export async function upsertOfferAction(formData: FormData) {
  await requireAdmin();
  const supabase = await createSupabaseServer();
  await supabase.from("offers").upsert(
    {
      id: formData.get("id") ? String(formData.get("id")) : undefined,
      title: String(formData.get("title") ?? ""),
      description: String(formData.get("description") ?? ""),
      price_hint: String(formData.get("priceHint") ?? ""),
      is_active: formData.get("isActive") === "on"
    },
    { onConflict: "id" }
  );
  revalidatePath("/offers");
}

export async function upsertSeoPageAction(formData: FormData) {
  await requireAdmin();
  const supabase = await createSupabaseServer();
  await supabase.from("seo_pages").upsert(
    {
      page_key: String(formData.get("pageKey") ?? ""),
      title: String(formData.get("title") ?? ""),
      description: String(formData.get("description") ?? ""),
      canonical: String(formData.get("canonical") ?? "")
    },
    { onConflict: "page_key" }
  );
  revalidatePath("/seo");
}

export async function upsertSiteSettingAction(formData: FormData) {
  await requireAdmin();
  const supabase = await createSupabaseServer();
  await supabase.from("site_settings").upsert(
    {
      key: String(formData.get("key") ?? ""),
      value: String(formData.get("value") ?? "")
    },
    { onConflict: "key" }
  );
  revalidatePath("/content");
}

export async function upsertTestimonialAction(formData: FormData) {
  await requireAdmin();
  const supabase = await createSupabaseServer();
  await supabase.from("testimonials").upsert(
    {
      id: formData.get("id") ? String(formData.get("id")) : undefined,
      guest_name: String(formData.get("guestName") ?? ""),
      quote: String(formData.get("quote") ?? ""),
      rating: Number(formData.get("rating") ?? 5),
      is_published: formData.get("isPublished") === "on"
    },
    { onConflict: "id" }
  );
  revalidatePath("/content");
}

export async function upsertAmenityAction(formData: FormData) {
  await requireAdmin();
  const supabase = await createSupabaseServer();
  await supabase.from("amenities").upsert(
    {
      id: formData.get("id") ? String(formData.get("id")) : undefined,
      title: String(formData.get("title") ?? ""),
      description: String(formData.get("description") ?? ""),
      icon: String(formData.get("icon") ?? ""),
      sort_order: Number(formData.get("sortOrder") ?? 0),
      is_published: formData.get("isPublished") === "on"
    },
    { onConflict: "id" }
  );
  revalidatePath("/content");
}

export async function addGalleryImageAction(formData: FormData) {
  await requireAdmin();
  const imageUrl = String(formData.get("imageUrl") ?? "");
  if (!imageUrl) return;
  const supabase = await createSupabaseServer();
  await supabase.from("room_images").insert({
    room_id: formData.get("roomId") ? String(formData.get("roomId")) : null,
    image_url: imageUrl,
    caption: String(formData.get("caption") ?? ""),
    category: String(formData.get("category") ?? "gallery"),
    sort_order: Number(formData.get("sortOrder") ?? 0)
  });
  revalidatePath("/gallery");
}

export async function deleteGalleryImageAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const supabase = await createSupabaseServer();
  const { data: image } = await supabase.from("room_images").select("storage_path").eq("id", id).maybeSingle();
  if (image?.storage_path) {
    await supabase.storage.from("gallery-images").remove([image.storage_path]);
  }
  await supabase.from("room_images").delete().eq("id", id);
  revalidatePath("/gallery");
}

export async function uploadGalleryImageAction(formData: FormData) {
  await requireAdmin();
  const file = formData.get("file") as File | null;
  if (!file || file.size === 0) return;

  const supabase = await createSupabaseServer();
  const bytes = await file.arrayBuffer();
  const path = `gallery/${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
  const { error } = await supabase.storage.from("gallery-images").upload(path, bytes, {
    contentType: file.type || "image/jpeg",
    upsert: false
  });
  if (error) return;

  const { data } = supabase.storage.from("gallery-images").getPublicUrl(path);
  await supabase.from("room_images").insert({
    image_url: data.publicUrl,
    storage_path: path,
    caption: String(formData.get("caption") ?? ""),
    category: String(formData.get("category") ?? "gallery"),
    sort_order: Number(formData.get("sortOrder") ?? 0),
    room_id: formData.get("roomId") ? String(formData.get("roomId")) : null
  });
  revalidatePath("/gallery");
}

export async function reorderGalleryImageAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const sortOrder = Number(formData.get("sortOrder") ?? 0);
  const supabase = await createSupabaseServer();
  await supabase.from("room_images").update({ sort_order: sortOrder }).eq("id", id);
  revalidatePath("/gallery");
}
