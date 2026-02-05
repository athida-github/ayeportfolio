import { useState } from "react";
import Reveal from "./Reveal";
import { motion } from "framer-motion";

type ExperienceItem = {
  role: string;
  company: string;
  location?: string;
  period: string;
  summary: string;
  responsibilities: string[];
  tech: string[];
};

const experiences: ExperienceItem[] = [
  {
  role: "Junior Banking Assistant → Assistant Manager (IT Support)",
  company: "Myanmar Oriental Bank (MOB)",
  location: "Myanmar",
  period: "Oct 2015 – Jun 2021",
  summary:
    "Supported core banking system implementation, security management, testing, and daily banking operations during major system upgrades.",
  responsibilities: [
    "Supported housing loan operations including contract preparation, reporting, and installment collection",
    "Assisted in core banking system migration from in-house system to Temenos T24",
    "Supported Security Management System (SMS), including user role analysis and menu customization",
    "Participated in system testing, UAT, and regression testing activities",
    "Analyzed and supported daily operational system issues",
    "Performed data validation, reconciliation, and basic reporting using SQL",
    "Worked closely with branch users to confirm system behavior and requirements",
    "Prepared basic user documentation, test scripts, and test records",
    "Coordinated with IT teams and external vendors to resolve system issues"
  ],
  tech: [
    "Temenos T24",
    "SQL",
    "UAT",
    "System Testing",
    "Banking Operations Support",
    "Design Studio IDE",
    "Oracle Database"
  ]
},
{
  role: "IT Project Support / Product Functional Support",
  company: "KBZ Pay (Kanbawza Bank)",
  location: "Myanmar",
  period: "Jul 2021 – Oct 2023",
  summary:
    "Supported digital loan product implementations, UAT, system integrations, and cross-team coordination for KBZ Pay applications.",
  responsibilities: [
    "Supported UAT activities and coordinated testing with business users",
    "Assisted in system integration testing across internal and vendor systems",
    "Prepared reports and data extracts for business and management teams",
    "Prepared weekly status reports covering issues, release versions, and testing progress",
    "Fully supported loan data migration from Mambu to Oracle FLEXCUBE",
    "Communicated with vendors and internal IT teams to resolve functional and technical issues"
  ],
  tech: [
    "Mambu",
    "Oracle FLEXCUBE",
    "UAT",
    "SQL",
    "System Testing",
    "Product Functional Documentation",
    "Jira",
    "Microsoft Office"
  ]
},
{
  role: "IT Project Support / Application Support / QA Analyst",
  company: "Kanbawza Bank (KBZ)",
  location: "Myanmar",
  period: "Oct 2023 – Feb 2024",
  summary:
    "Supported merchant management system implementations, payment system integrations, and QA activities for bank-wide payment platforms.",
  responsibilities: [
    "Supported Merchant Management System implementations and payment integrations",
    "Assisted settlement and integration testing with UnionPay, Visa, Mastercard, and JCB",
    "Supported UAT activities and coordinated testing with business users",
    "Performed system integration testing and validation",
    "Prepared reports and data extracts for business and management teams",
    "Provided post-deployment application and operational support",
    "Prepared weekly status reports on issues, releases, and vendor coordination",
    "Worked closely with vendors and internal IT teams for issue resolution"
  ],
  tech: [
    "Oracle FLEXCUBE",
    "SmartVista",
    "UAT",
    "SQL",
    "WebLogic",
    "System Testing",
    "Product Functional Documentation",
    "Jira",
    "Microsoft Office"
  ]
},
{
  role: "IT Project Support / Application Support / Assistant Manager",
  company: "FDB Bank",
  location: "Myanmar",
  period: "Feb 2024 – May 2024",
  summary:
    "Supported FLEXCUBE system migration and integration activities related to clearing and cheque processing.",
  responsibilities: [
    "Supported FLEXCUBE system migration activities",
    "Assisted UAT and system integration testing for clearing and cheque modules",
    "Performed system validation and issue analysis during migration phase",
    "Provided post-deployment application support",
    "Coordinated with vendors and internal IT teams to resolve system issues"
  ],
  tech: [
    "Oracle FLEXCUBE",
    "UAT",
    "SQL",
    "Oracle Database",
    "System Testing",
    "Jira",
    "Microsoft Office"
  ]
},
{
  role: "Teaching Assistant (Part-time)",
  company: "ULU",
  location: "Japan",
  period: "Feb 2025 – Current",
  summary:
    "Supported English language learning program for children by assisting teachers with classroom activities and providing interactive learning support.",
  responsibilities: [
    "Assisted teachers during English lessons and interactive activities",
    "Prepared educational materials, worksheets, and games for students",
    "Monitored student participation and progress during lessons",
    "Provided individual guidance to students struggling with language skills",
    "Organized fun and engaging language exercises to enhance learning"
  ],
  tech: [
    "Microsoft Office",
    "Google Workspace",
    "Educational Apps for Kids",
    "Classroom Management Tools"
  ]
},
{
  role: "Teaching Assistant (Part-time)",
  company: "KCGI",
  location: "Japan",
  period: "Oct 2025 – Current",
  summary:
    "Assisted in delivering the Special Visual Effect course by supporting students in practical exercises and helping with course materials.",
  responsibilities: [
    "Guided students during hands-on exercises and practical assignments",
    "Assisted in providing constructive feedback",
    "Supported the instructor during lectures and demonstrations",
    "Answered student queries and provided technical support for software tools"
  ],
  tech: [
    "Google Workspace",
    "DaVinci Resolve",
    "Microsoft Office"
  ]
}



];

