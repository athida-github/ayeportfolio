import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import Reveal from "./Reveal";

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setStatus("sending");

    emailjs
      .sendForm(
        "service_kqp1g2j",
        "template_3nfgrph",
        formRef.current,
        "eGU7Zqw0Ti_ncKFh1"
      )
      .then(
        () => {
          emailjs.send(
            "service_kqp1g2j",
            "template_rbse4r7",
            {
              to_email: formRef.current?.from_email.value,
              name: formRef.current?.from_name.value,
            },
            "eGU7Zqw0Ti_ncKFh1"
          );

          setStatus("success");
          formRef.current?.reset();
        },
        () => setStatus("error")
      );
  };

  return (
    <Reveal>
      <section
        id="contact"
        className="
          relative min-h-screen
          flex items-center justify-center
          px-6 py-32
        "
      >
        {/* CENTER CARD */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="
            w-full max-w-xl
            rounded-2xl
            border border-slate-800
            bg-slate-900/70 backdrop-blur
            p-10 sm:p-12
            shadow-xl
          "
        >
          {/* HEADER */}
          <div className="text-center mb-10">
            <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight">
              Let&apos;s work together
            </h2>

            {/* <p className="mt-4 text-slate-400 leading-relaxed">
              Have a project in mind or want to collaborate?
              Send me a message and I’ll get back to you within 24 hours.
            </p> */}
          </div>

          {/* FORM */}
          <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm mb-2 text-slate-300">
                Your Email
              </label>
              <input
                type="email"
                name="from_email"
                required
                placeholder="you@example.com"
                className="
                  w-full bg-slate-950
                  border border-slate-700
                  rounded-md px-4 py-3 text-sm
                  text-slate-200 placeholder-slate-500
                  focus:outline-none focus:border-slate-500
                "
              />
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm mb-2 text-slate-300">
                Your Name
              </label>
              <input
                type="text"
                name="from_name"
                required
                placeholder="Your name"
                className="
                  w-full bg-slate-950
                  border border-slate-700
                  rounded-md px-4 py-3 text-sm
                  text-slate-200 placeholder-slate-500
                  focus:outline-none focus:border-slate-500
                "
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm mb-2 text-slate-300">
                Message
              </label>
              <textarea
                name="message"
                rows={5}
                required
                placeholder="Tell me a bit about your project..."
                className="
                  w-full bg-slate-950
                  border border-slate-700
                  rounded-md px-4 py-3 text-sm
                  text-slate-200 placeholder-slate-500
                  resize-none
                  focus:outline-none focus:border-slate-500
                "
              />
            </div>

            {/* CTA */}
            <button
              type="submit"
              disabled={status === "sending"}
              className="
                w-full flex items-center justify-center
                bg-slate-400 text-black
                px-8 py-3 rounded-md
                font-medium text-sm
                hover:bg-slate-200 transition
                disabled:opacity-50
              "
            >
              {status === "sending" ? "Sending..." : "Send message"}
            </button>

            {/* STATUS */}
            <div className="min-h-[20px] text-center">
              {status === "success" && (
                <p className="text-green-400 text-sm mt-3">
                  ✅ Message sent successfully!
                </p>
              )}

              {status === "error" && (
                <p className="text-red-400 text-sm mt-3">
                  ❌ Something went wrong. Please try again.
                </p>
              )}
            </div>
          </form>
        </motion.div>
      </section>
    </Reveal>
  );
};

export default Contact;
