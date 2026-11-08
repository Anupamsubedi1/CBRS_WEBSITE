import assert from "node:assert/strict";
import test from "node:test";
import { loadTypeScript } from "./helpers/load-typescript.mjs";

const { hashPassword, verifyPassword } = loadTypeScript("lib/password.ts");

test("password hashes accept the exact password and reject a wrong password", async () => {
  const stored = await hashPassword("correct password");
  assert.equal(await verifyPassword("correct password", stored), true);
  assert.equal(await verifyPassword("wrong password", stored), false);
});

test("leading and trailing password spaces remain significant", async () => {
  const stored = await hashPassword("  exact password  ");
  assert.equal(await verifyPassword("  exact password  ", stored), true);
  assert.equal(await verifyPassword("exact password", stored), false);
});

test("malformed database hashes reject without throwing", async () => {
  const salt = "a".repeat(32);
  const hash = "b".repeat(128);
  for (const stored of [
    undefined, null, 123, {}, "", "broken", "abcd:abcd",
    `${salt}:${hash}:extra`, `${salt}:${"z".repeat(128)}`, `:${hash}`,
    `${salt}:`, `${salt}:${hash.slice(1)}`,
  ]) {
    assert.equal(await verifyPassword("password", stored), false);
  }
});
