import express from "express";
import {
	addTag,
	createCommunity,
	deleteCommunity,
	deleteTag,
	getAllCommunities,
} from "../controllers/community.js";
const router = express.Router();

// Get All Community or by name
router.get("/", getAllCommunities);

// Create a Community
router.post("/", createCommunity);

// Delete a Community
router.delete("/", deleteCommunity);

// Add tag
router.get("/tag", addTag);

// Delete tag
router.delete("/tag", deleteTag);

// Edit Community Profile Pic
router.patch("/profilepic");

// Edit Community Banner Pic
router.get("/bannerpic");

// Make User Moderator
router.post("/moderator");

// Remove User from Moderator
router.delete("/moderator");

// Pin a Post
router.post("/pin");

// Unpin a Post
router.delete("/pin");

// Get all Reported Posts
router.get("/report");

export default router;
