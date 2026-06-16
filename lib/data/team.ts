import type { BoardMember, Advisor, GeneralMember } from "@/lib/types";

/**
 * CBRS Nepal Board, Advisors and Members (term 2024–2026).
 * Source: official "Name list of Board members, Advisor and Members".
 *
 * Board portraits live in `public/team/<slug>.jpg`. When a file is missing the
 * <Media> component falls back to a branded placeholder, so the page never
 * shows a broken image.
 */
export const boardMembers: BoardMember[] = [
  {
    id: "b1",
    name: "Puran Kuwar",
    position: "Chairperson",
    ward: "Ward No. 10",
    contact: "9856029356",
    photo: "/team/puran-kuwar.jpg",
  },
  {
    id: "b2",
    name: "Dilip Kumar Sharma",
    position: "Vice Chairperson",
    ward: "Ward No. 16",
    contact: "9856034522",
    photo: "/team/dilip-kumar-sharma.jpg",
  },
  {
    id: "b3",
    name: "Dr. Chandika Pandit",
    position: "General Secretary",
    ward: "Ward No. 5",
    contact: "9856022773",
    photo: "/team/chandika-pandit.jpg",
  },
  {
    id: "b4",
    name: "Mohan Murari Khanal",
    position: "Secretary",
    ward: "Ward No. 10",
    contact: "9856023634",
    photo: "/team/mohan-murari-khanal.jpg",
  },
  {
    id: "b5",
    name: "Asha Kumari Gautam",
    position: "Treasurer",
    ward: "Ward No. 14",
    contact: "9804101637",
    photo: "/team/asha-kumari-gautam.jpg",
  },
  {
    id: "b6",
    name: "Jhalak Bahadur Rana",
    position: "Member",
    ward: "Ward No. 25",
    contact: "9856065825",
    photo: "/team/jhalak-bahadur-rana.jpg",
  },
  {
    id: "b7",
    name: "Rina Palikhe",
    position: "Member",
    ward: "Ward No. 10",
    contact: "9856021928",
    photo: "/team/rina-palikhe.jpg",
  },
  {
    id: "b8",
    name: "Sarala Das",
    position: "Member",
    ward: "Ward No. 3",
    contact: "9846202758",
    photo: "/team/sarala-das.jpg",
  },
  {
    id: "b9",
    name: "Pradeep Bhakta Acharya",
    position: "Member",
    ward: "Ward No. 10",
    contact: "9856027697",
    photo: "/team/pradeep-bhakta-acharya.jpg",
  },
];

export const advisors: Advisor[] = [
  {
    id: "a1",
    name: "Ananda Raj Bhatta",
    position: "Advisor",
    expertise: "Founding Secretary",
    contact: "9851120629",
  },
  {
    id: "a2",
    name: "Prof. Dr. Bhojraj Nyaupane",
    position: "Advisor",
    expertise: "Surgery / Medical Science",
    contact: "9856020714",
  },
  {
    id: "a3",
    name: "Ramraj Subedi",
    position: "Advisor",
    expertise: "Central Secretary, Rehabilitation Association, Nepal",
    contact: "9856026044",
  },
  {
    id: "a4",
    name: "Binod Kandel",
    position: "Advisor",
    expertise: "Development Science",
    contact: "9856027774",
  },
];

/** Wider membership roster, rendered as a searchable, paginated table. */
export const generalMembers: GeneralMember[] = [
  { id: "m1", name: "Vijay Bahadur Pradhan", ward: "Ward No. 12", contact: "9846174276" },
  { id: "m2", name: "Mohan Murari Banal", ward: "Ward No. 10", contact: "9856023634" },
  { id: "m3", name: "Chandika Pandit", ward: "Ward No. 1", contact: "9856023792" },
  { id: "m4", name: "Asha Kumari Gautam", ward: "Ward No. 14", contact: "9804101637" },
  { id: "m5", name: "Purna Kuwar", ward: "Ward No. 3", contact: "9846022909" },
  { id: "m6", name: "Rupa Pariyar", ward: "Ward No. 15", contact: "9846039629" },
  { id: "m7", name: "Falak Bahadur Rana", ward: "Ward No. 25", contact: "9856065825" },
  { id: "m8", name: "Sarala Das", ward: "Ward No. 3", contact: "9846202758" },
  { id: "m9", name: "Rina Poudel", ward: "Ward No. 4", contact: "9846175018" },
  { id: "m10", name: "Narayan Lama Karki", ward: "Ward No. 14", contact: "9846025069" },
  { id: "m11", name: "Shambhu Oli (Khatra)", ward: "Ward No. 3", contact: "9846077990" },
  { id: "m12", name: "Pradeep Pariyar", ward: "Ward No. 6", contact: "9856021600" },
  { id: "m13", name: "Goma Pradhan", ward: "Ward No. 10", contact: "9856021928" },
  { id: "m14", name: "Suraj Timilsina", ward: "Ward No. 8", contact: "9851152521" },
  { id: "m15", name: "Dilip Kumar Sharma", ward: "Ward No. 16", contact: "9856034522" },
  { id: "m16", name: "Dr. Chandika Pandit", ward: "Ward No. 5", contact: "9856022773" },
  { id: "m17", name: "Menuka Tamuakar (Giri)", ward: "Ward No. 5", contact: "9846285740" },
  { id: "m18", name: "Krishna Bahadur Thapa", ward: "Ward No. 8", contact: "9856020004" },
  { id: "m19", name: "Durga Adhikari", ward: "Ward No. 1", contact: "9856036533" },
  { id: "m20", name: "Ramraj Lamichhane", ward: "Ward No. 1", contact: "9846029355" },
  { id: "m21", name: "Bijay Lamichhane", ward: "Ward No. 10", contact: "9856050494" },
  { id: "m22", name: "Krishna Kumar Lamichhane", ward: "Madhya Ga. Pa. 11", contact: "9766051181" },
  { id: "m23", name: "Bhagawati Pathari", ward: "Ward No. 6", contact: "" },
];
