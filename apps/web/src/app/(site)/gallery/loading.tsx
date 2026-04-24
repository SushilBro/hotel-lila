export default function GalleryLoading() {
  return (
    <section className="space-y-4">
      <div className="h-8 w-44 animate-pulse rounded bg-slate-200" />
      <div className="h-5 w-80 animate-pulse rounded bg-slate-200" />
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="h-56 animate-pulse rounded-2xl bg-slate-200" />
        ))}
      </div>
    </section>
  );
}
