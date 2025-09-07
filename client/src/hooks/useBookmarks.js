import { useEffect, useState, useCallback } from "react";
import { getBookmarks, saveBookmark, deleteBookmark, updateNote } from "../services/backendAPI";

export default function useBookmarks() {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getBookmarks();
      setBookmarks(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const isBookmarked = (repoId) => bookmarks.some(b => b.repoId === repoId);

  const add = async (repo) => {
    const saved = await saveBookmark(repo);
    setBookmarks(prev => [saved, ...prev.filter(b => b.repoId !== saved.repoId)]);
  };

  const removeByRepoId = async (repoId) => {
    const doc = bookmarks.find(b => b.repoId === repoId);
    if (!doc) return;
    await deleteBookmark(doc._id);
    setBookmarks(prev => prev.filter(b => b._id !== doc._id));
  };

  const setNote = async (id, note) => {
    const updated = await updateNote(id, note);
    setBookmarks(prev => prev.map(b => (b._id === id ? updated : b)));
  };

  const toggle = async (repo) => {
    if (isBookmarked(repo.id)) {
      await removeByRepoId(repo.id);
    } else {
      await add(repo);
    }
  };

  return { bookmarks, loading, isBookmarked, add, removeByRepoId, toggle, setNote, reload: load };
}
