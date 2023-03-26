/** @format */

// Extracting mongoose module
import mongoose from "mongoose";

// Schema for Comment
var commentSchema = new mongoose.Schema();
commentSchema.add({
	userId: { type: String, required: true },
	text: { type: String, required: true },
	likes: [String],
	isDeleted: Boolean,
	createdAt: Date,
	replies: [commentSchema],
});

// Schema for Report
const reportSchema = new mongoose.Schema({
	userId: { type: String, required: true },
	reason: { type: String, required: true },
	createdAt: Date,
});

// Schema for Tag
const tagSchema = new mongoose.Schema({
	name: String,
	color: String,
});

// Schema for Post
const postSchema = new mongoose.Schema({
	username: { type: String, required: true, trim: true },
	title: { type: String, required: true },
	content: { type: String, required: true },
	fileSrc: String,
	type: String,
	likeUsers: [String],
	community: String,
	tags: [tagSchema],
	comments: [commentSchema],
	reports: [reportSchema],
	createdAt: Date,
});

// Exporting Post model
export default mongoose.model("Post", postSchema);
