import Bookmark from "../models/Bookmark.js";

export const getBookmarks = async (req, res) => {
  const items = await Bookmark.find().sort({ createdAt: -1 });
  res.json(items);
};

export const createBookmark = async (req, res) => {
  const {
    repoId, fullName, name, ownerLogin, htmlUrl,
    description, stars, language, topics = []
  } = req.body;

  if (!repoId || !fullName || !name || !ownerLogin || !htmlUrl) {
    return res.status(400).json({ message: "Missing required repo fields" });
  }

  // Upsert so duplicates don’t crash
  const doc = await Bookmark.findOneAndUpdate(
    { repoId },
    { repoId, fullName, name, ownerLogin, htmlUrl, description, stars, language, topics },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );

  res.status(201).json(doc);
};

export const deleteBookmark = async (req, res) => {
  const { id } = req.params; // Mongo _id
  const deleted = await Bookmark.findByIdAndDelete(id);
  if (!deleted) return res.status(404).json({ message: "Not found" });
  res.json({ ok: true });
};

export const updateNote = async (req, res) => {
  const { id } = req.params;
  const { note = "" } = req.body;
  const updated = await Bookmark.findByIdAndUpdate(id, { note }, { new: true });
  if (!updated) return res.status(404).json({ message: "Not found" });
  res.json(updated);
};
