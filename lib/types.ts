/**
 * Content models for CBRS Nepal.
 *
 * These interfaces double as the shape of the future MongoDB collections.
 * The current data layer (`lib/data/*`) returns typed seed content; swapping
 * to real database/Cloudinary calls means implementing the same return types.
 */

export type IconName =
  | "heart-pulse"
  | "briefcase"
  | "graduation-cap"
  | "scale"
  | "users"
  | "home"
  | "hand-heart"
  | "stethoscope"
  | "sprout"
  | "book-open"
  | "accessibility"
  | "handshake";

export interface Theme {
  slug: string;
  title: string;
  icon: IconName;
  tagline: string;
  description: string;
  objective: string;
  activities: string[];
}

export interface Program {
  slug: string;
  title: string;
  category: string;
  coverImage?: string;
  excerpt: string;
  description: string;
  objectives: string[];
  activities: string[];
  gallery: { src?: string; caption: string }[];
  documents: { label: string; href: string; size?: string }[];
  featured?: boolean;
}

export type NewsCategory = "News" | "Notice" | "Event" | "Story";

export interface NewsItem {
  slug: string;
  title: string;
  category: NewsCategory;
  date: string; // ISO
  excerpt: string;
  body: string[];
  coverImage?: string;
  author?: string;
  featured?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  src?: string;
  /** Visual span hint for the masonry layout. */
  span?: "tall" | "wide" | "normal";
}

export interface BoardMember {
  id: string;
  name: string;
  position: string;
  ward: string;
  contact: string;
  photo?: string;
}

export interface Advisor {
  id: string;
  name: string;
  position: string;
  expertise: string;
  contact: string;
  photo?: string;
}

export interface GeneralMember {
  id: string;
  name: string;
  role: string;
  ward: string;
  joined: string;
}

export interface ImpactStat {
  value: string;
  label: string;
  icon: IconName;
}

export interface SuccessStory {
  id: string;
  quote: string;
  name: string;
  role: string;
  photo?: string;
}
