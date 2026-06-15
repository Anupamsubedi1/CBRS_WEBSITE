import { getDb } from "@/lib/db";
import { defaultProgramsPageContent } from "@/lib/data/programs-page";
import type { ProgramsPageContent } from "@/lib/types";

const COLLECTION = "programsPageContent";
const DOC_ID = "programs";

type ProgramsPageDoc = ProgramsPageContent & { _id: string };

/** Fetch the /programs page banner content, falling back to defaults for any missing fields. */
export async function getProgramsPageContent(): Promise<ProgramsPageContent> {
  const db = await getDb();
  const doc = await db
    .collection<ProgramsPageDoc>(COLLECTION)
    .findOne({ _id: DOC_ID });

  if (!doc) return defaultProgramsPageContent;

  const { _id: _omit, ...content } = doc;
  void _omit;

  return { ...defaultProgramsPageContent, ...content };
}

/** Persist the /programs page banner content. */
export async function saveProgramsPageContent(content: ProgramsPageContent): Promise<void> {
  const db = await getDb();
  await db
    .collection<ProgramsPageDoc>(COLLECTION)
    .updateOne({ _id: DOC_ID }, { $set: content }, { upsert: true });
}
