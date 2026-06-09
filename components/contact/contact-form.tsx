"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const schema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Please enter a valid email address."),
  phone: z
    .string()
    .optional()
    .refine((v) => !v || /^[\d+\-\s()]{6,}$/.test(v), "Please enter a valid phone number."),
  subject: z.string().min(1, "Please choose a subject."),
  message: z.string().min(10, "Please tell us a little more (10+ characters)."),
});

type FormValues = z.infer<typeof schema>;

const subjects = [
  "General Enquiry",
  "Request Services",
  "Volunteer",
  "Partnership",
  "Donation",
  "Media",
];

export function ContactForm() {
  const [submitted, setSubmitted] = React.useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { subject: "" },
  });

  async function onSubmit(values: FormValues) {
    // Simulate an API request. Wire to your /api/contact route + email service.
    await new Promise((r) => setTimeout(r, 900));
    // eslint-disable-next-line no-console
    console.log("Contact submission:", values);
    setSubmitted(true);
    reset();
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-accent/30 bg-accent-50 p-10 text-center animate-in fade-in zoom-in duration-500">
        <span className="grid size-14 place-items-center rounded-full bg-accent text-white shadow-lg transition-all duration-500 hover:scale-110 hover:shadow-2xl">
          <CheckCircle2 className="size-7 animate-in fade-in" aria-hidden="true" />
        </span>
        <h3 className="mt-4 text-xl font-bold text-foreground animate-in fade-in slide-in-from-bottom">Message sent!</h3>
        <p className="mt-2 max-w-sm text-muted animate-in fade-in slide-in-from-bottom">
          Thank you for reaching out to CBRS Nepal. Our team will get back to you
          as soon as possible.
        </p>
        <Button 
          onClick={() => setSubmitted(false)} 
          variant="outline" 
          className="mt-6 animate-in fade-in slide-in-from-bottom transition-all duration-300 hover:bg-accent hover:text-white hover:border-accent"
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="animate-in fade-in slide-in-from-left">
          <Label htmlFor="name" required>Full name</Label>
          <Input
            id="name"
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className="transition-all duration-300 focus:ring-2 focus:ring-accent focus:border-transparent hover:border-accent/50"
            {...register("name")}
          />
          {errors.name && (
            <p id="name-error" className="mt-1.5 text-sm text-danger animate-in fade-in" role="alert">
              {errors.name.message}
            </p>
          )}
        </div>
        <div className="animate-in fade-in slide-in-from-right">
          <Label htmlFor="email" required>Email address</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className="transition-all duration-300 focus:ring-2 focus:ring-accent focus:border-transparent hover:border-accent/50"
            {...register("email")}
          />
          {errors.email && (
            <p id="email-error" className="mt-1.5 text-sm text-danger animate-in fade-in" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="animate-in fade-in slide-in-from-left">
          <Label htmlFor="phone">Phone (optional)</Label>
          <Input
            id="phone"
            type="tel"
            autoComplete="tel"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className="transition-all duration-300 focus:ring-2 focus:ring-accent focus:border-transparent hover:border-accent/50"
            {...register("phone")}
          />
          {errors.phone && (
            <p id="phone-error" className="mt-1.5 text-sm text-danger animate-in fade-in" role="alert">
              {errors.phone.message}
            </p>
          )}
        </div>
        <div className="animate-in fade-in slide-in-from-right">
          <Label htmlFor="subject" required>Subject</Label>
          <Select
            id="subject"
            aria-invalid={!!errors.subject}
            aria-describedby={errors.subject ? "subject-error" : undefined}
            className="transition-all duration-300 focus:ring-2 focus:ring-accent focus:border-transparent hover:border-accent/50"
            {...register("subject")}
          >
            <option value="" disabled>Choose a subject…</option>
            {subjects.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </Select>
          {errors.subject && (
            <p id="subject-error" className="mt-1.5 text-sm text-danger animate-in fade-in" role="alert">
              {errors.subject.message}
            </p>
          )}
        </div>
      </div>

      <div className="animate-in fade-in slide-in-from-bottom">
        <Label htmlFor="message" required>Message</Label>
        <Textarea
          id="message"
          rows={6}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className="transition-all duration-300 focus:ring-2 focus:ring-accent focus:border-transparent hover:border-accent/50 resize-none"
          {...register("message")}
        />
        {errors.message && (
          <p id="message-error" className="mt-1.5 text-sm text-danger animate-in fade-in" role="alert">
            {errors.message.message}
          </p>
        )}
      </div>

      <div className="animate-in fade-in slide-in-from-bottom">
        <Button 
          type="submit" 
          size="lg" 
          disabled={isSubmitting} 
          className="w-full sm:w-auto transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:bg-accent group"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" /> Sending…
            </>
          ) : (
            <>
              <Send className="transition-transform duration-300 group-hover:translate-x-1" /> Send Message
            </>
          )}
        </Button>
      </div>
    </form>
  );
}