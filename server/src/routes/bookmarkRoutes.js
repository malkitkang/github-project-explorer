import { Router } from "express";
import { getBookmarks, createBookmark, deleteBookmark, updateNote } from "../controllers/bookmarkController.js";

const router = Router();

router.get("/", getBookmarks);
router.post("/", createBookmark);
router.delete("/:id", deleteBookmark);
router.patch("/:id/note", updateNote);

export default router;
