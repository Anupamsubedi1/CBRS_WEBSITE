import type { Theme } from "@/lib/types";

export const themes: Theme[] = [
  {
    slug: "rehabilitation-health",
    title: "Rehabilitation & Health",
    icon: "heart-pulse",
    tagline: "Therapy, devices and care at the doorstep",
    description:
      "Providing rehabilitation therapy, health support, assistive devices and medical care so people with disabilities can build day-to-day independence.",
    objective:
      "To provide rehabilitation therapy, practical and social support with skilled and effective input to improve the daily life skills of people with disabilities.",
    activities: [
      "Home rehabilitation therapy visits",
      "Assistive device provision",
      "Medical treatment support & referrals",
      "Health camps (eye, ear, dental, mental)",
      "Nutritional food support",
      "Community outreach services",
    ],
  },
  {
    slug: "livelihood-development",
    title: "Livelihood Development",
    icon: "briefcase",
    tagline: "Skills, income and dignity through work",
    description:
      "Creating income opportunities, vocational training and entrepreneurship development for people with disabilities and their families.",
    objective:
      "To increase opportunities for people with disabilities and their families through income-generating activities, vocational training and self-help group funds.",
    activities: [
      "Income generation activities (IGA)",
      "Self-help group fund mobilization",
      "Vocational training",
      "Job placement & entrepreneurship",
      "Networking with training providers",
      "IGA management training",
    ],
  },
  {
    slug: "inclusive-education",
    title: "Inclusive Education",
    icon: "graduation-cap",
    tagline: "Every child belongs in school",
    description:
      "Promoting inclusive and quality education for children and young people with disabilities and from marginalized communities.",
    objective:
      "To increase education opportunities for children and young adults with disabilities and from marginalized communities, because education is a basic human right.",
    activities: [
      "School enrollment campaigns",
      "Inclusive education training",
      "Educational material support",
      "School accessibility improvements",
      "Advocacy for free, inclusive education",
      "Orientation for teachers & SMCs",
    ],
  },
  {
    slug: "rights-social-inclusion",
    title: "Rights & Social Inclusion",
    icon: "scale",
    tagline: "Advocacy, empowerment and belonging",
    description:
      "Advocating for rights, empowering communities and promoting the social inclusion of people with disabilities, women and marginalized groups.",
    objective:
      "To support marginalized people, women and people with disabilities, advocate for their rights, and empower them to enjoy dignity in inclusive ways.",
    activities: [
      "Self-help group formation",
      "Disability rights advocacy & lobbying",
      "Community awareness campaigns",
      "Networking & coordination",
      "Disability ID & document support",
      "Social gatherings & recreation",
    ],
  },
  {
    slug: "human-resource-development",
    title: "Human Resource Development",
    icon: "users",
    tagline: "Stronger people, stronger organizations",
    description:
      "Building the capacity of individuals, organizations and communities through training, research and disability orientation.",
    objective:
      "To continue staff and organizational development so the skills and knowledge to meet the needs of people with disabilities are always available, and to conduct research.",
    activities: [
      "Staff & board capacity building",
      "Disability orientation programs",
      "Student study & exposure visits",
      "Research & thesis guidance",
      "19+ specialised training courses",
      "Leadership & management training",
    ],
  },
  {
    slug: "community-development",
    title: "Community Development",
    icon: "home",
    tagline: "Accessible, resilient communities",
    description:
      "Strengthening communities through local resources, participation and sustainable, disability-friendly development.",
    objective:
      "To work with economically weak, marginalized, Dalit and Janajati communities that lack access to resource mobilization.",
    activities: [
      "Drinking water & sanitation",
      "Disability-friendly infrastructure",
      "Local resource mobilization",
      "Community participation",
      "Capacity building",
      "Empowerment initiatives",
    ],
  },
];

export function getThemeBySlug(slug: string) {
  return themes.find((t) => t.slug === slug);
}
