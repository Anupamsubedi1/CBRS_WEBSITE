import { Heart, ArrowRight, HandHeart } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import type { HomeDonateBand } from "@/lib/types";

const defaultContent: HomeDonateBand = {
  title: "Together, We Can Create Opportunities for Everyone",
  description:
    "Your support helps us empower more lives and build an inclusive society where every person can live with dignity.",
  ctaLabel: "Donate Now",
  ctaHref: "/donate",
};

/**
 * Full-width accent CTA band — "Together, We Can Create Opportunities".
 * Reused above the footer on every page; the homepage passes admin-managed content.
 */
export function DonateBand({ content = defaultContent }: { content?: HomeDonateBand }) {
  return (
    <section className="bg-accent-band">
      <Container className="flex flex-col items-center gap-6 py-12 text-center md:flex-row md:justify-between md:text-left">
        <div className="flex items-center gap-4">
          <span className="hidden size-14 shrink-0 place-items-center rounded-2xl bg-white/15 ring-1 ring-white/25 sm:grid">
            <HandHeart className="size-7 text-white" aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              {content.title}
            </h2>
            <p className="mt-1.5 max-w-xl text-white/85">{content.description}</p>
          </div>
        </div>
        <Button href={content.ctaHref} variant="white" size="lg" className="shrink-0">
          <Heart className="fill-current text-accent" /> {content.ctaLabel}
          <ArrowRight />
        </Button>
      </Container>
    </section>
  );
}
