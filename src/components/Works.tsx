import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "./Reveal";

interface Project {
  title: string;
  client: string;
  duration: string;
  description: string;
  tech: string[];
}

/* 🔹 Your original project data – UNCHANGED */
const projects: Project[] = [
  {
    title: "Housing Loan System (Mya Yee Nandar Project)",
    client: "Myanmar Oriental Bank (MOB)",
    duration: "Oct 2015 – Aug 2016",
    description:
      "A housing loan processing workflow supporting customer verification, loan documentation, installment tracking, and monthly financial reporting.",
    tech: ["Microsoft Excel (VLOOKUP)", "Microsoft Office", "Bank Accounting"],
  },
  {
    title: "Core Banking System Implementation (Temenos T24)",
    client: "Myanmar Oriental Bank (MOB)",
    duration: "Aug 2016 – Nov 2019",
    description:
      "A centralized core banking system implementation focusing on functional support, UAT preparation, user training, and data migration.",
    tech: ["Temenos T24", "Microsoft Office", "Banking Operations"],
  },
  {
    title: "System Management & Security (CBS)",
    client: "Myanmar Oriental Bank (MOB)",
    duration: "Apr 2018 – Jun 2021",
    description:
      "A security management framework for core banking systems covering user access control, role definition, and menu customization.",
    tech: [
      "Temenos T24",
      "System Security",
      "System Design",
      "ISO 20000",
      "Microsoft Office",
    ],
  },
  {
    title: "Financial Core Banking Solution (Centralized CBS)",
    client: "Myanmar Oriental Bank (MOB)",
    duration: "Dec 2019 – Jun 2021",
    description:
      "A centralized reporting solution delivering daily, monthly, and yearly financial reports for internal teams and regulatory bodies.",
    tech: [
      "Temenos T24",
      "Oracle Database",
      "Design Studio IDE",
      "Bank Accounting",
      "Microsoft Office",
    ],
  },
  {
    title: "Mambu Loan System Implementation",
    client: "KBZ Pay",
    duration: "Jul 2021 – Oct 2022",
    description:
      "A digital loan product implementation supporting deployment, UAT, issue resolution, and data migration to Oracle FLEXCUBE.",
    tech: [
      "Mambu",
      "Oracle FLEXCUBE",
      "UAT",
      "Bank Accounting",
      "Microsoft Office",
    ],
  },
  {
    title: "Merchant Management System (MMS) Implementation",
    client: "KBZ Bank",
    duration: "Oct 2022 – Feb 2024",
    description:
      "A merchant management platform supporting merchant configuration, transaction monitoring, and Level-2 operational support.",
    tech: ["MMS", "APIs", "Oracle Database", "Payment Technology"],
  },
  {
    title: "Payment Aggregator Integration",
    client: "KBZ Bank",
    duration: "Oct 2022 – Feb 2024",
    description:
      "A multi-network payment integration enabling transaction processing and monitoring across domestic and international payment providers.",
    tech: [
      "APIs",
      "ISO 8583",
      "MPU",
      "VISA",
      "MASTERCARD",
      "JCB",
      "Oracle Database",
      "Payment Technology",
    ],
  },
  {
    title: "Merchant Portal System",
    client: "KBZ Bank",
    duration: "Oct 2022 – Feb 2024",
    description:
      "A merchant-facing portal supporting system access control and real-time transaction monitoring across payment platforms.",
    tech: ["MMS", "APIs", "Oracle Database", "Payment Technology"],
  },
  {
    title: "SmartVista BO2 Upgrade",
    client: "KBZ Bank",
    duration: "Oct 2022 – Feb 2024",
    description:
      "A debit card system upgrade project involving functional testing during migration from SmartVista BO1 to BO2.",
    tech: ["UAT", "Payment Technology"],
  },
  {
    title: "FLEXCUBE System Implementation",
    client: "FDB Bank",
    duration: "Feb 2024 – May 2024",
    description:
      "A core banking system implementation supporting data migration and UAT for clearing and cheque processing modules.",
    tech: ["Oracle FLEXCUBE", "UAT", "Bank Accounting"],
  },
];

/* 🔹 Category inference (no content duplication) */
const getCategory = (title: string) => {
  if (title.toLowerCase().includes("loan")) return "Loan Systems";
  if (title.toLowerCase().includes("payment")) return "Payments";
  if (title.toLowerCase().includes("security")) return "Security";
  return "Core Banking";
};

const categories = ["All", "Core Banking", "Loan Systems", "Payments", "Security"];

const Works = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return projects;
    return projects.filter(
      (p) => getCategory(p.title) === activeCategory
    );
  }, [activeCategory]);

  return (
    <Reveal>
      <section id="projects" className="max-w-7xl mx-auto px-4 py-32">
        {/* Title */}
        <div className="inline-block">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-700">
              Projects
            </h2>
            {/* Animated underline */}
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
              className="mt-3 h-[2px] bg-orange-400 mb-14"
            />
          </div>

        {/* 🔹 Category Filter */}
        <div className="flex flex-wrap gap-3 mb-14">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setOpenIndex(null);
              }}
              className={`px-4 py-1.5 rounded-full border
                ${
                  activeCategory === cat
                    ? "border-orange-400 text-orange-300"
                    : "border-white/15 text-slate-300"
                }
                bg-white/5 backdrop-blur
                transition-colors`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 🔹 Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => {
              const isOpen = openIndex === index;

              return (
                <motion.div
                  layout
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4 }}
                  className="rounded-xl border border-white/10
                             bg-white/5 backdrop-blur-md"
                >
                  {/* Header */}
                  <button
                    onClick={() =>
                      setOpenIndex(isOpen ? null : index)
                    }
                    className="w-full px-6 py-5 flex justify-between items-start text-left"
                  >
                    <div>
                      <p className="text-lg font-semibold text-slate-100">
                        {project.title}
                      </p>
                      <p className="text-sm text-orange-300 mt-1">
                        {project.client}
                      </p>
                    </div>

                    <span
                      className={`transition-transform text-slate-300 ${
                        isOpen ? "rotate-90" : ""
                      }`}
                    >
                      ▶
                    </span>
                  </button>

                  {/* 🔹 Staggered content */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 16 }}
                        transition={{ duration: 0.4 }}
                        className="px-6 pb-8 text-slate-300"
                      >
                        <p className="text-slate-200 mb-3">
                          {project.duration}
                        </p>

                        <p className="mb-6 text-lg leading-relaxed">
                          {project.description}
                        </p>

                        <motion.ul
                          initial="hidden"
                          animate="show"
                          variants={{
                            hidden: {},
                            show: {
                              transition: {
                                staggerChildren: 0.06,
                              },
                            },
                          }}
                          className="flex flex-wrap gap-3"
                        >
                          {project.tech.map((tech) => (
                            <motion.li
                              key={tech}
                              variants={{
                                hidden: { opacity: 0, y: 10 },
                                show: { opacity: 1, y: 0 },
                              }}
                              className="px-4 py-1.5 rounded-full
                                         border border-white/15
                                         text-sm text-slate-200"
                            >
                              {tech}
                            </motion.li>
                          ))}
                        </motion.ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </section>
    </Reveal>
  );
};

export default Works;
