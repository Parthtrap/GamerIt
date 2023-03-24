import community from "../models/community.js";
import User from "./../models/user.js";
const debugMode = true;

// Get All Community or by Name
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
export const createCommunity = async (req, res) => {
	// console.log(req);
	const { name } = req.body;
	const newCommunity = new community({
		name,
		profilePic: "",
		bannerPic: "",
		followerCount: 0,
		moderators: [],
		pinnedPosts: [],
		tags: [],
		createdAt: Date.now(),
	});

	try {
		let found = await community.findOne({ name });
		if (found) {
			debugMode
				? console.log("Make Community -> Community Already Exists")
				: "";
			res.status(404).json({ message: "Community Already Exists" });
			return;
		}
		await newCommunity.save();
	} catch (err) {
		debugMode ? console.log("Creating Community -> " + err.message) : "";
		res.status(500).json({ message: err.message });
		return;
	}

	debugMode
		? console.log(
				"Creating Community -> Community Created Successsfully !!"
		  )
		: "";
	res.status(201).json({ message: "Community Created Successsfully !!" });
};

// Delete a Community
export const deleteCommunity = async (req, res) => {
	const { name } = req.body;

	try {
		let found = await community.findOne({ name });
		if (!found) {
			debugMode
				? console.log("Delete Community -> Community Doesn't Exist")
				: "";
			res.status(404).json({ message: "Community Doesn't Exist" });
			return;
		}
		await community.find({ name }).deleteOne();
	} catch (err) {
		debugMode ? console.log("Delete Community -> " + err.message) : "";
		res.status(500).json({ message: err.message });
		return;
	}

	debugMode
		? console.log("Delete Community -> Community Deleted Successsfully !!")
		: "";
	res.status(201).json({ message: "Community Deleted Successsfully !!" });
};

// Add tag
export const addTag = async (req, res) => {
	const { communityname, name, color } = req.body;
	let found;
	try {
		found = await community.findOne({ name: communityname });
		if (!found) {
			debugMode ? console.log("Add Tag -> Community Doesn't Exist") : "";
			res.status(404).json({ message: "Community Doesn't Exist" });
			return;
		}
		let obj = found.tags.find((o) => o.name === name);
		if (obj) {
			debugMode ? console.log("Add tag -> Tag Already Exists") : "";
			res.status(400).json({ message: "Tag Already Exists" });
			return;
		}
		found = await community.updateOne(
			{ name: communityname },
			{ $push: { tags: { name, color } } }
		);
	} catch (err) {
		debugMode ? console.log("Add Tag -> " + err.message) : "";
		res.status(500).json({ message: err.message });
		return;
	}

	if (found.matchedCount == 0) {
		debugMode ? console.log("Add Tag -> No Community Exist") : "";
		res.status(404).json({ message: "Community Not Found !!" });
		return;
	} else if (found.modifiedCount == 0) {
		debugMode ? console.log("Add Tag -> No Community was Updated") : "";
		res.status(400).json({ message: "No Community was Updated" });
		return;
	}
	debugMode ? console.log("Add Tag -> Tag Added Sucessfully!!") : "";
	res.status(201).json({
		message: "Tag Added Sucessfully!!",
	});
};

// Delete tag
export const deleteTag = async (req, res) => {
	const { communityname, name } = req.body;
	let found;
	try {
		found = await community.findOne({ name: communityname });
		if (!found) {
			debugMode
				? console.log("Delete Tag -> Community Doesn't Exist")
				: "";
			res.status(404).json({ message: "Community Doesn't Exist" });
			return;
		}
		let obj = found.tags.find((o) => o.name === name);
		if (!obj) {
			debugMode ? console.log("Delete tag -> Tag Doesnt Exists") : "";
			res.status(400).json({ message: "Tag Doesnt Exists" });
			return;
		}
		found = await community.updateOne(
			{ name: communityname },
			{ $pull: { tags: { name } } }
		);
	} catch (err) {
		debugMode ? console.log("Delete Tag -> " + err.message) : "";
		res.status(500).json({ message: err.message });
		return;
	}

	if (found.matchedCount == 0) {
		debugMode ? console.log("Delete Tag -> No Community Exist") : "";
		res.status(404).json({ message: "Community Not Found !!" });
		return;
	} else if (found.modifiedCount == 0) {
		debugMode ? console.log("Delete Tag -> No Community was Updated") : "";
		res.status(400).json({ message: "No Community was Updated" });
		return;
	}
	debugMode ? console.log("Delete Tag -> Tag Deleted Sucessfully!!") : "";
	res.status(201).json({
		message: "Tag Deleted Sucessfully!!",
	});
};

