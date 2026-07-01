import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, ArrowRight, ShieldCheck } from "lucide-react";
import { Container } from "@/components/shared/container";
import { PageHero, HeroChip } from "@/components/shared/page-hero";
import { Reveal } from "@/components/shared/reveal";
import { ContactForm } from "@/components/contact/contact-form";
import { DonateBand } from "@/components/layout/donate-band";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with CBRS Nepal in Pokhara by phone, email or our contact form. We'd love to hear from you.",
  alternates: { canonical: "/contact" },
};

const infoRows: {
  icon: typeof MapPin;
  title: string;
  lines: { text: string; href?: string }[];
}[] = [
  {
    icon: MapPin,
    title: "Visit us",
    lines: [
      { text: "CBRS Head Office, Nayabazar" },
      { text: "Pokhara Metropolitan City Ward No. 9, Kaski, Nepal" },
    ],
  },
  {
    icon: Phone,
    title: "Call us",
    lines: [
      { text: site.contact.phone, href: `tel:${site.contact.phone}` },
      { text: site.contact.mobile, href: `tel:${site.contact.mobile}` },
    ],
  },
  {
    icon: Mail,
    title: "Email us",
    lines: [{ text: site.contact.email, href: `mailto:${site.contact.email}` }],
  },
  {
    icon: Clock,
    title: "Office hours",
    lines: [{ text: "Sunday to Tuesday: 10am to 5pm" }, { text: "Wednesday to Friday: 10am to 3pm" }, { text: "Saturday: Closed" }],
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in Touch"
        title="We'd Love to Hear From You"
        description="Whether you need our services, want to volunteer, partner or support our work, our team in Pokhara is here to help."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      >
        <HeroChip
          icon={<Phone className="size-4" aria-hidden="true" />}
          href={`tel:${site.contact.phone}`}
        >
          {site.contact.phone}
        </HeroChip>
        <HeroChip
          icon={<Mail className="size-4" aria-hidden="true" />}
          href={`mailto:${site.contact.email}`}
        >
          {site.contact.email}
        </HeroChip>
      </PageHero>

      <section className="py-20 lg:py-24">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            {/* Form */}
            <Reveal>
              <div className="h-full rounded-3xl border border-border bg-surface p-7 shadow-card sm:p-9">
                <span className="eyebrow">Write to us</span>
                <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
                  Send Us a Message
                </h2>
                <p className="mt-2 text-muted">
                  Fill in the form and we&rsquo;ll respond as soon as we can.
                  Fields marked with{" "}
                  <span className="font-bold text-danger" aria-hidden="true">
                    *
                  </span>{" "}
                  are required.
                </p>
                <div className="mt-7">
                  <ContactForm />
                </div>
              </div>
            </Reveal>

            {/* Contact rail */}
            <Reveal delay={0.08} className="flex flex-col gap-6">
              <div className="rounded-3xl border border-border bg-surface p-7 shadow-card">
                <h2 className="text-lg font-bold text-foreground">
                  Reach Us Directly
                </h2>
                <dl className="mt-5 space-y-5">
                  {infoRows.map((row) => (
                    <div key={row.title} className="flex gap-4">
                      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary-50 text-primary">
                        <row.icon className="size-5" aria-hidden="true" />
                      </span>
                      <div>
                        <dt className="text-sm font-semibold text-foreground">
                          {row.title}
                        </dt>
                        <dd className="mt-0.5 space-y-0.5 text-sm text-muted">
                          {row.lines.map((line) =>
                            line.href ? (
                              <a
                                key={line.text}
                                href={line.href}
                                className="block w-fit underline-offset-4 transition-colors hover:text-primary hover:underline"
                              >
                                {line.text}
                              </a>
                            ) : (
                              <p key={line.text}>{line.text}</p>
                            ),
                          )}
                        </dd>
                      </div>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Map */}
              <div className="flex-1 overflow-hidden rounded-3xl border border-border shadow-card">
                <iframe
                  title="CBRS Nepal location in Pokhara, Nepal"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2035.9960214053747!2d83.98905722145706!3d28.21306307891559!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399595b49ed823bf%3A0x4c27345ebdff998d!2sCBRS%20-%20Nepal!5e1!3m2!1sen!2snp!4v1782884910937!5m2!1sen!2snp"
                  className="h-72 w-full lg:h-full lg:min-h-72"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>
          </div>

          {/* Registration / trust band */}
          <Reveal delay={0.1}>
            <div className="relative mt-12 overflow-hidden rounded-3xl bg-primary p-8 text-white shadow-card sm:p-10">
              <div className="pattern-grid absolute inset-0 opacity-20" aria-hidden="true" />
              <div className="relative grid items-center gap-8 lg:grid-cols-[1.2fr_1fr]">
                <div>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent-100">
                    <ShieldCheck className="size-5" aria-hidden="true" />
                    Registered &amp; Accountable
                  </span>
                  <h2 className="mt-3 text-2xl font-bold text-white">
                    A trusted, registered organization
                  </h2>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/85">
                    CBRS Nepal is a registered non-government organization,
                    affiliated with the Social Welfare Council of Nepal.
                  </p>
                  <a
                    href="/donate"
                    className="group mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-white underline-offset-4 hover:underline"
                  >
                    Support our work
                    <ArrowRight
                      className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </a>
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

      <DonateBand />
    </>
  );
}
