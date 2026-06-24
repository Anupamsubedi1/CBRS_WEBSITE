import crypto from "crypto";
import type { CloudinaryImage } from "@/lib/types";

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME!;
const API_KEY = process.env.CLOUDINARY_API_KEY!;
const API_SECRET = process.env.CLOUDINARY_API_SECRET!;

const FOLDER = "cbrs-nepal/homepage";

// `api.cloudinary.com` resolves to several IPv4 addresses and Node's fetch
// (undici) sometimes picks one that doesn't answer, hanging until its 10s
// connect timeout and throwing `ConnectTimeoutError`. That made uploads fail
// intermittently — the image never persisted, so it "didn't show". Retrying
// re-resolves DNS and almost always lands on a responsive address.
const MAX_ATTEMPTS = 4;
const ATTEMPT_TIMEOUT_MS = 30_000;

function isTransient(err: unknown): boolean {
  // Network-level failures (connect timeout, reset, DNS) surface as a
  // TypeError("fetch failed") with a `cause`, or an abort/timeout error.
  const name = (err as { name?: string })?.name;
  if (name === "AbortError" || name === "TimeoutError") return true;
  const cause = (err as { cause?: { code?: string } })?.cause;
  const code = cause?.code ?? (err as { code?: string })?.code;
  return (
    err instanceof TypeError ||
    code === "UND_ERR_CONNECT_TIMEOUT" ||
    code === "ECONNRESET" ||
    code === "ETIMEDOUT" ||
    code === "EAI_AGAIN" ||
    code === "ENOTFOUND"
  );
}

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * POST to a Cloudinary endpoint, rebuilding the request each attempt (a fresh
 * timestamp/signature and a fresh body, since a File stream can't be replayed).
 */
async function cloudinaryPost(
  endpoint: string,
  buildBody: () => FormData,
): Promise<Response> {
  let lastErr: unknown;
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${endpoint}`,
        {
          method: "POST",
          body: buildBody(),
          signal: AbortSignal.timeout(ATTEMPT_TIMEOUT_MS),
        },
      );
      return res;
    } catch (err) {
      lastErr = err;
      if (attempt < MAX_ATTEMPTS && isTransient(err)) {
        await wait(300 * attempt);
        continue;
      }
      throw err;
    }
  }
  throw lastErr;
}

function sign(params: Record<string, string | number>): string {
  const toSign = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("&");
  return crypto
    .createHash("sha1")
    .update(toSign + API_SECRET)
    .digest("hex");
}

/** Upload an image file to Cloudinary, returning its URL and public ID. */
export async function uploadImage(file: File): Promise<CloudinaryImage> {
  const res = await cloudinaryPost("image/upload", () => {
    const timestamp = Math.round(Date.now() / 1000);
    const signature = sign({ folder: FOLDER, timestamp });
    const body = new FormData();
    body.append("file", file);
    body.append("api_key", API_KEY);
    body.append("timestamp", String(timestamp));
    body.append("signature", signature);
    body.append("folder", FOLDER);
    return body;
  });

  if (!res.ok) {
    throw new Error(`Cloudinary upload failed: ${await res.text()}`);
  }

  const data = (await res.json()) as { secure_url: string; public_id: string };
  return { url: data.secure_url, publicId: data.public_id };
}

/** Permanently delete an image from Cloudinary by its public ID. */
export async function deleteImage(publicId: string): Promise<void> {
  const res = await cloudinaryPost("image/destroy", () => {
    const timestamp = Math.round(Date.now() / 1000);
    const signature = sign({ public_id: publicId, timestamp });
    const body = new FormData();
    body.append("public_id", publicId);
    body.append("api_key", API_KEY);
    body.append("timestamp", String(timestamp));
    body.append("signature", signature);
    return body;
  });

  if (!res.ok) {
    throw new Error(`Cloudinary delete failed: ${await res.text()}`);
  }
}
