import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { Container } from "@/components/shared/container";
import { BrandLogo } from "@/components/layout/brand-logo";
import { NewsletterForm } from "@/components/layout/newsletter-form";
import { site } from "@/lib/data/site";
import { themes } from "@/lib/data/themes";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about/cbrs-nepal" },
  { label: "Programs", href: "/programs" },
  { label: "Gallery", href: "/gallery" },
  { label: "News & Notices", href: "/news" },
  { label: "Contact", href: "/contact" },
  { label: "Donation", href: "/donate" },
];

export function Footer() {
  return (
    <footer className="bg-primary-950 text-white/75">
      <Container className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-12">
        {/* Brand */}
        <div className="lg:col-span-4">
          <BrandLogo tone="light" href={null} />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/70">
            Working with and for people with disabilities and marginalized
            communities to build an inclusive, dignified society across Nepal.
          </p>
        </div>

        {/* Quick links */}
        <nav aria-label="Footer" className="lg:col-span-2">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
            Quick Links
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-white/70 transition-colors hover:text-accent-100"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Programs */}
        <div className="lg:col-span-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
            Our Programs
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {themes.map((t) => (
              <li key={t.slug}>
                <Link
                  href={`/programs/${t.slug}`}
                  className="text-white/70 transition-colors hover:text-accent-100"
                >
                  {t.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact + newsletter */}
        <div className="lg:col-span-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
            Contact Us
          </h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
              <span className="text-white/70">{site.location}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Phone className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
              <a href={`tel:${site.contact.phone}`} className="text-white/70 hover:text-accent-100">
                {site.contact.phone}, {site.contact.mobile}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Mail className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
              <a href={`mailto:${site.contact.email}`} className="text-white/70 hover:text-accent-100">
                {site.contact.email}
              </a>
            </li>
          </ul>

          <h2 className="mt-6 text-sm font-semibold uppercase tracking-wider text-white">
            Stay Connected
          </h2>
          <p className="mt-3 mb-3 text-sm text-white/60">
            Subscribe to our newsletter.
          </p>
          <NewsletterForm />
        </div>
      </Container>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-2 py-5 text-xs text-white/55 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. All Rights Reserved.
          </p>
          <p>
            {site.registration.dao} &nbsp;|&nbsp; {site.registration.swc}
          </p>
        </Container>
      </div>
    </footer>
  );
}
