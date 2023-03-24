/** @format */

import express from "express";
import { addUser } from "../controllers/user.js";
const router = express.Router();

//add user
router.post("/add", addUser);

// Get User Info
// router.get("/", getUser);

// Update Profile Picture
router.patch("/profilepic");

// Update Email Address
router.patch("/email");

// Update Phone Number
router.patch("/phonenumber");

// Change Password
router.patch("/password");

// Follow Community
router.post("/followcommunity");

// Unfollow Community
router.delete("/followcommunity");

// Follow User
router.post("/followuser");

// Unfollow User
router.delete("/followuser");

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
