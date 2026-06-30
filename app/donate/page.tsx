import type { Metadata } from "next";
import {
  Heart,
  ShieldCheck,
  Smartphone,
  Mail,
  Phone,
  ArrowRight,
} from "lucide-react";
import { Container } from "@/components/shared/container";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/shared/reveal";
import { ThemeIcon } from "@/components/shared/icon";
import type { IconName } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/data/site";
import { getDonationContent } from "@/lib/donation";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Support CBRS Nepal to help people with disabilities and marginalized communities live with dignity and opportunity. Give via a digital wallet or contact our office.",
  alternates: { canonical: "/donate" },
};

const impactItems: { t: string; d: string; icon: IconName }[] = [
  {
    t: "Rehabilitation and Health",
    d: "Home therapy, assistive devices and health camps.",
    icon: "heart-pulse",
  },
  {
    t: "Inclusive Education",
    d: "Inclusive classrooms, materials and accessibility.",
    icon: "book-open",
  },
  {
    t: "Livelihood",
    d: "Vocational training and enterprise support.",
    icon: "briefcase",
  },
  {
    t: "Rights and Inclusion",
    d: "Advocacy, documents and social inclusion.",
    icon: "scale",
  },
];

export default async function DonatePage() {
  const donation = await getDonationContent();

  return (
    <>
      <PageHero
        eyebrow={donation.hero.eyebrow}
        title={donation.hero.title}
        description={donation.hero.description}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Donation" }]}
      />

      {/* Why give + where it goes */}
      <section className="py-20 lg:py-24">
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <Reveal>
              <span className="eyebrow text-accent">{donation.whyGive.eyebrow}</span>
              <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">
                {donation.whyGive.title}
              </h2>
              <div className="mt-5 space-y-4 text-base leading-relaxed text-muted">
                {donation.whyGive.paragraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-sm font-semibold text-accent">
                  <ShieldCheck className="size-4" aria-hidden="true" />
                  Registered and affiliated
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                  <Heart className="size-4 fill-current" aria-hidden="true" />
                  Community-based
                </span>
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button href="/programs">
                  Explore Programs <ArrowRight />
                </Button>
                <Button href="/about/cbrs-nepal" variant="outline">
                  About Us
                </Button>
              </div>
            </Reveal>

            {/* Where your support goes */}
            <StaggerGroup className="grid gap-4 sm:grid-cols-2">
              {impactItems.map((item) => (
                <StaggerItem key={item.t} className="h-full">
                  <div className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-card-hover">
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
                      <ThemeIcon name={item.icon} className="size-5" />
                    </span>
                    <h3 className="mt-4 text-base font-bold text-foreground">
                      {item.t}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">
                      {item.d}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </Container>
      </section>

      {/* Ways to give */}
      <section className="bg-white py-20 lg:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow={donation.waysToGive.eyebrow}
              title={donation.waysToGive.title}
              description={donation.waysToGive.description}
            />
          </Reveal>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {/* Digital wallets */}
            <Reveal>
              <div className="h-full rounded-3xl border border-border bg-surface p-7 shadow-card">
                <h3 className="flex items-center gap-2 text-lg font-bold text-foreground">
                  <Smartphone className="size-5 text-primary" aria-hidden="true" />
                  Digital Wallets
                </h3>
                <p className="mt-2 text-sm text-muted">
                  Send your donation to CBRS Nepal using eSewa or Khalti.
                </p>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {donation.paymentMethods.map(
                    (m) => (
                      <div
                        key={m.label}
                        className="rounded-2xl border border-border p-5"
                        style={{ borderTopColor: m.color, borderTopWidth: 3 }}
                      >
                        <p
                          className="text-base font-bold"
                          style={{ color: m.color }}
                        >
                          {m.label}
                        </p>
                        <dl className="mt-3 space-y-2 text-sm">
                          <div>
                            <dt className="text-xs uppercase tracking-wide text-muted">
                              ID
                            </dt>
                            <dd className="font-semibold text-foreground">
                              {m.id}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-xs uppercase tracking-wide text-muted">
                              Name
                            </dt>
                            <dd className="font-semibold text-foreground">
                              {m.name}
                            </dd>
                          </div>
                        </dl>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </Reveal>

            {/* Contact to give */}
            <Reveal delay={0.06}>
              <div className="flex h-full flex-col rounded-3xl border border-border bg-surface p-7 shadow-card">
                <h3 className="flex items-center gap-2 text-lg font-bold text-foreground">
                  <Heart className="size-5 fill-current text-accent" aria-hidden="true" />
                  Donate or Partner With Us
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  For bank transfers, larger gifts, partnerships or a donation
                  receipt, please contact the CBRS Nepal office. Our team will
                  be glad to help.
                </p>
                <div className="mt-5 flex flex-col gap-3">
                  <a
                    href={`tel:${site.contact.phone}`}
                    className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary/40 hover:text-primary"
                  >
                    <Phone className="size-4" aria-hidden="true" />
                    {site.contact.phone}, {site.contact.mobile}
                  </a>
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary/40 hover:text-primary"
                  >
                    <Mail className="size-4" aria-hidden="true" />
                    {site.contact.email}
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Registered & accountable */}
      <section className="py-20 lg:py-24">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-primary p-8 text-white shadow-card sm:p-10">
              <div className="pattern-grid absolute inset-0 opacity-20" aria-hidden="true" />
              <div className="relative grid items-center gap-8 lg:grid-cols-[1.2fr_1fr]">
                <div>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent-100">
                    <ShieldCheck className="size-5" aria-hidden="true" />
                    Registered and Accountable
                  </span>
                  <h2 className="mt-3 text-2xl font-bold text-white">
                    A registered, affiliated organization
                  </h2>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/85">
                    CBRS Nepal is registered with the District Administration
                    Office, Kaski and affiliated with the Social Welfare Council
                    of Nepal.
                  </p>
                </div>
                <dl className="space-y-3 rounded-2xl bg-white/10 p-6 text-sm ring-1 ring-white/15">
                  <div className="flex justify-between gap-4 border-b border-white/15 pb-3">
                    <dt className="text-white/70">DAO Kaski Reg. No.</dt>
                    <dd className="font-semibold text-white">170/051</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-white/70">SWC Affiliation No.</dt>
                    <dd className="font-semibold text-white">2607/051</dd>
                  </div>
                </dl>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
