import { updateInquiryStatusAction } from "@/lib/actions";
import { createSupabaseServer } from "@/lib/supabase";

const statusOptions = ["new", "contacted", "confirmed", "closed"];

export default async function InquiriesAdminPage() {
  const supabase = await createSupabaseServer();
  const { data: inquiries } = await supabase
    .from("inquiries")
    .select("id,full_name,email,phone,check_in,check_out,guests,status,created_at")
    .order("created_at", { ascending: false });

  const total = inquiries?.length ?? 0;
  const newCount = inquiries?.filter((i: { status: string }) => i.status === "new").length ?? 0;
  const confirmedCount = inquiries?.filter((i: { status: string }) => i.status === "confirmed").length ?? 0;

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold">Inquiries</h1>
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded border border-slate-200 p-3 text-sm">Total inquiries: {total}</div>
        <div className="rounded border border-slate-200 p-3 text-sm">New inquiries: {newCount}</div>
        <div className="rounded border border-slate-200 p-3 text-sm">Confirmed: {confirmedCount}</div>
      </div>
      <div className="grid gap-3">
        {(inquiries ?? []).map(
          (inq: {
            id: string;
            full_name: string;
            email: string;
            phone: string;
            check_in: string;
            check_out: string;
            guests: number;
            status: string;
          }) => (
          <article key={inq.id} className="rounded border border-slate-200 p-3 text-sm">
            <p className="font-semibold">{inq.full_name}</p>
            <p className="text-slate-600">
              {inq.email} - {inq.phone}
            </p>
            <p className="text-slate-600">
              {inq.check_in} to {inq.check_out} ({inq.guests} guests)
            </p>
            <form action={updateInquiryStatusAction} className="mt-2 flex gap-2">
              <input type="hidden" name="id" value={inq.id} />
              <select name="status" defaultValue={inq.status} className="rounded border p-1">
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              <button className="rounded bg-brand-primary px-2 py-1 text-white">Update</button>
            </form>
          </article>
          )
        )}
      </div>
    </section>
  );
}
