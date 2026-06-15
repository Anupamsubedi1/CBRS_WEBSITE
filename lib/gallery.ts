import { getDb } from "@/lib/db";
import { defaultGallery, defaultGalleryCategories } from "@/lib/data/gallery";
import type { GalleryItem } from "@/lib/types";

const ITEMS_COLLECTION = "galleryItems";
const CATEGORIES_COLLECTION = "galleryCategories";
const CATEGORIES_DOC_ID = "categories";

type GalleryItemDoc = GalleryItem & { _id: string };
type CategoriesDoc = { _id: string; names: string[] };

function fromDoc(doc: GalleryItemDoc): GalleryItem {
  const { _id: _omit, ...item } = doc;
  void _omit;
  return item;
}

/** Fetch all gallery items, newest first. */
export async function getGalleryItems(): Promise<GalleryItem[]> {
  const db = await getDb();
  const collection = db.collection<GalleryItemDoc>(ITEMS_COLLECTION);
  const count = await collection.countDocuments();
  if (count === 0 && defaultGallery.length > 0) {
    await collection.insertMany(
      defaultGallery.map((item) => ({ ...item, _id: item.id })),
    );
  }
  const docs = await collection.find({}).sort({ createdAt: -1 }).toArray();
  return docs.map(fromDoc);
}

/** Fetch the most recently added gallery items that have an image. */
export async function getLatestGalleryItems(limit: number): Promise<GalleryItem[]> {
  const items = await getGalleryItems();
  return items.filter((item) => item.image).slice(0, limit);
}

/** Fetch the list of gallery categories. */
export async function getGalleryCategories(): Promise<string[]> {
  const db = await getDb();
  const doc = await db
    .collection<CategoriesDoc>(CATEGORIES_COLLECTION)
    .findOne({ _id: CATEGORIES_DOC_ID });
  return doc?.names ?? defaultGalleryCategories;
}

/** Replace the full set of gallery items and categories. */
export async function saveGalleryContent(items: GalleryItem[], categories: string[]): Promise<void> {
  const db = await getDb();
  const itemsCollection = db.collection<GalleryItemDoc>(ITEMS_COLLECTION);

  const existing = await itemsCollection.find({}, { projection: { _id: 1 } }).toArray();
  const keepIds = new Set(items.map((item) => item.id));
  const removeIds = existing.map((d) => d._id).filter((id) => !keepIds.has(id));

  if (removeIds.length > 0) {
    await itemsCollection.deleteMany({ _id: { $in: removeIds } });
  }

  if (items.length > 0) {
    await Promise.all(
      items.map((item) =>
        itemsCollection.updateOne({ _id: item.id }, { $set: item }, { upsert: true }),
      ),
    );
  }

  await db
    .collection<CategoriesDoc>(CATEGORIES_COLLECTION)
    .updateOne({ _id: CATEGORIES_DOC_ID }, { $set: { names: categories } }, { upsert: true });
}
