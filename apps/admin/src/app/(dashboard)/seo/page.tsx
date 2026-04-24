import { upsertSeoPageAction } from "@/lib/actions";
import { createSupabaseServer } from "@/lib/supabase";

export default async function SeoAdminPage() {
  const supabase = await createSupabaseServer();
  const { data: pages } = await supabase.from("seo_pages").select("page_key,title,canonical").order("page_key");

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold">SEO Settings</h1>
      <form action={upsertSeoPageAction} className="grid gap-2 rounded border border-slate-200 p-4">
        <input name="pageKey" required placeholder="Page key (home, rooms, ...)" className="rounded border p-2" />
        <input name="title" required placeholder="Meta title" className="rounded border p-2" />
        <textarea name="description" required placeholder="Meta description" className="rounded border p-2" />
        <input name="canonical" required placeholder="Canonical URL" className="rounded border p-2" />
        <button className="rounded bg-brand-primary px-4 py-2 text-white">Save SEO</button>
      </form>
      <div className="space-y-2 text-sm">
        {(pages ?? []).map((page: { page_key: string; title: string; canonical: string }) => (
          <div key={page.page_key} className="rounded border border-slate-200 p-2">
            <strong>{page.page_key}</strong> - {page.title} - {page.canonical}
          </div>
        ))}
      </div>
    </section>
  );
}
