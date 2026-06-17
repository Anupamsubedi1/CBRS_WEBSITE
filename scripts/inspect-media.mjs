/**
 * Read-only: prints how many gallery items / team members have images, and
 * shows the most recent gallery items. Helps tell an upload bug (no image in
 * DB) from a display bug (image in DB but not rendered).
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { MongoClient } from "mongodb";

const __dirname = dirname(fileURLToPath(import.meta.url));

function getMongoUri() {
  if (process.env.MONGODB_URI) return process.env.MONGODB_URI;
  const file = readFileSync(join(__dirname, "..", ".env.local"), "utf8");
  for (const line of file.split("\n")) {
    const m = line.match(/^\s*MONGODB_URI\s*=\s*(.+)\s*$/);
    if (m) return m[1].trim().replace(/^["']|["']$/g, "");
  }
  return undefined;
}

const uri = getMongoUri();
if (!uri) throw new Error("MONGODB_URI not found");

const client = await new MongoClient(uri).connect();
const db = client.db();

const gallery = await db.collection("galleryItems").find({}).sort({ createdAt: -1 }).toArray();
console.log(`\n=== galleryItems: ${gallery.length} total ===`);
for (const g of gallery.slice(0, 8)) {
  console.log(
    `- id=${g._id} title=${JSON.stringify(g.title)} program=${JSON.stringify(g.programSlug)} image=${g.image ? g.image.url : "NULL"} createdAt=${g.createdAt}`,
  );
}

const team = await db.collection("teamContent").findOne({ _id: "team" });
if (team) {
  const summarize = (arr, label) =>
    console.log(
      `${label}: ${arr.length} members, ${arr.filter((m) => m.photo).length} with photo`,
    );
  console.log(`\n=== teamContent ===`);
  summarize(team.board ?? [], "board");
  summarize(team.advisors ?? [], "advisors");
  for (const m of (team.board ?? []).slice(0, 5)) {
    console.log(`  board: name=${JSON.stringify(m.name)} photo=${m.photo ? m.photo.url : "NULL"}`);
  }
} else {
  console.log("\n=== teamContent: no doc (still on seed defaults) ===");
}

await client.close();
