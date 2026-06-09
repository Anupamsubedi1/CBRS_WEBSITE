import type { Metadata } from "next";
import {
  Heart,
  ShieldCheck,
  Smartphone,
  Building2,
  ScanLine,
  CheckCircle2,
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
import { QrPlaceholder } from "@/components/donation/qr-placeholder";
import { CopyField } from "@/components/donation/copy-field";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/data/site";
import {
  paymentMethods,
  bankDetails,
  givingLevels,
  transparency,
} from "@/lib/data/donation";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Support CBRS Nepal. Donate via QR code, eSewa, Khalti or bank transfer to help people with disabilities live with dignity and opportunity.",
};

const impactItems: { t: string; d: string; icon: IconName }[] = [
  {
    t: "Rehabilitation",
    d: "Home therapy, assistive devices and health camps.",
    icon: "heart-pulse",
  },
  {
    t: "Education",
    d: "Inclusive classrooms, materials and accessibility.",
    icon: "book-open",
  },
  {
    t: "Livelihoods",
    d: "Vocational training and enterprise support.",
    icon: "briefcase",
  },
  {
    t: "Rights & Voice",
    d: "Advocacy, ID cards and social inclusion.",
    icon: "scale",
  },
];

export default function DonatePage() {
  return (
    <>
      <PageHero
        eyebrow="Stand With Us"
        title="Your Gift Changes Lives"
        description="Every contribution helps a person with a disability gain therapy, education, skills and dignity. Give with confidence — transparently and securely."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Donation" }]}
      />

      {/* Explanation + giving levels */}
      <section className="py-20 lg:py-24">
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-2">
            {/* Left: Why Give */}
            <Reveal>
              <span className="eyebrow text-accent transition-colors duration-300 animate-in fade-in slide-in-from-left">
                Why Give
              </span>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl text-foreground animate-in fade-in slide-in-from-left">
                Turning compassion into opportunity
              </h2>
              <div className="mt-5 space-y-4 text-base leading-relaxed text-muted">
                <p className="transition-colors duration-300 hover:text-foreground/80 animate-in fade-in slide-in-from-left">
                  CBRS Nepal works with and for people with disabilities and
                  marginalized communities across Gandaki Province. Your donation
                  funds home-based rehabilitation, assistive devices, inclusive
                  education, livelihood training and rights advocacy.
                </p>
                <p className="transition-colors duration-300 hover:text-foreground/80 animate-in fade-in slide-in-from-left">
                  We are a registered, audited non-government organization — so
                  you can give knowing your gift reaches the people who need it
                  most.
                </p>
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-sm font-semibold text-accent transition-all duration-300 hover:bg-accent hover:text-white animate-in fade-in slide-in-from-bottom">
                  <ShieldCheck className="size-4 transition-transform duration-300 group-hover:rotate-12" aria-hidden="true" />
                  Secure &amp; transparent
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition-all duration-300 hover:bg-primary hover:text-white animate-in fade-in slide-in-from-bottom">
                  <Heart className="size-4 fill-current transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
                  100% mission-driven
                </span>
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button
                  href="/programs"
                  className="transition-all duration-300 hover:translate-x-1 active:translate-x-0 animate-in fade-in slide-in-from-bottom"
                >
                  Explore Programs <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
                <Button
                  href="/about"
                  variant="outline"
                  className="transition-all duration-300 hover:bg-accent hover:text-white hover:border-accent animate-in fade-in slide-in-from-bottom"
                >
                  About Us
                </Button>
              </div>
            </Reveal>

            {/* Right: Giving levels */}
            <StaggerGroup className="grid gap-4 sm:grid-cols-2">
              {givingLevels.map((g) => (
                <StaggerItem key={g.amount} className="h-full">
                  <div className="flex h-full flex-col rounded-2xl border border-primary/10 bg-surface p-6 shadow-card transition-all duration-500 hover:shadow-2xl hover:border-accent/50 hover:-translate-y-2 hover:bg-accent/5 group">
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent transition-all duration-300 group-hover:bg-accent group-hover:text-white group-hover:scale-125 group-hover:rotate-12">
                      <ThemeIcon name={g.icon} className="size-5 transition-transform duration-300" />
                    </span>
                    <p className="mt-4 text-xl font-extrabold text-primary transition-all duration-300 group-hover:text-accent group-hover:scale-105 origin-left inline-block">
                      {g.amount}
                    </p>
                    <p className="text-xs font-medium text-muted transition-colors duration-300 group-hover:text-foreground/70">
                      {g.npr}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-foreground/90 transition-colors duration-300 group-hover:text-foreground">
                      {g.impact}
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
              eyebrow="Ways to Give"
              title="Choose How You'd Like to Donate"
              description="Scan, use a digital wallet, or transfer directly to our bank — whatever works best for you."
            />
          </Reveal>

          <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
            {/* QR */}
            <Reveal>
              <div className="flex h-full flex-col items-center rounded-3xl border border-primary/10 bg-surface p-8 text-center shadow-card transition-all duration-500 hover:shadow-2xl hover:border-accent/50 hover:-translate-y-1 group animate-in slide-in-from-left">
                <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                  <ScanLine className="size-4 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
                  Scan to Donate
                </span>
                <div className="mt-6 w-full max-w-[16rem] transition-transform duration-500 group-hover:scale-[1.03]">
                  <QrPlaceholder />
                </div>
                <p className="mt-5 max-w-xs text-sm text-muted transition-colors duration-300 group-hover:text-foreground/80">
                  Open your mobile banking or wallet app, scan the code, and
                  send your gift securely to CBRS Nepal.
                </p>
                <p className="mt-3 text-xs text-muted/80 transition-colors duration-300 group-hover:text-muted">
                  Account:{" "}
                  <span className="font-semibold text-foreground">CBRS Nepal</span>
                </p>
              </div>
            </Reveal>

            {/* Wallets + bank */}
            <div className="space-y-6">
              {/* Digital wallets */}
              <Reveal>
                <div className="rounded-3xl border border-primary/10 bg-surface p-7 shadow-card transition-all duration-500 hover:shadow-2xl hover:border-accent/50 hover:-translate-y-1 group animate-in slide-in-from-right">
                  <h3 className="flex items-center gap-2 text-lg font-bold text-foreground transition-colors duration-300 group-hover:text-primary">
                    <Smartphone
                      className="size-5 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12"
                      aria-hidden="true"
                    />
                    Digital Wallets
                  </h3>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    {(
                      [paymentMethods.esewa, paymentMethods.khalti] as const
                    ).map((m) => (
                      <div
                        key={m.label}
                        className="rounded-2xl border border-border p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group/wallet"
                        style={{ borderTopColor: m.color, borderTopWidth: 3 }}
                      >
                        <p
                          className="text-base font-bold transition-all duration-300 group-hover/wallet:scale-105 origin-left inline-block"
                          style={{ color: m.color }}
                        >
                          {m.label}
                        </p>
                        <dl className="mt-3 space-y-2 text-sm">
                          <div>
                            <dt className="text-xs uppercase tracking-wide text-muted">
                              ID
                            </dt>
                            <dd className="font-semibold text-foreground transition-colors duration-300 group-hover/wallet:text-primary">
                              {m.id}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-xs uppercase tracking-wide text-muted">
                              Name
                            </dt>
                            <dd className="font-semibold text-foreground transition-colors duration-300 group-hover/wallet:text-primary">
                              {m.name}
                            </dd>
                          </div>
                        </dl>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Bank */}
              <Reveal delay={0.06}>
                <div className="rounded-3xl border border-primary/10 bg-surface p-7 shadow-card transition-all duration-500 hover:shadow-2xl hover:border-accent/50 hover:-translate-y-1 group animate-in slide-in-from-right">
                  <h3 className="flex items-center gap-2 text-lg font-bold text-foreground transition-colors duration-300 group-hover:text-primary">
                    <Building2
                      className="size-5 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12"
                      aria-hidden="true"
                    />
                    Bank Transfer
                  </h3>
                  <dl className="mt-4">
                    <CopyField label="Bank" value={bankDetails.bankName} />
                    <CopyField label="Account Name" value={bankDetails.accountName} />
                    <CopyField label="Account Number" value={bankDetails.accountNumber} />
                    <CopyField label="Branch" value={bankDetails.branch} />
                    <CopyField label="SWIFT" value={bankDetails.swift} />
                  </dl>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* Impact */}
      <section className="relative overflow-hidden bg-brand-band py-20 text-white lg:py-24">
        <div className="pattern-grid absolute inset-0 opacity-40" aria-hidden="true" />
        <Container className="relative">
          <Reveal>
            <SectionHeading
              tone="light"
              eyebrow="Your Impact"
              title="Where Your Donation Goes"
              description="Real services, delivered with and for people with disabilities across Nepal."
            />
          </Reveal>
          <StaggerGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {impactItems.map((item) => (
              <StaggerItem key={item.t}>
                <div className="h-full rounded-2xl bg-white/10 p-6 ring-1 ring-white/15 transition-all duration-500 hover:bg-white/20 hover:-translate-y-2 hover:ring-white/30 hover:shadow-xl group">
                  <span className="grid size-11 place-items-center rounded-xl bg-white/15 ring-1 ring-white/20 transition-all duration-300 group-hover:bg-white/30 group-hover:scale-110 group-hover:rotate-12">
                    <ThemeIcon name={item.icon} className="size-5 text-white transition-transform duration-300" />
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-white transition-colors duration-300 group-hover:text-white">
                    {item.t}
                  </h3>
                  <p className="mt-1.5 text-sm text-white/80 transition-colors duration-300 group-hover:text-white/95">
                    {item.d}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      {/* Transparency */}
      <section className="py-20 lg:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Transparency & Trust"
              title="Accountable With Every Rupee"
              description="As a registered NGO affiliated with the Social Welfare Council, we are committed to openness and integrity."
            />
          </Reveal>
          <StaggerGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {transparency.map((t) => (
              <StaggerItem key={t.label}>
                <div className="rounded-2xl border border-primary/10 bg-surface p-7 text-center shadow-card transition-all duration-500 hover:shadow-2xl hover:border-accent/50 hover:-translate-y-2 hover:bg-accent hover:text-white group">
                  <p className="text-3xl font-extrabold text-primary transition-all duration-300 group-hover:text-white group-hover:scale-110 origin-center inline-block">
                    {t.value}
                  </p>
                  <p className="mt-2 text-sm text-muted transition-colors duration-300 group-hover:text-white/90">
                    {t.label}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>

          {/* Contact CTA strip */}
          <Reveal className="mt-12">
            <div className="flex flex-col items-center justify-between gap-6 rounded-3xl border border-primary/10 bg-surface p-8 text-center shadow-card transition-all duration-500 hover:shadow-2xl hover:border-accent/30 md:flex-row md:text-left group animate-in fade-in slide-in-from-bottom">
              <div>
                <h3 className="text-xl font-bold text-foreground transition-colors duration-300 group-hover:text-primary">
                  Questions about giving?
                </h3>
                <p className="mt-1.5 text-muted transition-colors duration-300 group-hover:text-foreground/80">
                  Our team is happy to help with receipts, partnerships or
                  larger gifts.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href={`mailto:${site.contact.email}`}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-foreground transition-all duration-300 hover:border-accent hover:text-accent hover:-translate-y-0.5 hover:shadow-md group/link"
                >
                  <Mail
                    className="size-4 transition-transform duration-300 group-hover/link:scale-110"
                    aria-hidden="true"
                  />
                  {site.contact.email}
                </a>
                <a
                  href={`tel:${site.contact.phone}`}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-foreground transition-all duration-300 hover:border-accent hover:text-accent hover:-translate-y-0.5 hover:shadow-md group/link"
                >
                  <Phone
                    className="size-4 transition-transform duration-300 group-hover/link:scale-110"
                    aria-hidden="true"
                  />
                  {site.contact.phone}
                </a>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}