/** Global site configuration — organisation details, navigation, socials. */

export const site = {
  name: "CBRS Nepal",
  fullName: "Community Based Rehabilitation Service",
  tagline: "Working with and for people with disability and development in Nepal",
  description:
    "CBRS Nepal is a non-government organization working with and for people with disabilities, their families and marginalized communities across Nepal.",
  vision:
    "A society which respects the rights and dignity of people with disabilities and marginalized communities and provides equal opportunities for them to achieve their full potential.",
  location: "Pokhara Metropolitan City Ward No. 9, Nayabazar, Kaski, Nepal",
  province: "Gandaki Province",
  contact: {
    phone: "+977-61-587326",
    mobile: "9856025511",
    email: "cbrsnepal@gmail.com",
    address:
      "CBRS Head Office, Pokhara Metropolitan City Ward No. 9, Nayabazar, Kaski, Nepal",
  },
  registration: {
    dao: "DAO Kaski Regd No: 170/051",
    swc: "SWC Affiliation No: 2607/051",
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
