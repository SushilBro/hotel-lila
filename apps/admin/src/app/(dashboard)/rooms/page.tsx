import { upsertRoomAction } from "@/lib/actions";
import { createSupabaseServer } from "@/lib/supabase";

export default async function RoomsAdminPage() {
  const supabase = await createSupabaseServer();
  const { data: rooms } = await supabase
    .from("rooms")
    .select("id,slug,title,price_per_night,max_guests,is_published,featured")
    .order("created_at", { ascending: false });

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold">Rooms</h1>
      <form action={upsertRoomAction} className="grid gap-2 rounded-lg border border-slate-200 p-4">
        <input name="slug" required placeholder="slug" className="rounded border p-2" />
        <input name="title" required placeholder="Title" className="rounded border p-2" />
        <input name="summary" required placeholder="Summary" className="rounded border p-2" />
        <textarea name="description" required placeholder="Description" className="rounded border p-2" />
        <div className="grid gap-2 md:grid-cols-2">
          <input name="pricePerNight" type="number" required placeholder="Price per night" className="rounded border p-2" />
          <input name="maxGuests" type="number" required placeholder="Max guests" className="rounded border p-2" />
        </div>
        <label className="text-sm">
          <input name="isPublished" type="checkbox" defaultChecked className="mr-2" />
          Published
        </label>
        <label className="text-sm">
          <input name="featured" type="checkbox" className="mr-2" />
          Featured
        </label>
        <button className="rounded bg-brand-primary px-4 py-2 text-white">Save Room</button>
      </form>
      <div className="space-y-2">
        {(rooms ?? []).map((room: { id: string; title: string; price_per_night: number; is_published: boolean }) => (
          <div key={room.id} className="rounded border border-slate-200 p-3 text-sm">
            {room.title} - NPR {room.price_per_night} - {room.is_published ? "Published" : "Draft"}
          </div>
        ))}
      </div>
    </section>
  );
}
