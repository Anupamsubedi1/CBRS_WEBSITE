import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { Media } from "@/components/shared/media";
import { Reveal } from "@/components/shared/reveal";
import { site } from "@/lib/data/site";

export function AboutStrip() {
  return (
    <section
      className="relative overflow-hidden py-20 lg:py-28"
      aria-labelledby="who-we-are"
    >
      {/* Soft single-colour wash behind the photo composition */}
      <div
        className="absolute -left-48 top-16 size-[30rem] rounded-full bg-primary-50/80 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
          {/* Layered photo composition */}
          <Reveal className="relative pb-10 sm:pb-12">
            <Media
              src="/community.jpeg"
              alt="Community members and CBRS staff gathered together in Pokhara"
              ratio="aspect-[5/4]"
              rounded="rounded-3xl"
              className="shadow-card"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Offset secondary photo, framed like a print */}
            <div className="absolute -bottom-2 -left-2 hidden w-44 -rotate-2 overflow-hidden rounded-2xl border-[5px] border-white shadow-float sm:block lg:w-56">
              <Media
                src="/banner.jpg"
                alt="CBRS Nepal team and community members standing together"
                ratio="aspect-[4/3]"
                sizes="224px"
              />
            </div>
            {/* Registration badge */}
            <div className="absolute bottom-2 right-5 rounded-2xl bg-primary px-6 py-4 text-white shadow-float">
              <span className="block font-display text-2xl font-bold leading-none">
                170/051
              </span>
              <span className="mt-1 block text-xs font-medium tracking-wide text-white/80">
                DAO Kaski Reg. No.
              </span>
            </div>
          </Reveal>

          {/* Copy */}
          <Reveal>
            <span className="eyebrow">Who We Are</span>
            <h2
              id="who-we-are"
              className="mt-3 text-3xl font-bold leading-tight sm:text-4xl"
            >
              Walking alongside people with disabilities and their communities
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
              CBRS Nepal is a non-government organization that works with and
              for people with disabilities, their families and marginalized
              communities across Nepal. We work in genuine partnership with the
              people we serve, who help plan, decide, monitor and evaluate
              everything we do.
            </p>

            {/* Vision pull-quote */}
            <blockquote className="mt-7 border-l-4 border-accent pl-5">
              <p className="text-base font-medium leading-relaxed text-primary-800 sm:text-lg">
                &ldquo;{site.vision}&rdquo;
              </p>
              <cite className="mt-2 block text-sm not-italic text-muted">
                Our vision
              </cite>
            </blockquote>

            <p className="mt-6 text-sm leading-relaxed text-muted">
              Registered with the District Administration Office, Kaski and
              affiliated with the Social Welfare Council of Nepal. Focused on
              Gandaki Province while serving nationwide.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/about/cbrs-nepal">
                Learn More About Us <ArrowRight />
              </Button>
              <Button href="/about/our-team" variant="ghost">
                Meet Our Team
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
