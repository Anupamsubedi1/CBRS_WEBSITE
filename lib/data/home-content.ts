import type { HomepageContent } from "@/lib/types";

/**
 * Default homepage content — seeds the `homepageContent` collection the first
 * time `/admin/home` is opened, and acts as a fallback for any field missing
 * from a saved document (e.g. after adding a new field).
 */
export const defaultHomeContent: HomepageContent = {
  hero: {
    badge: "Working with and for People with Disabilities",
    headingMain:
      "Building an Inclusive Society Where Every Person Can Live with",
    headingHighlight: "Dignity and Opportunity",
    description:
      "Empowering people with disabilities and marginalized communities through rehabilitation, education, livelihood opportunities, rights advocacy, and community development.",
    image: null,
    ctaPrimaryLabel: "Donate Now",
    ctaPrimaryHref: "/donate",
    ctaSecondaryLabel: "Explore Programs",
    ctaSecondaryHref: "/programs",
    pillars: [
      { icon: "hand-heart", label: "Rehabilitation Services" },
      { icon: "graduation-cap", label: "Inclusive Education" },
      { icon: "briefcase", label: "Livelihood Development" },
      { icon: "users", label: "Community Empowerment" },
    ],
  },
  about: {
    eyebrow: "Who We Are",
    title: "CBRS Nepal",
    paragraphs: [
      "CBRS Nepal is a non-government organization working with and for people with disabilities, their families and marginalized communities across Nepal since 2005. We believe in inclusion, equality and dignity for all — and we work in genuine partnership with the people we serve.",
      "Registered with the District Administration Office, Kaski and affiliated with the Social Welfare Council, we focus our work across Gandaki Province while supporting initiatives nationwide.",
    ],
    image: null,
    badgeValue: "2005",
    badgeLabel: "Serving since",
    ctaLabel: "Learn More About Us",
    ctaHref: "/about/cbrs-nepal",
    stats: [
      { value: "19+", label: "Years of Service", icon: "stethoscope" },
      { value: "65,000+", label: "People Reached", icon: "users" },
      { value: "150+", label: "Communities Reached", icon: "home" },
      { value: "50+", label: "Active Programs", icon: "briefcase" },
    ],
  },
  themesSection: {
    eyebrow: "What We Do",
    title: "Our Themes of Work",
    description:
      "Six interconnected themes shape every program we run — each one a step toward a more inclusive, dignified Nepal.",
    items: [
      {
        slug: "rehabilitation-health",
        title: "Rehabilitation & Health",
        icon: "heart-pulse",
        description:
          "Providing rehabilitation therapy, health support, assistive devices and medical care so people with disabilities can build day-to-day independence.",
      },
      {
        slug: "livelihood-development",
        title: "Livelihood Development",
        icon: "briefcase",
        description:
          "Creating income opportunities, vocational training and entrepreneurship development for people with disabilities and their families.",
      },
      {
        slug: "inclusive-education",
        title: "Inclusive Education",
        icon: "graduation-cap",
        description:
          "Promoting inclusive and quality education for children and young people with disabilities and from marginalized communities.",
      },
      {
        slug: "rights-social-inclusion",
        title: "Rights & Social Inclusion",
        icon: "scale",
        description:
          "Advocating for rights, empowering communities and promoting the social inclusion of people with disabilities, women and marginalized groups.",
      },
      {
        slug: "human-resource-development",
        title: "Human Resource Development",
        icon: "users",
        description:
          "Building the capacity of individuals, organizations and communities through training, research and disability orientation.",
      },
      {
        slug: "community-development",
        title: "Community Development",
        icon: "home",
        description:
          "Strengthening communities through local resources, participation and sustainable, disability-friendly development.",
      },
    ],
  },
  impact: {
    eyebrow: "Our Impact",
    title: "Creating Lasting Change",
    description:
      "Real numbers behind real lives — the measurable difference made with and for people with disabilities and marginalized communities.",
    ctaLabel: "See Our Impact",
    ctaHref: "/programs",
    stats: [
      { value: "65,000+", label: "People Supported", icon: "users" },
      { value: "12,000+", label: "Assistive Devices Distributed", icon: "accessibility" },
      { value: "3,500+", label: "Students Supported", icon: "graduation-cap" },
      { value: "8,000+", label: "People Trained", icon: "book-open" },
      { value: "150+", label: "Communities Empowered", icon: "handshake" },
    ],
  },
  featuredPrograms: {
    eyebrow: "Our Programs",
    title: "Featured Programs",
    description:
      "On-the-ground work changing lives across Gandaki Province and beyond.",
    ctaLabel: "View All Programs",
    ctaHref: "/programs",
  },
  successStories: [
    {
      id: "tek-bahadur",
      quote:
        "CBRS helped me get a wheelchair and skills training. Today, I am independent and running my own small business.",
      name: "Tek Bahadur Gurung",
      role: "Livelihood Beneficiary",
      photo: null,
    },
    {
      id: "sita-rai",
      quote:
        "My daughter was out of school for years. With CBRS support she now studies in an inclusive classroom and dreams of becoming a teacher.",
      name: "Sita Rai",
      role: "Parent, Inclusive Education",
      photo: null,
    },
    {
      id: "bishnu-thapa",
      quote:
        "The home therapy visits changed our lives. The team treated my son with such dignity and patience — he can now walk with support.",
      name: "Bishnu Thapa",
      role: "Rehabilitation Beneficiary",
      photo: null,
    },
  ],
  donateBand: {
    title: "Together, We Can Create Opportunities for Everyone",
    description:
      "Your support helps us empower more lives and build an inclusive society where every person can live with dignity.",
    ctaLabel: "Donate Now",
    ctaHref: "/donate",
  },
};
