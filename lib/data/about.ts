import type { IconName } from "@/lib/types";

export const mission =
  "To work with and for people with disabilities and marginalized communities through rehabilitation, empowerment, inclusive education, livelihood support, advocacy and community development.";

/**
 * Core values, grounded in the CBRS Nepal profile: the organisation states it
 * believes in participation, inclusion, equality and dignity, and works in
 * partnership with communities.
 */
export const coreValues: {
  title: string;
  description: string;
  icon: IconName;
}[] = [
  {
    title: "Participation",
    description:
      "We involve the people we serve in planning, decision-making, monitoring and evaluation of our work.",
    icon: "users",
  },
  {
    title: "Inclusion",
    description:
      "We work so people with disabilities and marginalized groups are included in schools, workplaces, services and community life.",
    icon: "accessibility",
  },
  {
    title: "Equality",
    description:
      "We stand for equal rights and equal opportunities for people with disabilities, women and marginalized communities.",
    icon: "scale",
  },
  {
    title: "Dignity",
    description:
      "We respect the rights, worth and choices of every person we work with.",
    icon: "hand-heart",
  },
  {
    title: "Partnership",
    description:
      "We work in partnership with communities, local governments and supporters towards shared goals.",
    icon: "handshake",
  },
];

/** Organisations and groups that support CBRS Nepal's work, per the profile. */
export const supporters: string[] = [
  "Rural Municipalities",
  "Municipalities",
  "WMT, UK",
  "KCF, Hong Kong",
  "UNEP",
  "South Korea",
  "Individual supporters",
];
