import type { IconName } from "@/lib/types";

/** Admin-managed payment details. Replace placeholders with live values. */
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

export const bankDetails = {
  bankName: "Nepal Bank Limited",
  accountName: "Community Based Rehabilitation Service Nepal",
  accountNumber: "0170 0510 0000 170",
  branch: "Pokhara, Kaski",
  swift: "NEBLNPKA",
};

export const givingLevels: {
  amount: string;
  npr: string;
  impact: string;
  icon: IconName;
}[] = [
  {
    amount: "Rs. 1,000",
    npr: "≈ $8",
    impact: "Provides educational materials for a child with a disability.",
    icon: "book-open",
  },
  {
    amount: "Rs. 5,000",
    npr: "≈ $38",
    impact: "Supports a month of home-based rehabilitation therapy visits.",
    icon: "heart-pulse",
  },
  {
    amount: "Rs. 15,000",
    npr: "≈ $115",
    impact: "Funds vocational skills training for one young person.",
    icon: "briefcase",
  },
  {
    amount: "Rs. 50,000",
    npr: "≈ $380",
    impact: "Helps make a classroom fully accessible and inclusive.",
    icon: "accessibility",
  },
];

export const transparency: { value: string; label: string }[] = [
  { value: "87%", label: "of funds go directly to programs" },
  { value: "100%", label: "annually audited accounts" },
  { value: "19+", label: "years of accountable service" },
  { value: "SWC", label: "affiliated & registered" },
];
