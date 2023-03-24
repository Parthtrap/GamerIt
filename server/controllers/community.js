import community from "../models/community.js";
const debugMode = true;

// Get All Community
export const getAllCommunities = async (req, res) => {
	let communityList;
	const { name } = req.query;
	if (!name) {
		try {
			communityList = await community.find().sort({ name: 1 });
		} catch (err) {
			debugMode ? console.log("Get All Community -> " + err.message) : "";
			res.status(500).json({ message: err.message });
			return;
		}
	} else {
		try {
			communityList = await community.findOne({ name });
		} catch (err) {
			debugMode ? console.log("Get All Community -> " + err.message) : "";
			res.status(500).json({ message: err.message });
			return;
		}
	}
	debugMode
		? console.log("Get All Communities -> Got all Communities !!")
		: "";
	res.status(200).json(communityList);
};

// Create a Community


// Delete a Community

// Add tag

// Delete tag

// Edit Community Profile Pic

// Edit Community Banner Pic

// Make User Moderator

// Remove User from Moderator

// Pin a Post

// Unpin a Post

// Get all Reported Posts

// Get community by name
