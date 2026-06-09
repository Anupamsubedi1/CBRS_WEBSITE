import crypto from "crypto";
import { promisify } from "util";

const scrypt = promisify(crypto.scrypt);
const SALT_LEN = 16;

export async function hashPassword(plain: string): Promise<string> {
  const salt = crypto.randomBytes(SALT_LEN).toString("hex");
  const hash = (await scrypt(plain, salt, 64)) as Buffer;
  return `${salt}:${hash.toString("hex")}`;
}

export async function verifyPassword(
  plain: string,
  stored: string,
): Promise<boolean> {
  const [salt, storedHash] = stored.split(":");
  const hash = (await scrypt(plain, salt, 64)) as Buffer;
  return crypto.timingSafeEqual(
    Buffer.from(hash.toString("hex")),
    Buffer.from(storedHash),
  );
}
