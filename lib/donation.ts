import { cache } from "react";
import { getDb } from "@/lib/db";
import { defaultDonationContent } from "@/lib/data/donation";
import type { DonationContent } from "@/lib/types";

const COLLECTION = "donationContent";
const DOC_ID = "donation";

type DonationDoc = DonationContent & { _id: string };

/**
 * Fetch the Donation page content, falling back to defaults for any missing
 * field. Wrapped in React `cache` so the donate page and the site-wide bank-QR
 * banner share a single query per render.
 */
export const getDonationContent = cache(async (): Promise<DonationContent> => {
  const db = await getDb();
  const doc = await db
    .collection<DonationDoc>(COLLECTION)
    .findOne({ _id: DOC_ID });

  if (!doc) return defaultDonationContent;

  const { _id: _omit, ...content } = doc;
  void _omit;

  return {
    hero: { ...defaultDonationContent.hero, ...content.hero },
    whyGive: { ...defaultDonationContent.whyGive, ...content.whyGive },
    waysToGive: { ...defaultDonationContent.waysToGive, ...content.waysToGive },
    paymentMethods: content.paymentMethods ?? defaultDonationContent.paymentMethods,
    bankQr: { ...defaultDonationContent.bankQr, ...content.bankQr },
  };
});

/** Persist the full Donation page content document. */
export async function saveDonationContent(content: DonationContent): Promise<void> {
  const db = await getDb();
  await db
    .collection<DonationDoc>(COLLECTION)
    .updateOne({ _id: DOC_ID }, { $set: content }, { upsert: true });
}
