import { ArrowRight, Users } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { Media } from "@/components/shared/media";
import { Reveal } from "@/components/shared/reveal";
import { Counter } from "@/components/shared/counter";
import { ThemeIcon } from "@/components/shared/icon";
import type { HomeAbout } from "@/lib/types";

export function AboutStrip({ content }: { content: HomeAbout }) {
  return (
    <section className="py-20 lg:py-24" aria-labelledby="who-we-are">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        {/* Image with floating badge */}
        <Reveal className="relative">
          <Media
            src={content.image?.url}
            alt="A family with a person who uses a wheelchair, smiling together in a Nepali village"
            seed="who-we-are"
            label="Families we walk alongside"
            ratio="aspect-[5/4]"
            rounded="rounded-3xl"
            className="shadow-card"
            icon={<Users className="size-7" aria-hidden="true" />}
          />
          <div className="absolute -bottom-6 -right-4 hidden rounded-2xl bg-primary px-5 py-4 text-white shadow-float sm:block">
            <span className="block text-3xl font-bold">
              <Counter value={content.badgeValue} />
            </span>
            <span className="text-xs text-white/80">{content.badgeLabel}</span>
          </div>
        </Reveal>

        {/* Copy */}
        <div>
          <Reveal>
            <span className="eyebrow">{content.eyebrow}</span>
            <h2 id="who-we-are" className="mt-3 text-3xl font-bold sm:text-4xl">
              {content.title}
            </h2>
            {content.paragraphs.map((p, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? "mt-5 text-base leading-relaxed text-muted sm:text-lg"
                    : "mt-4 text-base leading-relaxed text-muted"
                }
              >
                {p}
              </p>
            ))}
            <Button href={content.ctaHref} className="mt-7">
              {content.ctaLabel} <ArrowRight />
            </Button>
          </Reveal>

          {/* Stats */}
          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-border pt-8 sm:grid-cols-4">
            {content.stats.map((s, i) => (
              <Reveal as="div" key={s.label} delay={i * 0.06}>
                <span className="grid size-10 place-items-center rounded-xl bg-accent-50 text-accent-700">
                  <ThemeIcon name={s.icon} className="size-5" />
                </span>
                <dd className="mt-3 text-2xl font-bold text-primary">
                  <Counter value={s.value} />
                </dd>
                <dt className="text-sm text-muted">{s.label}</dt>
              </Reveal>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