// Edit Community Profile Pic
export const updateCommunityProfilePic = async (req, res) => {
	const { name, profilepic } = req.body;
	if (!name || !profilepic) {
		debugMode ? console.log("Incomplete Request !!") : "";
		res.status(400).json({ message: "Incomplete Request !!" });
		return;
	}

	let foundcommunity;
	try {
		foundcommunity = await community.updateOne(
			{ name: name },
			{ profilePic: profilepic }
		);
	} catch (err) {
		debugMode
			? console.log("Update Community Profile Pic -> " + err.message)
			: "";
		res.status(500).json({ message: err.message });
		return;
	}
	if (foundcommunity.matchedCount == 0) {
		debugMode
			? console.log(
					"Update Community Profile Pic -> No Community with given name exists"
			  )
			: "";
		res.status(404).json({ message: "Community Not Found !!" });
	} else if (foundcommunity.modifiedCount == 0) {
		debugMode
			? console.log(
					"Update Community Profile Pic -> No Community was Updated"
			  )
			: "";
		res.status(400).json({ message: "No Community was Updated" });
		return;
	}

	debugMode
		? console.log(
				"Update Community Profile Pic -> Community Profile Pic Updated !!"
		  )
		: "";
	res.status(201).json({
		message: "Community Profile Pic Updated Sucessfully !!",
	});
};

// Edit Community Banner Pic
export const updateCommunityBannerPic = async (req, res) => {
	const { name, bannerpic } = req.body;
	if (!name || !bannerpic) {
		debugMode ? console.log("Incomplete Request !!") : "";
		res.status(400).json({ message: "Incomplete Request !!" });
		return;
	}

	let foundcommunity;
	try {
		foundcommunity = await community.updateOne(
			{ name: name },
			{ bannerPic: bannerpic }
		);
	} catch (err) {
		debugMode
			? console.log("Update Banner Profile Pic -> " + err.message)
			: "";
		res.status(500).json({ message: err.message });
		return;
	}
	if (foundcommunity.matchedCount == 0) {
		debugMode
			? console.log(
					"Update Community Banner Pic -> No Community with given name exists"
			  )
			: "";
		res.status(404).json({ message: "Community Not Found !!" });
	} else if (foundcommunity.modifiedCount == 0) {
		debugMode
			? console.log(
					"Update Community Banner Pic -> No Community was Updated"
			  )
			: "";
		res.status(400).json({ message: "No Community was Updated" });
		return;
	}

	debugMode
		? console.log(
				"Update Community Banner Pic -> Community Banner Pic Updated !!"
		  )
		: "";
	res.status(201).json({
		message: "Community Banner Pic Updated Sucessfully !!",
	});
};

// Make User Moderator
export const makeModerator = async (req, res) => {
	const { name, username } = req.body;
	let found, founduser;
	try {
		founduser = await User.findOne({ username });
		if (!founduser) {
			debugMode
				? console.log("Make Moderator -> User Doesn't Exist")
				: "";
			res.status(404).json({ message: "User Doesn't Exist" });
			return;
		}

		found = await community.findOne({ name });
		if (!found) {
			debugMode
				? console.log("Make Moderator -> Community Doesn't Exist")
				: "";
			res.status(404).json({ message: "Community Doesn't Exist" });
			return;
		}
		let obj = found.moderators.includes(username);
		if (obj) {
			debugMode
				? console.log("Make Moderator -> User is Already Moderator")
				: "";
			res.status(400).json({ message: "User is Already Moderator" });
			return;
		}
		found = await community.updateOne(
			{ name },
			{ $push: { moderators: username } }
		);
	} catch (err) {
		debugMode ? console.log("Make Moderator -> " + err.message) : "";
		res.status(500).json({ message: err.message });
		return;
	}

	if (found.matchedCount == 0) {
		debugMode ? console.log("Make Moderator -> No Community Exist") : "";
		res.status(404).json({ message: "Community Not Found !!" });
		return;
	} else if (found.modifiedCount == 0) {
		debugMode
			? console.log("Make Moderator -> No Community was Updated")
			: "";
		res.status(400).json({ message: "No Community was Updated" });
		return;
	}
	debugMode
		? console.log("Make Moderator -> Moderator Made Sucessfully!!")
		: "";
	res.status(201).json({
		message: "Moderator Made Sucessfully!!",
	});
};

// Remove User from Moderator
export const removeModerator = async (req, res) => {
	const { name, username } = req.body;
	let found;
	try {
		found = await community.findOne({ name });
		if (!found) {
			debugMode
				? console.log("Remove Moderator -> Community Doesn't Exist")
				: "";
			res.status(404).json({ message: "Community Doesn't Exist" });
			return;
		}
		let obj = found.moderators.includes(username);
		if (!obj) {
			debugMode
				? console.log(
						"Remove Moderator -> User is Already Not a Moderator"
				  )
				: "";
			res.status(400).json({
				message: "User is Already Not a Moderator",
			});
			return;
		}
		found = await community.updateOne(
			{ name },
			{ $pull: { moderators: username } }
		);
	} catch (err) {
		debugMode ? console.log("Remove Moderator -> " + err.message) : "";
		res.status(500).json({ message: err.message });
		return;
	}

	if (found.matchedCount == 0) {
		debugMode ? console.log("Remove Moderator -> No Community Exist") : "";
		res.status(404).json({ message: "Community Not Found !!" });
		return;
	} else if (found.modifiedCount == 0) {
		debugMode
			? console.log("Remove Moderator -> No Community was Updated")
			: "";
		res.status(400).json({ message: "No Community was Updated" });
		return;
	}
	debugMode
		? console.log("Remove Moderator -> Moderator Removed Sucessfully!!")
		: "";
	res.status(201).json({
		message: "Moderator Removed Sucessfully!!",
	});
};

// Pin a Post

// Unpin a Post

// Get all Reported Posts
