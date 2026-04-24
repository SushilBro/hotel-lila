import Link from "next/link";
import { Card } from "@hotellilain/ui";
import { getRooms } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import Image from "next/image";

export async function generateMetadata() {
  return buildMetadata("rooms", "Rooms in Pokhara", "Browse comfortable rooms at HotelLilaIn in Pokhara, Nepal.");
}

export default async function RoomsPage() {
  const rooms = await getRooms();
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://hotellilain.com" },
      { "@type": "ListItem", position: 2, name: "Rooms", item: "https://hotellilain.com/rooms" }
    ]
  };
  return (
    <section className="section-gap pb-8">
      <header className="space-y-3">
        <p className="eyebrow">Rooms & Suites</p>
        <h1 className="font-[var(--font-heading)] text-4xl font-semibold">Spaces crafted for calm, comfort, and views</h1>
        <p className="balanced-copy max-w-3xl">
          Choose from cozy, family-friendly, and premium room options designed for restful nights and easy mornings in
          Pokhara.
        </p>
      </header>
      <div className="grid gap-5 md:grid-cols-2">
        {rooms.map((room: { id: string; title: string; summary: string; max_guests: number; price_per_night: number; slug: string }) => (
          <Card key={room.id} className="overflow-hidden p-0">
            <Image
              src="https://images.unsplash.com/photo-1631049552240-59c37f38802b?auto=format&fit=crop&w=1000&q=80"
              alt={`${room.title} room at HotelLilaIn`}
              width={980}
              height={600}
              className="h-56 w-full object-cover"
              loading="lazy"
            />
            <div className="space-y-3 p-5">
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-xl font-semibold">{room.title}</h2>
                <p className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-brand-primary">
                  Up to {room.max_guests} guests
                </p>
              </div>
              <p className="text-sm leading-6 text-slate-700">{room.summary}</p>
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold text-brand-primary">NPR {room.price_per_night}/night</p>
                <div className="flex gap-2 text-sm">
                  <Link href={`/rooms/${room.slug}`} className="focus-ring rounded-lg border border-slate-300 px-3 py-1.5">
                    View details
                  </Link>
                  <Link href="/contact" className="focus-ring rounded-lg bg-brand-primary px-3 py-1.5 text-white">
                    Inquire
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
    </section>
  );
}
