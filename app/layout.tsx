import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { PublicShell } from "@/components/layout/public-shell";
import { OrganizationJsonLd } from "@/components/seo/organization-jsonld";
import { LenisProvider } from "@/components/providers/lenis-provider";
import { site } from "@/lib/data/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.cbrs.org.np"),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.fullName, url: "https://www.cbrs.org.np" }],
  creator: site.fullName,
  publisher: site.fullName,
  category: "nonprofit",
  keywords: [
    "CBRS Nepal",
    "Community Based Rehabilitation Service",
    "disability",
    "disability Nepal",
    "rehabilitation",
    "community based rehabilitation",
    "inclusive education",
    "livelihood development",
    "NGO Nepal",
    "non-profit Nepal",
    "Pokhara",
    "Kaski",
    "Gandaki Province",
    "people with disabilities",
    "wheelchair distribution",
  ],
  openGraph: {
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    url: "/",
    type: "website",
    locale: "en_US",
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
  },
  appleWebApp: {
    capable: true,
    title: site.name,
    statusBarStyle: "default",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // Icons (favicon.ico, icon.png, apple-icon.png) and the social-share images
  // (opengraph-image, twitter-image) are provided by the app/ file conventions
  // and injected automatically, so no manual `icons`/`images` entries needed.
};

/* Mobile-first responsive baseline: render at the device width, not a zoomed-out
   desktop width. (<meta name="viewport" content="width=device-width, initial-scale=1">) */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#005daa",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${jakarta.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground antialiased">
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <LenisProvider />
        <OrganizationJsonLd />
        <PublicShell>{children}</PublicShell>
      </body>
    </html>
  );
}
