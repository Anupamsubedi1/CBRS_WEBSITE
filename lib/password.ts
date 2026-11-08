import crypto from "crypto";
import { promisify } from "util";

const scrypt = promisify(crypto.scrypt);
const SALT_LEN = 16;
const HASH_LEN = 64;
const STORED_PASSWORD_LEN = SALT_LEN * 2 + 1 + HASH_LEN * 2;
const STORED_PASSWORD_PATTERN = new RegExp(
  `^[0-9a-f]{${SALT_LEN * 2}}:[0-9a-f]{${HASH_LEN * 2}}$`,
  "i",
);

export async function hashPassword(plain: string): Promise<string> {
  const salt = crypto.randomBytes(SALT_LEN).toString("hex");
  const hash = (await scrypt(plain, salt, HASH_LEN)) as Buffer;
  return `${salt}:${hash.toString("hex")}`;
}

export async function verifyPassword(
  plain: string,
  stored: unknown,
): Promise<boolean> {
  // Old or malformed records are invalid credentials, not server errors.
  if (
    typeof stored !== "string" ||
    stored.length !== STORED_PASSWORD_LEN ||
    !STORED_PASSWORD_PATTERN.test(stored)
  ) {
    return false;
  }

  const [salt, storedHash] = stored.split(":");
  const hash = (await scrypt(plain, salt, HASH_LEN)) as Buffer;
  return crypto.timingSafeEqual(hash, Buffer.from(storedHash, "hex"));
}
