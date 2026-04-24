import { BookingForm } from "@/components/booking-form";
import { buildMetadata } from "@/lib/seo";

const exactGoogleLocationUrl =
  "https://www.google.com/travel/search?q=pokhara%20methlang%20hotels&g2lb=4965990%2C4969803%2C72302247%2C72317059%2C72414906%2C72471280%2C72472051%2C72485658%2C72560029%2C72573224%2C72616120%2C72647020%2C72648289%2C72686036%2C72760082%2C72803964%2C72832976%2C72882230%2C72958624%2C72959983%2C72990342%2C73033558&hl=en-NP&gl=np&cs=1&ssta=1&ts=CAESCgoCCAMKAggDEAAaHBIaEhQKBwjpDxAHGB4SBwjpDxAHGB8YATICEAAqBwoFOgNOUFI&qs=CAEyFENnc0l2dWpjNjZYVDJLRDBBUkFCOApCCRE6qEMRPaCQiEIJEWrRii1iMszVQgkRNLBJfVkDG_5aUTJPqgFMEAEqCiIGaG90ZWxzKAAyHxABIhvE_l1rPVh6V6kQ4F7FcRNHu1g9cGfI21CPRaIyGxACIhdwb2toYXJhIG1ldGhsYW5nIGhvdGVscw&ap=aAG6AQhvdmVydmlldw&ictx=111&ved=0CAAQ5JsGahcKEwjg0u_kvIaUAxUAAAAAHQAAAAAQBg";

export async function generateMetadata() {
  return buildMetadata("contact", "Contact HotelLilaIn", "Send your inquiry and contact HotelLilaIn in Pokhara.");
}

export default function ContactPage() {
  return (
    <section className="section-gap pb-8">
      <header className="space-y-3">
        <p className="eyebrow">Contact & Inquiry</p>
        <h1 className="[font-family:var(--font-heading)] text-4xl font-semibold">Plan your stay with confidence</h1>
        <p className="balanced-copy max-w-2xl">
          Reach out for room availability, family stays, and local recommendations. We respond quickly with clear,
          helpful details.
        </p>
      </header>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4 luxury-panel p-5">
          <div className="flex gap-3">
            <a href="tel:+9779846777055" className="focus-ring rounded-lg bg-brand-primary px-4 py-2 text-white">
              Call Now
            </a>
            <a
              href="https://wa.me/9779846777055"
              className="focus-ring rounded-lg border border-slate-300 px-4 py-2"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
            <a
              href={exactGoogleLocationUrl}
              className="focus-ring rounded-lg border border-slate-300 px-4 py-2"
              target="_blank"
              rel="noreferrer"
            >
              Open Exact Map
            </a>
          </div>
          <div className="grid gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600 sm:grid-cols-2">
            <p>
              <span className="block text-xs uppercase tracking-wide text-slate-500">Location</span>
              Pokhara, Nepal
            </p>
            <p>
              <span className="block text-xs uppercase tracking-wide text-slate-500">Area context</span>
              Methlang hill setting
            </p>
            <p>
              <span className="block text-xs uppercase tracking-wide text-slate-500">Nearby</span>
              Phewa Lake, Annapurna viewpoints
            </p>
            <p>
              <span className="block text-xs uppercase tracking-wide text-slate-500">Response</span>
              Typically within 30 minutes
            </p>
          </div>
          <iframe
            title="HotelLilaIn map"
            src="https://www.google.com/maps?q=Methlang,Pokhara,Nepal&output=embed"
            className="h-72 w-full rounded-xl border border-slate-200"
            loading="lazy"
          />
        </div>
        <div className="space-y-3">
          <h2 className="text-xl font-semibold">Inquiry Form</h2>
          <p className="text-sm text-slate-600">No payment required. Share your dates and we will guide you.</p>
          <BookingForm />
        </div>
      </div>
    </section>
  );
}
