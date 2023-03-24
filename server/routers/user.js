/** @format */

import express from "express";
import {
	addUser,
	followCommunity,
	followUser,
	getUser,
	unfollowCommunity,
	unfollowUser,
	updateUserEmail,
	updateUserPassword,
	updateUserPhone,
	updateUserProfilePic,
} from "../controllers/user.js";
const router = express.Router();

//add user
router.post("/add", addUser);

// Get User Info
router.get("/", getUser);

// Update Profile Picture
router.patch("/profilepic", updateUserProfilePic);

// Update Email Address
router.patch("/email", updateUserEmail);

// Update Phone Number
router.patch("/phonenumber", updateUserPhone);

// Change Password
router.post("/resetPassword", updateUserPassword);

// Follow Community
router.post("/followcommunity", followCommunity);

// Unfollow Community
router.delete("/followcommunity", unfollowCommunity);

// Follow User
router.post("/followuser", followUser);

// Unfollow User
router.delete("/followuser", unfollowUser);

// Get Note
router.get("/note");

// Make Note
router.post("/note");

// Delete Note
router.delete("/note");

// Edit Note
router.patch("/note");

// Get Plan
router.get("/plan");

// Make Plan
router.post("/plan");

// Delete Plan
router.delete("/plan");

// Edit Plan
router.patch("/plan");

// Change Theme
router.patch("/theme");

// Change Font
router.patch("/font");

// Save a Post
router.post("/save");

// Unsave a Post
router.delete("/save");

// Make Admin
router.post("/admin");

// Remove Admin
router.delete("/admin");

export default router;
