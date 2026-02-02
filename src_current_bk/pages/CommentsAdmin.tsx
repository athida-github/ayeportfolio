import { useState } from "react";
import CommentItem from "../components/CommentItem";

interface Comment {
  id: number;
  name: string;
  message: string;
  date: string;
  approved: boolean;
}

const CommentsAdmin = () => {
  // ✅ Lazy initialization (NO useEffect)
  const [comments, setComments] = useState<Comment[]>(() => {
    const stored = localStorage.getItem("comments");
    return stored ? JSON.parse(stored) : [];
  });

  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  // Toggle checkbox
  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );
  };

  // Approve single comment
  const approveComment = (id: number) => {
    const updated = comments.map((c) =>
      c.id === id ? { ...c, approved: true } : c
    );

    setComments(updated);
    localStorage.setItem("comments", JSON.stringify(updated));
  };

  // Bulk delete
  const bulkDelete = () => {
    const updated = comments.filter(
      (c) => !selectedIds.includes(c.id)
    );

    setComments(updated);
    setSelectedIds([]);
    localStorage.setItem("comments", JSON.stringify(updated));
  };

  return (
    <section className="max-w-5xl mx-auto px-4 py-16">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900">
          Comments Admin
        </h2>

        {selectedIds.length > 0 && (
          <button
            onClick={bulkDelete}
            className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm hover:bg-red-600 transition"
          >
            Delete Selected ({selectedIds.length})
          </button>
        )}
      </div>

      {comments.length === 0 ? (
        <p className="text-gray-500 text-sm">
          No comments found.
        </p>
      ) : (
        <div className="space-y-10">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="relative bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
            >
              {/* Checkbox */}
              <input
                type="checkbox"
                checked={selectedIds.includes(comment.id)}
                onChange={() => toggleSelect(comment.id)}
                className="absolute top-4 right-4 w-4 h-4 accent-indigo-600"
              />

              <CommentItem comment={comment} />

              {!comment.approved && (
                <button
                  onClick={() => approveComment(comment.id)}
                  className="mt-4 text-sm text-indigo-600 hover:underline"
                >
                  Approve
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default CommentsAdmin;
