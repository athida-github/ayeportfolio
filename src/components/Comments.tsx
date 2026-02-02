import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { initialComments, type Comment } from "../data/Comment-data";

const STORAGE_KEY = "portfolio-comments";
const COMMENTS_PER_PAGE = 3;

const Comments = () => {
  /* ----------------------------------
     STATE
  ----------------------------------- */
  const [comments, setComments] = useState<Comment[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialComments));
    return initialComments;
  });

  const [currentPage, setCurrentPage] = useState(1);

  /* ----------------------------------
     STORAGE SYNC
  ----------------------------------- */
  useEffect(() => {
    const onStorageChange = () => {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setComments(JSON.parse(stored));
    };

    window.addEventListener("storage", onStorageChange);
    return () => window.removeEventListener("storage", onStorageChange);
  }, []);

  /* ----------------------------------
     APPROVED + SORTED
  ----------------------------------- */
  const approvedComments = useMemo(
    () =>
      comments
        .filter((c) => c.approved)
        .sort((a, b) => b.date.localeCompare(a.date)),
    [comments]
  );

  const total = approvedComments.length;
  const totalPages = Math.ceil(total / COMMENTS_PER_PAGE);

  const paginatedComments = useMemo(() => {
    const start = (currentPage - 1) * COMMENTS_PER_PAGE;
    return approvedComments.slice(start, start + COMMENTS_PER_PAGE);
  }, [approvedComments, currentPage]);

  /* ----------------------------------
     FORM STATE
  ----------------------------------- */
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");

  /* ----------------------------------
     SUBMIT REQUEST
  ----------------------------------- */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newComment: Comment = {
      id: Date.now(),
      name,
      role,
      message,
      approved: false,
      date: new Date().toISOString().split("T")[0],
    };

    const updated = [...comments, newComment];
    setComments(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    setName("");
    setRole("");
    setMessage("");
    setShowForm(false);

    alert("Thank you. Your recommendation is pending review.");
  };

  return (
    <section id="comments" className="relative py-28 px-6">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-14 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-100">
              What People Say
            </h2>
            {/* Animated underline */}
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "200px" }}
              transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
              className="mt-4 h-[2px] bg-orange-400"
            />
            <p className="mt-2 text-slate-400 max-w-xl">
              Professional feedback from colleagues, supervisors, and collaborators.
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowForm(true)}
            className="
              px-4 py-2 rounded-md text-sm font-medium
              border border-slate-200 text-slate-300 bg-slate-900/50
              hover:border-slate-500 hover:text-slate-100
            "
          >
            Request Recommendation
          </motion.button>
        </div>

        {/* META */}
        {total > 0 && (
          <p className="mb-10 text-sm text-slate-500">
            Showing{" "}
            <span className="font-medium text-slate-300">
              {paginatedComments.length}
            </span>{" "}
            of{" "}
            <span className="font-medium text-slate-300">
              {total}
            </span>{" "}
            recommendations
          </p>
        )}

        {/* COMMENTS (ANIMATED PAGE SWITCH) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="space-y-8"
          >
            {total === 0 && (
              <p className="text-slate-500">
                No approved recommendations yet.
              </p>
            )}

            {paginatedComments.map((comment, index) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
                className="
                  relative overflow-hidden rounded-xl
                  border border-slate-800
                  bg-slate-900/60 backdrop-blur
                  px-6 py-6
                "
              >
                {/* Accent */}
                <div className="absolute left-0 top-0 h-full w-1 bg-slate-600/40" />

                <p className="text-slate-300 leading-relaxed text-[15px]">
                  “{comment.message}”
                </p>

                <div className="mt-5 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-100">
                      {comment.name}
                    </p>
                    <p className="text-sm text-slate-400">
                      {comment.role}
                    </p>
                  </div>

                  <p className="text-xs text-slate-500">
                    {new Date(comment.date).toLocaleDateString()}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* PAGINATION (PROJECT-LIKE ANIMATION) */}
        {totalPages > 1 && (
          <div className="mt-14 flex items-center justify-between">
            <motion.button
              whileHover={{ x: -2 }}
              whileTap={{ scale: 0.95 }}
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="
                px-4 py-2 text-sm rounded-md
                border border-slate-700 text-slate-300
                disabled:opacity-40 disabled:cursor-not-allowed
              "
            >
              Previous
            </motion.button>

            <motion.span
              key={currentPage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-slate-500"
            >
              Page {currentPage} of {totalPages}
            </motion.span>

            <motion.button
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.95 }}
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="
                px-4 py-2 text-sm rounded-md
                border border-slate-700 text-slate-300
                disabled:opacity-40 disabled:cursor-not-allowed
              "
            >
              Next
            </motion.button>
          </div>
        )}
      </div>

      {/* MODAL */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-xl"
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
                className="w-full rounded-md px-3 py-2 bg-slate-950 border border-slate-700 text-slate-200"
              />

              <input
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Your Role / Organization"
                className="w-full rounded-md px-3 py-2 bg-slate-950 border border-slate-700 text-slate-200"
              />

              <textarea
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your message"
                rows={4}
                className="w-full rounded-md px-3 py-2 bg-slate-950 border border-slate-700 text-slate-200"
              />

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="text-sm text-slate-400 hover:text-slate-200"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 text-sm rounded-md bg-slate-100 text-slate-900 hover:bg-white"
                >
                  Submit
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
