import { upsertOfferAction } from "@/lib/actions";
import { createSupabaseServer } from "@/lib/supabase";

export default async function OffersAdminPage() {
  const supabase = await createSupabaseServer();
  const { data: offers } = await supabase
    .from("offers")
    .select("id,title,price_hint,is_active")
    .order("created_at", { ascending: false });

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold">Offers</h1>
      <form action={upsertOfferAction} className="grid gap-2 rounded border border-slate-200 p-4">
        <input name="title" required placeholder="Offer title" className="rounded border p-2" />
        <textarea name="description" required placeholder="Offer description" className="rounded border p-2" />
        <input name="priceHint" placeholder="Price hint e.g. NPR 5500/night" className="rounded border p-2" />
        <label className="text-sm">
          <input name="isActive" type="checkbox" defaultChecked className="mr-2" />
          Active
        </label>
        <button className="rounded bg-brand-primary px-4 py-2 text-white">Save Offer</button>
      </form>
      <div className="space-y-2 text-sm">
        {(offers ?? []).map((offer: { id: string; title: string; price_hint: string; is_active: boolean }) => (
          <div key={offer.id} className="rounded border border-slate-200 p-2">
            {offer.title} - {offer.price_hint} - {offer.is_active ? "Active" : "Hidden"}
          </div>
        ))}
      </div>
    </section>
  );
}
