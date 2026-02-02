import { useMemo, useState } from "react";
import { initialComments, type Comment } from "../data/Comment-data";
import CommentItem from "./CommentItem";

const STORAGE_KEY = "portfolio-comments";

const Comments = () => {
  /* ----------------------------------
     State (safe init, no useEffect)
  ----------------------------------- */
  const [comments, setComments] = useState<Comment[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialComments));
    return initialComments;
  });

  const approvedComments = useMemo(
    () =>
      comments
        .filter((c) => c.approved)
        .sort((a, b) => b.date.localeCompare(a.date)),
    [comments]
  );

  return (
    <section
      id="testimonials"
      className="py-28 max-w-5xl mx-auto px-6"
    >
      {/* SECTION HEADER */}
      <div className="mb-16">
        <h2 className="text-4xl font-bold text-gray-900">
          Testimonials
        </h2>
        <p className="mt-3 max-w-xl text-gray-500">
          Feedback and recommendations from professors, managers,
          and collaborators I’ve worked with.
        </p>
      </div>

      {/* TIMELINE */}
      <div className="relative space-y-16 border-l border-gray-200 pl-10">
        {approvedComments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </section>
  );
};

export default Comments;
