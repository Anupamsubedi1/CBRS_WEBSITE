"use server";

import crypto from "crypto";
import { cookies } from "next/headers";
import { getDb } from "@/lib/db";
import { hashPassword, verifyPassword } from "@/lib/password";

const COOKIE_NAME = "admin_session";
const COLLECTION = "admins";

function makeSessionToken(adminId: string): string {
  return crypto
    .createHmac("sha256", process.env.MONGODB_URI!)
    .update(adminId)
    .digest("hex");
}

async function ensureAdminExists() {
  const db = await getDb();
  const existing = await db.collection(COLLECTION).findOne({});
  if (existing) return;

  const envId = process.env.ADMIN_ID;
  const envPassword = process.env.ADMIN_PASSWORD;
  if (!envId || !envPassword) {
    throw new Error("ADMIN_ID and ADMIN_PASSWORD must be set in .env.local for first-time setup.");
  }

  await db.collection(COLLECTION).insertOne({
    adminId: envId,
    passwordHash: await hashPassword(envPassword),
    createdAt: new Date(),
  });
}

export type LoginState = { error?: string; success?: boolean } | undefined;

export async function login(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const id = String(formData.get("admin_id") ?? "").trim();
  const password = String(formData.get("password") ?? "").trim();

  if (!id || !password) {
    return { error: "Both fields are required." };
  }

  await ensureAdminExists();

  const db = await getDb();
  const admin = await db.collection(COLLECTION).findOne({ adminId: id });

  if (!admin) {
    return { error: "Invalid admin ID or password." };
  }

  const valid = await verifyPassword(password, admin.passwordHash as string);
  if (!valid) {
    return { error: "Invalid admin ID or password." };
  }

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, makeSessionToken(id), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
  });

  return { success: true };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function getAdminId(): Promise<string | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get(COOKIE_NAME)?.value;
  if (!session) return null;

  const db = await getDb();
  const admin = await db.collection(COLLECTION).findOne({});
  if (!admin) return null;

  const expected = makeSessionToken(admin.adminId as string);
  return session === expected ? (admin.adminId as string) : null;
}
