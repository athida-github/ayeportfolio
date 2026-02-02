import { useEffect, useMemo, useRef, useState } from "react";
import { initialComments, type Comment } from "../data/Comment-data";

const STORAGE_KEY = "portfolio-comments";
const AUTH_KEY = "comments-admin-auth";
const ADMIN_PASSWORD = "aye@admin"; // 🔐 CHANGE THIS

type FilterType = "all" | "approved" | "pending";

const CommentsAdmin = () => {
  /* ---------------- AUTH ---------------- */
  const [isAuthed, setIsAuthed] = useState(
    localStorage.getItem(AUTH_KEY) === "true"
  );
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem(AUTH_KEY, "true");
      setIsAuthed(true);
      setPassword("");
      setError("");
    } else {
      setError("Incorrect password");
    }
  };

  const logout = () => {
    localStorage.removeItem(AUTH_KEY);
    setIsAuthed(false);
  };

  /* ---------------- DATA ---------------- */
  const [comments, setComments] = useState<Comment[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialComments));
    return initialComments;
  });

  const [filter, setFilter] = useState<FilterType>("all");
  const [filterList] = useState<FilterType[]>([
    "all",
    "approved",
    "pending",
  ]);

  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sync = (updated: Comment[]) => {
    setComments(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const visibleComments = useMemo(() => {
    if (filter === "approved") return comments.filter((c) => c.approved);
    if (filter === "pending") return comments.filter((c) => !c.approved);
    return comments;
  }, [comments, filter]);

  useEffect(() => {
    setSelectedIds(new Set());
  }, [filter]);

  /* ---------------- ACTIONS ---------------- */
  const approveComment = (id: number) => {
    sync(comments.map((c) => (c.id === id ? { ...c, approved: true } : c)));
  };

  const deleteComment = (id: number) => {
    if (!window.confirm("Delete this comment?")) return;
    sync(comments.filter((c) => c.id !== id));
  };

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const selectAllVisible = () => {
    setSelectedIds(new Set(visibleComments.map((c) => c.id)));
  };

  const clearSelection = () => setSelectedIds(new Set());

  const bulkDelete = () => {
    if (selectedIds.size === 0) return;
    if (!window.confirm(`Delete ${selectedIds.size} comments?`)) return;
    sync(comments.filter((c) => !selectedIds.has(c.id)));
    clearSelection();
  };

  const exportCommentsAsJSON = () => {
    const blob = new Blob([JSON.stringify(comments, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "portfolio-comments.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  const importCommentsFromFile = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      if (!Array.isArray(parsed)) throw new Error();
      sync(parsed);
      alert("Comments imported successfully.");
    } catch {
      alert("Invalid JSON file.");
    } finally {
      e.target.value = "";
    }
  };

  /* ---------------- LOGIN SCREEN ---------------- */
  if (!isAuthed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm bg-slate-900 p-6 rounded-xl border border-slate-800"
        >
          <h1 className="text-xl font-semibold text-slate-100 mb-4">
            Admin Access
          </h1>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            className="w-full px-4 py-2 rounded-md bg-transparent
                       border border-slate-700 text-slate-100
                       focus:outline-none focus:border-orange-400"
          />

          {error && (
            <p className="text-red-400 text-sm mt-2">{error}</p>
          )}

          <button
            type="submit"
            className="mt-4 w-full py-2 rounded-md
                       bg-orange-400 text-black font-medium
                       hover:bg-orange-300 transition"
          >
            Unlock
          </button>
        </form>
      </div>
    );
  }

  /* ---------------- ADMIN UI ---------------- */
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      {/* HEADER */}
      <div className="mb-10 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-slate-100">
            Comments Administration
          </h1>
          <p className="text-slate-500 mt-2">
            Review, approve, and manage portfolio recommendations.
          </p>
        </div>

        <button
          onClick={logout}
          className="text-sm text-slate-400 hover:text-red-400 transition"
        >
          Logout
        </button>
      </div>

      {/* TOP BAR */}
      <div className="flex flex-wrap gap-6 mb-10">
        <div className="flex gap-2">
          {filterList.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition
                ${
                  filter === f
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <div className="ml-auto flex gap-3">
          <button
            onClick={exportCommentsAsJSON}
            className="px-4 py-2 rounded-md bg-slate-900 text-white text-sm"
          >
            Export
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 rounded-md bg-slate-700 text-white text-sm"
          >
            Import
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="application/json"
            onChange={importCommentsFromFile}
            className="hidden"
          />
        </div>
      </div>

      {/* BULK BAR */}
      {selectedIds.size > 0 && (
        <div className="mb-6 flex items-center gap-4 bg-slate-100 p-4 rounded-lg">
          <span className="text-sm text-slate-700">
            {selectedIds.size} selected
          </span>

          <button
            onClick={selectAllVisible}
            className="text-sm text-slate-600 hover:underline"
          >
            Select all visible
          </button>

          <button
            onClick={clearSelection}
            className="text-sm text-slate-600 hover:underline"
          >
            Clear
          </button>

          <button
            onClick={bulkDelete}
            className="ml-auto px-3 py-1 rounded-md bg-red-600 text-white text-sm"
          >
            Delete selected
          </button>
        </div>
      )}

      {/* LIST */}
      <div className="space-y-4">
        {visibleComments.map((c) => (
          <div
            key={c.id}
            className="flex gap-4 p-5 rounded-xl border border-slate-200 bg-white"
          >
            <input
              type="checkbox"
              checked={selectedIds.has(c.id)}
              onChange={() => toggleSelect(c.id)}
            />

            <div className="flex-1">
              <p className="font-medium text-slate-900">
                {c.name}
                <span className="text-slate-500 font-normal"> — {c.role}</span>
              </p>

              <p className="mt-2 text-slate-700">{c.message}</p>
              <p className="mt-2 text-xs text-slate-400">{c.date}</p>

              <div className="mt-4 flex gap-3">
                {!c.approved && (
                  <button
                    onClick={() => approveComment(c.id)}
                    className="px-3 py-1 text-sm rounded-md bg-green-600 text-white"
                  >
                    Approve
                  </button>
                )}

                <button
                  onClick={() => deleteComment(c.id)}
                  className="px-3 py-1 text-sm rounded-md bg-red-600 text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentsAdmin;
