import { buildMetadata } from "@/lib/seo";
import { createSupabaseServer } from "@/lib/supabase";
import { GalleryExperience } from "@/components/gallery-experience";

export async function generateMetadata() {
  return buildMetadata("gallery", "Gallery", "Explore HotelLilaIn spaces, rooms, and local views.");
}

export default async function GalleryPage() {
  const supabase = await createSupabaseServer();
  const { data } = await supabase
    .from("room_images")
    .select("id,image_url,caption,category")
    .order("sort_order", { ascending: true });

  return (
    <section className="section-gap pb-8">
      <header className="space-y-3">
        <p className="eyebrow">Visual Story</p>
        <h1 className="font-[var(--font-heading)] text-4xl font-semibold">Gallery</h1>
        <p className="balanced-copy max-w-3xl">
          Browse room ambiance, amenities, and scenic moments around Pokhara and Methlang. Tap any image for a larger
          view.
        </p>
      </header>
      <GalleryExperience items={(data ?? []) as Array<{ id: string; image_url: string; caption: string; category: string }>} />
    </section>
  );
}
