import { useEffect, useState } from "react";

import Hero from "../components/Hero";
import SocialSidebar from "../components/SocialSidebar";
import EmailSidebar from "../components/EmailSidebar";
import About from "../components/About";
import Education from "../components/Education";
import Experience from "../components/Experience";
import Skills from "../components/Skills";
import Works from "../components/Works";
import Contact from "../components/Contact";
import Comments from "../components/Comments";


const Home = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const progress = Math.min(scrollTop / docHeight, 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🎨 Gradient background
  const backgroundStyle = {
    background: `
      linear-gradient(
        180deg,
        rgb(255,255,255) 0%,
        rgb(241,245,249) ${30 + scrollProgress * 20}%,
        rgb(15,23,42) ${70 + scrollProgress * 20}%
      )
    `,
    transition: "background 0.2s ease-out",
  };

  return (
    <main
      style={backgroundStyle}
      className="min-h-screen text-slate-100 px-6 lg:px-24"
    >
      <SocialSidebar />
      <EmailSidebar />

      <Hero />
      <About />
      <Education />
      <Experience />
      <Skills />
      <Works />
      <Comments />
      <Contact />
    </main>
  );
};

export default Home;
