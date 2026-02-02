// data/Comment-data.tsx

export type Comment = {
  id: number;
  name: string;
  email?: string; // 👈 optional & private
  role: string;
  message: string;
  approved: boolean;
  date: string;
};

export const initialComments: Comment[] = [
  {
    id: 1,
    name: "Dr. Hiroshi Tanaka",
    email: "hiroshi.tanaka@kcgi.ac.jp", // optional
    role: "Professor, KCGI",
    message:
      "Aye Thida is highly reliable, detail-oriented, and works exceptionally well in collaborative environments.",
    approved: false,
    date: "2024-11-10",
  },
  {
    id: 2,
    name: "Senior IT Manager",
    email: "it.manager@kbzbank.com",
    role: "KBZ Bank",
    message:
      " It is my pleasure to write in support of the application of Mr. Ian Harris for your residency program.  I have been an educator for decades with considerable experience with national organizations.  I worked closely with Mr. Harris during his third year clerkship as well as during his acting internship.   As is evident from his CV, Mr. Harris has excelled throughout his career with many notable accomplishments which I will not repeat here.  I will focus on my experiences with Mr. Harris, primarily those related to his clinical abilities and which demonstrate the qualities necessary for your residency: excellent knowledge, clinical skills, patient care, and leadership.  I have observed Mr. Harris in both the inpatient and outpatient setting, taught him in class, and overseen his performance during his clerkship and acting internship.",
    approved: false,
    date: "2025-01-05",
  },
  {
    id: 3,
    name: "Manager",
    email: "ayethida.sophie@gmail.com",
    role: "KBZ Bank",
    message:
      "Strong coordination skills and very dependable during system integration phases.",
    approved: false,
    date: "2026-02-02",
  },
  {
    id: 4,
    name: "Manager",
    email: "ayethida.sophie@gmail.com",
    role: "KBZ Bank",
    message:
      "Strong coordination skills and very dependable during system integration phases.",
    approved: false,
    date: "2026-02-02",
  },
];
