import express from "express";
const router = express.Router();

// Create a Post
router.post("/");

// Delete a Post
router.delete("/");

// Comment on a Post
router.post("/comment");

// Delete Comment
router.delete("/comment");

// Like a Comment
router.post("/likecomment");

// Unlike a Comment
router.delete("/likecomment");

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
