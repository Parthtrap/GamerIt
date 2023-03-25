// Extracting mongoose module
import mongoose from "mongoose";

// Schema of Tag
const tagSchema = new mongoose.Schema({
	name: String,
	color: String,
});

// Schema of Parameter
const parameterSchema = new mongoose.Schema({
	name: String,
	type: String,
	offset: Number,
	value: [String],
	same: Boolean,
});

// Schema of Queue
const queueSchema = new mongoose.Schema({
	username: { type: String, required: true },
	parameters: { type: Object },
});

// Schema for Community
const communitySchema = new mongoose.Schema({
	name: { type: String, required: true, unique: true },
	profilePic: String,
	bannerPic: String,
	followerCount: Number,
	moderators: [String],
	pinnedPosts: [String],
	parameters: [parameterSchema],
	queue: [queueSchema],
	tags: [tagSchema],
	createdAt: Date,
});

// Exporting Community model
export default mongoose.model("Community", communitySchema);
