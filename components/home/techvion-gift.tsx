import { Gift, ArrowUpRight, Heart } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";

/**
 * "A Gift With Gratitude" band — acknowledges this website as a gift from
 * Techvion Technology. Sits directly beneath the "Who We Are" section on the
 * homepage and echoes the site's card + soft-glow visual language.
 */
export function TechvionGift() {
  return (
    <section className="py-6 lg:py-8" aria-labelledby="techvion-gift">
      <Container>
        <Reveal className="relative mx-auto max-w-2xl overflow-hidden rounded-2xl bg-gradient-to-br from-primary-50 via-surface to-accent-100/40 px-5 py-6 shadow-card ring-1 ring-black/5 sm:px-8 sm:py-7">
          {/* Soft glow accents matching the homepage wash */}
          <div
            className="pointer-events-none absolute -right-12 -top-16 size-44 rounded-full bg-accent-100/50 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-16 -left-12 size-44 rounded-full bg-primary-100/50 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative flex flex-col items-center gap-5 text-center sm:flex-row sm:gap-6 sm:text-left">
            {/* Icon tile */}
            <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-primary text-white shadow-float">
              <Gift className="size-7" aria-hidden="true" />
            </span>

            <div className="flex-1">
              <span className="eyebrow inline-flex items-center gap-1.5">
                <Heart className="size-3" aria-hidden="true" />
                A Gift With Gratitude
              </span>
              <h2
                id="techvion-gift"
                className="mt-2 text-xl font-bold leading-tight sm:text-2xl"
              >
                This website is a gift to CBRS Nepal from{" "}
                <span className="text-primary">Techvion Technology</span>
              </h2>
              <div className="mt-4 flex justify-center sm:justify-start">
                <Button
                  href="https://www.techvion.com.np"
                  size="sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Techvion Technology <ArrowUpRight />
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
