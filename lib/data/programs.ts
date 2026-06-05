import type { Program } from "@/lib/types";

export const programs: Program[] = [
  {
    slug: "home-based-rehabilitation",
    title: "Home-Based Rehabilitation Therapy",
    category: "Rehabilitation & Health",
    excerpt:
      "Skilled therapists reach people with disabilities in their own homes, building daily living skills where specialised services are out of reach.",
    description:
      "Many people with disabilities in rural Gandaki cannot travel to a clinic. Our community rehabilitation workers and therapists visit homes to deliver physiotherapy, daily-living skills training and family counselling — meeting people where they are and involving the whole family in the rehabilitation journey.",
    objectives: [
      "Improve mobility and daily living skills",
      "Equip families to continue therapy at home",
      "Reduce the distance barrier to rehabilitation",
      "Connect households to wider CBRS services",
    ],
    activities: [
      "Individual home therapy plans",
      "Family caregiver training",
      "Assistive device fitting & follow-up",
      "Referrals to specialised hospitals",
      "Progress monitoring visits",
    ],
    gallery: [
      { caption: "Therapist during a home visit" },
      { caption: "Caregiver training session" },
      { caption: "Mobility practice with support" },
    ],
    documents: [
      { label: "Rehabilitation Program Brief (PDF)", href: "#", size: "1.2 MB" },
      { label: "Annual Therapy Report 2023", href: "#", size: "3.4 MB" },
    ],
    featured: true,
  },
  {
    slug: "assistive-devices",
    title: "Assistive Devices Program",
    category: "Rehabilitation & Health",
    excerpt:
      "Wheelchairs, crutches, hearing aids and custom aids — measured, produced and fitted so mobility and participation become possible.",
    description:
      "Through our assistive devices program we assess needs, produce and distribute mobility and sensory aids, and train technicians to measure and maintain them. The right device at the right time transforms a person's ability to study, work and take part in community life.",
    objectives: [
      "Increase access to appropriate assistive devices",
      "Build local device production and repair capacity",
      "Ensure correct fitting and follow-up",
    ],
    activities: [
      "Needs assessment & measurement",
      "Device production & distribution",
      "Technician training",
      "Repair and maintenance camps",
    ],
    gallery: [
      { caption: "Wheelchair fitting" },
      { caption: "Device production workshop" },
    ],
    documents: [
      { label: "Assistive Devices Guidelines", href: "#", size: "900 KB" },
    ],
    featured: true,
  },
  {
    slug: "inclusive-education-initiative",
    title: "Inclusive Education Initiative",
    category: "Inclusive Education",
    excerpt:
      "Enrollment campaigns, accessible classrooms and teacher training that open the school gate to children with disabilities.",
    description:
      "We work with schools, teachers and School Management Committees to make classrooms genuinely inclusive — from ramps and accessible toilets to inclusive teaching methods and learning materials. Awareness campaigns bring out-of-school children with disabilities back into education.",
    objectives: [
      "Enroll out-of-school children with disabilities",
      "Make school infrastructure accessible",
      "Strengthen inclusive teaching practice",
      "Advocate for the right to free education",
    ],
    activities: [
      "School enrollment campaigns",
      "Inclusive education teacher training",
      "Educational material support",
      "Accessibility infrastructure upgrades",
      "Orientation for SMCs and teachers",
    ],
    gallery: [
      { caption: "Inclusive classroom" },
      { caption: "Enrollment awareness event" },
      { caption: "Accessible school ramp" },
    ],
    documents: [
      { label: "Inclusive Education Toolkit", href: "#", size: "2.1 MB" },
    ],
    featured: true,
  },
  {
    slug: "livelihood-skills-training",
    title: "Livelihood & Skills Training",
    category: "Livelihood Development",
    excerpt:
      "Vocational training, self-help group funds and entrepreneurship support that turn skills into sustainable income.",
    description:
      "Our livelihood program combines vocational skills training, self-help group savings and seed support for income-generating activities. Young people and families with disabilities gain the tools to start small businesses, find work and achieve financial independence.",
    objectives: [
      "Build market-relevant vocational skills",
      "Mobilize self-help group funds",
      "Support enterprise start-up and job placement",
    ],
    activities: [
      "Vocational training courses",
      "Self-help group formation & savings",
      "Seed grants for income generation",
      "Job placement support",
      "Entrepreneurship mentoring",
    ],
    gallery: [
      { caption: "Tailoring training" },
      { caption: "Self-help group meeting" },
    ],
    documents: [
      { label: "Livelihood Program Overview", href: "#", size: "1.5 MB" },
    ],
  },
  {
    slug: "disability-rights-advocacy",
    title: "Disability Rights & Advocacy",
    category: "Rights & Social Inclusion",
    excerpt:
      "Helping people claim disability ID cards, citizenship and social protection, and lobbying for inclusive local policy.",
    description:
      "We support people with disabilities to access their rights and entitlements — disability ID cards, citizenship, birth certificates and social protection — while building self-help groups and lobbying local governments for inclusive, accessible policy and services.",
    objectives: [
      "Improve access to rights and entitlements",
      "Strengthen disabled people's organizations",
      "Advance inclusive local government policy",
    ],
    activities: [
      "Disability ID & document support",
      "Self-help group capacity building",
      "Rights awareness campaigns",
      "Policy advocacy & lobbying",
      "IDPD day celebrations",
    ],
    gallery: [
      { caption: "Rights awareness rally" },
      { caption: "Self-help group leadership" },
    ],
    documents: [
      { label: "Rights & Advocacy Report", href: "#", size: "1.1 MB" },
    ],
  },
  {
    slug: "community-water-sanitation",
    title: "Community Water & Sanitation",
    category: "Community Development",
    excerpt:
      "Accessible drinking water and sanitation that puts disability-friendly design at the centre of community infrastructure.",
    description:
      "Working with economically weak and marginalized communities, we build accessible drinking water and sanitation facilities and mobilize local resources — ensuring that water points and toilets are usable by everyone, including people with disabilities and older people.",
    objectives: [
      "Provide accessible water and sanitation",
      "Promote disability-friendly infrastructure",
      "Mobilize and empower local communities",
    ],
    activities: [
      "Accessible water point construction",
      "Disability-friendly sanitation",
      "Community participation & training",
      "Local resource mobilization",
    ],
    gallery: [
      { caption: "Accessible water point" },
      { caption: "Community construction day" },
    ],
    documents: [
      { label: "WASH Project Summary", href: "#", size: "800 KB" },
    ],
  },
];

export function getProgramBySlug(slug: string) {
  return programs.find((p) => p.slug === slug);
}

export const programCategories = Array.from(
  new Set(programs.map((p) => p.category)),
);
