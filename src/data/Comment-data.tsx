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
    name: "Hnin Thet Htet Wai",
    email: "hninthethtettwai@gmail.com", // optional
    role: "Assistant Vice President, Technology Data and Information Department, MAB Bank",
    message:
      "I am more than pleased to have the opportunity to recommend Aye. I had worked very closely with Aye about 3 years collaborating in MMS, SVBO system migration projects and daily operation issues in Information and communication department at KBZ bank. She is dedicated, self motivated and very capable. Aye is always capable of adapting to new working environment. Very positive attitude towards work. As a team member or my colleague , Aye earns my highest recommendation.",
    approved: true,
    date: "2026-02-02",
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
