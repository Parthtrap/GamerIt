/** @format */

import express from "express";
import {
	addUser,
	changeTheme,
	deleteNote,
	deletePlan,
	editNote,
	followCommunity,
	followUser,
	getUser,
	makeAdmin,
	makeNote,
	makePlan,
	removeAdmin,
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

// Make Note
router.post("/note", makeNote);

// Delete Note
router.delete("/note", deleteNote);

// Edit Note
router.patch("/note", editNote);

// Make Plan
router.post("/plan", makePlan);

// Delete Plan
router.delete("/plan", deletePlan);

// Change Theme
router.patch("/theme", changeTheme);

// Save a Post
router.post("/save");

// Unsave a Post
router.delete("/save");

// Make Admin
router.post("/admin", makeAdmin);

// Remove Admin
router.delete("/admin", removeAdmin);

export default router;
