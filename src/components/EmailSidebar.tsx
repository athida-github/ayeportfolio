const EmailSidebar = () => {
  return (
    <div className="fixed right-4 lg:right-6 bottom-0 hidden md:flex flex-col items-center gap-5 z-50">

      <a
        href="mailto:ayethidasophie@gmail.com"
        className="text-slate-400 hover:text-orange-400
                   text-xl tracking-widest hover-lift transition"
        style={{ writingMode: "vertical-rl" }}
      >
        ayethida.sophie@gmail.com
      </a>

      {/* vertical line */}
      <div className="w-px h-24 bg-slate-400 mt-2"></div>
    </div>
  );
};

export default EmailSidebar;
