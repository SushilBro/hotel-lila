import Link from "next/link";

export default function NotFound() {
  return (
    <section className="space-y-4 py-12 text-center">
      <h1 className="text-3xl font-bold">Page not found</h1>
      <p className="text-slate-600">The page you requested does not exist.</p>
      <Link href="/" className="text-brand-primary">
        Go back home
      </Link>
    </section>
  );
}
