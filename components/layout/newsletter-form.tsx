"use client";

import * as React from "react";
import { Send, CheckCircle2 } from "lucide-react";

/** Footer email-capture. Validates client-side; wire `onSubmit` to your ESP. */
export function NewsletterForm() {
  const [email, setEmail] = React.useState("");
  const [done, setDone] = React.useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    // TODO: POST to newsletter API / Mailchimp.
    setDone(true);
    setEmail("");
  }

  if (done) {
    return (
      <p className="flex items-center gap-2 text-sm text-accent-100">
        <CheckCircle2 className="size-4" aria-hidden="true" />
        Thank you for subscribing!
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
      <label htmlFor="newsletter-email" className="sr-only">
        Your email address
      </label>
      <div className="flex gap-2">
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          className="h-11 w-full rounded-xl border border-white/15 bg-white/10 px-4 text-sm text-white placeholder:text-white/50 focus-visible:border-accent focus-visible:outline-3 focus-visible:outline-offset-0 focus-visible:outline-accent/40"
        />
        <button
          type="submit"
          aria-label="Subscribe"
          className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent text-white transition-colors hover:bg-accent-600 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-accent/50"
        >
          <Send className="size-4" />
        </button>
      </div>
    </form>
  );
}
