import SocialSidebar from "./SocialSidebar";
import EmailSidebar from "./EmailSidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative min-h-screen">

      {/* LEFT SIDEBAR */}
      <div className="hidden lg:block fixed left-3 lg:left-6 bottom-0 z-50">
        <SocialSidebar />
      </div>

      {/* RIGHT SIDEBAR */}
      <div className="hidden lg:block fixed right-3 lg:right-6 bottom-0 z-50">
        <EmailSidebar />
      </div>

      {/* MAIN CONTENT */}
      <main
        className="
          mx-w-7xl mx-auto
          px-6 sm:px-8 lg:px-20
        "
      >
        {children}
      </main>

    </div>
  );
};

export default Layout;
