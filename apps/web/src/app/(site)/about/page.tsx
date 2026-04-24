import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildMetadata("about", "About HotelLilaIn", "Learn about HotelLilaIn and owner Sushil Gautam.");
}

export default function AboutPage() {
  return (
    <section className="section-gap pb-8">
      <header className="space-y-3">
        <p className="eyebrow">About HotelLilaIn</p>
        <h1 className="font-[var(--font-heading)] text-4xl font-semibold">Modern comfort with warm Nepali hospitality</h1>
        <p className="balanced-copy max-w-3xl">
          HotelLilaIn is designed for travelers who want premium comfort with a calm, nature-connected atmosphere in
          Pokhara.
        </p>
      </header>
      <div className="grid gap-4 md:grid-cols-2">
        <article className="luxury-panel space-y-3 p-6">
          <h2 className="text-2xl font-semibold">Our Promise</h2>
          <p className="balanced-copy">
            HotelLilaIn is proudly led by Sushil Gautam, with a focus on genuine care and memorable stays in Pokhara.
          </p>
          <p className="text-sm text-slate-500">
            Guests trust us for attentive service, transparent communication, and practical local guidance.
          </p>
        </article>
        <article className="luxury-panel space-y-3 p-6">
          <h2 className="text-2xl font-semibold">Pokhara to Methlang</h2>
          <p className="balanced-copy">
            Pokhara is known for Phewa Lake, Annapurna views, adventure activities, and a relaxed lakeside rhythm.
            Methlang offers quieter hill culture, terraced landscapes, and peaceful scenic hikes.
          </p>
        </article>
      </div>
    </section>
  );
}
