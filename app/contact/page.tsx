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
      <style>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .slide-from-left {
          animation: slideInLeft 700ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          opacity: 0;
        }

        .delay-0   { animation-delay: 0ms; }
        .delay-80  { animation-delay: 80ms; }
        .delay-160 { animation-delay: 160ms; }
        .delay-240 { animation-delay: 240ms; }
        .delay-320 { animation-delay: 320ms; }
        .delay-400 { animation-delay: 400ms; }
        .delay-480 { animation-delay: 480ms; }
      `}</style>

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
                <div
                  className={`slide-from-left delay-${i * 80} group flex h-full flex-col rounded-2xl border border-border bg-surface p-6 shadow-card transition-all duration-500 hover:-translate-y-2 hover:border-accent hover:shadow-2xl hover:bg-accent sm:p-6`}
                >
                  <span className="grid size-12 place-items-center rounded-2xl bg-primary-50 text-primary transition-all duration-300 group-hover:scale-125 group-hover:bg-white group-hover:text-accent group-hover:rotate-12">
                    <card.icon className="size-6 transition-transform duration-300" aria-hidden="true" />
                  </span>
                  <h2 className="mt-4 text-base font-bold text-foreground transition-colors duration-300 group-hover:text-white">
                    {card.title}
                  </h2>
                  <div className="mt-2 space-y-1 text-sm text-muted transition-colors duration-300 group-hover:text-white">
                    {card.lines.map((line, j) =>
                      card.hrefs?.[j] ? (
                        <a
                          key={j}
                          href={card.hrefs[j]}
                          className="block transition-all duration-300 hover:translate-x-1 hover:text-white font-medium group-hover:text-white"
                        >
                          {line}
                        </a>
                      ) : (
                        <p key={j} className="transition-colors duration-300 group-hover:text-white/90">
                          {line}
                        </p>
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
              <div className="slide-from-left delay-320 rounded-3xl border border-border bg-surface p-7 shadow-card transition-all duration-500 hover:border-accent/30 hover:shadow-2xl hover:bg-linear-to-br hover:from-accent/5 hover:to-accent/10 sm:p-9">
                <h2 className="text-2xl font-bold transition-colors duration-300 hover:text-accent">
                  Send Us a Message
                </h2>
                <p className="mt-2 text-muted transition-colors duration-300 hover:text-foreground/80">
                  Fill in the form and we'll respond as soon as we can. Fields
                  marked with <span className="text-danger font-bold">*</span> are required.
                </p>
                <div className="mt-7">
                  <ContactForm />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08} className="flex flex-col gap-6">
              {/* Map */}
              <div className="slide-from-left delay-400 group overflow-hidden rounded-3xl border border-border shadow-card transition-all duration-500 hover:border-accent/50 hover:shadow-2xl">
                <iframe
                  title="CBRS Nepal location in Pokhara, Nepal"
                  src="https://www.google.com/maps?q=Pokhara,+Kaski,+Nepal&z=13&output=embed"
                  className="h-72 w-full transition-transform duration-500 group-hover:scale-[1.05] lg:h-80"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Registration trust card */}
              <div className="slide-from-left delay-480 group rounded-3xl bg-linear-to-br from-primary to-primary/90 p-7 text-white shadow-card transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:from-black hover:to-black/95">
                <h3 className="text-lg font-bold text-white transition-colors duration-300 group-hover:text-white">
                  Registered & Accountable
                </h3>
                <p className="mt-2 text-sm text-white/85 transition-colors duration-300 group-hover:text-white">
                  CBRS Nepal is a registered non-government organization,
                  affiliated with the Social Welfare Council of Nepal.
                </p>
                <dl className="mt-5 space-y-3 text-sm">
                  <div className="flex justify-between gap-4 border-b border-white/15 pb-3 transition-all duration-300 group-hover:border-white/30">
                    <dt className="text-white/70 transition-colors duration-300 group-hover:text-white/90">
                      DAO Kaski Reg. No.
                    </dt>
                    <dd className="font-semibold text-white">170/051</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-white/70 transition-colors duration-300 group-hover:text-white/90">
                      SWC Affiliation No.
                    </dt>
                    <dd className="font-semibold text-white">2607/051</dd>
                  </div>
                </dl>
                <a
                  href="/donate"
                  className="group/link mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-white transition-all duration-300 hover:gap-3 hover:text-white"
                >
                  Support our work{" "}
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover/link:translate-x-1" />
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