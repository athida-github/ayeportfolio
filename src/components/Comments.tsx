import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { initialComments } from "../data/Comment-data";

const COMMENTS_PER_PAGE = 3;

const Comments = () => {
  /* ---------------- STATE ---------------- */
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  /* ---------------- DATA ---------------- */
  const approvedComments = useMemo(
    () =>
      initialComments
        .filter((c) => c.approved)
        .sort((a, b) => b.date.localeCompare(a.date)),
    []
  );

  const total = approvedComments.length;
  const totalPages = Math.ceil(total / COMMENTS_PER_PAGE);

  const visibleComments = useMemo(() => {
    const start = (currentPage - 1) * COMMENTS_PER_PAGE;
    return approvedComments.slice(start, start + COMMENTS_PER_PAGE);
  }, [approvedComments, currentPage]);

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    /* 1️⃣ Send recommendation to YOU */
    await emailjs.send(
      "service_htphdmk",
      "template_jt17frl", // admin / review template
      {
        name,
        role,
        email,
        message,
        date: new Date().toLocaleDateString(),
      },
      "KQC0pk7HZ4Du2_tXB"
    );

    /* 2️⃣ Auto-reply email to USER */
    await emailjs.send(
      "service_htphdmk",
      "template_m9vhczg", // new template
      {
        name,
        email,
      },
      "KQC0pk7HZ4Du2_tXB"
    );

    alert(
      "Thank you! Your recommendation has been sent.\nA confirmation email has been sent to you."
    );

    setName("");
    setRole("");
    setEmail("");
    setMessage("");
    setShowForm(false);
  } catch (error) {
    alert("Something went wrong. Please try again.");
    console.error(error);
  } finally {
    setLoading(false);
  }
};


  return (
    <section id="comments" className="relative py-16 sm:py-28 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="mb-12 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6">
          <div>
            {/* <h2 className="text-2xl sm:text-3xl font-semibold text-slate-100">
              What People Say
            </h2> */}
            <div className="inline-block">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-300">
              What People Say
            </h2>
            {/* Animated underline */}
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
              className="mt-3 h-[2px] bg-orange-400"
            />
          </div>
            <p className="mt-2 text-slate-400 max-w-xl text-sm sm:text-base">
              Feedback from colleagues and collaborators.
            </p>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 rounded-md border bg-slate-800 border-slate-700 text-slate-200 hover:border-orange-400 transition"
          >
            Request Recommendation
          </button>
        </div>

        {/* INFO LINE */}
        {total > 0 && (
          <p className="mb-8 text-sm text-slate-500">
            Showing{" "}
            <span className="text-slate-300 font-medium">
              {(currentPage - 1) * COMMENTS_PER_PAGE + 1}–
              {Math.min(currentPage * COMMENTS_PER_PAGE, total)}
            </span>{" "}
            of{" "}
            <span className="text-slate-300 font-medium">{total}</span>{" "}
            recommendations
          </p>
        )}

        {/* EMPTY STATE */}
        {total === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-4xl mb-4">💬</div>
            <h4 className="text-lg font-semibold text-slate-200">
              No recommendations yet
            </h4>
            <p className="mt-2 text-sm text-slate-400 max-w-sm">
              Be the first to share a professional recommendation and help
              build credibility.
            </p>

            <button
              onClick={() => setShowForm(true)}
              className="mt-6 px-5 py-2.5 rounded-md bg-orange-400 text-black font-medium hover:bg-orange-500 transition"
            >
              Write a Recommendation
            </button>
          </div>
        ) : (
          <>
            {/* COMMENTS */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
                className="space-y-6 sm:space-y-8"
              >
                {visibleComments.map((comment) => (
                  <div
                    key={comment.id}
                    className="rounded-xl border border-slate-800 bg-slate-900/60 px-4 sm:px-6 py-5 sm:py-6"
                  >
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                      “{comment.message}”
                    </p>

                    <div className="mt-4">
                      <p className="text-orange-200 font-semibold">
                        {comment.name}
                      </p>
                      <p className="text-sm italic text-orange-200">{comment.email}</p>
                      <p className="text-sm italic text-orange-200">{comment.role}</p>
                      <p className="text-xs italic text-orange-200">{comment.date}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-between">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                  className="px-4 py-2 text-sm rounded-md border border-slate-700 text-slate-300 disabled:opacity-40"
                >
                  Previous
                </button>

                <span className="text-sm text-slate-500">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="px-4 py-2 text-sm rounded-md border border-slate-700 text-slate-300 disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* MODAL */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-slate-900 p-5 sm:p-6 rounded-xl w-full max-w-lg"
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
                className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 text-slate-200 rounded-md"
              />

              <input
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email"
                className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 text-slate-200 rounded-md"
              />

              <input
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Your Role / Organization (e.g., Manager at XYZ Corp)"
                className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 text-slate-200 rounded-md"
              />

              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your message"
                className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 text-slate-200 rounded-md"
              />

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="text-slate-400 text-sm hover:text-slate-200"
                >
                  Cancel
                </button>

                <button
                  disabled={loading}
                  type="submit"
                  className="px-4 py-2 bg-orange-400 text-black rounded-md text-sm font-medium hover:bg-orange-500 transition"
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
