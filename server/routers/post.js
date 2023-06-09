import express from "express";
import {
	createPost,
	deletePost,
	getCommunityPosts,
	getPostById,
	getPosts,
	likePost,
	reportPost,
	unlikePost,
	updateComment,
} from "../controllers/post.js";
const router = express.Router();

// Create a Post
router.post("/", createPost);

// Delete a Post
router.delete("/", deletePost);

// Update Comments
router.post("/comment", updateComment);

// Like a Post
router.post("/like", likePost);

// Unlike a Post
router.delete("/like", unlikePost);

// Report a Post
router.post("/report", reportPost);

// Community Posts
router.get("/community", getCommunityPosts);

// Search a Post by Title
// Search a Post by User
// Search a Post by Tag
router.get("/", getPosts);

// Get Post by ID
router.get("/id", getPostById);

export default router;
