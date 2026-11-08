import assert from "node:assert/strict";
import crypto from "node:crypto";
import test from "node:test";
import { loadTypeScript } from "./helpers/load-typescript.mjs";

const uri = "mongodb://localhost:27017/auth-test";
const password = loadTypeScript("lib/password.ts");
const passwordHash = await password.hashPassword("correct password");

function form(id = "admin", secret = "correct password") {
  const data = new FormData();
  data.set("admin_id", id);
  data.set("password", secret);
  return data;
}

function setup({ env = {}, records, session, databaseError } = {}) {
  const admins = records ?? [{ adminId: "admin", passwordHash }];
  const writes = [];
  const redirects = [];
  let reads = 0;
  const redirectSignal = new Error("NEXT_REDIRECT");
  const collection = {
    async findOne(query) {
      return admins.find((admin) => !query.adminId || admin.adminId === query.adminId) ?? null;
    },
    async insertOne(admin) { admins.push(admin); },
    async updateOne(query, update) {
      if (!admins.some((admin) => admin.adminId === query.adminId)) {
        admins.push(update.$setOnInsert ?? update.$set);
      }
    },
  };
  const actions = loadTypeScript("app/actions/auth.ts", {
    env: { MONGODB_URI: uri, NODE_ENV: "production", ...env },
    mocks: {
      "@/lib/password": password,
      "@/lib/db": {
        async getDb() {
          reads++;
          if (databaseError) throw databaseError;
          return { collection: () => collection };
        },
      },
      "next/headers": {
        async cookies() {
          return {
            get: () => session ? { value: session } : undefined,
            set: (...args) => writes.push(args),
            delete: (name) => writes.push([name]),
          };
        },
      },
      "next/navigation": {
        redirect(path) {
          redirects.push(path);
          throw redirectSignal;
        },
      },
    },
  });
  return { actions, writes, redirects, redirectSignal, admins, reads: () => reads };
}

function assertRejected(state, fixture) {
  assert.equal(typeof state?.error, "string");
  assert.ok(state.error.length > 0);
  assert.equal(fixture.writes.length, 0);
  assert.equal(fixture.redirects.length, 0);
}

test("valid credentials set a protected cookie and preserve the server redirect", async () => {
  const fixture = setup();
  await assert.rejects(fixture.actions.login(undefined, form()), (error) => error === fixture.redirectSignal);
  assert.deepEqual(fixture.redirects, ["/admin"]);
  assert.equal(fixture.writes.length, 1);
  const [name, token, options] = fixture.writes[0];
  assert.equal(name, "admin_session");
  assert.match(token, /^[0-9a-f]{64}$/);
  assert.equal(options.httpOnly, true);
  assert.equal(options.secure, true);
  assert.equal(options.sameSite, "lax");
  assert.equal(options.path, "/");
  assert.equal(options.maxAge, 8 * 60 * 60);
  assert.equal(await setup({ session: token }).actions.getAdminId(), "admin");
});

test("invalid ID and wrong password return the same error without a session", async () => {
  const unknown = setup();
  const wrong = setup();
  const first = await unknown.actions.login(undefined, form("unknown"));
  const second = await wrong.actions.login(undefined, form("admin", "wrong"));
  assertRejected(first, unknown);
  assertRejected(second, wrong);
  assert.equal(first.error, second.error);
});

test("empty fields return validation errors before accessing the database", async () => {
  for (const data of [form("", "password"), form("admin", "")]) {
    const fixture = setup();
    assertRejected(await fixture.actions.login(undefined, data), fixture);
    assert.equal(fixture.reads(), 0);
  }
});

test("passwords containing surrounding spaces can sign in", async () => {
  const secret = "  correct password  ";
  const fixture = setup({ records: [{ adminId: "admin", passwordHash: await password.hashPassword(secret) }] });
  await assert.rejects(fixture.actions.login(undefined, form("admin", secret)), (error) => error === fixture.redirectSignal);
  assert.equal(fixture.writes.length, 1);
});

test("missing MongoDB configuration returns an inline error", async () => {
  const fixture = setup({ env: { MONGODB_URI: undefined } });
  assertRejected(await fixture.actions.login(undefined, form()), fixture);
});

test("an empty database without bootstrap credentials returns an inline error", async () => {
  const fixture = setup({ records: [] });
  assertRejected(await fixture.actions.login(undefined, form()), fixture);
  assert.equal(fixture.admins.length, 0);
});

test("a fresh database can bootstrap the configured admin and sign in", async () => {
  const fixture = setup({ records: [], env: { ADMIN_ID: "admin", ADMIN_PASSWORD: "correct password" } });
  await assert.rejects(fixture.actions.login(undefined, form()), (error) => error === fixture.redirectSignal);
  assert.equal(fixture.admins.length, 1);
  assert.equal(await password.verifyPassword("correct password", fixture.admins[0].passwordHash), true);
});

test("database connection failures return an inline error without granting access", async () => {
  const fixture = setup({ databaseError: new Error("database unavailable") });
  assertRejected(await fixture.actions.login(undefined, form()), fixture);
});

test("malformed stored hashes reject login without crashing", async () => {
  for (const stored of [undefined, "broken", "abcd:abcd"]) {
    const fixture = setup({ records: [{ adminId: "admin", passwordHash: stored }] });
    assertRejected(await fixture.actions.login(undefined, form()), fixture);
  }
});

test("absent and malformed cookies are rejected before database access", async () => {
  for (const session of [undefined, "invalid", "z".repeat(64), `${"a".repeat(64)}\n`]) {
    const fixture = setup({ session });
    assert.equal(await fixture.actions.getAdminId(), null);
    assert.equal(fixture.reads(), 0);
  }
});

test("a stale cookie cannot crash login when the database is unavailable", async () => {
  const fixture = setup({ session: "a".repeat(64), databaseError: new Error("database unavailable") });
  assert.equal(await fixture.actions.getAdminId(), null);
  assert.equal(fixture.writes.length, 0);
});

test("a cookie cannot authenticate without server configuration", async () => {
  const fixture = setup({ session: "a".repeat(64), env: { MONGODB_URI: undefined } });
  assert.equal(await fixture.actions.getAdminId(), null);
});

test("a forged token or removed administrator cannot authenticate", async () => {
  assert.equal(await setup({ session: "a".repeat(64) }).actions.getAdminId(), null);
  const token = crypto.createHmac("sha256", uri).update("admin").digest("hex");
  assert.equal(await setup({ session: token, records: [] }).actions.getAdminId(), null);
});
