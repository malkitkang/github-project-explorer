import mongoose from "mongoose";

const BookmarkSchema = new mongoose.Schema(
  {
    repoId: { type: Number, required: true, unique: true }, // GitHub repo id
    fullName: { type: String, required: true },             // e.g. "facebook/react"
    name: { type: String, required: true },                 // e.g. "react"
    ownerLogin: { type: String, required: true },           // e.g. "facebook"
    htmlUrl: { type: String, required: true },              // repo URL
    description: { type: String },
    stars: { type: Number, default: 0 },
    language: { type: String },
    topics: [{ type: String }],
    note: { type: String, default: "" }                     // your personal note
  },
  { timestamps: true }
);

export default mongoose.model("Bookmark", BookmarkSchema);
