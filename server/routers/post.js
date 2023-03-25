import express from "express";
import { createPost, deletePost, updateComment } from "../controllers/post.js";
const router = express.Router();

// Create a Post
router.post("/", createPost);

// Delete a Post
router.delete("/", deletePost);

// Update Comments
router.post("/comment", updateComment);

// Like a Post
router.post("/like");

// Unlike a Post
router.post("/unlike");

// Report a Post
router.post("/report");

// Unreport a Post
router.delete("/report");

// Search a Post by Title
// Search a Post by User
// Search a Post by Tag
router.get("/");

export default router;
