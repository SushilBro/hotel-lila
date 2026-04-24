import { notFound } from "next/navigation";
import { BookingForm } from "@/components/booking-form";
import { getRoomBySlug } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import Image from "next/image";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return buildMetadata(
    `rooms/${slug}`,
    `${slug} Room`,
    `Room details and inquiry for ${slug} at HotelLilaIn in Pokhara.`
  );
}

export default async function RoomDetailPage({ params }: Props) {
  const { slug } = await params;
  const room = await getRoomBySlug(slug);
  if (!room) notFound();
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://hotellilain.com" },
      { "@type": "ListItem", position: 2, name: "Rooms", item: "https://hotellilain.com/rooms" },
      { "@type": "ListItem", position: 3, name: room.title, item: `https://hotellilain.com/rooms/${room.slug}` }
    ]
  };

  return (
    <section className="section-gap pb-10">
      <div className="grid gap-6 md:grid-cols-[1.05fr_0.95fr]">
        <article className="space-y-5">
          <div className="overflow-hidden rounded-3xl">
            <Image
              src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1300&q=80"
              alt={`${room.title} at HotelLilaIn`}
              width={1200}
              height={780}
              className="h-72 w-full object-cover md:h-[25rem]"
              priority
            />
          </div>
          <div className="space-y-3">
            <p className="eyebrow">Room Details</p>
            <h1 className="font-[var(--font-heading)] text-4xl font-semibold">{room.title}</h1>
            <p className="balanced-copy">{room.description}</p>
          </div>
          <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:grid-cols-3">
            <p className="text-sm text-slate-600">
              <span className="block text-xs uppercase tracking-wider text-slate-500">Rate</span>
              <span className="text-base font-semibold text-brand-primary">NPR {room.price_per_night}/night</span>
            </p>
            <p className="text-sm text-slate-600">
              <span className="block text-xs uppercase tracking-wider text-slate-500">Capacity</span>
              <span className="text-base font-semibold text-brand-text">Up to {room.max_guests} guests</span>
            </p>
            <p className="text-sm text-slate-600">
              <span className="block text-xs uppercase tracking-wider text-slate-500">Support</span>
              <span className="text-base font-semibold text-brand-text">Quick reply, local guidance</span>
            </p>
          </div>
        </article>
        <div className="space-y-3">
          <h2 className="text-xl font-semibold">Check availability</h2>
          <p className="text-sm text-slate-600">Share your dates and preferences. We typically reply quickly.</p>
          <BookingForm />
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
    </section>
  );
}
