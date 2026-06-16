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
  id: string;
  slug: string;
  title: string;
  category: string;
  coverImage: CloudinaryImage | null;
  excerpt: string;
  description: string;
  objectives: string[];
  activities: string[];
  gallery: { image: CloudinaryImage | null; caption: string }[];
  featured: boolean;
}

/** The banner at the top of the public /programs page, managed via /admin/programs. */
export interface ProgramsPageContent {
  eyebrow: string;
  title: string;
  description: string;
}

export type NewsCategory = "News" | "Notice" | "Event" | "Story";

export interface NewsItem {
  slug: string;
  title: string;
  category: NewsCategory;
  date: string; // ISO
  excerpt: string;
  body: string[];
  /** Cloudinary cover image, uploaded via the admin panel; null until set. */
  coverImage: CloudinaryImage | null;
  author?: string;
  featured?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  /** Display label, kept in sync with the linked program's title. */
  category: string;
  /** Links this photo to a program, so it appears on that program's page. */
  programSlug: string;
  /** Cloudinary image; null until a photo is uploaded via the admin panel. */
  image: CloudinaryImage | null;
  /** Visual span hint for the masonry layout. */
  span?: "tall" | "wide" | "normal";
  /** Used to sort newest-first for the homepage "latest photos" preview. */
  createdAt: number;
}

export interface BoardMember {
  id: string;
  name: string;
  position: string;
  ward: string;
  contact: string;
  /** Cloudinary portrait, uploaded via the admin panel; null until set. */
  photo?: CloudinaryImage | null;
}

export interface Advisor {
  id: string;
  name: string;
  position: string;
  expertise: string;
  contact: string;
  /** Cloudinary portrait, uploaded via the admin panel; null until set. */
  photo?: CloudinaryImage | null;
}

export interface GeneralMember {
  id: string;
  name: string;
  ward: string;
  /** Phone number; may be empty if not on record. */
  contact: string;
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

/** An image stored in Cloudinary — kept together so the file can be deleted on replace/remove. */
export interface CloudinaryImage {
  url: string;
  publicId: string;
}

/** A digital-wallet payment method shown on the Donation page (e.g. eSewa, Khalti). */
export interface PaymentMethod {
  label: string;
  id: string;
  name: string;
  /** Brand colour used as the card accent. */
  color: string;
}

/**
 * Full editable content model for the public Donation page (`/donate`) and the
 * bank QR shown on every inner-page banner. Managed via `/admin/donation`
 * (Donation = "Admin + QR" in the page spec).
 */
export interface DonationContent {
  hero: { eyebrow: string; title: string; description: string };
  whyGive: { eyebrow: string; title: string; paragraphs: string[] };
  waysToGive: { eyebrow: string; title: string; description: string };
  paymentMethods: PaymentMethod[];
  /** Bank-account QR (uploaded image) shown on the donate page and page banners. */
  bankQr: { image: CloudinaryImage | null; caption: string; accountName: string };
}

/** Aggregate of the three Our Team rosters, managed via `/admin/team`. */
export interface TeamContent {
  board: BoardMember[];
  advisors: Advisor[];
  generalMembers: GeneralMember[];
}

export interface HeroPillar {
  icon: IconName;
  label: string;
}

export interface HomeHero {
  badge: string;
  headingMain: string;
  headingHighlight: string;
  description: string;
  image: CloudinaryImage | null;
  ctaPrimaryLabel: string;
  ctaPrimaryHref: string;
  ctaSecondaryLabel: string;
  ctaSecondaryHref: string;
  pillars: HeroPillar[];
}

export interface HomeAbout {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  image: CloudinaryImage | null;
  badgeValue: string;
  badgeLabel: string;
  ctaLabel: string;
  ctaHref: string;
  stats: ImpactStat[];
}

export interface HomeThemeItem {
  slug: string;
  title: string;
  icon: IconName;
  description: string;
}

export interface HomeThemesSection {
  eyebrow: string;
  title: string;
  description: string;
  items: HomeThemeItem[];
}

export interface HomeImpact {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  stats: ImpactStat[];
}

export interface HomeFeaturedPrograms {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface HomeSuccessStory {
  id: string;
  quote: string;
  name: string;
  role: string;
  photo: CloudinaryImage | null;
}

export interface HomeDonateBand {
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
}

/** Full editable content model for the public homepage (`/`), managed via `/admin/home`. */
export interface HomepageContent {
  hero: HomeHero;
  about: HomeAbout;
  themesSection: HomeThemesSection;
  impact: HomeImpact;
  featuredPrograms: HomeFeaturedPrograms;
  successStories: HomeSuccessStory[];
  donateBand: HomeDonateBand;
}
