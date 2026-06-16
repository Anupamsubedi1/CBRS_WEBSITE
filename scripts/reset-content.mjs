/**
 * Wipes the CBRS Nepal content collections so they reseed cleanly from the
 * defaults in `lib/data/*` on the next page load. The admin login account
 * (`admins`) is intentionally preserved.
 *
 * Usage:  node scripts/reset-content.mjs
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { MongoClient } from "mongodb";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** Read MONGODB_URI from the environment, falling back to parsing .env.local. */
function getMongoUri() {
  if (process.env.MONGODB_URI) return process.env.MONGODB_URI;
  try {
    const envPath = join(__dirname, "..", ".env.local");
    const file = readFileSync(envPath, "utf8");
    for (const line of file.split("\n")) {
      const match = line.match(/^\s*MONGODB_URI\s*=\s*(.+)\s*$/);
      if (match) return match[1].trim().replace(/^["']|["']$/g, "");
    }
  } catch {
    /* fall through */
  }
  return undefined;
}

// Every content collection the app seeds on demand. `admins` is NOT listed.
const CONTENT_COLLECTIONS = [
  "programs",
  "programsPageContent",
  "galleryItems",
  "galleryCategories",
  "news",
  "teamContent",
  "donationContent",
  "homepageContent", // legacy — Home is now static
];

async function main() {
  const uri = getMongoUri();
  if (!uri) {
    console.error("✗ MONGODB_URI not found (checked env and .env.local).");
    process.exit(1);
  }

  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db();

  const existing = new Set((await db.listCollections().toArray()).map((c) => c.name));

  for (const name of CONTENT_COLLECTIONS) {
    if (existing.has(name)) {
      await db.collection(name).drop();
      console.log(`✓ dropped ${name}`);
    } else {
      console.log(`· skipped ${name} (did not exist)`);
    }
  }

  const adminCount = existing.has("admins")
    ? await db.collection("admins").countDocuments()
    : 0;
  console.log(`\nKept admins collection (${adminCount} account${adminCount === 1 ? "" : "s"}).`);
  console.log("Content will reseed from lib/data/* on the next page load.");

  await client.close();
}

main().catch((err) => {
  console.error("✗ Reset failed:", err);
  process.exit(1);
});
