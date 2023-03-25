/** @format */

import community from "../models/community.js";
import User from "./../models/user.js";
import { checkLoginToken } from "./functions.js";
const debugMode = true;

// Get All Community or by Name
export const getAllCommunities = async (req, res) => {
	// 	//login token check part
	// 	let cookieCheckObj;
	// 	try{
	// 		cookieCheckObj = await checkLoginToken(req,res);

	// 	}catch(err){
	// 		console.log(err);
	// 		res.status(500).json({error : err.message});
	// 		return;
	// 	}
	//   if (!cookieCheckObj.isValid) {
	//     res.status(401).json({
	//       error: "Session expired",
	//     });
	//     return;
	//   }
	//   const loginTokenUsername = cookieCheckObj.userData.userName;

	//   console.log(loginTokenUsername);

	//   //original function

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

export const searchCommunity = async (req, res) => {
	let communityList;
	const { name } = req.query;

	try {
		communityList = await community.find({
			name: { $regex: ".*" + name + ".*" },
		});
	} catch (err) {
		debugMode ? console.log("Search Community -> " + err.message) : "";
		res.status(500).json({ message: err.message });
		return;
	}
	debugMode ? console.log("Search Communities -> Search Communities !!") : "";
	res.status(200).json(communityList);
};

// Create a Community
export const createCommunity = async (req, res) => {
	// console.log(req);
	const { name } = req.body;
	if (!name) {
		debugMode ? console.log("Incomplete Request !!") : "";
		res.status(400).json({ message: "Incomplete Request !!" });
		return;
	}
	const newCommunity = new community({
		name,
		profilePic: "",
		bannerPic: "",
		followerCount: 0,
		moderators: [],
		pinnedPosts: [],
		parameters: [],
		queue: [],
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
		console.log("Debug");
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
	if (!name) {
		debugMode ? console.log("Incomplete Request !!") : "";
		res.status(400).json({ message: "Incomplete Request !!" });
		return;
	}
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
	if (!communityname || !name || !color) {
		debugMode ? console.log("Incomplete Request !!") : "";
		res.status(400).json({ message: "Incomplete Request !!" });
		return;
	}
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
	if (!communityname || !name) {
		debugMode ? console.log("Incomplete Request !!") : "";
		res.status(400).json({ message: "Incomplete Request !!" });
		return;
	}
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
	if (!name || !username) {
		debugMode ? console.log("Incomplete Request !!") : "";
		res.status(400).json({ message: "Incomplete Request !!" });
		return;
	}
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
	if (!name || !username) {
		debugMode ? console.log("Incomplete Request !!") : "";
		res.status(400).json({ message: "Incomplete Request !!" });
		return;
	}
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

// Set Parameter
export const addParameter = async (req, res) => {
	const { communityName, name, type, offset, value, same } = req.body;
	console.log({ communityName, name, type, offset, value, same });
	if (
		!communityName ||
		!name ||
		!type ||
		offset == null ||
		!value ||
		same == null
	) {
		debugMode ? console.log("Incomplete Request !!") : "";
		res.status(400).json({ message: "Incomplete Request !!" });
		return;
	}
	let found;
	try {
		found = await community.findOne({ name: communityName });
		if (!found) {
			debugMode
				? console.log("Add Parameter -> No Such Community Exists")
				: "";
			res.status(404).json({ message: "No Such Community Exists" });
			return;
		}
		let obj = found.parameters.find((o) => o.name == name);
		if (obj) {
			debugMode
				? console.log("Add Parameter -> Parameter Already Exists")
				: "";
			res.status(400).json({ message: "Parameter Already Exists" });
			return;
		}
		found = await community.updateOne(
			{ name: communityName },
			{ $push: { parameters: { name, type, offset, value, same } } }
		);
	} catch (err) {
		debugMode ? console.log("Add Parameter -> " + err.message) : "";
		res.status(500).json({ message: err.message });
		return;
	}
	if (found.matchedCount == 0) {
		debugMode
			? console.log("Add Parameter -> Community Doesn't Exist")
			: "";
		res.status(404).json({ message: "Community Doesn't Exist" });
		return;
	}
	debugMode
		? console.log("Add Paramater -> Parameter Added Sucessfully")
		: "";
	res.status(201).json({ message: "Parameter Added Sucessfully" });
	return;
};

// Delete Parameter
export const deleteParameter = async (req, res) => {
	const { communityName, name } = req.body;
	if (!communityName || !name) {
		debugMode ? console.log("Incomplete Request !!") : "";
		res.status(400).json({ message: "Incomplete Request !!" });
		return;
	}
	let found;
	try {
		found = await community.findOne({ name: communityName });
		if (!found) {
			debugMode
				? console.log("Delete Parameter -> No Such Community Exists")
				: "";
			res.status(404).json({ message: "No Such Community Exists" });
			return;
		}
		let obj = found.parameters.find((o) => o.name == name);
		if (!obj) {
			debugMode
				? console.log("Delete Parameter -> Parameter Doesn't Exists")
				: "";
			res.status(400).json({ message: "Parameter Doesn't Exists" });
			return;
		}
		found = await community.updateOne(
			{ name: communityName },
			{ $pull: { parameters: { name } } }
		);
	} catch (err) {
		debugMode ? console.log("Delete Parameter -> " + err.message) : "";
		res.status(500).json({ message: err.message });
		return;
	}
	debugMode
		? console.log("Delete Paramater -> Parameter Deleted Sucessfully")
		: "";
	res.status(201).json({ message: "Parameter Deleted Sucessfully" });
	return;
};
/*
params = {
	username: String
	name: String
	value: String
}
*/
// Co-op MatchMaking Request
export const matchMaking = async (req, res) => {
	const { communityName, username, userParameters } = req.body;
	if (!communityName || !username || !userParameters) {
		debugMode ? console.log("Incomplete Request !!") : "";
		res.status(400).json({ message: "Incomplete Request !!" });
		return;
	}
	let found;
	try {
		found = await community.findOne({ name: communityName });
		if (!found) {
			debugMode
				? console.log("Match Making -> No Such Community Exists")
				: "";
			res.status(404).json({ message: "No Such Community Exists" });
			return;
		}
	} catch (err) {
		debugMode ? console.log("Match Making -> " + err.message) : "";
		res.status(500).json({ message: err.message });
		return;
	}
	let obj = found.queue.find((o) => o.username === username);
	if (obj) {
		try {
			found = await community.updateOne(
				{ name: communityName, queue: { $elemMatch: { username } } },
				{
					$set: {
						"queue.$.parameters": userParameters,
					},
				}
			);
			console.log(found);
			debugMode ? console.log("Match Making -> Updated Old Entry") : "";
			res.status(200).json({
				message: "Updated Old Entry",
			});
			return;
		} catch (err) {
			debugMode ? console.log("Match Making -> " + err.message) : "";
			res.status(500).json({ message: err.message });
			return;
		}
	}
	if (found.queue.length == 0) {
		try {
			found = await community.updateOne(
				{ name: communityName },
				{
					$push: {
						queue: {
							username: username,
							parameters: userParameters,
						},
					},
				}
			);
			debugMode
				? console.log(
						"Match Making -> Added to Queue, Will notify when match made."
				  )
				: "";
			res.status(200).json({
				message: "Added to Queue, Will notify when match made.",
			});
			return;
		} catch (err) {
			debugMode ? console.log("Match Making -> " + err.message) : "";
			res.status(500).json({ message: err.message });
			return;
		}
	}

	let matchFound = true;
	let userMatched = null;

	found.queue.forEach((waitingUser) => {
		matchFound = true;
		found.parameters.forEach((parameter) => {
			if (parameter.type == "num") {
				if (
					Math.abs(
						parseInt(waitingUser.parameters[parameter.name]) -
							parseInt(userParameters[parameter.name])
					) > parameter.offset
				) {
					if (parameter.same) {
						matchFound = false;
						return;
					}
				} else {
					if (!parameter.same) {
						matchFound = false;
						return;
					}
				}
			} else {
				if (
					waitingUser.parameters[parameter.name] ==
					userParameters[parameter.name]
				) {
					if (!parameter.same) {
						matchFound = false;
						return;
					}
				} else {
					if (parameter.same) {
						matchFound = false;
						return;
					}
				}
			}
		});
		console.log(matchFound);
		if (matchFound) {
			userMatched = waitingUser;
			return;
		}
	});
	if (matchFound) {
		console.log(userMatched, username);
		let temp;
		try {
			temp = await User.updateOne(
				{ username: userMatched.username },
				{
					$push: {
						notifications: {
							title: username + " Matched Your Request",
							linkedUsername: username,
							communityName: communityName,
							createdAt: Date.now(),
						},
					},
				}
			);
			temp = await User.updateOne(
				{ username: username },
				{
					$push: {
						notifications: {
							title:
								userMatched.username + " Matched Your Request",
							linkedUsername: userMatched.username,
							communityName: communityName,
							createdAt: Date.now(),
						},
					},
				}
			);
			temp = await community.updateOne(
				{ name: communityName },
				{
					$pull: { queue: { username: userMatched.username } },
				}
			);
		} catch (err) {
			debugMode ? console.log("Match Making -> " + err.message) : "";
			res.status(500).json({ message: err.message });
			return;
		}

		debugMode ? console.log("Match Making -> Match Found !!") : "";
		res.status(200).json({
			message: "Match Found !! Check Your Notifications",
		});
		return;
	} else {
		try {
			found = await community.updateOne(
				{ name: communityName },
				{
					$push: {
						queue: {
							username: username,
							parameters: userParameters,
						},
					},
				}
			);
		} catch (err) {
			debugMode ? console.log("Match Making -> " + err.message) : "";
			res.status(500).json({ message: err.message });
			return;
		}
		debugMode
			? console.log(
					"Match Making -> Added you to Queue, Will notify when match made."
			  )
			: "";
		res.status(200).json({
			message: "Added you to Queue, Will notify when match made.",
		});
		return;
	}
};
