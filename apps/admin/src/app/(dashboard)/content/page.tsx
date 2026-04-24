import { upsertAmenityAction, upsertSiteSettingAction, upsertTestimonialAction } from "@/lib/actions";
import { createSupabaseServer } from "@/lib/supabase";

export default async function ContentAdminPage() {
  const supabase = await createSupabaseServer();
  const { data: settings } = await supabase
    .from("site_settings")
    .select("key,value")
    .order("key", { ascending: true });
  const { data: testimonials } = await supabase
    .from("testimonials")
    .select("id,guest_name,quote,rating,is_published")
    .order("created_at", { ascending: false });
  const { data: amenities } = await supabase
    .from("amenities")
    .select("id,title,description,sort_order,is_published")
    .order("sort_order", { ascending: true });

  const heroTitle = settings?.find((item: { key: string; value: string }) => item.key === "hero_title")?.value ?? "";
  const heroSubtitle =
    settings?.find((item: { key: string; value: string }) => item.key === "hero_subtitle")?.value ?? "";

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold">Homepage & CMS Content</h1>
      <form action={upsertSiteSettingAction} className="grid gap-2 rounded border border-slate-200 p-4">
        <input type="hidden" name="key" value="hero_title" />
        <input name="value" defaultValue={heroTitle} className="rounded border p-2" />
        <button className="rounded bg-brand-primary px-4 py-2 text-white">Save Hero Title</button>
      </form>
      <form action={upsertSiteSettingAction} className="grid gap-2 rounded border border-slate-200 p-4">
        <input type="hidden" name="key" value="hero_subtitle" />
        <textarea name="value" defaultValue={heroSubtitle} className="rounded border p-2" />
        <button className="rounded bg-brand-primary px-4 py-2 text-white">Save Hero Subtitle</button>
      </form>
      <form action={upsertSiteSettingAction} className="grid gap-2 rounded border border-slate-200 p-4">
        <input type="hidden" name="key" value="feature_show_offers" />
        <select name="value" className="rounded border p-2">
          <option value="true">Enable offers section</option>
          <option value="false">Disable offers section</option>
        </select>
        <button className="rounded bg-brand-primary px-4 py-2 text-white">Save Feature Flag</button>
      </form>
      <form action={upsertTestimonialAction} className="grid gap-2 rounded border border-slate-200 p-4">
        <input name="guestName" required placeholder="Guest name" className="rounded border p-2" />
        <textarea name="quote" required placeholder="Quote" className="rounded border p-2" />
        <input name="rating" type="number" min={1} max={5} defaultValue={5} className="rounded border p-2" />
        <label className="text-sm">
          <input name="isPublished" type="checkbox" defaultChecked className="mr-2" />
          Published
        </label>
        <button className="rounded bg-brand-primary px-4 py-2 text-white">Save Testimonial</button>
      </form>
      <form action={upsertAmenityAction} className="grid gap-2 rounded border border-slate-200 p-4">
        <input name="title" required placeholder="Amenity title" className="rounded border p-2" />
        <textarea name="description" required placeholder="Amenity description" className="rounded border p-2" />
        <input name="icon" placeholder="Icon key (optional)" className="rounded border p-2" />
        <input name="sortOrder" type="number" defaultValue={0} className="rounded border p-2" />
        <label className="text-sm">
          <input name="isPublished" type="checkbox" defaultChecked className="mr-2" />
          Published
        </label>
        <button className="rounded bg-brand-primary px-4 py-2 text-white">Save Amenity</button>
      </form>
      <div className="space-y-2 text-sm">
        {(amenities ?? []).map((item: { id: string; title: string; description: string; is_published: boolean }) => (
          <div key={item.id} className="rounded border border-slate-200 p-2">
            {item.title} - {item.description} - {item.is_published ? "Published" : "Hidden"}
          </div>
        ))}
      </div>
      <div className="space-y-2 text-sm">
        {(testimonials ?? []).map((item: { id: string; guest_name: string; quote: string; rating: number; is_published: boolean }) => (
          <div key={item.id} className="rounded border border-slate-200 p-2">
            {item.guest_name}: "{item.quote}" ({item.rating}/5) - {item.is_published ? "Published" : "Hidden"}
          </div>
        ))}
      </div>
    </section>
  );
}
