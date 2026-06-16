import type { Program } from "@/lib/types";
import { themes } from "@/lib/data/themes";

/**
 * Programs are the six CBRS Nepal themes of work. They are built directly from
 * `themes` so there is a single source of truth, and they share a `slug` with
 * the gallery: photos tagged with a program's slug appear on that program page
 * and under that program's filter in the gallery.
 */
const FEATURED = new Set([
  "rehabilitation-health",
  "inclusive-education",
  "livelihood-development",
]);

export const programs: Program[] = themes.map((t) => ({
  slug: t.slug,
  title: t.title,
  category: t.title,
  excerpt: t.description,
  description: t.objective,
  objectives: [t.objective],
  activities: t.activities,
  gallery: [],
  documents: [],
  featured: FEATURED.has(t.slug),
}));

export function getProgramBySlug(slug: string) {
  return programs.find((p) => p.slug === slug);
}

export const programCategories = programs.map((p) => p.category);
