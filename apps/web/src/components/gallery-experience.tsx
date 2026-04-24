"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type GalleryItem = {
  id: string;
  image_url: string;
  caption: string;
  category: string;
};

type Props = {
  items: GalleryItem[];
};

export function GalleryExperience({ items }: Props) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = useMemo(() => {
    const values = new Set(items.map((item) => item.category || "gallery"));
    return ["all", ...Array.from(values)];
  }, [items]);

  const filtered = useMemo(
    () => items.filter((item) => activeCategory === "all" || item.category === activeCategory),
    [activeCategory, items]
  );

  const current = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => {
              setActiveCategory(category);
              setLightboxIndex(null);
            }}
            className={`focus-ring rounded-full border px-3 py-1.5 text-sm capitalize transition ${
              activeCategory === category
                ? "border-brand-primary bg-brand-primary text-white"
                : "border-slate-300 bg-white text-slate-700 hover:border-brand-primary"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="columns-1 gap-4 space-y-4 sm:columns-2 lg:columns-3">
        {filtered.map((img, index) => (
          <button
            key={img.id}
            type="button"
            className="focus-ring group relative block w-full overflow-hidden rounded-2xl bg-white text-left shadow-soft"
            onClick={() => setLightboxIndex(index)}
          >
            <Image
              src={img.image_url}
              alt={img.caption || `HotelLilaIn ${img.category}`}
              width={720}
              height={720}
              className="h-auto w-full object-cover transition duration-300 group-hover:scale-[1.02]"
              loading="lazy"
            />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/70 to-transparent p-3 text-sm text-white">
              {img.caption || "HotelLilaIn"}
            </span>
          </button>
        ))}
      </div>
      {current ? (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-slate-950/70 px-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-4xl rounded-2xl bg-white p-3 shadow-elevated">
            <div className="mb-2 flex justify-end">
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                className="focus-ring rounded-md border border-slate-300 px-3 py-1 text-sm"
              >
                Close
              </button>
            </div>
            <Image
              src={current.image_url}
              alt={current.caption || `HotelLilaIn ${current.category}`}
              width={1200}
              height={800}
              className="max-h-[70vh] w-full rounded-xl object-cover"
            />
            <p className="mt-2 px-1 text-sm text-slate-600">{current.caption}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
