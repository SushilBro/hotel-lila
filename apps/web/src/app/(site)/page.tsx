import Link from "next/link";
import { BookingForm } from "@/components/booking-form";
import { Card } from "@hotellilain/ui";
import { getAmenities, getFeaturedRooms, getHomepageSettings, getTestimonials } from "@/lib/content";
import { buildMetadata, hotelJsonLd } from "@/lib/seo";
import Image from "next/image";

export async function generateMetadata() {
  return buildMetadata(
    "home",
    "HotelLilaIn - Peaceful Premium Stay in Pokhara",
    "Stay at HotelLilaIn in Pokhara for comfort, warm service, and nature-connected relaxation near Methlang."
  );
}

export default async function HomePage() {
  const [settings, featuredRooms, testimonials, amenities] = await Promise.all([
    getHomepageSettings(),
    getFeaturedRooms(),
    getTestimonials(),
    getAmenities()
  ]);

  const heroTitle = settings.get("hero_title") ?? "Experience peaceful premium comfort in Pokhara";
  const heroSubtitle =
    settings.get("hero_subtitle") ??
    "HotelLilaIn blends modern comfort with warm Nepali hospitality in a nature-connected setting near Methlang.";
  const showTestimonials = settings.get("feature_show_testimonials") !== "false";

  return (
    <div className="section-gap pb-10">
      <section className="hero-overlay overflow-hidden rounded-3xl p-6 text-white md:p-10">
        <div className="grid gap-8 md:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-5 fade-up">
            <p className="eyebrow text-white/80">HotelLilaIn, Pokhara</p>
            <h1 className="max-w-xl font-[var(--font-heading)] text-4xl font-semibold leading-tight md:text-5xl">
              {heroTitle}
            </h1>
            <p className="max-w-xl text-base leading-7 text-white/90">{heroSubtitle}</p>
            <p className="max-w-lg text-sm text-white/80">
              HotelLilaIn is proudly led by Sushil Gautam, with a focus on genuine care and memorable stays in
              Pokhara.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/rooms" className="focus-ring rounded-xl bg-brand-secondary px-5 py-2.5 font-semibold text-slate-900">
              Explore Rooms
            </Link>
              <Link
                href="/contact"
                className="focus-ring rounded-xl border border-white/70 bg-white/10 px-5 py-2.5 font-semibold backdrop-blur transition hover:bg-white/20"
              >
                Book Your Stay
              </Link>
            </div>
            <div className="grid gap-3 rounded-2xl bg-white/10 p-3 text-sm text-white/90 backdrop-blur md:grid-cols-3">
              <p>Trusted by couples and families</p>
              <p>Quick response to all inquiries</p>
              <p>No hidden charges</p>
            </div>
          </div>
          <div className="fade-up stagger-1">
            <BookingForm />
          </div>
        </div>
      </section>

      <section className="fade-up stagger-1">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <p className="eyebrow">Stay Collection</p>
            <h2 className="mt-2 font-[var(--font-heading)] text-3xl font-semibold">Featured Rooms</h2>
          </div>
          <Link href="/rooms" className="focus-ring text-sm font-semibold text-brand-primary">
            Browse all rooms
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featuredRooms.map((room: { id: string; title: string; summary: string; price_per_night: number; slug: string }) => (
            <Card key={room.id} className="overflow-hidden rounded-2xl p-0 transition hover:-translate-y-0.5 hover:shadow-elevated">
              <Image
                src="https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=900&q=80"
                alt={`${room.title} at HotelLilaIn`}
                width={960}
                height={620}
                className="h-44 w-full object-cover"
                loading="lazy"
              />
              <div className="space-y-3 p-4">
                <h3 className="text-lg font-semibold">{room.title}</h3>
                <p className="text-sm text-slate-600">{room.summary}</p>
                <p className="font-medium text-brand-primary">NPR {room.price_per_night}/night</p>
                <div className="flex gap-3 text-sm font-medium">
                  <Link href={`/rooms/${room.slug}`} className="focus-ring rounded-lg border border-slate-300 px-3 py-1.5 text-slate-700">
                    View details
                  </Link>
                  <Link href="/contact" className="focus-ring rounded-lg bg-brand-primary px-3 py-1.5 text-white">
                    Inquire
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 fade-up stagger-2">
        <Card className="luxury-panel">
          <p className="eyebrow">Comfort Highlights</p>
          <h3 className="mt-2 text-xl font-semibold">Why guests love HotelLilaIn</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
            {amenities.map((item: { id: string; title: string; description: string }) => (
              <li key={item.id}>
                <strong>{item.title}:</strong> {item.description}
              </li>
            ))}
          </ul>
        </Card>
        <Card className="luxury-panel">
          <p className="eyebrow">Local Story</p>
          <h3 className="mt-2 text-xl font-semibold">Methlang local experience</h3>
          <p className="mt-3 balanced-copy text-sm">
            Methlang offers a quieter hill-area feel with panoramic mountain and valley views, terraced landscapes,
            village culture, and peaceful hikes.
          </p>
          <p className="mt-3 text-sm text-slate-500">
            Enjoy easy access to Phewa Lake, Annapurna viewpoints, and curated local recommendations from our team.
          </p>
        </Card>
      </section>

      {showTestimonials ? (
        <section className="fade-up stagger-3">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="eyebrow">Social Proof</p>
              <h2 className="mt-2 font-[var(--font-heading)] text-3xl font-semibold">Guest Stories</h2>
            </div>
            <div className="grid grid-cols-3 gap-2 rounded-xl bg-white p-2 text-center text-xs text-slate-600 shadow-soft">
              <p>
                <span className="block text-base font-semibold text-brand-text">1200+</span> Happy Guests
              </p>
              <p>
                <span className="block text-base font-semibold text-brand-text">4.8/5</span> Average Rating
              </p>
              <p>
                <span className="block text-base font-semibold text-brand-text">30 min</span> Avg Response
              </p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {testimonials.map((item: { id: string; guest_name: string; quote: string; rating: number }) => (
              <Card key={item.id} className="rounded-2xl">
                <p className="text-sm leading-6 text-slate-700">"{item.quote}"</p>
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-sm font-semibold">{item.guest_name}</p>
                  <p className="text-xs text-amber-600" aria-label={`${item.rating} star rating`}>
                    {"★".repeat(item.rating)}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </section>
      ) : null}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelJsonLd()) }} />
    </div>
  );
}
