import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const educationData = [
  {
    title: "Master of Web System Development (Final Year)",
    place:
      "Kyoto College of Graduate Studies for Informatics (KCGI), Japan",
  },
  {
    title: "Master of Computer Science (Final Year)",
    place: "University of Yangon, Myanmar",
  },
  {
    title: "Diploma in Computer Science",
    place: "University of Yangon, Myanmar",
  },
  {
    title: "Diploma in Accounting (LCCI)",
    place: "London Chamber of Commerce and Industry International Qualifications from EDI",
  },
  {
    title: "Bachelor of Arts in English",
    place: "Yadanarbon University, Mandalay, Myanmar",
  },
];

const Education = () => {
  return (
    <section id="education" className="py-24 px-6">
      <motion.div
        className="max-w-7xl mx-auto space-y-14"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-120px" }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.12 } },
        }}
      >
        {/* TITLE */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 32 },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, ease },
            },
          }}
        >
          <h2 className="text-3xl font-semibold text-slate-700">
            Education, Certifications & Awards
          </h2>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "430px" }}
            transition={{ duration: 0.7, ease, delay: 0.15 }}
            className="mt-3 h-[2px] bg-orange-400"
          />

          <p className="mt-3 text-base text-slate-600 max-w-2xl">
            Academic background and professional qualifications.
          </p>
        </motion.div>

        {/* TIMELINE */}
        <motion.div
          className="relative pl-6 border-l border-slate-200 space-y-8"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {educationData.map((item, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease },
                },
              }}
              className="relative"
            >
              {/* Timeline dot */}
              <span className="absolute -left-[9px] top-[6px] w-2.5 h-2.5 rounded-full bg-slate-400" />

              <p className="text-base font-medium text-slate-800 leading-snug">
                {item.title}
              </p>
              <p className="mt-0.5 text-sm text-slate-600">
                {item.place}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Education;
