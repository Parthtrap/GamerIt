// Extracting mongoose module
import mongoose from "mongoose";

// Schema for Plans
const PlanSchema = new mongoose.Schema({
	title: String,
	time: Date,
	createdAt: Date,
});

// Schema for Sub Notes
const SubNoteSchema = new mongoose.Schema({
	text: String,
	isCheckBox: Boolean,
	isChecked: Boolean,
});

// Schema for Notes
const NoteSchema = new mongoose.Schema({
	title: String,
	content: [SubNoteSchema],
	color: String,
	createdAt: Date,
});

// Schema for Notification
const notificationSchema = new mongoose.Schema({
	title: String,
	communityName: String,
	linkedUsername: String,
	createdAt: Date,
});

// Schema for User
const userSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true, trim: true },
	password: { type: String, required: true },
	email: { type: String, required: true, unique: true, trim: true },
	phoneNumber: { type: String, unique: true, trim: true },
	isAdmin: Boolean,
	followedCommunities: [String],
	notes: [NoteSchema],
	theme: String,
	savedPosts: [String],
	profilePic: String,
	plans: [PlanSchema],
	followingUsers: [String],
	followsCount: Number,
	font: String,
	notifications: [notificationSchema],
	createdAt: Date,
});

// Exporting User model
export default mongoose.model("User", userSchema);
