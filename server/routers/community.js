import express from "express";
const router = express.Router();

// Get All Community or by name
router.get("/");

// Create a Community
router.post("/");

// Delete a Community
router.delete("/");

// Add tag
router.get("/tag");

// Delete tag
router.delete("/tag");

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
