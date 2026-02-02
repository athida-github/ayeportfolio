import { motion } from "framer-motion";
import Reveal from "./Reveal";

const ease = [0.16, 1, 0.3, 1] as const;

const About = () => {
  return (
    <Reveal>
      <motion.section
        id="about"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-120px" }}
        className="relative max-w-7xl mx-auto px-4 py-32"
      >
        {/* Subtle background glow */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-100/50 via-transparent to-transparent" />

        {/* TITLE */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 40 },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, ease },
            },
          }}
          className="mb-16"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-700">
            About
          </h2>

          {/* Animated underline */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "82px" }}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
            className="mt-4 h-[2px] bg-orange-400"
          />
        </motion.div>

        {/* PROFILE INFO */}
        <motion.div
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.12 },
            },
          }}
          className="flex flex-wrap gap-4 text-base sm:text-lg text-slate-600"
        >
          {[
            { label: "DOB", value: "12 March 1991" },
            { label: "Location", value: "Kyoto, Japan" },
            { label: "Availability", value: "Open to opportunities" },
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease },
                },
              }}
              className="rounded-lg border border-slate-200 bg-white/70 px-5 py-2 backdrop-blur-sm"
            >
              <span className="font-medium text-slate-700">
                {item.label}:
              </span>{" "}
              {item.value}
            </motion.div>
          ))}
        </motion.div>

        {/* CONTENT */}
        <div className="mt-16 max-w-full space-y-8 text-justify">
          {[
            `An IT professional with experience supporting system implementation,
            project coordination, and technical documentation in structured
            environments. Background includes working closely with project
            managers, developers, and business stakeholders to support smooth
            project execution.`,

            `Experience spans quality assurance, system integration support, data
            analysis, and user acceptance testing within large-scale IT projects.
            Strong attention is given to documentation, task tracking, and clear
            communication across teams.`,

            `Currently based in Japan and completing academic studies, with
            hands-on experience as a teaching assistant and program support staff.
            Known for being reliable, detail-oriented, and adaptable in both
            international and multicultural work environments.`,

            `Seeking opportunities where coordination skills, technical
            understanding, and a collaborative mindset can add value to ongoing
            projects and organizational goals.`,
          ].map((text, index) => (
            <motion.p
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.7,
                    ease,
                    delay: index * 0.06,
                  },
                },
              }}
              whileHover={{ x: 2 }}
              className="text-lg sm:text-xl leading-relaxed text-slate-600 transition-colors"
            >
              {text}
            </motion.p>
          ))}
        </div>
      </motion.section>
    </Reveal>
  );
};

export default About;
