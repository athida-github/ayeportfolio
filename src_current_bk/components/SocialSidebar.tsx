import {
  FaGithub,
  FaLinkedinIn,
  FaEnvelope,
  FaWhatsapp,
  FaLine,
} from "react-icons/fa";

const SocialSidebar = () => {
  // 🔹 WhatsApp configuration
  const phoneNumber = "817089763940"; // ← replace with YOUR number (Japan: 81)
  const message = `Hello Aye Thida,

I found your portfolio and would like to connect with you.
Thank you!`;

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  // 🔹 LINE
  const lineId = "aye_sohpie"; // ← e.g. ayethida
  const lineMessage = `Hello Aye Thida,

I found your portfolio and would like to connect with you.
Thank you!`;

  const lineUrl = `https://line.me/R/oaMessage/${lineId}/?${encodeURIComponent(
    lineMessage
  )}`;

  return (
    <div className="fixed left-3 lg:left-6 bottom-0 hidden md:flex flex-col items-center gap-5 z-50">
      {/* GitHub */}
      <a
        href="https://github.com/yourusername"
        target="_blank"
        rel="noopener noreferrer"
        className="text-slate-400 hover:text-orange-400
                   text-4xl hover:-translate-y-1 transition"
        aria-label="GitHub"
      >
        <FaGithub />
      </a>

      {/* WhatsApp */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-slate-400 hover:text-green-400
                   text-4xl hover:-translate-y-1 transition"
        aria-label="WhatsApp"
      >
        <FaWhatsapp />
      </a>

      {/* LINE */}
      <a
        href={lineUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-slate-400 hover:text-green-500
                   text-4xl hover:-translate-y-1 transition"
        aria-label="LINE"
      >
        <FaLine />
      </a> 

      {/* LinkedIn */}
      <a
        href="https://www.linkedin.com/in/aye-thida-a9b8762a2"
        target="_blank"
        rel="noopener noreferrer"
        className="text-slate-400 hover:text-blue-400
                   text-4xl hover:-translate-y-1 transition"
        aria-label="LinkedIn"
      >
        <FaLinkedinIn />
      </a>

      {/* Email */}
      <a
        href="mailto:ayethidasophie@gmail.com?subject=Portfolio Contact"
        className="text-slate-400 hover:text-orange-400
                   text-4xl hover:-translate-y-1 transition"
        aria-label="Email"
      >
        <FaEnvelope />
      </a>

      {/* vertical line */}
      <div className="w-px h-24 bg-slate-400 mt-2"></div>
    </div>
  );
};

export default SocialSidebar;
