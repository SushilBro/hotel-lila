import { Card } from "@hotellilain/ui";
import { buildMetadata } from "@/lib/seo";
import { getOffers } from "@/lib/content";

export async function generateMetadata() {
  return buildMetadata("offers", "Offers & Packages", "Discover current offers and seasonal packages.");
}

export default async function OffersPage() {
  const offers = await getOffers();
  return (
    <section className="section-gap pb-8">
      <header className="space-y-3">
        <p className="eyebrow">Seasonal Value</p>
        <h1 className="font-[var(--font-heading)] text-4xl font-semibold">Offers & Packages</h1>
        <p className="balanced-copy max-w-3xl">Curated stay packages for families, couples, and explorers.</p>
      </header>
      <div className="grid gap-4 md:grid-cols-2">
        {offers.map((offer: { id: string; title: string; description: string; price_hint: string }) => (
          <Card key={offer.id} className="rounded-2xl">
            <h2 className="text-xl font-semibold">{offer.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-700">{offer.description}</p>
            <div className="mt-3 flex items-center justify-between">
              <p className="text-sm font-medium text-brand-primary">{offer.price_hint}</p>
              <a href="/contact" className="focus-ring rounded-lg bg-brand-primary px-3 py-1.5 text-xs font-semibold text-white">
                Inquire
              </a>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
