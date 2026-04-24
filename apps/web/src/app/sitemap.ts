import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hotellilain.com";
  const routes = ["", "/rooms", "/gallery", "/offers", "/about", "/faq", "/contact"];
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    priority: route === "" ? 1 : 0.7
  }));
}
