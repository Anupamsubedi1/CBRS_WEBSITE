import { getDb } from "@/lib/db";
import { news as defaultNews } from "@/lib/data/news";
import type { NewsItem } from "@/lib/types";

const COLLECTION = "news";

type NewsDoc = NewsItem & { _id: string };

function fromDoc(doc: NewsDoc): NewsItem {
  const { _id: _omit, ...item } = doc;
  void _omit;
  return item;
}

/** Seeds the collection with the default news the first time it's accessed. */
async function ensureSeeded() {
  const db = await getDb();
  const collection = db.collection<NewsDoc>(COLLECTION);
  const count = await collection.countDocuments();
  if (count === 0 && defaultNews.length > 0) {
    await collection.insertMany(
      defaultNews.map((item) => ({ ...item, _id: item.slug })),
    );
  }
  return collection;
}

/** Fetch all news items, newest first. */
export async function getNews(): Promise<NewsItem[]> {
  const collection = await ensureSeeded();
  const docs = await collection.find({}).toArray();
  return docs
    .map(fromDoc)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

/** Fetch a single news item by its slug. */
export async function getNewsBySlug(slug: string): Promise<NewsItem | null> {
  const collection = await ensureSeeded();
  const doc = await collection.findOne({ _id: slug });
  return doc ? fromDoc(doc) : null;
}

/**
 * Create or update a news item. If `previousSlug` is given and differs from the
 * item's slug, the old document is removed (the slug doubles as the `_id`).
 */
export async function saveNews(item: NewsItem, previousSlug?: string): Promise<void> {
  const collection = await ensureSeeded();
  if (previousSlug && previousSlug !== item.slug) {
    await collection.deleteOne({ _id: previousSlug });
  }
  await collection.updateOne(
    { _id: item.slug },
    { $set: { ...item, _id: item.slug } },
    { upsert: true },
  );
}

/** Delete a news item, returning the deleted document (so its image can be cleaned up). */
export async function deleteNews(slug: string): Promise<NewsItem | null> {
  const collection = await ensureSeeded();
  const doc = await collection.findOneAndDelete({ _id: slug });
  return doc ? fromDoc(doc) : null;
}
