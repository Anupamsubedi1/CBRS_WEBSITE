"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, MailCheck } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/data/site";
import {
  contactSchema,
  subjects,
  type ContactFormValues as FormValues,
} from "@/lib/contact-schema";

export function ContactForm() {
  const [sent, setSent] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { subject: "" },
  });

  function onSubmit(values: FormValues) {
    const subject = `[${values.subject}] Message from ${values.name}`;
    const body = [
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      `Phone: ${values.phone || "—"}`,
      `Subject: ${values.subject}`,
      "",
      values.message,
    ].join("\n");

    // On phones/tablets, mailto: opens the native mail app (usually Gmail) with
    // a clean compose screen. On desktop it would open whatever client is set as
    // the OS default — which many people never use — so we open Gmail on the web
    // instead, with the message pre-filled. The visitor reviews and hits Send.
    const isMobile =
      typeof navigator !== "undefined" &&
      /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);

    if (isMobile) {
      window.location.href =
        `mailto:${site.contact.email}` +
        `?subject=${encodeURIComponent(subject)}` +
        `&body=${encodeURIComponent(body)}`;
    } else {
      const gmail =
        `https://mail.google.com/mail/?view=cm&fs=1` +
        `&to=${encodeURIComponent(site.contact.email)}` +
        `&su=${encodeURIComponent(subject)}` +
        `&body=${encodeURIComponent(body)}`;
      // Prefer a new tab; if a popup blocker stops it, navigate the current tab.
      const win = window.open(gmail, "_blank", "noopener,noreferrer");
      if (!win) window.location.href = gmail;
    }

    // Keep the visitor on the contact page — the email opens in a separate tab
    // (desktop) or the mail app (mobile). We only show a small inline note.
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="name" required>Full name</Label>
          <Input
            id="name"
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            {...register("name")}
          />
          {errors.name && (
            <p id="name-error" className="mt-1.5 text-sm text-danger" role="alert">
              {errors.name.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="email" required>Email address</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            {...register("email")}
          />
          {errors.email && (
            <p id="email-error" className="mt-1.5 text-sm text-danger" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="phone">Phone (optional)</Label>
          <Input
            id="phone"
            type="tel"
            autoComplete="tel"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            {...register("phone")}
          />
          {errors.phone && (
            <p id="phone-error" className="mt-1.5 text-sm text-danger" role="alert">
              {errors.phone.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="subject" required>Subject</Label>
          <Select
            id="subject"
            aria-invalid={!!errors.subject}
            aria-describedby={errors.subject ? "subject-error" : undefined}
            {...register("subject")}
          >
            <option value="" disabled>Choose a subject…</option>
            {subjects.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </Select>
          {errors.subject && (
            <p id="subject-error" className="mt-1.5 text-sm text-danger" role="alert">
              {errors.subject.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="message" required>Message</Label>
        <Textarea
          id="message"
          rows={6}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className="resize-none"
          {...register("message")}
        />
        {errors.message && (
          <p id="message-error" className="mt-1.5 text-sm text-danger" role="alert">
            {errors.message.message}
          </p>
        )}
      </div>

      {sent && (
        <p
          className="flex items-center gap-2 rounded-xl border border-accent/30 bg-accent-50 p-3 text-sm text-foreground"
          role="status"
        >
          <MailCheck className="size-4 shrink-0 text-accent" aria-hidden="true" />
          We&rsquo;ve opened your email with the message ready — just press{" "}
          <span className="font-semibold">Send</span> there to deliver it to CBRS
          Nepal.
        </p>
      )}

      <Button type="submit" size="lg" className="w-full sm:w-auto">
        <Send /> Send Message
      </Button>
    </form>
  );
}
