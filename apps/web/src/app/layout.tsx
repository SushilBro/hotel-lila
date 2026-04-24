import type { Metadata } from "next";
import "./globals.css";
import { MobileStickyBookingCta, SiteFooter, SiteHeader } from "@/components/site-shell";
import { Inter, Playfair_Display } from "next/font/google";

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap"
});

const headingFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://hotellilain.com"),
  title: {
    default: "HotelLilaIn | Premium Stay in Pokhara",
    template: "%s | HotelLilaIn"
  },
  description:
    "HotelLilaIn offers a peaceful premium stay in Pokhara with warm hospitality, mountain views, and easy access to local highlights.",
  keywords: ["HotelLilaIn", "Pokhara hotel", "Methlang stay", "Nepal family-friendly hotel"],
  robots: { index: true, follow: true },
  other: {
    "geo.region": "NP-P4",
    "geo.placename": "Pokhara",
    "geo.position": "28.2096;83.9856",
    ICBM: "28.2096, 83.9856"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${bodyFont.variable} ${headingFont.variable} min-h-screen bg-brand-background text-brand-text antialiased`}
      >
        <SiteHeader />
        <main className="page-shell">{children}</main>
        <SiteFooter />
        <MobileStickyBookingCta />
      </body>
    </html>
  );
}
