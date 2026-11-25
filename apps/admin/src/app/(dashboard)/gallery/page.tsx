import {
  addGalleryImageAction,
  deleteGalleryImageAction,
  reorderGalleryImageAction,
  uploadGalleryImageAction
} from "@/lib/actions";
import { createSupabaseServer } from "@/lib/supabase";
import { CompressedImageInput } from "@/components/compressed-image-input";

export default async function GalleryAdminPage() {
  const supabase = await createSupabaseServer();
  const [{ data: images }, { data: rooms }] = await Promise.all([
    supabase.from("room_images").select("id,image_url,caption,category,sort_order").order("sort_order"),
    supabase.from("rooms").select("id,title")
  ]);

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold">Gallery</h1>
      <form action={addGalleryImageAction} className="grid gap-2 rounded-lg border border-slate-200 p-4">
        <h2 className="text-sm font-semibold">Add via URL</h2>
        <input name="imageUrl" required placeholder="Public image URL" className="rounded border p-2" />
        <input name="caption" placeholder="Caption" className="rounded border p-2" />
        <input name="category" placeholder="Category (room/local/amenity)" className="rounded border p-2" />
        <input name="sortOrder" type="number" defaultValue={0} className="rounded border p-2" />
        <select name="roomId" className="rounded border p-2">
          <option value="">No room link</option>
          {(rooms ?? []).map((room: { id: string; title: string }) => (
            <option key={room.id} value={room.id}>
              {room.title}
            </option>
          ))}
        </select>
        <button className="rounded bg-brand-primary px-4 py-2 text-white">Add Image</button>
      </form>
      <form action={uploadGalleryImageAction} className="grid gap-2 rounded-lg border border-slate-200 p-4">
        <h2 className="text-sm font-semibold">Upload to Supabase Storage</h2>
        <CompressedImageInput name="file" />
        <input name="caption" placeholder="Caption" className="rounded border p-2" />
        <input name="category" placeholder="Category" className="rounded border p-2" />
        <input name="sortOrder" type="number" defaultValue={0} className="rounded border p-2" />
        <select name="roomId" className="rounded border p-2">
          <option value="">No room link</option>
          {(rooms ?? []).map((room: { id: string; title: string }) => (
            <option key={room.id} value={room.id}>
              {room.title}
            </option>
          ))}
        </select>
        <button className="rounded bg-brand-primary px-4 py-2 text-white">Upload Image</button>
      </form>

      <div className="grid gap-2">
        {(images ?? []).map((img: { id: string; caption: string; category: string; sort_order: number }) => (
          <div key={img.id} className="flex items-center justify-between rounded border border-slate-200 p-2 text-sm">
            <span>
              {img.caption || "(no caption)"} - {img.category}
            </span>
            <div className="flex items-center gap-3">
              <form action={reorderGalleryImageAction} className="flex items-center gap-2">
                <input type="hidden" name="id" value={img.id} />
                <input
                  name="sortOrder"
                  type="number"
                  defaultValue={img.sort_order}
                  className="w-16 rounded border p-1"
                />
                <button className="text-brand-primary">Reorder</button>
              </form>
              <form action={deleteGalleryImageAction}>
                <input type="hidden" name="id" value={img.id} />
                <button className="text-red-600">Delete</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
