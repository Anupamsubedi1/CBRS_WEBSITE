import { MongoClient, type Db } from "mongodb";

declare global {
  // Reuse connection across hot reloads in dev
  var _mongoClient: Promise<MongoClient> | undefined;
}

// Connect lazily so importing this module (e.g. during `next build` page-data
// collection) doesn't require MONGODB_URI — only actually using the DB does.
let clientPromise: Promise<MongoClient> | undefined;

function createClient() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not defined in .env.local");
  return new MongoClient(uri).connect();
}

function getClient(): Promise<MongoClient> {
  if (process.env.NODE_ENV === "development") {
    return (global._mongoClient ??= createClient());
  }
  return (clientPromise ??= createClient());
}

export async function getDb(): Promise<Db> {
  const client = await getClient();
  return client.db();
}
