import assert from "node:assert/strict";
import test from "node:test";
import { loadTypeScript } from "./helpers/load-typescript.mjs";

function setup(mode, { failFirst = false, uri = "mongodb://localhost:27017/auth-test" } = {}) {
  const instances = [];
  const database = {};
  let connects = 0;
  class MongoClient {
    constructor(connectionUri, options) {
      this.uri = connectionUri;
      this.options = options;
      this.closed = false;
      instances.push(this);
    }
    async connect() {
      connects++;
      if (failFirst && connects === 1) throw new Error("temporary connection failure");
      return this;
    }
    async close() { this.closed = true; }
    db() { return database; }
  }
  const { getDb } = loadTypeScript("lib/db.ts", {
    env: { NODE_ENV: mode, MONGODB_URI: uri },
    mocks: { mongodb: { MongoClient } },
  });
  return { getDb, instances, database, connects: () => connects };
}

for (const mode of ["development", "production"]) {
  test(`${mode}: database connections are lazy and shared after success`, async () => {
    const fixture = setup(mode);
    assert.equal(fixture.instances.length, 0);
    const results = await Promise.all([fixture.getDb(), fixture.getDb()]);
    assert.equal(results[0], fixture.database);
    assert.equal(results[1], fixture.database);
    assert.equal(await fixture.getDb(), fixture.database);
    assert.equal(fixture.connects(), 1);
  });

  test(`${mode}: a failed connection is closed and the next request retries`, async () => {
    const fixture = setup(mode, { failFirst: true });
    const firstRequests = await Promise.allSettled([fixture.getDb(), fixture.getDb()]);
    assert.ok(firstRequests.every((result) => result.status === "rejected"));
    assert.equal(fixture.connects(), 1);
    assert.equal(fixture.instances[0].closed, true);
    assert.equal(await fixture.getDb(), fixture.database);
    assert.equal(fixture.connects(), 2);
    assert.equal(await fixture.getDb(), fixture.database);
    assert.equal(fixture.connects(), 2);
  });
}

test("missing database configuration fails lazily", async () => {
  const fixture = setup("production", { uri: "" });
  assert.equal(fixture.instances.length, 0);
  await assert.rejects(fixture.getDb(), /MONGODB_URI/);
  assert.equal(fixture.instances.length, 0);
});

test("connection timeouts are bounded by default without overriding URI settings", async () => {
  const defaults = setup("production");
  await defaults.getDb();
  assert.equal(defaults.instances[0].options.connectTimeoutMS, 5_000);
  assert.equal(defaults.instances[0].options.serverSelectionTimeoutMS, 5_000);

  const explicit = setup("production", {
    uri: "mongodb://localhost:27017/auth-test?connectTimeoutMS=12000&ServerSelectionTimeoutMS=15000",
  });
  await explicit.getDb();
  assert.equal(Object.hasOwn(explicit.instances[0].options, "connectTimeoutMS"), false);
  assert.equal(Object.hasOwn(explicit.instances[0].options, "serverSelectionTimeoutMS"), false);
});
