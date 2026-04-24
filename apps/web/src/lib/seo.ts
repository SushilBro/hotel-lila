import type { Metadata } from "next";
import { createSupabaseServer } from "./supabase";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hotellilain.com";

export async function buildMetadata(page: string, fallbackTitle: string, fallbackDescription: string): Promise<Metadata> {
  const supabase = await createSupabaseServer();
  const { data } = await supabase
    .from("seo_pages")
    .select("title,description,canonical")
    .eq("page_key", page)
    .maybeSingle();

  const title = data?.title ?? fallbackTitle;
  const description = data?.description ?? fallbackDescription;
  const canonical = data?.canonical ?? `${baseUrl}${page === "home" ? "" : `/${page}`}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "HotelLilaIn",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description
    }
  };
}

export function hotelJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Hotel", "LocalBusiness"],
    name: "HotelLilaIn",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Pokhara",
      addressRegion: "Gandaki",
      addressCountry: "NP"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 28.2096,
      longitude: 83.9856
    },
    description:
      "Peaceful premium stay in Pokhara near Methlang, with warm family-friendly Nepali hospitality.",
    founder: "Sushil Gautam"
  };
}
