import { z } from "zod";

/** Subjects offered in the contact form's dropdown. */
export const subjects = [
  "General Enquiry",
  "Request Services",
  "Volunteer",
  "Partnership",
  "Donation",
  "Media",
] as const;

/**
 * Validation for the public contact form. Shared by the client (react-hook-form
 * resolver) and the `sendContactEmail` server action so both enforce the same
 * rules — the server never trusts the client to have validated.
 */
export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Please enter a valid email address."),
  phone: z
    .string()
    .optional()
    .refine((v) => !v || /^[\d+\-\s()]{6,}$/.test(v), "Please enter a valid phone number."),
  subject: z.string().min(1, "Please choose a subject."),
  message: z.string().min(10, "Please tell us a little more (10+ characters)."),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
