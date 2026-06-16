import type { Metadata } from "next";
import { MapPin, Phone, Award, Users2, UserCheck, Users } from "lucide-react";
import { Container } from "@/components/shared/container";
import { PageHero, HeroChip } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/shared/reveal";
import { Media } from "@/components/shared/media";
import { Badge } from "@/components/ui/badge";
import { MembersTable } from "@/components/team/members-table";
import { DonateBand } from "@/components/layout/donate-band";
import { boardMembers, advisors, generalMembers } from "@/lib/data/team";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the people behind CBRS Nepal: our board of directors, advisors, general members and volunteers working for inclusion and dignity.",
};

export default function OurTeamPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="The People Behind CBRS Nepal"
        description="A dedicated board, experienced advisors and a network of members and volunteers, united by a commitment to inclusion and dignity."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About Us" },
          { label: "Our Team" },
        ]}
      >
        <HeroChip icon={<Users2 className="size-4" aria-hidden="true" />}>
          {boardMembers.length} Board Members
        </HeroChip>
        <HeroChip icon={<UserCheck className="size-4" aria-hidden="true" />}>
          {advisors.length} Advisors
        </HeroChip>
        <HeroChip icon={<Users className="size-4" aria-hidden="true" />}>
          {generalMembers.length}+ General Members
        </HeroChip>
      </PageHero>

      {/* Board of Directors */}
      <section className="py-20 lg:py-24" aria-labelledby="board">
        <Container>
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="Leadership"
              title={<span id="board">Board of Directors</span>}
              description="Elected representatives who steward CBRS Nepal's mission and governance."
            />
          </Reveal>
          <StaggerGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {boardMembers.map((m) => (
              <StaggerItem key={m.id} className="h-full">
                <article className="group h-full overflow-hidden rounded-3xl border border-border bg-surface shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-card-hover">
                  <div className="overflow-hidden">
                    <Media
                      src={m.photo}
                      alt={`Portrait of ${m.name}`}
                      seed={m.id}
                      ratio="aspect-[4/3]"
                      className="transition-transform duration-500 group-hover:scale-[1.04]"
                      icon={<Users2 className="size-7" aria-hidden="true" />}
                    />
                  </div>
                  <div className="p-6">
                    <Badge variant="primary" size="sm">
                      {m.position}
                    </Badge>
                    <h3 className="mt-3 text-lg font-bold text-foreground">
                      {m.name}
                    </h3>
                    <dl className="mt-3 space-y-2.5 text-sm text-muted">
                      <div className="flex items-center gap-2">
                        <MapPin
                          className="size-4 shrink-0 text-accent-700"
                          aria-hidden="true"
                        />
                        <dt className="sr-only">Ward</dt>
                        <dd>{m.ward}</dd>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone
                          className="size-4 shrink-0 text-accent-700"
                          aria-hidden="true"
                        />
                        <dt className="sr-only">Contact</dt>
                        <dd>
                          <a
                            href={`tel:+977${m.contact}`}
                            className="underline-offset-4 transition-colors hover:text-primary hover:underline"
                          >
                            {m.contact}
                          </a>
                        </dd>
                      </div>
                    </dl>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      {/* Advisors */}
      <section className="bg-white py-20 lg:py-24" aria-labelledby="advisors">
        <Container>
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="Guidance"
              title={<span id="advisors">Our Advisors</span>}
              description="Experts who lend their knowledge across medicine, education, law and community development."
            />
          </Reveal>
          <StaggerGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {advisors.map((a) => (
              <StaggerItem key={a.id} className="h-full">
                <article className="flex h-full flex-col items-center rounded-3xl border border-border bg-surface p-6 text-center shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-card-hover">
                  <Media
                    src={a.photo}
                    alt={`Portrait of ${a.name}`}
                    seed={a.id}
                    ratio="aspect-square"
                    rounded="rounded-full"
                    className="size-24"
                    icon={<Award className="size-6" aria-hidden="true" />}
                  />
                  <p className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-accent-50 px-3 py-1 text-xs font-semibold text-accent-700">
                    <Award className="size-3.5" aria-hidden="true" />
                    {a.position}
                  </p>
                  <h3 className="mt-3 text-base font-bold text-foreground">
                    {a.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-muted">{a.expertise}</p>
                  <a
                    href={`tel:+977${a.contact}`}
                    className="mt-auto pt-3 inline-flex items-center gap-1.5 text-xs text-muted underline-offset-4 transition-colors hover:text-primary hover:underline"
                  >
                    <Phone className="size-3.5" aria-hidden="true" />
                    {a.contact}
                  </a>
                </article>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      {/* General Members */}
      <section className="py-20 lg:py-24" aria-labelledby="members">
        <Container size="narrow">
          <Reveal>
            <SectionHeading
              eyebrow="Our Network"
              title={<span id="members">General Members & Volunteers</span>}
              description="The wider CBRS family across Pokhara and beyond. Search by name, role or ward."
            />
          </Reveal>
          <Reveal delay={0.08} className="mt-12">
            <MembersTable members={generalMembers} />
          </Reveal>
        </Container>
      </section>

      <DonateBand />
    </>
  );
}
