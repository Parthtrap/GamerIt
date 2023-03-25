/** @format */

import mongoose from "mongoose";
import community from "../models/community.js";
import post from "../models/post.js";
const debugMode = true;

// Create a Post
export const createPost = async (req, res) => {
	const { username, title, content, fileSrc, type, community } = req.body;
	if (!username || !title || !content || !fileSrc || !community) {
		debugMode ? console.log("Incomplete Request !!") : "";
		res.status(400).json({ message: "Incomplete Request !!" });
		return;
	}
	const newPost = new post({
		username,
		title,
		content,
		fileSrc,
		type,
		likeUsers: [],
		community: community,
		tags: [],
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
	res.status(200).json({ message: "Post Created Successsfully !!" });
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

// Comment on a Post / Delete Comment / Like a Comment / Dislike a Comment
export const updateComment = async (req, res) => {
	const { comments, postId } = req.body;
	if (!comments || !postId) {
		debugMode ? console.log("Incomplete Request !!") : "";
		res.status(400).json({ message: "Incomplete Request !!" });
		return;
	}
	let found;
	try {
		found = await post.updateOne(
			{ _id: new mongoose.Types.ObjectId(postId) },
			{ comments: comments }
		);
	} catch (err) {
		debugMode ? console.log("Update Comment -> " + err.message) : "";
		res.status(500).json({ message: err.message });
		return;
	}
	debugMode
		? console.log("Update Comment -> Comment Updated Sucessfully")
		: "";
	res.status(200).json({ message: "Comment Updated Sucessfully" });
	return;
};

// Get all Post
export const getPosts = async (req, res) => {
	let postList;
	const { field, value } = req.query;
	if (!field && !value) {
		try {
			postList = await post.find().sort({ createdAt: 1 });
		} catch (err) {
			debugMode ? console.log("Get All Posts -> " + err.message) : "";
			res.status(500).json({ message: err.message });
			return;
		}
	} else if (title && !user && !tag) {
		try {
			postList = await post.find({});
		} catch (err) {
			debugMode ? console.log("Get All Posts -> " + err.message) : "";
			res.status(500).json({ message: err.message });
			return;
		}
	}
	debugMode ? console.log("Get All Posts -> Got all Posts !!") : "";
	res.status(200).json(postList);
};

// Like a Post
export const likePost = async (req, res) => {};

// Unlike a Post

// Report a Post

// Unreport a Post

// Search a Post by Title

// Search a Post by Tag

// Search a Post by User
