import type { DonationContent } from "@/lib/types";

/**
 * Default Donation page content — seeds the `donationContent` document the first
 * time `/admin/donation` (or the public page) is accessed, and acts as a
 * fallback for any field missing from a saved document.
 *
 * Only verified CBRS Nepal details are kept here. The wallet IDs are the
 * organisation's published mobile number. The bank QR image is uploaded via the
 * admin panel; until then banners render a branded placeholder.
 */
export const defaultDonationContent: DonationContent = {
  hero: {
    eyebrow: "Stand With Us",
    title: "Your Support Changes Lives",
    description:
      "Every contribution helps a person with a disability gain therapy, education, skills and dignity. Give with confidence to a registered organization.",
  },
  whyGive: {
    eyebrow: "Why Give",
    title: "Turning compassion into opportunity",
    paragraphs: [
      "CBRS Nepal works with and for people with disabilities and marginalized communities across Gandaki Province. Your donation supports home-based rehabilitation, assistive devices, inclusive education, livelihood training and rights advocacy.",
      "We are a registered non-government organization affiliated with the Social Welfare Council of Nepal, so you can give knowing your gift reaches the people who need it most.",
    ],
  },
  waysToGive: {
    eyebrow: "Ways to Give",
    title: "How You Can Donate",
    description:
      "Send your gift through a digital wallet, or contact our office for bank transfer and partnership details.",
  },
  paymentMethods: [
    { label: "eSewa", id: "9856025511", name: "CBRS Nepal", color: "#60BB46" },
    { label: "Khalti", id: "9856025511", name: "CBRS Nepal", color: "#5C2D91" },
  ],
  bankQr: {
    image: null,
    caption: "Scan to Donate",
    accountName: "CBRS Nepal",
  },
};
