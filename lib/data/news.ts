import type { NewsItem } from "@/lib/types";

/**
 * Real news, notices and events will be published here. No sample or
 * placeholder articles are kept in the codebase.
 */
export const news: NewsItem[] = [];

export function getNewsBySlug(slug: string) {
  return news.find((n) => n.slug === slug);
}

export const newsCategories = ["All", "News", "Notice", "Event", "Story"] as const;
