/** @format */

import mongoose from "mongoose";
import community from "../models/community.js";
import post from "../models/post.js";
const debugMode = true;

// Create a Post
export const createPost = async (req, res) => {
	const { username, title, content, imgSrc, community, tags } = req.body;
	if (!username || !title || !content || !imgSrc || !community || !tags) {
		debugMode ? console.log("Incomplete Request !!") : "";
		res.status(400).json({ message: "Incomplete Request !!" });
		return;
	}
	const newPost = new post({
		username,
		title,
		content,
		imgSrc,
		likeUsers: [],
		community: community,
		tags,
		comments: [],
		reports: [],
		createdAt: Date.now(),
	});

	try {
		await newPost.save();
	} catch (err) {
		debugMode ? console.log("Creating Post -> " + err.message) : "";
		res.status(500).json({ message: err.message });
		return;
	}

	debugMode
		? console.log("Creating Post -> Post Created Successsfully !!")
		: "";
	res.status(201).json({ message: "Post Created Successsfully !!" });
};

// Delete a Post
export const deletePost = async (req, res) => {
	const { username, postId } = req.body;
	if (!username || !postId) {
		debugMode ? console.log("Incomplete Request !!") : "";
		res.status(400).json({ message: "Incomplete Request !!" });
		return;
	}
	let found, foundComm;
	try {
		found = await post.findOne({
			_id: new mongoose.Types.ObjectId(postId),
		});
		let comm = found.community;
		foundComm = await community.findOne({ name: comm });
		if (
			!foundComm.moderators.includes(username) &&
			found.username != username
		) {
			debugMode
				? console.log(
						"Delete Post -> You are Not a Moderator, Neither is this Post Yours. You cant Delete It."
				  )
				: "";
			res.status(500).json({
				message:
					"You are Not a Moderator, Neither is this Post Yours. You cant Delete It.",
			});
			return;
		}
		found = await post.deleteOne({
			_id: new mongoose.Types.ObjectId(postId),
		});
	} catch (err) {
		debugMode ? console.log("Delete Post -> " + err.message) : "";
		res.status(500).json({ message: err.message });
		return;
	}
	debugMode ? console.log("Delete Post -> Post Deleted Sucessfully") : "";
	res.status(200).json({ message: "Post Deleted Sucessfully" });
	return;
};

// Comment on a Post

// Delete Comment

// Like a Comment

// Unlike a Comment

// Like a Post

// Unlike a Post

// Report a Post

// Unreport a Post

// Search a Post by Title

// Search a Post by Tag

// Search a Post by User
