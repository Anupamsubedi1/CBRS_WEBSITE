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
} from "lucide-react";
import { Container } from "@/components/shared/container";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/shared/reveal";
import { ThemeIcon } from "@/components/shared/icon";
import { QrPlaceholder } from "@/components/donation/qr-placeholder";
import { CopyField } from "@/components/donation/copy-field";
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
            <Reveal>
              <span className="eyebrow">Why Give</span>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                Turning compassion into opportunity
              </h2>
              <div className="mt-5 space-y-4 text-base leading-relaxed text-muted">
                <p>
                  CBRS Nepal works with and for people with disabilities and
                  marginalized communities across Gandaki Province. Your donation
                  funds home-based rehabilitation, assistive devices, inclusive
                  education, livelihood training and rights advocacy.
                </p>
                <p>
                  We are a registered, audited non-government organization — so
                  you can give knowing your gift reaches the people who need it
                  most.
                </p>
              </div>
              <div className="mt-7 flex flex-wrap gap-4">
                <span className="inline-flex items-center gap-2 rounded-full bg-accent-50 px-4 py-2 text-sm font-semibold text-accent-700">
                  <ShieldCheck className="size-4" aria-hidden="true" /> Secure & transparent
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-2 text-sm font-semibold text-primary">
                  <Heart className="size-4 fill-current" aria-hidden="true" /> 100% mission-driven
                </span>
              </div>
            </Reveal>

            <StaggerGroup className="grid gap-4 sm:grid-cols-2">
              {givingLevels.map((g) => (
                <StaggerItem key={g.amount} className="h-full">
                  <div className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover">
                    <span className="grid size-11 place-items-center rounded-xl bg-gradient-to-br from-primary-50 to-accent-50 text-primary">
                      <ThemeIcon name={g.icon} className="size-5" />
                    </span>
                    <p className="mt-4 text-xl font-extrabold text-primary">{g.amount}</p>
                    <p className="text-xs font-medium text-muted">{g.npr}</p>
                    <p className="mt-3 text-sm leading-relaxed text-foreground/90">
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
              <div className="flex h-full flex-col items-center rounded-3xl border border-border bg-surface p-8 text-center shadow-card">
                <span className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-1.5 text-sm font-semibold text-primary">
                  <ScanLine className="size-4" aria-hidden="true" /> Scan to Donate
                </span>
                <div className="mt-6 w-full max-w-[16rem]">
                  <QrPlaceholder />
                </div>
                <p className="mt-5 max-w-xs text-sm text-muted">
                  Open your mobile banking or wallet app, scan the code, and
                  send your gift securely to CBRS Nepal.
                </p>
                <p className="mt-3 text-xs text-muted/80">
                  Account: <span className="font-semibold text-foreground">CBRS Nepal</span>
                </p>
              </div>
            </Reveal>

            {/* Wallets + bank */}
            <div className="space-y-6">
              {/* Digital wallets */}
              <Reveal>
                <div className="rounded-3xl border border-border bg-surface p-7 shadow-card">
                  <h3 className="flex items-center gap-2 text-lg font-bold">
                    <Smartphone className="size-5 text-primary" aria-hidden="true" />
                    Digital Wallets
                  </h3>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    {(
                      [paymentMethods.esewa, paymentMethods.khalti] as const
                    ).map((m) => (
                      <div
                        key={m.label}
                        className="rounded-2xl border border-border p-5"
                        style={{ borderTopColor: m.color, borderTopWidth: 3 }}
                      >
                        <p className="text-base font-bold" style={{ color: m.color }}>
                          {m.label}
                        </p>
                        <dl className="mt-3 space-y-2 text-sm">
                          <div>
                            <dt className="text-xs uppercase tracking-wide text-muted">ID</dt>
                            <dd className="font-semibold text-foreground">{m.id}</dd>
                          </div>
                          <div>
                            <dt className="text-xs uppercase tracking-wide text-muted">Name</dt>
                            <dd className="font-semibold text-foreground">{m.name}</dd>
                          </div>
                        </dl>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Bank */}
              <Reveal delay={0.06}>
                <div className="rounded-3xl border border-border bg-surface p-7 shadow-card">
                  <h3 className="flex items-center gap-2 text-lg font-bold">
                    <Building2 className="size-5 text-primary" aria-hidden="true" />
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
            {[
              { t: "Rehabilitation", d: "Home therapy, assistive devices and health camps." },
              { t: "Education", d: "Inclusive classrooms, materials and accessibility." },
              { t: "Livelihoods", d: "Vocational training and enterprise support." },
              { t: "Rights & Voice", d: "Advocacy, ID cards and social inclusion." },
            ].map((item) => (
              <StaggerItem key={item.t}>
                <div className="h-full rounded-2xl bg-white/10 p-6 ring-1 ring-white/15">
                  <CheckCircle2 className="size-7 text-accent-100" aria-hidden="true" />
                  <h3 className="mt-3 text-lg font-bold text-white">{item.t}</h3>
                  <p className="mt-1.5 text-sm text-white/80">{item.d}</p>
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
                <div className="rounded-2xl border border-border bg-surface p-7 text-center shadow-card">
                  <p className="text-3xl font-extrabold text-primary">{t.value}</p>
                  <p className="mt-2 text-sm text-muted">{t.label}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <Reveal className="mt-12">
            <div className="flex flex-col items-center justify-between gap-6 rounded-3xl border border-border bg-background p-8 text-center shadow-card md:flex-row md:text-left">
              <div>
                <h3 className="text-xl font-bold">Questions about giving?</h3>
                <p className="mt-1.5 text-muted">
                  Our team is happy to help with receipts, partnerships or
                  larger gifts.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href={`mailto:${site.contact.email}`}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  <Mail className="size-4" aria-hidden="true" /> {site.contact.email}
                </a>
                <a
                  href={`tel:${site.contact.phone}`}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  <Phone className="size-4" aria-hidden="true" /> {site.contact.phone}
                </a>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
