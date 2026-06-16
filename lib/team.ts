import { getDb } from "@/lib/db";
import {
  boardMembers as defaultBoard,
  advisors as defaultAdvisors,
  generalMembers as defaultGeneral,
} from "@/lib/data/team";
import type { TeamContent } from "@/lib/types";

const COLLECTION = "teamContent";
const DOC_ID = "team";

type TeamDoc = TeamContent & { _id: string };

const defaults: TeamContent = {
  board: defaultBoard,
  advisors: defaultAdvisors,
  generalMembers: defaultGeneral,
};

/** Fetch the Our Team rosters, falling back to defaults for any missing section. */
export async function getTeam(): Promise<TeamContent> {
  const db = await getDb();
  const collection = db.collection<TeamDoc>(COLLECTION);
  const doc = await collection.findOne({ _id: DOC_ID });

  if (!doc) {
    // Seed once so a fresh database mirrors the published roster.
    await collection.updateOne(
      { _id: DOC_ID },
      { $setOnInsert: { _id: DOC_ID, ...defaults } },
      { upsert: true },
    );
    return defaults;
  }

  return {
    board: doc.board ?? defaults.board,
    advisors: doc.advisors ?? defaults.advisors,
    generalMembers: doc.generalMembers ?? defaults.generalMembers,
  };
}

/** Persist the full Our Team content document. */
export async function saveTeam(content: TeamContent): Promise<void> {
  const db = await getDb();
  await db
    .collection<TeamDoc>(COLLECTION)
    .updateOne({ _id: DOC_ID }, { $set: content }, { upsert: true });
}
