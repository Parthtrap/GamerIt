import express from "express";
import {
	addParameter,
	addTag,
	createCommunity,
	deleteCommunity,
	deleteParameter,
	deleteTag,
	getAllCommunities,
	makeModerator,
	removeModerator,
	updateCommunityBannerPic,
	updateCommunityProfilePic,
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
router.patch("/profilepic", updateCommunityProfilePic);

// Edit Community Banner Pic
router.patch("/bannerpic", updateCommunityBannerPic);

// Make User Moderator
router.post("/moderator", makeModerator);

// Remove User from Moderator
router.delete("/moderator", removeModerator);

// Pin a Post
router.post("/pin");

// Unpin a Post
router.delete("/pin");

// Get all Reported Posts
router.get("/report");

// Set Parameter
router.post("/parameter", addParameter);

// Delete Parameter
router.delete("/parameter", deleteParameter);

// Co-op MatchMaking Request
router.post("/match");

export default router;
