// Extracting mongoose module
import mongoose from "mongoose";

// Schema of Tag
const tagSchema = new mongoose.Schema({
	name: String,
	color: String,
});

// Schema for Community
const communitySchema = new mongoose.Schema({
	name: { type: String, required: true, unique: true },
	profilePic: String,
	bannerPic: String,
	followerCount: Number,
	moderators: [String],
	pinnedPosts: [String],
	tags: [tagSchema],
	createdAt: Date,
});

// Exporting Community model
export default mongoose.model("Community", communitySchema);
