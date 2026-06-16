import type { GalleryItem } from "@/lib/types";
import { programs } from "@/lib/data/programs";

/**
 * The gallery is interrelated with programs. Each photo carries a `programSlug`
 * so it shows up both here (filtered by program) and on that program's page.
 * Filters are the program names, kept in sync automatically.
 *
 * Captions below are real CBRS activity areas taken from the organisation
 * profile. Photos are uploaded via the admin panel and stored in Cloudinary;
 * until then each item has `image: null` and a branded placeholder is shown.
 */
const titleFor = (slug: string) =>
  programs.find((p) => p.slug === slug)?.title ?? "";

type Seed = {
  slug: string;
  title: string;
  span?: GalleryItem["span"];
};

const seed: Seed[] = [
  // Rehabilitation and Health  (folder: Device making and delivery)
  { slug: "rehabilitation-health", title: "Assistive device making", span: "tall" },
  { slug: "rehabilitation-health", title: "Assistive device delivery", span: "normal" },
  { slug: "rehabilitation-health", title: "Home visit for physiotherapy and counseling", span: "wide" },
  { slug: "rehabilitation-health", title: "Health camp", span: "normal" },

  // Livelihood  (folder: IGP Support)
  { slug: "livelihood-development", title: "Income generation program support", span: "normal" },
  { slug: "livelihood-development", title: "Vocational training", span: "tall" },
  { slug: "livelihood-development", title: "Self Help Group fund mobilization", span: "normal" },

  // Inclusive Education
  { slug: "inclusive-education", title: "School and community awareness", span: "wide" },
  { slug: "inclusive-education", title: "School enrollment campaign", span: "normal" },
  { slug: "inclusive-education", title: "Educational material support", span: "normal" },

  // Rights, Empowerment and Social Inclusion  (folders: SHG formation, Special programs)
  { slug: "rights-social-inclusion", title: "Self Help Group formation", span: "normal" },
  { slug: "rights-social-inclusion", title: "Advocacy program", span: "tall" },
  { slug: "rights-social-inclusion", title: "Special social gathering", span: "wide" },

  // Human Resource Development and Research
  { slug: "human-resource-development", title: "Staff capacity building training", span: "normal" },
  { slug: "human-resource-development", title: "Disability orientation", span: "normal" },

  // Community Development  (folder: supported by local government)
  { slug: "community-development", title: "Drinking water and sanitation", span: "normal" },
  { slug: "community-development", title: "Collaboration with local government", span: "wide" },
];

export const gallery: GalleryItem[] = seed.map((s, i) => ({
  id: `g${i + 1}`,
  title: s.title,
  programSlug: s.slug,
  category: titleFor(s.slug),
  image: null,
  span: s.span,
  createdAt: i,
}));

export const galleryCategories: string[] = [
  "All",
  ...programs.map((p) => p.title),
];

/** Photos for a given program slug (used on program detail pages). */
export function galleryForProgram(slug: string) {
  return gallery.filter((g) => g.programSlug === slug);
}

/** Seed aliases consumed by the MongoDB layer (`lib/gallery.ts`). */
export const defaultGallery = gallery;
export const defaultGalleryCategories = galleryCategories;
