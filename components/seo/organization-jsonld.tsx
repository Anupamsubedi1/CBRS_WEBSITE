import { site } from "@/lib/data/site";

const BASE = "https://www.cbrs.org.np";

/**
 * Schema.org structured data for the organisation and website. Rendered once in
 * the root layout so it appears on every page, helping search engines build a
 * rich knowledge-panel / sitelinks entry for CBRS Nepal.
 */
export function OrganizationJsonLd() {
  const organization = {
    "@context": "https://schema.org",
    "@type": ["NGO", "Organization"],
    "@id": `${BASE}/#organization`,
    name: site.name,
    alternateName: site.fullName,
    url: BASE,
    logo: `${BASE}/icon.png`,
    image: `${BASE}/opengraph-image.jpeg`,
    description: site.description,
    slogan: site.tagline,
    email: site.contact.email,
    telephone: site.contact.phone,
    areaServed: { "@type": "Country", name: "Nepal" },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Nayabazar, Pokhara Metropolitan City Ward No. 9",
      addressLocality: "Pokhara",
      addressRegion: site.province,
      addressCountry: "NP",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: site.contact.phone,
      email: site.contact.email,
      contactType: "customer service",
      areaServed: "NP",
      availableLanguage: ["en", "ne"],
    },
    knowsAbout: [
      "Community based rehabilitation",
      "Disability inclusion",
      "Inclusive education",
      "Livelihood development",
      "Rights and social inclusion",
    ],
    identifier: [
      {
        "@type": "PropertyValue",
        name: "DAO Kaski Registration",
        value: "170/051",
      },
      {
        "@type": "PropertyValue",
        name: "SWC Affiliation",
        value: "2607/051",
      },
    ],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE}/#website`,
    url: BASE,
    name: site.name,
    description: site.description,
    inLanguage: "en",
    publisher: { "@id": `${BASE}/#organization` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
