import { MongoClient, type Db } from "mongodb";

const uri = process.env.MONGODB_URI!;

if (!uri) throw new Error("MONGODB_URI is not defined in .env.local");

declare global {
  // Reuse connection across hot reloads in dev
  // eslint-disable-next-line no-var
  var _mongoClient: Promise<MongoClient> | undefined;
}

function createClient() {
  return new MongoClient(uri).connect();
}

const clientPromise: Promise<MongoClient> =
  process.env.NODE_ENV === "development"
    ? (global._mongoClient ??= createClient())
    : createClient();

export async function getDb(): Promise<Db> {
  const client = await clientPromise;
  return client.db();
}
