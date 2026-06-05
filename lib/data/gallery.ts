import type { GalleryItem } from "@/lib/types";

export const galleryCategories = [
  "All",
  "Rehabilitation",
  "Education",
  "Livelihood",
  "Community",
  "Events",
] as const;

export const gallery: GalleryItem[] = [
  { id: "g1", title: "Home rehabilitation visit", category: "Rehabilitation", span: "tall" },
  { id: "g2", title: "Inclusive classroom in session", category: "Education", span: "wide" },
  { id: "g3", title: "Wheelchair fitting day", category: "Rehabilitation", span: "normal" },
  { id: "g4", title: "Tailoring vocational training", category: "Livelihood", span: "normal" },
  { id: "g5", title: "World Disability Day rally", category: "Events", span: "wide" },
  { id: "g6", title: "Self-help group meeting", category: "Community", span: "tall" },
  { id: "g7", title: "School enrollment campaign", category: "Education", span: "normal" },
  { id: "g8", title: "Eye & ear health camp", category: "Rehabilitation", span: "normal" },
  { id: "g9", title: "Accessible water point", category: "Community", span: "normal" },
  { id: "g10", title: "Entrepreneurship mentoring", category: "Livelihood", span: "tall" },
  { id: "g11", title: "Assistive device workshop", category: "Rehabilitation", span: "normal" },
  { id: "g12", title: "Community awareness event", category: "Events", span: "wide" },
  { id: "g13", title: "Children at an inclusive school", category: "Education", span: "normal" },
  { id: "g14", title: "Leadership training", category: "Community", span: "normal" },
  { id: "g15", title: "Cultural program performance", category: "Events", span: "normal" },
];
