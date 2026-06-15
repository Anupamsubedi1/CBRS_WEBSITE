import type { GalleryItem } from "@/lib/types";

/** Initial category list — admins can add or remove categories from /admin/gallery. */
export const defaultGalleryCategories: string[] = [
  "Rehabilitation",
  "Education",
  "Livelihood",
  "Community",
  "Events",
];

/** Initial seed content for the gallery — empty until the admin adds photos. */
export const defaultGallery: GalleryItem[] = [];
