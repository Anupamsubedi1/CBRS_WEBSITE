import type { Theme } from "@/lib/types";

/**
 * The six themes of work, taken directly from the CBRS Nepal profile
 * (Theme Objectives and Activities). These are the single source of truth for
 * the Programs pages, the About page and the footer.
 */
export const themes: Theme[] = [
  {
    slug: "rehabilitation-health",
    title: "Rehabilitation and Health",
    icon: "heart-pulse",
    tagline: "Therapy, devices and care at the doorstep",
    description:
      "Rehabilitation therapy, assistive devices, medical support and health camps that improve the day-to-day life skills of people with disabilities.",
    objective:
      "To provide rehabilitation therapy, practical and social support with skilled and effective input to improve the day to day life skills of people with disabilities.",
    activities: [
      "Home visits for rehabilitation therapy",
      "Providing assistive devices",
      "Referrals for specialized services",
      "Medical treatment support",
      "Health camps (eye, ear, dental and mental)",
      "Nutritious food support",
      "Outreach services",
    ],
  },
  {
    slug: "livelihood-development",
    title: "Livelihood",
    icon: "briefcase",
    tagline: "Skills, income and dignity through work",
    description:
      "Income generation, vocational training, self-help group funds and enterprise support that build sustainable livelihoods for people with disabilities and their families.",
    objective:
      "To increase the opportunities for people with disabilities and their families through income generating activities, vocational training, and the use of Self Help Group (SHG) funds and local resources.",
    activities: [
      "Income generation activities (IGA)",
      "Self Help Group (SHG) fund mobilization",
      "Vocational training",
      "Job placement and entrepreneurship development",
      "Networking with vocational training providers",
      "IGA management training",
    ],
  },
  {
    slug: "inclusive-education",
    title: "Inclusive Education",
    icon: "graduation-cap",
    tagline: "Every child belongs in school",
    description:
      "Enrollment campaigns, accessible classrooms, teacher orientation and educational support that open the school gate to every child.",
    objective:
      "To increase education opportunities for children and young adults with disabilities, as well as children who are marginalized and economically weak, and to promote education as a basic human right.",
    activities: [
      "School campaigning for enrollment",
      "School awareness",
      "Educational material support",
      "Inclusive education training",
      "Advocacy and lobbying for free education",
      "Promotion of extra-curricular activities",
      "Orientation for SMC members and teachers",
      "Education day celebration",
      "Disability-friendly infrastructure in schools",
    ],
  },
  {
    slug: "rights-social-inclusion",
    title: "Rights, Empowerment and Social Inclusion",
    icon: "scale",
    tagline: "Advocacy, empowerment and belonging",
    description:
      "Self-help group formation, rights advocacy and social inclusion that help people with disabilities, women and marginalized groups claim their rights and dignity.",
    objective:
      "To work with and support marginalized, economically weak people, women, people with disabilities and their families, to advocate and lobby for people with disabilities, and to empower them to enjoy their rights and dignity in inclusive ways.",
    activities: [
      "Self-help group formation, meetings and promotion",
      "Capacity building and empowerment of SHGs",
      "Networking and coordination",
      "IDPD day celebration",
      "IEC material development for community awareness",
      "Advocacy for rights and documents (disability ID, birth certificate, citizenship)",
      "Special recreation and social gatherings",
    ],
  },
  {
    slug: "human-resource-development",
    title: "Human Resource Development and Research",
    icon: "users",
    tagline: "Stronger people, stronger organizations",
    description:
      "Staff and board development, disability orientation, exposure visits and research guidance that keep skills and knowledge available to meet community needs.",
    objective:
      "To continue staff and organizational development so that skills and knowledge are available to meet the needs of people with disabilities and service-holder organizations, and to conduct research work.",
    activities: [
      "Staff and board member capacity building",
      "Training and exposure visits",
      "Disability orientation for students and outsiders",
      "Overseas student study and exposure visits",
      "Thesis, report writing and research guidance",
      "Specialised training courses",
    ],
  },
  {
    slug: "community-development",
    title: "Community Development",
    icon: "home",
    tagline: "Accessible, resilient communities",
    description:
      "Drinking water, sanitation, accessible infrastructure and local resource mobilization with economically weak and marginalized communities.",
    objective:
      "To work with and support economically weak, marginalized, Dalit and Janajati communities who have scattered settlements and no access to resource mobilization.",
    activities: [
      "Drinking water and sanitation",
      "Disability-friendly physical infrastructure",
      "Local resource mobilization",
      "Community participation and empowerment",
      "Capacity building",
    ],
  },
];

export function getThemeBySlug(slug: string) {
  return themes.find((t) => t.slug === slug);
}

/**
 * Specialised training courses delivered under the Human Resource Development
 * and Research theme, listed in the CBRS Nepal profile.
 */
export const trainings: string[] = [
  "Child rights training",
  "Disability human rights training",
  "Inclusive education training",
  "Mental health and development training",
  "Primary rehabilitation therapy (PRT) training",
  "Social inclusion training",
  "Theatre for development training",
  "Basic CBR training",
  "Disability orientation training",
  "Leadership and change management training",
  "NGO management training",
  "Basic psycho-social counseling training",
  "General training of trainers (TOT)",
  "Meeting management training",
  "Proposal writing training",
  "Social communication training",
  "Disability training for teachers",
  "Appreciative inquiry training",
  "Assistive devices measurement and production training",
];