const Experience = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Reveal>
      <section
        id="experience"
        className="max-w-7xl mx-auto px-4 py-32"
      >
        {/* Section title */}
          <div className="inline-block">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-700">
              Experience
            </h2>
            {/* Animated underline */}
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
              className="mt-3 h-[2px] bg-orange-400 mb-14"
            />
          </div>

        <div className="space-y-6">
          {experiences.map((exp, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="border border-slate-600/40 rounded-lg bg-slate-900/40 overflow-hidden"
              >
                {/* Header */}
                <button
                  onClick={() =>
                    setOpenIndex(isOpen ? null : index)
                  }
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <div>
                    <p className="text-lg sm:text-1xl font-semibold text-slate-100">
                      {exp.role}
                    </p>
                    <p className="text-orange-300 sm:text-1xl">
                      {exp.company}
                      {exp.location ? `, ${exp.location}` : ""}
                    </p>
                  </div>

                  <span
                    className={`transform transition-transform duration-300 text-slate-100 ${
                      isOpen ? "rotate-90" : ""
                    }`}
                  >
                    ▶
                  </span>
                </button>

                {/* Content */}
                <div
                  className={`transition-all duration-500 ease-in-out overflow-hidden ${
                    isOpen
                      ? "max-h-[1000px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 pb-8 text-slate-300">
                    <p className="text-lg text-slate-200 mb-4">
                      {exp.period}
                    </p>

                    <p className="mb-6 leading-relaxed text-lg">
                      {exp.summary}
                    </p>

                    {/* Responsibilities */}
                    <h4 className="text-slate-200 font-semibold mb-3 text-xl">
                      Key Responsibilities
                    </h4>
                    <ul className="space-y-2 mb-6">
                      {exp.responsibilities.map((item, i) => (
                        <li
                          key={i}
                          className="flex text-lg"
                        >
                          <span className="mr-2 text-slate-400">▹</span>
                          {item}
                        </li>
                      ))}
                    </ul>

                    {/* Technologies */}
                    <h4 className="text-slate-200 font-semibold mb-3 text-xl">
                      Technologies & Tools
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-10">
                      {exp.tech.map((t) => (
                        <li
                          key={t}
                          className="flex items-center text-lg"
                        >
                          <span className="mr-2 text-slate-400">▹</span>
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </Reveal>
  );
};

export default Experience;
