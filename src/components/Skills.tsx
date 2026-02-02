import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const skillGroups = [
  {
    title: "Soft Skills",
    items: [
      "Project Planning & Coordination",
      "Clear Communication",
      "Stakeholder & Vendor Coordination",
      "Time Management & Prioritization",
      "Problem Solving",
      "Team Collaboration",
      "Attention to Detail",
    ],
  },
  {
    title: "Technical Skills — Functional",
    items: [
      "User Acceptance Testing (UAT)",
      "System Integration & Functional Testing",
      "Requirement Analysis & Documentation",
      "Data Validation & Reconciliation",
      "Incident & Issue Management",
      "Core Banking & Payment Systems Support",
    ],
  },
  {
    title: "Technical Skills — Programming & Web",
    items: [
      "HTML, CSS, JavaScript",
      "React (Basic to Intermediate)",
      "Java (Fundamental)",
      "REST API Consumption & Integration",
      "Web Application Structure & Component Design",
    ],
  },
  {
    title: "Technical Skills — Tools & Technologies",
    items: [
      "Temenos (T24), Mambu, Oracle FLEXCUBE",
      "ISO 8583, MPU, VISA, MasterCard, JCB",
      "Oracle DB, SQL",
      "ZealWay, ZealMux, ZealBatch",
      "SmartVista",
      "Jira, Microsoft Office",
    ],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-7xl mx-auto space-y-14">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
        >
          <h2 className="text-3xl font-semibold text-slate-700">
            Skills & Proficiencies
          </h2>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "250px" }}
            transition={{ duration: 0.7, ease, delay: 0.15 }}
            className="mt-3 h-[2px] bg-orange-400"
          />

          <p className="mt-3 text-base text-slate-600 max-w-2xl">
            A combination of professional, technical, and development skills.
          </p>
        </motion.div>

        {/* Skill Groups */}
        <div className="space-y-12">
          {skillGroups.map((group, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                ease,
                delay: index * 0.06,
              }}
              className="pl-4 border-l border-slate-200"
            >
              {/* Group Header */}
              <h3 className="mb-3 text-lg font-medium text-slate-800">
                {group.title}
              </h3>

              {/* Skills List */}
              <ul className="grid sm:grid-cols-2 gap-y-2 gap-x-8 text-base text-slate-600">
                {group.items.map((item, i) => (
                  <li
                    key={i}
                    className="flex gap-2 items-start transition-transform duration-200 hover:translate-x-1"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
