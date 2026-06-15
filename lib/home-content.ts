import { getDb } from "@/lib/db";
import { defaultHomeContent } from "@/lib/data/home-content";
import type { HomepageContent } from "@/lib/types";

const COLLECTION = "homepageContent";
const DOC_ID = "home";

type HomeContentDoc = HomepageContent & { _id: string };

/** Fetch the homepage content document, falling back to defaults for any missing fields. */
export async function getHomeContent(): Promise<HomepageContent> {
  const db = await getDb();
  const doc = await db
    .collection<HomeContentDoc>(COLLECTION)
    .findOne({ _id: DOC_ID });

  if (!doc) return defaultHomeContent;

  const { _id: _omit, ...content } = doc;
  void _omit;

  return {
    hero: { ...defaultHomeContent.hero, ...content.hero },
    about: { ...defaultHomeContent.about, ...content.about },
    themesSection: { ...defaultHomeContent.themesSection, ...content.themesSection },
    impact: { ...defaultHomeContent.impact, ...content.impact },
    featuredPrograms: { ...defaultHomeContent.featuredPrograms, ...content.featuredPrograms },
    successStories: content.successStories ?? defaultHomeContent.successStories,
    donateBand: { ...defaultHomeContent.donateBand, ...content.donateBand },
  };
}

/** Persist the full homepage content document. */
export async function saveHomeContent(content: HomepageContent): Promise<void> {
  const db = await getDb();
  await db
    .collection<HomeContentDoc>(COLLECTION)
    .updateOne({ _id: DOC_ID }, { $set: content }, { upsert: true });
}
