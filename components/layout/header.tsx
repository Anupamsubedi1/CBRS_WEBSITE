"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, Phone, Mail, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { navLinks, site } from "@/lib/data/site";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/layout/brand-logo";

function useActive() {
  const pathname = usePathname();
  return React.useCallback(
    (href: string) =>
      href === "/" ? pathname === "/" : pathname.startsWith(href),
    [pathname],
  );
}

export function Header() {
  const pathname = usePathname();
  const isActive = useActive();
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [aboutOpen, setAboutOpen] = React.useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = React.useState(false);
  const aboutRef = React.useRef<HTMLLIElement>(null);

  // Solid shadow once the user scrolls.
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on route change.
  React.useEffect(() => {
    setMobileOpen(false);
    setAboutOpen(false);
    setMobileAboutOpen(false);
  }, [pathname]);

  // Close the About dropdown on outside click / Escape.
  React.useEffect(() => {
    if (!aboutOpen) return;
    const onClick = (e: MouseEvent) => {
      if (aboutRef.current && !aboutRef.current.contains(e.target as Node)) {
        setAboutOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setAboutOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [aboutOpen]);

  // Lock body scroll while the mobile menu is open.
  React.useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50">
      {/* Utility bar */}
      <div className="hidden bg-primary text-white md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-xs lg:px-8">
          <div className="flex items-center gap-5">
            <a
              href={`tel:${site.contact.phone}`}
              className="flex items-center gap-1.5 rounded transition-opacity hover:opacity-80"
            >
              <Phone className="size-3.5" aria-hidden="true" />
              {site.contact.phone}
            </a>
            <a
              href={`mailto:${site.contact.email}`}
              className="flex items-center gap-1.5 rounded transition-opacity hover:opacity-80"
            >
              <Mail className="size-3.5" aria-hidden="true" />
              {site.contact.email}
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-white/70">{site.registration.dao}</span>
            <span className="h-3 w-px bg-white/25" aria-hidden="true" />
            <span className="text-white/70">{site.registration.swc}</span>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div
        className={cn(
          "border-b bg-surface/95 backdrop-blur transition-shadow",
          scrolled ? "border-border shadow-card" : "border-transparent",
        )}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-6 lg:px-8"
        >
          <BrandLogo />

          {/* Desktop nav */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) =>
              link.children ? (
                <li key={link.href} ref={aboutRef} className="relative">
                  <button
                    type="button"
                    onClick={() => setAboutOpen((v) => !v)}
                    onMouseEnter={() => setAboutOpen(true)}
                    aria-expanded={aboutOpen}
                    aria-haspopup="true"
                    className={cn(
                      "flex items-center gap-1 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
                      isActive(link.href)
                        ? "text-primary"
                        : "text-foreground hover:text-primary",
                    )}
                  >
                    {link.label}
                    <ChevronDown
                      className={cn(
                        "size-4 transition-transform",
                        aboutOpen && "rotate-180",
                      )}
                      aria-hidden="true"
                    />
                  </button>
                  {aboutOpen && (
                    <div
                      onMouseLeave={() => setAboutOpen(false)}
                      className="absolute left-0 top-full w-72 pt-2"
                    >
                      <ul className="overflow-hidden rounded-2xl border border-border bg-surface p-2 shadow-float">
                        {link.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className="block rounded-xl px-3 py-2.5 transition-colors hover:bg-primary-50"
                            >
                              <span className="block text-sm font-semibold text-foreground">
                                {child.label}
                              </span>
                              {child.description && (
                                <span className="mt-0.5 block text-xs text-muted">
                                  {child.description}
                                </span>
                              )}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ) : (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={cn(
                      "relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
                      isActive(link.href)
                        ? "text-primary"
                        : "text-foreground hover:text-primary",
                    )}
                  >
                    {link.label}
                    {isActive(link.href) && (
                      <span className="absolute inset-x-3.5 -bottom-px h-0.5 rounded-full bg-accent" />
                    )}
                  </Link>
                </li>
              ),
            )}
          </ul>

          <div className="flex items-center gap-2">
            <Button href="/donate" variant="accent" size="md" className="hidden sm:inline-flex">
              <Heart className="fill-current" /> Donate Now
            </Button>

            {/* Mobile toggle */}
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              className="grid size-11 place-items-center rounded-xl border border-border text-foreground transition-colors hover:bg-primary-50 lg:hidden"
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 bottom-0 top-[var(--mobile-top,3.75rem)] z-40 overflow-y-auto bg-surface lg:hidden"
        >
          <ul className="flex flex-col gap-1 px-5 py-6">
            {navLinks.map((link) =>
              link.children ? (
                <li key={link.href}>
                  <button
                    type="button"
                    onClick={() => setMobileAboutOpen((v) => !v)}
                    aria-expanded={mobileAboutOpen}
                    className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-base font-medium text-foreground"
                  >
                    {link.label}
                    <ChevronDown
                      className={cn(
                        "size-5 transition-transform",
                        mobileAboutOpen && "rotate-180",
                      )}
                      aria-hidden="true"
                    />
                  </button>
                  {mobileAboutOpen && (
                    <ul className="ml-3 border-l border-border pl-3">
                      {link.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="block rounded-lg px-4 py-2.5 text-sm font-medium text-muted hover:bg-primary-50 hover:text-primary"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={cn(
                      "block rounded-xl px-4 py-3 text-base font-medium",
                      isActive(link.href)
                        ? "bg-primary-50 text-primary"
                        : "text-foreground hover:bg-primary-50",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ),
            )}
            <li className="mt-4">
              <Button href="/donate" variant="accent" size="lg" className="w-full">
                <Heart className="fill-current" /> Donate Now
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
