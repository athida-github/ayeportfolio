// data/Comment-data.tsx

export type Comment = {
  id: number;
  name: string;
  role: string;
  message: string;
  approved: boolean;
  date: string;
};

export const initialComments: Comment[] = [
  {
    id: 1,
    name: "Dr. Hiroshi Tanaka",
    role: "Professor, KCGI",
    message:
      "Aye Thida is highly reliable, detail-oriented, and works exceptionally well in collaborative environments.",
    approved: true,
    date: "2024-11-10",
  },
  {
    id: 2,
    name: "Senior IT Manager",
    role: "KBZ Bank",
    message:
      "Strong coordination skills and very dependable during system integration phases.",
    approved: false,
    date: "2025-01-05",
  },
];
