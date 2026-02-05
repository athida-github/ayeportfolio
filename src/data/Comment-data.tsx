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
    role: "Assistant Vice President, Technology Data and Information Department, MAB Bank, Myanmar",
    message:
      "I am more than pleased to have the opportunity to recommend Aye. I had worked very closely with Aye about 3 years collaborating in MMS, SVBO system migration projects and daily operation issues in Information and communication department at KBZ bank. She is dedicated, self motivated and very capable. Aye is always capable of adapting to new working environment. Very positive attitude towards work. As a team member or my colleague , Aye earns my highest recommendation.",
    approved: true,
    date: "2026-02-02",
  },
  {
    id: 2,
    name: "Sameera ABAR",
    email: "s_abar@kcg.ac.jp",
    role: "Professor, KCGI, University of Informatics, Japan",
    message:
      " I highly recommend Ms. Aye Thida, who successfully completed the Advanced Web Programming 3 course with an A+ grade. Throughout the course, Aye Thida demonstrated exceptional technical ability, robust problem-solving skills, and a deep understanding of advanced web development concepts. She was consistently regular, disciplined, and punctual, and completed all assignments with accuracy and efficiency. Her ability to grasp complex ideas quickly and apply them creatively in practical implementations truly set her apart. Aye is a brilliant and motivated learner, and I'm confident she will excel in any advanced academic or professional environment.",
    approved: true,
    date: "2026-02-03",
  },
  {
    id: 3,
    name: "Matej Drdla",
    email: "drdla@kcg.edu",
    role: "Instructor, Object-Oriented Programming (Java), KCGI",
    message:
      "Aye is a highly motivated and very capable student who consistently demonstrated both strong technical ability and an excellent work ethic. She was actively engaged in class, regularly volunteered to contribute, and always went beyond the required preparation. Her enthusiasm for learning and dedication to improvement truly set her apart, and I am confident she has a bright future in software development.",
    approved: true,
    date: "2026-02-03",
  },
  {
  id: 4,
  name: "SAN KHAING PHYO",
  email: "sankp@sankhaingphyo.com",
  role: "Head of IT at Tun Commercial Bank Limited, Myanmar",
  message: `I worked closely with Aye Thida during the Temenos T24 Core Banking implementation at Myanmar Oriental Bank, and she was a vital contributor to the project's success.

Aye Thida demonstrated exceptional technical depth across the most critical phases of the implementation. She was instrumental in managing complex Data Migration workflows, ensuring accuracy and system integrity during the transition. Furthermore, her expertise in T24 Parameterization and her diligent approach to UAT Functional Testing ensured that the system was not only technically sound but perfectly aligned with the bank’s operational requirements.

She has a remarkable talent for navigating the high-pressure environment of a core banking rollout with poise and precision. Aye Thida is a rare professional who understands both the 'how' and the 'why' of banking technology. I highly recommend her to any organization looking for a specialist who can deliver results in complex digital transformations.`,
  approved: true,
  date: "2026-02-05",
}
];
