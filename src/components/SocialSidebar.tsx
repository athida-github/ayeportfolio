import {
  FaGithub,
  FaLinkedinIn,
  FaEnvelope,
  FaWhatsapp,
  FaLine,
} from "react-icons/fa";

const SocialSidebar = () => {
  // 🔹 WhatsApp configuration
  const phoneNumber = "817089763940"; // Japan: 81
  const message = `Hello Aye Thida,

I found your portfolio and would like to connect with you.
Thank you!`;

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  // 🔹 LINE
  const lineId = "aye_sohpie";
  const lineMessage = `Hello Aye Thida,

I found your portfolio and would like to connect with you.
Thank you!`;

  const lineUrl = `https://line.me/R/oaMessage/${lineId}/?${encodeURIComponent(
    lineMessage
  )}`;

  return (
    <>
      {/* ================= DESKTOP SIDEBAR ================= */}
      <div className="fixed left-3 lg:left-6 bottom-0 hidden md:flex flex-col items-center gap-5 z-50">
        <SocialIcon
          href="https://github.com/yourusername"
          label="GitHub"
          color="hover:text-orange-400"
        >
          <FaGithub />
        </SocialIcon>

        <SocialIcon
          href={whatsappUrl}
          label="WhatsApp"
          color="hover:text-green-400"
        >
          <FaWhatsapp />
        </SocialIcon>

        <SocialIcon
          href={lineUrl}
          label="LINE"
          color="hover:text-green-500"
        >
          <FaLine />
        </SocialIcon>

        <SocialIcon
          href="https://www.linkedin.com/in/aye-thida-a9b8762a2"
          label="LinkedIn"
          color="hover:text-blue-400"
        >
          <FaLinkedinIn />
        </SocialIcon>

        <SocialIcon
          href="mailto:ayethidasophie@gmail.com?subject=Portfolio Contact"
          label="Email"
          color="hover:text-orange-400"
        >
          <FaEnvelope />
        </SocialIcon>

        {/* vertical line */}
        <div className="w-px h-24 bg-slate-400 mt-2" />
      </div>

      {/* ================= MOBILE BOTTOM BAR ================= */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 md:hidden">
        <div
          className="
            flex items-center gap-5
            px-5 py-3 rounded-full
            bg-slate-900/90 backdrop-blur
            border border-slate-700
            shadow-lg
          "
        >
          <MobileIcon href="https://github.com/yourusername" label="GitHub">
            <FaGithub />
          </MobileIcon>

          <MobileIcon href={whatsappUrl} label="WhatsApp">
            <FaWhatsapp />
          </MobileIcon>

          <MobileIcon href={lineUrl} label="LINE">
            <FaLine />
          </MobileIcon>

          <MobileIcon
            href="https://www.linkedin.com/in/aye-thida-a9b8762a2"
            label="LinkedIn"
          >
            <FaLinkedinIn />
          </MobileIcon>

          <MobileIcon
            href="mailto:ayethidasophie@gmail.com?subject=Portfolio Contact"
            label="Email"
          >
            <FaEnvelope />
          </MobileIcon>
        </div>
      </div>
    </>
  );
};

export default SocialSidebar;

/* ================= REUSABLE COMPONENTS ================= */

const SocialIcon = ({
  href,
  label,
  color,
  children,
}: {
  href: string;
  label: string;
  color: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className={`
      text-slate-400 text-3xl
      ${color}
      hover:-translate-y-1 transition
    `}
  >
    {children}
  </a>
);

const MobileIcon = ({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="
      text-slate-300 text-xl
      hover:text-orange-400 transition
    "
  >
    {children}
  </a>
);
