/**
 * Donation details. Only verified CBRS Nepal contact details are kept here.
 * The wallet ID below is the organisation's published mobile number. Bank
 * account details will be added once confirmed; until then supporters are
 * asked to contact the office directly.
 */
export const paymentMethods = {
  esewa: {
    label: "eSewa",
    id: "9856025511",
    name: "CBRS Nepal",
    color: "#60BB46",
  },
  khalti: {
    label: "Khalti",
    id: "9856025511",
    name: "CBRS Nepal",
    color: "#5C2D91",
  },
};

/**
 * Bank-account QR shown on the right of every page banner and on the donation
 * page. This is the single source of truth and is intended to be admin-managed
 * (Donation page = "Admin + QR"): set `image` to the uploaded QR URL. Until a
 * QR is uploaded, banners render a branded placeholder instead of a broken one.
 */
export const bankQr = {
  /** Uploaded QR image URL (admin-managed). `null` → show placeholder. */
  image: null as string | null,
  caption: "Scan to Donate",
  accountName: "CBRS Nepal",
};
