import React, { useState, useEffect } from "react";
import { getBookmarks, deleteBookmark, updateNote } from "../services/backendAPI";

export default function BookmarksDrawer({ open, onClose }) {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noteDrafts, setNoteDrafts] = useState({});

  useEffect(() => {
    if (open) fetchBookmarks();
  }, [open]);

  async function fetchBookmarks() {
    setLoading(true);
    try {
      const data = await getBookmarks();
      setBookmarks(data);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    await deleteBookmark(id);
    setBookmarks(bookmarks.filter(b => b._id !== id));
  }

  async function handleSaveNote(id) {
    const note = noteDrafts[id] || "";
    const updated = await updateNote(id, note);
    setBookmarks(bookmarks.map(b => (b._id === id ? updated : b)));
  }

  return (
    <div
      className={`fixed top-0 right-0 w-96 h-full bg-white shadow-xl transform transition-transform duration-300 ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-4 flex justify-between items-center border-b">
        <h2 className="text-lg font-bold">⭐ My Bookmarks</h2>
        <button onClick={onClose} className="text-gray-600 hover:text-black">✖</button>
      </div>

      {loading ? (
        <p className="p-4">Loading...</p>
      ) : (
        <div className="p-4 overflow-y-auto h-[calc(100%-3rem)]">
          {bookmarks.length === 0 && <p>No bookmarks yet</p>}
          {bookmarks.map((b) => (
            <div key={b._id} className="border-b pb-3 mb-3">
              <a href={b.htmlUrl} target="_blank" rel="noreferrer" className="font-semibold hover:underline">
                {b.fullName}
              </a>
              <p className="text-sm text-gray-600">{b.description}</p>
              <div className="flex gap-2 text-xs text-gray-500">
                <span>⭐ {b.stars}</span>
                {b.language && <span>{b.language}</span>}
              </div>

              {/* Notes */}
              <textarea
                className="w-full border rounded mt-2 p-2 text-sm"
                rows="2"
                placeholder="Add a note..."
                value={noteDrafts[b._id] ?? b.note ?? ""}
                onChange={(e) => setNoteDrafts({ ...noteDrafts, [b._id]: e.target.value })}
              />
              <div className="flex justify-between mt-1">
                <button
                  className="bg-blue-500 text-white text-xs px-2 py-1 rounded"
                  onClick={() => handleSaveNote(b._id)}
                >
                  Save Note
                </button>
                <button
                  className="bg-red-500 text-white text-xs px-2 py-1 rounded"
                  onClick={() => handleDelete(b._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
