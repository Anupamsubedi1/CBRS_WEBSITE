import type { Metadata } from "next";
import { MapPin, Mail, Award, Users2 } from "lucide-react";
import { Container } from "@/components/shared/container";
import { PageHero } from "@/components/shared/page-hero";
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
    "Meet the Board of Directors, Advisors and members who lead and support CBRS Nepal's work with and for people with disabilities.",
};

export default function OurTeamPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="The People Behind CBRS Nepal"
        description="A dedicated board, experienced advisors and a network of members and volunteers — united by a commitment to inclusion and dignity."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About Us" },
          { label: "Our Team" },
        ]}
      />

      {/* Board of Directors */}
      <section className="py-20 lg:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Leadership"
              title="Board of Directors"
              description="Elected representatives who steward CBRS Nepal's mission and governance."
            />
          </Reveal>
          <StaggerGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {boardMembers.map((m) => (
              <StaggerItem key={m.id}>
                <article className="group h-full overflow-hidden rounded-2xl border border-border bg-surface shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
                  <Media
                    src={m.photo}
                    alt={`Portrait of ${m.name}`}
                    seed={m.id}
                    ratio="aspect-[4/3]"
                    className="transition-transform duration-500 group-hover:scale-[1.03]"
                    icon={<Users2 className="size-7" aria-hidden="true" />}
                  />
                  <div className="p-6">
                    <Badge variant="primary" size="sm">{m.position}</Badge>
                    <h3 className="mt-3 text-lg font-bold text-foreground">{m.name}</h3>
                    <dl className="mt-3 space-y-2 text-sm text-muted">
                      <div className="flex items-center gap-2">
                        <MapPin className="size-4 shrink-0 text-accent" aria-hidden="true" />
                        <dt className="sr-only">Ward</dt>
                        <dd>{m.ward}</dd>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="size-4 shrink-0 text-accent" aria-hidden="true" />
                        <dt className="sr-only">Contact</dt>
                        <dd>
                          <a href={`mailto:${m.contact}`} className="hover:text-primary">
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
      <section className="bg-white py-20 lg:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Guidance"
              title="Our Advisors"
              description="Experts who lend their knowledge across medicine, education, law and community development."
            />
          </Reveal>
          <StaggerGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {advisors.map((a) => (
              <StaggerItem key={a.id}>
                <article className="flex h-full flex-col items-center rounded-2xl border border-border bg-surface p-6 text-center shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
                  <Media
                    src={a.photo}
                    alt={`Portrait of ${a.name}`}
                    seed={a.id}
                    ratio="aspect-square"
                    rounded="rounded-full"
                    className="size-24"
                    icon={<Award className="size-6" aria-hidden="true" />}
                  />
                  <h3 className="mt-4 text-base font-bold text-foreground">{a.name}</h3>
                  <p className="text-sm font-medium text-primary">{a.position}</p>
                  <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-accent-50 px-3 py-1 text-xs font-semibold text-accent-700">
                    <Award className="size-3.5" aria-hidden="true" />
                    {a.expertise}
                  </p>
                  <a
                    href={`mailto:${a.contact}`}
                    className="mt-3 text-xs text-muted hover:text-primary"
                  >
                    {a.contact}
                  </a>
                </article>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      {/* General Members */}
      <section className="py-20 lg:py-24">
        <Container size="narrow">
          <Reveal>
            <SectionHeading
              eyebrow="Our Network"
              title="General Members & Volunteers"
              description="The wider CBRS family across Pokhara and beyond. Search by name, role or ward."
            />
          </Reveal>
          <Reveal className="mt-12">
            <MembersTable members={generalMembers} />
          </Reveal>
        </Container>
      </section>

      <DonateBand />
    </>
  );
}
