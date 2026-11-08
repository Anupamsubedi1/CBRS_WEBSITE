import { MongoClient, type Db, type MongoClientOptions } from "mongodb";

declare global {
  // Reuse connection across hot reloads in dev
  var _mongoClient: Promise<MongoClient> | undefined;
}

// Connect lazily so importing this module (e.g. during `next build` page-data
// collection) doesn't require MONGODB_URI — only actually using the DB does.
let clientPromise: Promise<MongoClient> | undefined;
const CONNECTION_TIMEOUT_MS = 5_000;

function createClient() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not configured on the server.");

  // Fail promptly enough for the login form to show a retry message. Respect
  // explicit URI timeouts, including case-insensitive MongoDB option names.
  const queryIndex = uri.indexOf("?");
  const query = new URLSearchParams(queryIndex < 0 ? "" : uri.slice(queryIndex + 1));
  const uriOptions = new Set(Array.from(query.keys(), (key) => key.toLowerCase()));
  const options: MongoClientOptions = {};
  if (!uriOptions.has("connecttimeoutms")) {
    options.connectTimeoutMS = CONNECTION_TIMEOUT_MS;
  }
  if (!uriOptions.has("serverselectiontimeoutms")) {
    options.serverSelectionTimeoutMS = CONNECTION_TIMEOUT_MS;
  }

  const client = new MongoClient(uri, options);
  return client.connect().catch(async (error: unknown) => {
    await client.close().catch(() => undefined);
    throw error;
  });
}

function getClient(): Promise<MongoClient> {
  const development = process.env.NODE_ENV === "development";
  const cached = development ? global._mongoClient : clientPromise;
  if (cached) return cached;

  const pending = createClient().catch((error: unknown) => {
    // A failed initial connection must not poison subsequent login attempts.
    if (development) {
      if (global._mongoClient === pending) global._mongoClient = undefined;
    } else if (clientPromise === pending) {
      clientPromise = undefined;
    }
    throw error;
  });

  if (development) {
    global._mongoClient = pending;
  } else {
    clientPromise = pending;
  }
  return pending;
}

export async function getDb(): Promise<Db> {
  const client = await getClient();
  return client.db();
}
