import React, { useState } from "react";
import useBookmarks from "../hooks/useBookmarks";
import RepoDetailsModal from "./RepoDetailsModal";

export default function RepoCard({ repo }) {
  const { isBookmarked, toggle } = useBookmarks();
  const bookmarked = isBookmarked(repo.id);
  const [open, setOpen] = useState(false);

  return (
    <div className="border rounded-xl p-4 flex flex-col gap-2">
      <div className="flex justify-between items-start">
        {/* Repo Title as Button */}
        <button
          onClick={() => setOpen(true)}
          className="font-semibold hover:underline text-left"
        >
          {repo.full_name}
        </button>

        {/* Bookmark Button */}
        <button
          onClick={() => toggle(repo)}
          className={`px-3 py-1 text-sm rounded ${
            bookmarked ? "bg-yellow-300" : "bg-gray-200"
          }`}
        >
          {bookmarked ? "★" : "☆"}
        </button>
      </div>

      <p className="text-sm text-gray-700">{repo.description}</p>
      <div className="text-xs text-gray-600 flex gap-4">
        <span>⭐ {repo.stargazers_count}</span>
        {repo.language && <span>{repo.language}</span>}
        <span>Updated: {new Date(repo.updated_at).toLocaleDateString()}</span>
      </div>

      {/* Show Modal if Open */}
      {open && (
        <RepoDetailsModal repo={repo} onClose={() => setOpen(false)} />
      )}
    </div>
  );
}
