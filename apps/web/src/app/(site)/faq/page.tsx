import { buildMetadata } from "@/lib/seo";
import { getFaqs } from "@/lib/content";

export async function generateMetadata() {
  return buildMetadata("faq", "FAQ", "Frequently asked questions about staying at HotelLilaIn.");
}

export default async function FaqPage() {
  const settings = await getFaqs();
  const faqs = settings
    .map((item: { key: string; value: string }) => {
      const [_, question, answer] = item.value.split("|");
      return { question: question ?? "Question", answer: answer ?? "Answer" };
    })
    .filter((item: { question: string; answer: string }) => item.question && item.answer);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item: { question: string; answer: string }) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };

  return (
    <section className="section-gap pb-8">
      <header className="space-y-3">
        <p className="eyebrow">Need Clarity?</p>
        <h1 className="font-[var(--font-heading)] text-4xl font-semibold">Frequently Asked Questions</h1>
        <p className="balanced-copy max-w-3xl">
          Quick answers for planning your stay with confidence. If you need more help, our team is one message away.
        </p>
      </header>
      <div className="space-y-3">
        {faqs.map((item: { question: string; answer: string }) => (
          <details key={item.question} className="rounded-xl border border-slate-200 bg-white p-4 shadow-soft">
            <summary className="cursor-pointer text-base font-semibold">{item.question}</summary>
            <p className="mt-2 text-sm text-slate-700">{item.answer}</p>
          </details>
        ))}
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </section>
  );
}
