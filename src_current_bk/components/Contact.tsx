import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Reveal from "./Reveal";

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const sendEmail = (e: React.FormEvent) => {
  e.preventDefault();

  if (!formRef.current) return;

  setStatus("sending");

  // 1️⃣ Send main email to YOU
  emailjs
    .sendForm(
      "service_kqp1g2j",
      "template_3nfgrph",
      formRef.current,
      "eGU7Zqw0Ti_ncKFh1"
    )
    .then(
      () => {
        // 2️⃣ Auto-reply to USER
        emailjs.send(
          "service_kqp1g2j",
          "template_rbse4r7", // 🔴 your auto-reply template ID
          {
            to_email: formRef.current?.from_email.value,
            name: formRef.current?.from_name.value,
          },
          "eGU7Zqw0Ti_ncKFh1"
        );

        setStatus("success");
        formRef.current?.reset();
      },
      (error) => {
        console.error("FAILED:", error);
        setStatus("error");
      }
    );
};


  return (
    <Reveal>
      <section
        id="contact"
        className="max-w-7xl mx-auto min-h-screen px-4 py-32
                   grid md:grid-cols-2 gap-16 items-center"
      >
        {/* LEFT */}
        <div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Let&apos;s connect.
          </h2>

          <p className="text-xl text-gray-400 max-w-md mb-12 leading-relaxed">
            If you want to know more about me or my work, feel free to send a message.
            I usually reply within 24 hours.
          </p>

          {/* FORM */}
          <form ref={formRef} onSubmit={sendEmail} className="space-y-6 max-w-md">
            {/* Email */}
            <div>
              <label className="block text-sm mb-2 text-gray-300">
                Your Email
              </label>
              <input
                type="email"
                name="from_email"
                required
                placeholder="example@email.com"
                className="w-full bg-transparent border border-gray-600
                           rounded-md px-4 py-3 text-sm
                           focus:outline-none focus:border-slate-400"
              />
            </div>
            {/* Name */}
              <div>
                <label className="block text-sm mb-2 text-gray-300">
                  Your Name
                </label>
                <input
                  type="text"
                  name="from_name"
                  required
                  placeholder="Your name"
                  className="w-full bg-transparent border border-gray-600
                            rounded-md px-4 py-3 text-sm
                            focus:outline-none focus:border-slate-400"
                />
              </div>


            {/* Message */}
            <div>
              <label className="block text-sm mb-2 text-gray-300">
                Message
              </label>
              <textarea
                name="message"
                rows={5}
                required
                placeholder="Hi, I’d like to talk about..."
                className="w-full bg-transparent border border-gray-600
                           rounded-md px-4 py-3 text-sm resize-none
                           focus:outline-none focus:border-slate-400"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={status === "sending"}
              className="bg-yellow-300 text-black px-8 py-3 rounded-md
                         font-medium text-sm
                         hover:bg-yellow-200 transition disabled:opacity-50"
            >
              {status === "sending" ? "Sending..." : "Send →"}
            </button>

            {/* STATUS MESSAGE */}
            {status === "success" && (
              <p className="text-green-400 text-sm mt-4">
                ✅ Message sent successfully!
              </p>
            )}

            {status === "error" && (
              <p className="text-red-400 text-sm mt-4">
                ❌ Something went wrong. Please try again.
              </p>
            )}
          </form>
        </div>

        {/* RIGHT IMAGE */}
        <div className="hidden md:flex justify-center">
          <img
            src="/aye.png"
            alt="Contact illustration"
            className="max-w-sm"
          />
        </div>
      </section>
    </Reveal>
  );
};

export default Contact;
