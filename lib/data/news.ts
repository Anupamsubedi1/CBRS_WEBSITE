import type { NewsItem } from "@/lib/types";

export const news: NewsItem[] = [
  {
    slug: "inclusive-education-awareness-kaski",
    title: "Inclusive Education Awareness Program Conducted in Kaski",
    category: "Event",
    date: "2024-05-10",
    author: "CBRS Communications",
    featured: true,
    excerpt:
      "CBRS Nepal brought together teachers, parents and local officials to champion the right of every child with a disability to learn in an inclusive classroom.",
    body: [
      "CBRS Nepal conducted a district-wide Inclusive Education Awareness Program in Kaski, gathering teachers, School Management Committee members, parents and local government representatives to strengthen inclusive education across the region.",
      "The program highlighted practical strategies for inclusive teaching, accessible school infrastructure and early identification of children with disabilities who remain out of school.",
      "Participants committed to enrollment drives in their wards and to making at least one classroom in each participating school fully accessible during the coming academic year.",
      "“Education is a basic right, not a privilege,” a CBRS facilitator told the gathering. “When schools open their doors to every child, whole communities grow stronger.”",
    ],
  },
  {
    slug: "livelihood-training-youth-disabilities",
    title: "Livelihood Training for Youth with Disabilities",
    category: "News",
    date: "2024-04-28",
    author: "Livelihood Team",
    excerpt:
      "A new cohort of young people with disabilities completed vocational training and received seed support to launch their own income-generating activities.",
    body: [
      "Twenty-five young people with disabilities completed a three-month vocational training course covering tailoring, mobile repair and small enterprise management.",
      "Graduates received seed grants and were linked to local self-help groups to support savings and ongoing mentoring.",
      "The training is part of CBRS Nepal's livelihood theme, which aims to turn skills into sustainable, dignified income for people with disabilities and their families.",
    ],
  },
  {
    slug: "world-disability-day-2024",
    title: "World Disability Day Celebration 2024",
    category: "Event",
    date: "2023-12-03",
    author: "CBRS Communications",
    excerpt:
      "Communities across Gandaki came together to mark the International Day of Persons with Disabilities with a rally, cultural program and rights pledge.",
    body: [
      "CBRS Nepal joined people with disabilities, families and partners to celebrate the International Day of Persons with Disabilities with a rally and cultural program in Pokhara.",
      "The day featured performances by people with disabilities, an exhibition of assistive devices and a public pledge from local leaders to advance inclusive, accessible services.",
      "Self-help groups used the occasion to showcase their savings achievements and small enterprises.",
    ],
  },
  {
    slug: "health-camp-eye-ear-2024",
    title: "Free Eye and Ear Health Camp Reaches 400 People",
    category: "News",
    date: "2024-03-15",
    author: "Health Team",
    excerpt:
      "A free health camp provided eye, ear and general screening in a remote rural municipality, with referrals arranged for specialised care.",
    body: [
      "CBRS Nepal organised a free eye and ear health camp serving more than 400 people from a remote rural municipality in Gandaki Province.",
      "The camp offered screening, basic treatment and assistive device assessment, with onward referrals arranged for people needing surgery or specialist care.",
    ],
  },
  {
    slug: "notice-annual-general-meeting-2024",
    title: "Notice: Annual General Meeting 2024",
    category: "Notice",
    date: "2024-06-01",
    excerpt:
      "Members are invited to the CBRS Nepal Annual General Meeting. Please find the date, venue and agenda enclosed.",
    body: [
      "This is to notify all members that the Annual General Meeting of CBRS Nepal will be held at the head office in Pokhara.",
      "The agenda includes the annual progress report, audited financial statements, and the election of executive committee members.",
      "Members are requested to confirm attendance with the office in advance.",
    ],
  },
  {
    slug: "notice-vacancy-community-worker",
    title: "Vacancy Announcement: Community Rehabilitation Worker",
    category: "Notice",
    date: "2024-05-20",
    excerpt:
      "CBRS Nepal is seeking dedicated Community Rehabilitation Workers to support home-based services across Gandaki Province.",
    body: [
      "CBRS Nepal invites applications for the position of Community Rehabilitation Worker.",
      "Candidates with experience in disability, community development or health, and a commitment to inclusion, are encouraged to apply. People with disabilities are strongly encouraged to apply.",
      "Please send your CV and a cover letter to the CBRS office before the deadline.",
    ],
  },
];

export function getNewsBySlug(slug: string) {
  return news.find((n) => n.slug === slug);
}

export const newsCategories = ["All", "News", "Notice", "Event", "Story"] as const;
