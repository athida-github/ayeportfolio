import { motion, useScroll, useTransform } from "framer-motion";
import profileImg from "../assets/profile_aye.png";

const ease = [0.16, 1, 0.3, 1] as const;

const Hero = () => {
  const { scrollYProgress } = useScroll();

  // Hero exits as user scrolls
  const opacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.18], [0, -90]);

  return (
    <motion.section
      style={{ opacity, y }}
      className="
        relative w-full min-h-screen overflow-hidden
        bg-rgb(241,245,249) via-slate-50 to-slate-100
        text-slate-900
      "
    >
      <div
        className="
          max-w-7xl mx-auto min-h-screen px-4 sm:px-6
          grid grid-cols-1 md:grid-cols-2 items-center
        "
      >
        {/* LEFT — PHOTO */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease }}
          className="relative z-10 flex justify-center md:justify-center"
        >
          <motion.img
            src={profileImg}
            alt="Aye Thida"
            initial={{ scale: 0.96 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.1, ease }}
            className="
              w-[220px] sm:w-[260px] md:w-[300px]
              h-auto object-contain
            "
          />
        </motion.div>

        {/* RIGHT — TEXT */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.12,
                delayChildren: 0.25,
              },
            },
          }}
          className="relative z-10 flex flex-col md:pl-12"
        >
          {/* Accent line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease }}
            className="origin-left w-10 h-[2px] bg-orange-400 mb-1"
          />

          {/* Intro */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 16 },
              show: { opacity: 1, y: 0 },
            }}
            className="
              text-xs tracking-[0.25em] uppercase
              text-orange-500 mb-3
            "
          >
            Hello, my name is
          </motion.p>

          {/* Name */}
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 24 },
              show: { opacity: 1, y: 0 },
            }}
            className="
              text-3xl sm:text-4xl lg:text-5xl
              font-extrabold text-slate-800
              leading-tight
            "
          >
            Aye Thida
          </motion.h1>

          {/* Role */}
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
            className="
              mt-4 text-base sm:text-xl
              font-semibold text-slate-500
            "
          >
            IT & Project Support Professional
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
            className="
              mt-8 max-w-xl
              text-lg sm:text-xl
              leading-relaxed text-slate-600
            "
          >
            Contributing to stable and successful projects by bridging
            business needs and technical teams through clear communication
            and careful coordination.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 16 },
              show: { opacity: 1, y: 0 },
            }}
            className="flex gap-4 mt-10"
          >
            <a
              href="#projects"
              className="
                px-6 py-3 rounded-lg text-sm font-semibold
                bg-orange-400 text-white
                hover:bg-orange-300
                transition-all duration-300
              "
            >
              View Projects
            </a>

            <a
              href="#experience"
              className="
                px-6 py-3 rounded-lg text-sm font-semibold
                border border-slate-300 text-slate-600
                hover:border-slate-400 hover:text-slate-800
                transition-all duration-300
              "
            >
              Experience
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1.2 }}
        className="
          hidden lg:flex absolute bottom-10 left-1/2 -translate-x-1/2
        "
      >
        <div className="w-[2px] h-14 bg-slate-300 relative overflow-hidden">
          <span className="absolute top-0 left-0 w-full h-5 bg-orange-400 animate-pulse" />
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Hero;
