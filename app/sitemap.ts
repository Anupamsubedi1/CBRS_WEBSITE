import type { MetadataRoute } from "next";
import { getPrograms } from "@/lib/programs";
import { getNews } from "@/lib/news";

const BASE = "https://www.cbrs.org.np";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/about/cbrs-nepal`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/about/our-team`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/programs`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/gallery`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE}/news`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${BASE}/donate`, lastModified: now, changeFrequency: "yearly", priority: 0.8 },
  ];

  // Detail pages come from the content layer; if the DB is unavailable at build
  // time we still ship a valid sitemap of the static routes above.
  let dynamicRoutes: MetadataRoute.Sitemap = [];
  try {
    const [programs, news] = await Promise.all([getPrograms(), getNews()]);
    dynamicRoutes = [
      ...programs.map((p) => ({
        url: `${BASE}/programs/${p.slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
      ...news.map((n) => ({
        url: `${BASE}/news/${n.slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })),
    ];
  } catch {
    // Swallow — static routes are enough for a valid sitemap.
  }

  return [...staticRoutes, ...dynamicRoutes];
}
