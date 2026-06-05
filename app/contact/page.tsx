import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { PageHero } from "@/components/shared/page-hero";
import { Reveal } from "@/components/shared/reveal";
import { ContactForm } from "@/components/contact/contact-form";
import { DonateBand } from "@/components/layout/donate-band";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with CBRS Nepal in Pokhara — phone, email, address, contact form and map. We'd love to hear from you.",
};

const infoCards = [
  {
    icon: MapPin,
    title: "Visit Us",
    lines: ["CBRS Head Office", "Pokhara, Kaski", "Gandaki Province, Nepal"],
  },
  {
    icon: Phone,
    title: "Call Us",
    lines: [site.contact.phone, site.contact.mobile],
    hrefs: [`tel:${site.contact.phone}`, `tel:${site.contact.mobile}`],
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: [site.contact.email],
    hrefs: [`mailto:${site.contact.email}`],
  },
  {
    icon: Clock,
    title: "Office Hours",
    lines: ["Sun – Fri: 10am – 5pm", "Saturday: Closed"],
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in Touch"
        title="We'd Love to Hear From You"
        description="Whether you need our services, want to volunteer, partner or support our work — our team in Pokhara is here to help."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      {/* Info cards */}
      <section className="py-20 lg:py-24">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {infoCards.map((card, i) => (
              <Reveal as="div" key={card.title} delay={i * 0.06}>
                <div className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6 shadow-card">
                  <span className="grid size-12 place-items-center rounded-2xl bg-primary-50 text-primary">
                    <card.icon className="size-6" aria-hidden="true" />
                  </span>
                  <h2 className="mt-4 text-base font-bold text-foreground">{card.title}</h2>
                  <div className="mt-2 space-y-1 text-sm text-muted">
                    {card.lines.map((line, j) =>
                      card.hrefs?.[j] ? (
                        <a
                          key={j}
                          href={card.hrefs[j]}
                          className="block transition-colors hover:text-primary"
                        >
                          {line}
                        </a>
                      ) : (
                        <p key={j}>{line}</p>
                      ),
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Form + map */}
          <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
            <Reveal>
              <div className="rounded-3xl border border-border bg-surface p-7 shadow-card sm:p-9">
                <h2 className="text-2xl font-bold">Send Us a Message</h2>
                <p className="mt-2 text-muted">
                  Fill in the form and we'll respond as soon as we can. Fields
                  marked with <span className="text-danger">*</span> are required.
                </p>
                <div className="mt-7">
                  <ContactForm />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08} className="flex flex-col gap-6">
              {/* Map */}
              <div className="overflow-hidden rounded-3xl border border-border shadow-card">
                <iframe
                  title="CBRS Nepal location in Pokhara, Nepal"
                  src="https://www.google.com/maps?q=Pokhara,+Kaski,+Nepal&z=13&output=embed"
                  className="h-72 w-full lg:h-80"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Registration trust card */}
              <div className="rounded-3xl bg-brand-band p-7 text-white">
                <h3 className="text-lg font-bold text-white">Registered & Accountable</h3>
                <p className="mt-2 text-sm text-white/85">
                  CBRS Nepal is a registered non-government organization,
                  affiliated with the Social Welfare Council of Nepal.
                </p>
                <dl className="mt-5 space-y-3 text-sm">
                  <div className="flex justify-between gap-4 border-b border-white/15 pb-3">
                    <dt className="text-white/70">DAO Kaski Reg. No.</dt>
                    <dd className="font-semibold text-white">170/051</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-white/70">SWC Affiliation No.</dt>
                    <dd className="font-semibold text-white">2607/051</dd>
                  </div>
                </dl>
                <a
                  href="/donate"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:gap-2.5"
                >
                  Support our work <ArrowRight className="size-4" />
                </a>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <DonateBand />
    </>
  );
}
