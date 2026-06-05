import type { IconName } from "@/lib/types";

export const mission =
  "To work with and for people with disabilities, their families and marginalized communities — improving their dignity, inclusion and rights through participatory, community-based rehabilitation, education, livelihood and health services.";

export const coreValues: {
  title: string;
  description: string;
  icon: IconName;
}[] = [
  {
    title: "Dignity",
    description:
      "We treat every person with respect, honouring their worth, voice and right to make their own choices.",
    icon: "hand-heart",
  },
  {
    title: "Inclusion",
    description:
      "We work so that no one is left behind — in schools, workplaces, services and community life.",
    icon: "accessibility",
  },
  {
    title: "Participation",
    description:
      "We involve the people we serve in planning, decisions, monitoring and evaluation of every activity.",
    icon: "users",
  },
  {
    title: "Equality",
    description:
      "We stand for equal rights and opportunities for people with disabilities, women and marginalized groups.",
    icon: "scale",
  },
  {
    title: "Partnership",
    description:
      "We build genuine partnerships with communities, local governments and supporters towards shared goals.",
    icon: "handshake",
  },
  {
    title: "Compassion",
    description:
      "We lead with empathy, meeting people where they are with patience, warmth and skilled care.",
    icon: "heart-pulse",
  },
];

export const milestones: { year: string; title: string; description: string }[] = [
  {
    year: "2005",
    title: "CBRS Nepal founded",
    description:
      "Established in Pokhara and registered with the District Administration Office, Kaski, to serve people with disabilities.",
  },
  {
    year: "2009",
    title: "Affiliation with Social Welfare Council",
    description:
      "Formal affiliation strengthened CBRS's reach and accountability across Gandaki Province.",
  },
  {
    year: "2014",
    title: "Inclusive education scale-up",
    description:
      "Expanded school enrollment campaigns, teacher training and accessible infrastructure across districts.",
  },
  {
    year: "2018",
    title: "Livelihood & self-help groups",
    description:
      "Grew vocational training and self-help group funds, helping families build sustainable incomes.",
  },
  {
    year: "2024",
    title: "65,000+ lives reached",
    description:
      "Nearly two decades of community-based rehabilitation, with services now spanning six themes of work.",
  },
];

export const reasons: { stat: string; label: string; text: string }[] = [
  {
    stat: "1 in 6",
    label: "people experience disability",
    text: "Yet many in rural Nepal still lack access to therapy, devices, education and work.",
  },
  {
    stat: "Distance",
    label: "is a daily barrier",
    text: "Specialised services are often hours away — so we bring rehabilitation to the doorstep.",
  },
  {
    stat: "Rights",
    label: "are still unrealised",
    text: "We help people claim ID cards, education, social protection and a voice in their community.",
  },
];
