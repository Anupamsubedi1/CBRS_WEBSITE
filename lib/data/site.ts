/** Global site configuration — organisation details, navigation, socials. */

export const site = {
  name: "CBRS Nepal",
  fullName: "Community Based Rehabilitation Service",
  tagline: "Working with and for People with Disabilities",
  description:
    "CBRS Nepal is a non-government organization working with and for people with disabilities, their families and marginalized communities across Nepal since 2005.",
  vision:
    "A society which respects the rights and dignity of people with disabilities and marginalized communities and provides equal opportunities for them to achieve their full potential.",
  location: "Pokhara, Nepal",
  province: "Gandaki Province",
  contact: {
    phone: "+977-61-587326",
    mobile: "9856025511",
    email: "cbrsnepal@gmail.com",
    address: "CBRS Head Office, Pokhara, Kaski, Gandaki Province, Nepal",
  },
  registration: {
    dao: "DAO Kaski Regd No: 170/051",
    swc: "SWC Affiliation No: 2607/051",
  },
  social: {
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    youtube: "https://youtube.com",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
  },
} as const;

export interface NavLink {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    href: "/about",
    children: [
      {
        label: "CBRS Nepal",
        href: "/about/cbrs-nepal",
        description: "Our story, vision, mission and values",
      },
      {
        label: "Our Team",
        href: "/about/our-team",
        description: "Board, advisors and members",
      },
    ],
  },
  { label: "Programs", href: "/programs" },
  { label: "Gallery", href: "/gallery" },
  { label: "News & Notices", href: "/news" },
  { label: "Contact", href: "/contact" },
];
