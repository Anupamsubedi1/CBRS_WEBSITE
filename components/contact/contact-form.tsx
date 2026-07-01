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
  const [submitted, setSubmitted] = React.useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { subject: "" },
  });

  function onSubmit(values: FormValues) {
    // Open the visitor's email app with the message pre-filled and addressed to
    // us. They review and press Send in their own client — no backend needed.
    const body = [
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      `Phone: ${values.phone || "—"}`,
      `Subject: ${values.subject}`,
      "",
      values.message,
    ].join("\n");

    const mailto =
      `mailto:${site.contact.email}` +
      `?subject=${encodeURIComponent(`[${values.subject}] Message from ${values.name}`)}` +
      `&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
    setSubmitted(true);
    reset();
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-accent/30 bg-accent-50 p-10 text-center">
        <span className="grid size-14 place-items-center rounded-full bg-accent text-white">
          <MailCheck className="size-7" aria-hidden="true" />
        </span>
        <h3 className="mt-4 text-xl font-bold text-foreground">Almost there!</h3>
        <p className="mt-2 max-w-sm text-muted">
          We&rsquo;ve opened your email app with your message ready to go. Just
          press <span className="font-semibold text-foreground">Send</span> there
          to deliver it to CBRS Nepal.
        </p>
        <Button
          onClick={() => setSubmitted(false)}
          variant="outline"
          className="mt-6"
        >
          Write another message
        </Button>
      </div>
    );
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

      <Button type="submit" size="lg" className="w-full sm:w-auto">
        <Send /> Send Message
      </Button>
    </form>
  );
}
