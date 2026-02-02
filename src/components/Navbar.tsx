import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="
        fixed top-0 w-full z-50
        bg-slate-900/70 backdrop-blur-md
        border-b border-slate-800
      "
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* LOGO */}
        <a
          href="#"
          className="text-xl font-semibold text-slate-100
                     tracking-wide hover:text-orange-400 transition"
        >
          Aye<span className="text-orange-400">.</span>
        </a>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-8 text-lg">
          <NavItem index="01." label="About" href="#about" />
          <NavItem index="02." label="Experience" href="#experience" />
          <NavItem index="03." label="Projects" href="#projects" />
          <NavItem index="04." label="Recommendation" href="#comments" />
          <NavItem index="05." label="Contact" href="#contact" />
        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-slate-200 focus:outline-none"
          aria-label="Toggle menu"
        >
          <div className="space-y-1.5">
            <span className="block w-6 h-0.5 bg-slate-200" />
            <span className="block w-6 h-0.5 bg-slate-200" />
            <span className="block w-6 h-0.5 bg-slate-200" />
          </div>
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-slate-900 border-t border-slate-800"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              <MobileNavItem
                label="About"
                href="#about"
                onClick={() => setMenuOpen(false)}
              />
              <MobileNavItem
                label="Experience"
                href="#experience"
                onClick={() => setMenuOpen(false)}
              />
              <MobileNavItem
                label="Projects"
                href="#projects"
                onClick={() => setMenuOpen(false)}
              />
              <MobileNavItem
                label="Recommendation"
                href="#comments"
                onClick={() => setMenuOpen(false)}
              />
              <MobileNavItem
                label="Contact"
                href="#contact"
                onClick={() => setMenuOpen(false)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;

/* Desktop nav item */
const NavItem = ({
  index,
  label,
  href,
}: {
  index: string;
  label: string;
  href: string;
}) => (
  <a
    href={href}
    className="group flex items-center gap-1
               text-slate-400 hover:text-slate-100 transition"
  >
    <span className="text-orange-400 text-xs">{index}</span>
    <span className="relative">
      {label}
      <span
        className="absolute left-0 -bottom-1 w-0 h-px
                   bg-orange-400 transition-all duration-300
                   group-hover:w-full"
      />
    </span>
  </a>
);

/* Mobile nav item */
const MobileNavItem = ({
  label,
  href,
  onClick,
}: {
  label: string;
  href: string;
  onClick: () => void;
}) => (
  <a
    href={href}
    onClick={onClick}
    className="text-slate-200 text-lg
               hover:text-orange-400 transition"
  >
    {label}
  </a>
);
