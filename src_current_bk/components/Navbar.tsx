const Navbar = () => {
  return (
    <nav
      className="fixed top-0 w-full z-50
                 bg-slate-900/70 backdrop-blur-md
                 border-b border-slate-800"
    >
      <div
        className="max-w-6xl mx-auto px-6 py-4
                   flex items-center justify-between"
      >
        {/* LEFT — LOGO / NAME */}
        <a
          href="#"
          className="text-xl font-semibold text-slate-100
                     tracking-wide hover:text-orange-400 transition"
        >
          Aye<span className="text-orange-400">.</span>
        </a>

        {/* RIGHT — NAV LINKS */}
        <div className="hidden md:flex items-center gap-8 text-xl">
          <NavItem index="01." label="About" href="#about" />
          <NavItem index="02." label="Experience" href="#experience" />
          <NavItem index="03." label="Projects" href="#projects" />
          <NavItem index="04." label="Contact" href="#contact" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

/* Small reusable nav item */
const NavItem = ({
  index,
  label,
  href,
}: {
  index: string;
  label: string;
  href: string;
}) => {
  return (
    <a
      href={href}
      className="group flex items-center gap-1
                 text-slate-400 hover:text-slate-100
                 transition"
    >
      <span className="text-orange-400 text-xs">{index}</span>
      <span className="relative">
        {label}
        {/* underline animation */}
        <span
          className="absolute left-0 -bottom-1 w-0 h-px
                     bg-orange-400 transition-all duration-300
                     group-hover:w-full"
        />
      </span>
    </a>
  );
};
