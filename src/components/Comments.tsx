import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { initialComments } from "../data/Comment-data";

const Comments = () => {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState(""); // 👈 NEW
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await emailjs.send(
        "service_htphdmk",
        "template_jt17frl",
        {
          name,
          email, // 👈 SEND EMAIL
          role,
          message,
          date: new Date().toLocaleDateString(),
        },
        "KQC0pk7HZ4Du2_tXB"
      );

      alert("Thank you! Your recommendation has been sent for review.");

      setName("");
      setEmail("");
      setRole("");
      setMessage("");
      setShowForm(false);
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="comments" className="relative py-28 px-6">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="mb-14 flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-semibold text-slate-100">
              Professional Recommendations
            </h2>
            <p className="mt-2 text-slate-400 max-w-xl">
              Feedback from colleagues and collaborators.
            </p>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 rounded-md border border-slate-700 text-slate-200 hover:border-orange-400"
          >
            Request Recommendation
          </button>
        </div>

        {/* APPROVED COMMENTS ONLY */}
        <div className="space-y-8">
          {initialComments
            .filter((c) => c.approved)
            .map((comment) => (
              <div
                key={comment.id}
                className="rounded-xl border border-slate-800 bg-slate-900/60 px-6 py-6"
              >
                <p className="text-slate-300">“{comment.message}”</p>

                <div className="mt-4">
                  <p className="text-slate-500 font-semibold">
                    {comment.name}
                  </p>
                  <p className="text-sm text-slate-600 italic">
                    {comment.email}
                  </p>
                  <p className="text-sm text-slate-600 italic">
                    {comment.role}
                  </p>
                  <p className="text-xs text-slate-600 italic">
                    {comment.date}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* MODAL */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-slate-900 p-6 rounded-xl w-full max-w-lg border border-slate-800"
          >
            <h3 className="text-lg font-semibold text-slate-100 mb-4">
              Request a Recommendation
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                className="w-full px-3 py-2 rounded-md
                           bg-slate-950 border border-slate-700
                           text-slate-200 focus:outline-none
                           focus:border-orange-400"
              />

              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email Address"
                className="w-full px-3 py-2 rounded-md
                           bg-slate-950 border border-slate-700
                           text-slate-200 focus:outline-none
                           focus:border-orange-400"
              />

              <input
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Your Role / Organization"
                className="w-full px-3 py-2 rounded-md
                           bg-slate-950 border border-slate-700
                           text-slate-200 focus:outline-none
                           focus:border-orange-400"
              />

              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your message"
                className="w-full px-3 py-2 rounded-md
                           bg-slate-950 border border-slate-700
                           text-slate-200 focus:outline-none
                           focus:border-orange-400"
              />

              <p className="text-xs text-slate-500">
                Your email will not be displayed publicly.
              </p>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="text-slate-400 hover:text-slate-200"
                >
                  Cancel
                </button>

                <button
                  disabled={loading}
                  type="submit"
                  className="px-4 py-2 rounded-md
                             bg-orange-400 text-black
                             hover:bg-orange-300 transition"
                >
                  {loading ? "Sending..." : "Submit"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default Comments;
