"use server";

import crypto from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Db } from "mongodb";
import { getDb } from "@/lib/db";
import { hashPassword, verifyPassword } from "@/lib/password";

const COOKIE_NAME = "admin_session";
const COLLECTION = "admins";
const SETUP_ERROR =
  "Admin sign-in has not been configured. Please contact the website administrator.";

function makeSessionToken(adminId: string): string {
  return crypto
    .createHmac("sha256", process.env.MONGODB_URI!)
    .update(adminId)
    .digest("hex");
}

async function ensureAdminExists(db: Db): Promise<boolean> {
  const existing = await db.collection(COLLECTION).findOne({});
  if (existing) return true;

  const envId = process.env.ADMIN_ID?.trim();
  const envPassword = process.env.ADMIN_PASSWORD;
  if (!envId || !envPassword) {
    console.error("[admin/auth] Set ADMIN_ID and ADMIN_PASSWORD for first-time setup.");
    return false;
  }

  await db.collection(COLLECTION).insertOne({
    adminId: envId,
    passwordHash: await hashPassword(envPassword),
    createdAt: new Date(),
  });
  return true;
}

function logAuthFailure(operation: string, error: unknown) {
  // Do not log credentials, connection strings, or database error payloads.
  console.error(`[admin/auth] ${operation} failed. Check database connectivity and permissions.`, {
    errorType: error instanceof Error ? error.name : "UnknownError",
  });
}

export type LoginState = { error?: string } | undefined;

export async function login(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const id = String(formData.get("admin_id") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!id || !password) {
    return { error: "Both fields are required." };
  }

  if (!process.env.MONGODB_URI) {
    console.error("[admin/auth] Set MONGODB_URI to enable admin sign-in.");
    return { error: SETUP_ERROR };
  }

  try {
    const db = await getDb();
    if (!(await ensureAdminExists(db))) return { error: SETUP_ERROR };

    const admin = await db.collection(COLLECTION).findOne({ adminId: id });
    if (!admin || !(await verifyPassword(password, admin.passwordHash))) {
      return { error: "Invalid admin ID or password." };
    }
  } catch (error) {
    logAuthFailure("Sign-in", error);
    return { error: "Unable to sign in right now. Please try again shortly." };
  }

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, makeSessionToken(id), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
  });

  // Redirect server-side so the navigation to /admin re-renders the shared
  // admin layout with the new session cookie present. A client-side
  // router.push would reuse the cached (unauthenticated) layout segment,
  // flashing between the sidebar and the login form. `redirect` throws, so
  // it must stay outside any try/catch.
  redirect("/admin");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function getAdminId(): Promise<string | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get(COOKIE_NAME)?.value;
  if (!session || session.length !== 64 || !/^[0-9a-f]{64}$/.test(session)) return null;

  try {
    const db = await getDb();
    const admin = await db.collection(COLLECTION).findOne({});
    if (!admin || typeof admin.adminId !== "string") return null;

    const expected = makeSessionToken(admin.adminId);
    return crypto.timingSafeEqual(Buffer.from(session, "hex"), Buffer.from(expected, "hex"))
      ? admin.adminId
      : null;
  } catch (error) {
    // The login page shares the admin layout. A stale cookie must not make
    // that page unusable during a database outage; deny access and allow retry.
    logAuthFailure("Session verification", error);
    return null;
  }
}
