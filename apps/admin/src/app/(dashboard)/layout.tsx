import Link from "next/link";
import { logoutAction } from "@/lib/actions";
import { requireAdmin } from "@/lib/auth";

const links = [
  { href: "/rooms", label: "Rooms" },
  { href: "/gallery", label: "Gallery" },
  { href: "/content", label: "Content" },
  { href: "/offers", label: "Offers" },
  { href: "/seo", label: "SEO" },
  { href: "/inquiries", label: "Inquiries" }
];

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  return (
    <div className="mx-auto grid min-h-screen max-w-7xl gap-4 p-4 md:grid-cols-[220px_1fr]">
      <aside className="rounded-xl border border-slate-200 bg-white p-4">
        <h2 className="mb-4 text-lg font-semibold text-brand-primary">HotelLilaIn Admin</h2>
        <nav className="space-y-2 text-sm">
          {links.map((item) => (
            <Link key={item.href} href={item.href} className="block rounded px-2 py-1 hover:bg-slate-100">
              {item.label}
            </Link>
          ))}
        </nav>
        <form action={logoutAction} className="mt-4">
          <button className="text-sm text-red-600">Logout</button>
        </form>
      </aside>
      <main className="rounded-xl border border-slate-200 bg-white p-4">{children}</main>
    </div>
  );
}
