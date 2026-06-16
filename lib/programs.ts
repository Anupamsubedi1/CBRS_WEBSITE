import { getDb } from "@/lib/db";
import { defaultPrograms } from "@/lib/data/programs";
import type { Program } from "@/lib/types";

const COLLECTION = "programs";

type ProgramDoc = Program & { _id: string };

function fromDoc(doc: ProgramDoc): Program {
  const { _id: _omit, ...program } = doc;
  void _omit;
  return program;
}

/** Seeds the collection with the default programs the first time it's accessed. */
async function ensureSeeded() {
  const db = await getDb();
  const collection = db.collection<ProgramDoc>(COLLECTION);
  const count = await collection.countDocuments();
  if (count === 0 && defaultPrograms.length > 0) {
    await collection.insertMany(
      defaultPrograms.map((program) => ({ ...program, _id: program.id })),
    );
  }
  return collection;
}

/** Fetch all programs, in insertion order. */
export async function getPrograms(): Promise<Program[]> {
  const collection = await ensureSeeded();
  const docs = await collection.find({}).toArray();
  return docs.map(fromDoc);
}

/** Fetch a single program by its slug. */
export async function getProgramBySlug(slug: string): Promise<Program | null> {
  const collection = await ensureSeeded();
  const doc = await collection.findOne({ slug });
  return doc ? fromDoc(doc) : null;
}

/** Fetch a single program by its id. */
export async function getProgramById(id: string): Promise<Program | null> {
  const collection = await ensureSeeded();
  const doc = await collection.findOne({ _id: id });
  return doc ? fromDoc(doc) : null;
}

/** Create or update a program. */
export async function saveProgram(program: Program): Promise<void> {
  const collection = await ensureSeeded();
  await collection.updateOne(
    { _id: program.id },
    { $set: program },
    { upsert: true },
  );
}

/** Delete a program, returning the deleted document (so its images can be cleaned up). */
export async function deleteProgram(id: string): Promise<Program | null> {
  const collection = await ensureSeeded();
  const doc = await collection.findOneAndDelete({ _id: id });
  return doc ? fromDoc(doc) : null;
}
