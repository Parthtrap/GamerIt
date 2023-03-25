/** @format */

import mongoose from "mongoose";
import community from "../models/community.js";
import post from "../models/post.js";
import user from "../models/user.js";
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
	} else if (field == "post") {
		try {
			postList = await post
				.find({ title: { $regex: "/.*" + value + ".*/" } })
				.sort({ createdAt: 1 });
		} catch (err) {
			debugMode ? console.log("Get All Posts -> " + err.message) : "";
			res.status(500).json({ message: err.message });
			return;
		}
	} else if (field == "community") {
		try {
			postList = await community
				.find({ name: { $regex: "/.*" + value + ".*/" } })
				.sort({ createdAt: 1 });
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
export const likePost = async (req, res) => {
	const { username, postId } = req.body;
	let found;
	try {
		found = await post.findOne({
			_id: new mongoose.Types.ObjectId(postId),
		});
		if (!found) {
			debugMode ? console.log("Like Post -> Post Not Found !!") : "";
			res.status(400).json({ message: "Post Not Found !!" });
			return;
		}
		if (found.likeUsers.includes(username)) {
			debugMode ? console.log("Like Post -> Like Post Sucessfully") : "";
			res.status(200).json({ message: "Like Post Sucessfully" });
			return;
		}
		found = await post.updateOne(
			{ _id: new mongoose.Types.ObjectId(postId) },
			{ $push: { likeUsers: username } }
		);
	} catch (err) {
		debugMode ? console.log("Like Post -> " + err.message) : "";
		res.status(500).json({ message: err.message });
		return;
	}

	debugMode ? console.log("Like Post -> Successfully Liked the Post") : "";
	res.status(200).json({ message: "Successfully Liked the Post" });
	return;
};

// Unlike a Post
export const unlikePost = async (req, res) => {
	const { username, postId } = req.body;
	let found;
	try {
		found = await post.findOne({
			_id: new mongoose.Types.ObjectId(postId),
		});
		if (!found) {
			debugMode ? console.log("Unlike Post -> Post Not Found !!") : "";
			res.status(400).json({ message: "Post Not Found !!" });
			return;
		}
		if (!found.likeUsers.includes(username)) {
			debugMode
				? console.log("Unlike Post -> Unlike Post Sucessfully")
				: "";
			res.status(200).json({ message: "Unlike Post Sucessfully" });
			return;
		}
		found = await post.updateOne(
			{ _id: new mongoose.Types.ObjectId(postId) },
			{ $pull: { likeUsers: username } }
		);
	} catch (err) {
		debugMode ? console.log("Unlike Post -> " + err.message) : "";
		res.status(500).json({ message: err.message });
		return;
	}

	debugMode
		? console.log("Unlike Post -> Successfully Unliked the Post")
		: "";
	res.status(200).json({ message: "Successfully Unliked the Post" });
	return;
};

// Report a Post
export const reportPost = async (req, res) => {
	const { postId, username, reason } = req.body;
	if (!postId || !username || !reason) {
		debugMode ? console.log("Incomplete Request !!") : "";
		res.status(400).json({ message: "Incomplete Request !!" });
		return;
	}
	let found, temp;
	try {
		found = await user.findOne({ username });
		if (!found) {
			debugMode ? console.log("Report Post -> No Such user Exists") : "";
			res.status(400).json({ message: "No Such user Exists" });
			return;
		}
		found = await post.updateOne(
			{
				_id: new mongoose.Types.ObjectId(postId),
			},
			{
				$push: {
					reports: {
						userId: username,
						reason,
						createdAt: Date.now(),
					},
				},
			}
		);
	} catch (err) {
		debugMode ? console.log("Report Post -> " + err.message) : "";
		res.status(500).json({ message: err.message });
		return;
	}
	console.log(found);
	debugMode ? console.log("Report Post -> Post Reported Sucessfully") : "";
	res.status(200).json({ message: "Post Reported Sucessfully" });
	return;
};

// Search a Post by Title

// Search a Post by Tag

// Search a Post by User
