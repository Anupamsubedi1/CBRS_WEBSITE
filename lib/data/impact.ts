import type { ImpactStat, SuccessStory } from "@/lib/types";

/** Headline figures shown in the "Who We Are" strip. */
export const orgStats: ImpactStat[] = [
  { value: "19+", label: "Years of Service", icon: "stethoscope" },
  { value: "65,000+", label: "People Reached", icon: "users" },
  { value: "150+", label: "Communities Reached", icon: "home" },
  { value: "50+", label: "Active Programs", icon: "briefcase" },
];

/** Larger impact band figures. */
export const impactStats: ImpactStat[] = [
  { value: "65,000+", label: "People Supported", icon: "users" },
  { value: "12,000+", label: "Assistive Devices Distributed", icon: "accessibility" },
  { value: "3,500+", label: "Students Supported", icon: "graduation-cap" },
  { value: "8,000+", label: "People Trained", icon: "book-open" },
  { value: "150+", label: "Communities Empowered", icon: "handshake" },
];

export const successStories: SuccessStory[] = [
  {
    id: "tek-bahadur",
    quote:
      "CBRS helped me get a wheelchair and skills training. Today, I am independent and running my own small business.",
    name: "Tek Bahadur Gurung",
    role: "Livelihood Beneficiary",
  },
  {
    id: "sita-rai",
    quote:
      "My daughter was out of school for years. With CBRS support she now studies in an inclusive classroom and dreams of becoming a teacher.",
    name: "Sita Rai",
    role: "Parent, Inclusive Education",
  },
  {
    id: "bishnu-thapa",
    quote:
      "The home therapy visits changed our lives. The team treated my son with such dignity and patience — he can now walk with support.",
    name: "Bishnu Thapa",
    role: "Rehabilitation Beneficiary",
  },
];
