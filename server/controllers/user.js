/** @format */
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Community from "./../models/community.js";
import User from "./../models/user.js";
import mongoose from "mongoose";
import Post from "./../models/post.js";
import community from "./../models/community.js";
import date from "date-and-time";
import { removeSpaces } from "./functions.js";
const debugMode = true;

// Make New User
export const addUser = async (req, res) => {
	console.log("\nadd user api hit");
	//destructuring and storing requested data
	console.log(req.body);
	let { username, password, email, phonenumber } = req.body;

	let tokenEmail;
	let isGoogleVerified;
	let isVerified;

	const email_token = req.cookies[process.env.EMAIL_COOKIE_NAME];

	//decoding email token recieved as cookie
	try {
		console.log("\ndecoding email token");
		const decoded_email_token = jwt.verify(
			email_token,
			process.env.JWT_SECRET
		);
		console.log("\ndecoded", decoded_email_token);
		tokenEmail = decoded_email_token.userEmail;
		isGoogleVerified = decoded_email_token.isGoogleVerified;
		isVerified = decoded_email_token.isVerified;
	} catch (error) {
		console.log("\nFailed to decode email token");
		console.log("\n", error.message);
		const response = { error: "Failed to create account" };
		res.status(500).json(response);
		return;
	}

	//checking match of token and request email
	if (tokenEmail !== email) {
		console.log("\nemail not matched");
		res.status(400).json({
			error: "Something went wrong. Please verify again",
		});
		return;
	}
	//checking email verification
	if (!isVerified) {
		console.log("\nemail not verified");
		res.status(400).json({
			error: "Email not verified. Please verify your email.",
		});
		return;
	}

	//finding existing user with same email;
	console.log("\nchecking for existing user");
	let existingUserEmail;
	try {
		existingUserEmail = await User.findOne({ email: email });
		//checking existing userEmail
		if (existingUserEmail) {
			console.log("A user with this email already exists");
			console.log(existingUserEmail);
			res.status(400).json({
				error: "A user with this email already exists",
			});
			return;
		}
	} catch (err) {
		console.log(err.message);
		res.status(500).json({ error: err.message });
		return;
	}

	//removing spaces at start and end
	username = removeSpaces(username);

	//finding existing user with same username;
	let existingUsername;
	try {
		existingUsername = await User.findOne({ username: username });
		//checking existing username
		if (existingUsername) {
			console.log("A user with this username already exists");
			console.log(existingUsername);
			res.status(400).json({
				error: "A user with this username already exists",
			});
			return;
		}
	} catch (err) {
		console.log(err.message);
		res.status(500).json({ error: err.message });
		return;
	}

	//finding existing user with same Phonenum;
	let existingPhonenum;
	try {
		existingPhonenum = await User.findOne({ phoneNumber: phonenumber });
		//checking existing Phonenum
		if (existingPhonenum) {
			console.log("A user with this phone no. already exists");
			console.log(existingPhonenum);
			res.status(400).json({
				error: "A user with this phone no. already exists",
			});
			return;
		}
	} catch (err) {
		console.log(err.message);
		res.status(500).json({ error: err.message });
		return;
	}

	//creating hash of the password
	async function hashPassword() {
		const saltRounds = 10;

		const hashedPassword = await new Promise((resolve, reject) => {
			bcrypt.hash(password, saltRounds, function (err, hash) {
				if (err) reject(err);
				resolve(hash);
			});
		});

		return hashedPassword;
	}
	let hashedPassword;
	try {
		hashedPassword = await hashPassword();
	} catch (err) {
		console.log(err.message);
		res.status(500).json({ error: err.message });
		return;
	}

	//noting current time
	const currentDate = new Date(Date.now());
	const creationTime = date.format(currentDate, "YYYY/MM/DD HH:mm:ss");
	console.log(creationTime);

	//creating newUser object
	const newUser = new User({
		username: username,
		password: hashedPassword,
		email: email,
		phoneNumber: phonenumber,
		isAdmin: false,
		followedCommunities: [],
		notes: [],
		theme: "default",
		savedPosts: [],
		profilePic: "",
		plans: [],
		followingUsers: [],
		followsCount: 0,
		font: "Arial",
		createdAt: creationTime,
	});

	//add newUser to database
	try {
		await newUser.save();
		console.log("User added");
		console.log(newUser);
		res.clearCookie(process.env.EMAIL_COOKIE_NAME);
		res.clearCookie("email");
		res.status(200).json({ message: "Account created successfully" });
		return;
	} catch (err) {
		console.log(err.message);
		res.status(500).json({ error: err.message });
	}
};

// Get User
export const getUser = async (req, res) => {
	let { username } = req.query;
	if (!username) {
		debugMode ? console.log("Incomplete Request;") : "";
		res.status(400).json({ message: "Incomplete Request !!" });
		return;
	}
	let existingUser;
	try {
		existingUser = await User.findOne({ username }).select(
			"-password -createdAt"
		);
	} catch (err) {
		debugMode ? console.log("Get User Details -> " + err.message) : "";
		res.status(500).json({ message: err.message });
		return;
	}
	if (!existingUser) {
		debugMode
			? console.log("Get User Details -> No Such user Exists !!")
			: "";
		res.status(404).json({ message: "No Such user Exists !!" });
		return;
	} else {
		debugMode ? console.log("Get User Details -> User Found !!") : "";
		res.status(200).json(existingUser);
	}
};

// Change Password
export const updateUserPassword = async (req, res) => {
	console.log("\nreset password api hit");
	const newPassword = req.body.password;
	let email_token;

	//finding email token
	try {
		console.log("\nstoring email token");
		email_token = req.cookies[process.env.EMAIL_COOKIE_NAME];

		if (!email_token) throw Error("\nSession expired");
	} catch (error) {
		console.log(error.message);
		const response = { error: "verify your email" };

		res.status(400).json(response);
		return;
	}

	try {
		//decoding email-token
		console.log("\ndecoding email-token");
		const decoded_email_token = jwt.verify(
			email_token,
			process.env.JWT_SECRET
		);

		console.log("\ndecoded", decoded_email_token);

		//checking email-token request type
		if (decoded_email_token.isCreatingAccount) {
			console.log("\ncreate account token found\ncan't reset password");

			res.status(400).json({
				error: "Token sent to create account, can't reset password",
			});
			return;
		}

		//checking if the token is verified or not
		else if (!decoded_email_token.isVerified) {
			console.log("\nemail is not verified");
			res.status(400).json({ error: "Email not verified" });
			return;
		} else {
			//encrypting password using bcryptjs
			const saltRounds = 10;
			const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
			console.log("\nhashedOtp", hashedPassword);

			try {
				console.log("\nupdating user data");
				const user = await User.updateOne(
					{
						email: decoded_email_token.userEmail,
					},
					{
						$set: {
							password: hashedPassword,
						},
					}
				);

				console.log("\npassword updated");
				console.log(user);

				//delete email token
				res.clearCookie(process.env.EMAIL_COOKIE_NAME);
				console.log("\ndeleted email token");

				res.status(200).json({ message: "user-password updated" });
			} catch (err) {
				console.log("\nfailed to reset password");
				console.log(err.message);
				res.status(500).json({ error: err.message });
				return;
			}
		}
	} catch (err) {
		console.log(err.message);
		res.status(500).json({ error: err.message });
		return;
	}
};

// Update Profile Picture
export const updateUserProfilePic = async (req, res) => {
	const { username, profilepic } = req.body;
	if (!username || !profilepic) {
		debugMode ? console.log("Incomplete Request !!") : "";
		res.status(400).json({ message: "Incomplete Request !!" });
		return;
	}

	let user;
	try {
		user = await User.updateOne(
			{ username: username },
			{ profilePic: profilepic }
		);
	} catch (err) {
		debugMode
			? console.log("Update User Profile Pic -> " + err.message)
			: "";
		res.status(500).json({ message: err.message });
		return;
	}
	if (user.matchedCount == 0) {
		debugMode
			? console.log(
					"Update User Profile Pic -> No User with given username exists"
			  )
			: "";
		res.status(404).json({ message: "User Not Found !!" });
	} else if (user.modifiedCount == 0) {
		debugMode
			? console.log("Update User Profile Pic -> No User was Updated")
			: "";
		res.status(400).json({ message: "No user was Updated" });
		return;
	}

	debugMode
		? console.log("Update User Profile Pic -> User Profile Pic Updated !!")
		: "";
	res.status(201).json({
		message: "User Profile Pic Updated Sucessfully !!",
	});
};

// Update Email Address
export const updateUserEmail = async (req, res) => {
	const { username, email } = req.body;
	if (!username || !email) {
		debugMode ? console.log("Incomplete Request") : "";
		res.status(400).json({ message: "Incomplete Request !!" });
		return;
	}
	let user;
	try {
		user = await User.updateOne({ username }, { email });
	} catch (err) {
		debugMode ? console.log("Update User Email -> " + err.message) : "";
		res.status(500).json({ message: err.message });
		return;
	}
	if (user.matchedCount == 0) {
		debugMode
			? console.log(
					"Update User Email -> No User with given username exists"
			  )
			: "";
		res.status(404).json({ message: "User Not Found !!" });
		return;
	} else if (user.modifiedCount == 0) {
		debugMode
			? console.log("Update User Email -> No User was Updated")
			: "";
		res.status(400).json({ message: "No user was Updated" });
		return;
	}
	debugMode ? console.log("Update User Email -> User Email Changed !!") : "";
	res.status(201).json({
		message: "User Email Changed Sucessfully !!",
	});
};

// Update Phone Number
export const updateUserPhone = async (req, res) => {
	const { username, phonenumber } = req.body;
	if (!username || !phonenumber) {
		debugMode ? console.log("Incomplete Request") : "";
		res.status(400).json({ message: "Incomplete Request !!" });
		return;
	}
	let user;
	try {
		user = await User.updateOne({ username }, { phoneNumber: phonenumber });
	} catch (err) {
		debugMode
			? console.log("Update User Phone Number -> " + err.message)
			: "";
		res.status(500).json({ message: err.message });
		return;
	}
	if (user.matchedCount == 0) {
		debugMode
			? console.log(
					"Update User Phone Number -> No User with given username exists"
			  )
			: "";
		res.status(404).json({ message: "User Not Found !!" });
		return;
	} else if (user.modifiedCount == 0) {
		debugMode
			? console.log("Update User Phone Number -> No User was Updated")
			: "";
		res.status(400).json({ message: "No user was Updated" });
		return;
	}
	debugMode
		? console.log(
				"Update User Phone Number -> User Phone Number Changed Sucessfully !!"
		  )
		: "";
	res.status(201).json({
		message: "User Phone Number Changed Sucessfully !!",
	});
};

// Follow Community
export const followCommunity = async (req, res) => {
	const { name, username } = req.body;
	if (!name || !username) {
		debugMode ? console.log("Follow Community -> Incomplete Request") : "";
		res.status(400).json({ message: "Incomplete Request !!" });
		return;
	}
	let founduser, foundcommunity;
	try {
		founduser = await User.findOne({ username });
		if (!founduser) {
			debugMode ? console.log("Follow Community -> User Not Found") : "";
			res.status(404).json({ message: "User Not Found" });
			return;
		}
		if (founduser.followedCommunities.includes(name)) {
			debugMode
				? console.log("Follow Community -> Community already followed")
				: "";
			res.status(400).json({ message: "Community already followed" });
			return;
		}
		founduser.followedCommunities.push(name);
		founduser.save();
	} catch (err) {
		debugMode ? console.log("Follow Community -> " + err.message) : "";
		res.status(500).json({ message: err.message });
		return;
	}
	if (founduser.matchedCount == 0) {
		debugMode ? console.log("Follow Community -> User Not Found") : "";
		res.status(404).json({ message: "User Not Found" });
		return;
	}
	if (founduser.modifiedCount == 0) {
		debugMode ? console.log("Follow Community -> User Not Changed") : "";
		res.status(400).json({ message: "User Not Changed" });
		return;
	}
	try {
		foundcommunity = await community.updateOne(
			{ name },
			{ $inc: { followerCount: 1 } }
		);
	} catch (err) {
		debugMode ? console.log("Follow Community -> " + err.message) : "";
		res.status(500).json({ message: err.message });
		return;
	}
	if (foundcommunity.matchedCount == 0) {
		debugMode ? console.log("Follow Community -> Community Not Found") : "";
		res.status(404).json({ message: "Community Not Found" });
		try {
			founduser = await User.findOne({ username });
			const index = founduser.followedCommunities.indexOf(name);
			if (index > -1) {
				founduser.followedCommunities.splice(index, 1);
			}
			founduser.save();
		} catch (err) {
			debugMode ? console.log("Follow Community -> " + err.message) : "";
			res.status(500).json({ message: err.message });
			return;
		}
		return;
	}
	if (foundcommunity.modifiedCount == 0) {
		debugMode
			? console.log("Follow Community -> No Community was updated")
			: "";
		res.status(400).json({ message: "No Community was updated" });
		try {
			founduser = await User.findOne({ username });
			const index = founduser.followedCommunities.indexOf(name);
			if (index > -1) {
				founduser.followedCommunities.splice(index, 1);
			}
			founduser.save();
		} catch (err) {
			debugMode ? console.log("Follow Community -> " + err.message) : "";
			res.status(500).json({ message: err.message });
			return;
		}
		return;
	}

	debugMode
		? console.log("Follow Community -> Successfully Followed the community")
		: "";
	res.status(200).json({ message: "Successfully Followed the community" });
	return;
};

// Unfollow Community
export const unfollowCommunity = async (req, res) => {
	const { name, username } = req.body;
	if (!name || !username) {
		debugMode
			? console.log("Unfollow Community -> Incomplete Request")
			: "";
		res.status(400).json({ message: "Incomplete Request !!" });
		return;
	}
	let founduser, foundcommunity;
	try {
		founduser = await User.findOne({ username });
		if (!founduser) {
			debugMode ? console.log("Follow Community -> User Not Found") : "";
			res.status(404).json({ message: "User Not Found" });
			return;
		}
		if (!founduser.followedCommunities.includes(name)) {
			debugMode
				? console.log(
						"Follow Community -> Community already unfollowed"
				  )
				: "";
			res.status(400).json({ message: "Community already unfollowed" });
			return;
		}
		const index = founduser.followedCommunities.indexOf(name);
		if (index > -1) {
			founduser.followedCommunities.splice(index, 1);
		}
		founduser.save();
	} catch (err) {
		debugMode ? console.log("Unfollow Community -> " + err.message) : "";
		res.status(500).json({ message: err.message });
		return;
	}
	if (founduser.matchedCount == 0) {
		debugMode ? console.log("Unfollow Community -> User Not Found") : "";
		res.status(404).json({ message: "User Not Found" });
		return;
	}
	if (founduser.modifiedCount == 0) {
		debugMode ? console.log("Unfollow Community -> User Not Changed") : "";
		res.status(400).json({ message: "User Not Changed" });
		return;
	}
	try {
		foundcommunity = await community.updateOne(
			{ name },
			{ $inc: { followerCount: -1 } }
		);
	} catch (err) {
		debugMode ? console.log("Unfollow Community -> " + err.message) : "";
		res.status(500).json({ message: err.message });
		return;
	}
	if (foundcommunity.matchedCount == 0) {
		debugMode
			? console.log("Unfollow Community -> Community Not Found")
			: "";
		res.status(404).json({ message: "Community Not Found" });
		try {
			founduser = await User.findOne({ username });
			founduser.followedCommunities.push(name);
			founduser.save();
		} catch (err) {
			debugMode
				? console.log("Unfollow Community -> " + err.message)
				: "";
			res.status(500).json({ message: err.message });
			return;
		}
		return;
	}
	if (foundcommunity.modifiedCount == 0) {
		debugMode
			? console.log("Unfollow Community -> No Community was updated")
			: "";
		res.status(400).json({ message: "No Community was updated" });
		try {
			founduser = await User.findOne({ username });
			founduser.followedCommunities.push(name);
			founduser.save();
		} catch (err) {
			debugMode
				? console.log("Unfollow Community -> " + err.message)
				: "";
			res.status(500).json({ message: err.message });
			return;
		}
		return;
	}

	debugMode
		? console.log(
				"Unfollow Community -> Successfully Unfollowed the community"
		  )
		: "";
	res.status(200).json({ message: "Successfully Unfollowed the community" });
	return;
};

// Follow User
export const followUser = async (req, res) => {
	const { username, followingUser } = req.body;
	if (!username || !followingUser) {
		debugMode ? console.log("Incomplete Request") : "";
		res.status(400).json({ message: "Incomplete Request !!" });
		return;
	}
	let user1, user2;
	try {
		user1 = await User.findOne({ username });
		if (user1.followingUsers.includes(followingUser)) {
			debugMode
				? console.log("Follow User -> User is Already Following")
				: "";
			res.status(400).json({ message: "Already Following" });
			return;
		}
		user1 = await User.updateOne(
			{ username },
			{ $push: { followingUsers: followingUser } }
		);
	} catch (err) {
		debugMode ? console.log("Follow User -> " + err.message) : "";
		res.status(500).json({ message: err.message });
		return;
	}
	if (user1.matchedCount == 0) {
		debugMode
			? console.log("Follow User -> No User with given username1 exists")
			: "";
		res.status(404).json({ message: "User1 Not Found !!" });
		return;
	}
	if (user1.modifiedCount == 0) {
		debugMode ? console.log("Follow User -> No User was Updated") : "";
		res.status(400).json({ message: "No user1 was Updated" });
		return;
	}

	try {
		user2 = await User.updateOne(
			{ username: followingUser },
			{ $inc: { followsCount: 1 } }
		);
	} catch (err) {
		try {
			user1 = await User.updateOne(
				{ username },
				{ $pull: { followingUsers: followingUser } }
			);
		} catch (err) {
			debugMode ? console.log("Follow User -> " + err.message) : "";
			res.status(500).json({ message: err.message });
			return;
		}
		debugMode ? console.log("Follow User -> " + err.message) : "";
		res.status(500).json({ message: err.message });
		return;
	}
	if (user2.matchedCount == 0) {
		debugMode
			? console.log("Follow User -> No User with given username1 exists")
			: "";
		res.status(404).json({ message: "User2 Not Found !!" });
		try {
			user1 = await User.updateOne(
				{ username },
				{ $pull: { followingUsers: followingUser } }
			);
		} catch (err) {
			debugMode ? console.log("Follow User -> " + err.message) : "";
			res.status(500).json({ message: err.message });
			return;
		}
		return;
	}
	if (user2.modifiedCount == 0) {
		debugMode ? console.log("Follow User -> No User was Updated") : "";
		res.status(400).json({ message: "No user2 was Updated" });
		try {
			user1 = await User.updateOne(
				{ username },
				{ $pull: { followingUsers: followingUser } }
			);
		} catch (err) {
			debugMode ? console.log("Follow User -> " + err.message) : "";
			res.status(500).json({ message: err.message });
			return;
		}
		return;
	}
	debugMode ? console.log("Follow User -> User Followed Sucessfully !!") : "";
	res.status(200).json({
		message: "User Followed Sucessfully !!",
	});
};

// Unfollow User
export const unfollowUser = async (req, res) => {
	const { username, unfollowingUser } = req.body;
	if (!username || !unfollowingUser) {
		debugMode ? console.log("Incomplete Request") : "";
		res.status(400).json({ message: "Incomplete Request !!" });
		return;
	}
	let user1, user2;
	try {
		user1 = await User.findOne({ username });
		if (!user1.followingUsers.includes(unfollowingUser)) {
			debugMode
				? console.log("Unfollow User -> User is not Following")
				: "";
			res.status(500).json({ message: "Already Unfollowing" });
			return;
		}
		user1 = await User.updateOne(
			{ username },
			{ $pull: { followingUsers: unfollowingUser } }
		);
	} catch (err) {
		debugMode ? console.log("Unfollow User -> " + err.message) : "";
		res.status(500).json({ message: err.message });
		return;
	}
	if (user1.matchedCount == 0) {
		debugMode
			? console.log(
					"Unfollow User -> No User with given username1 exists"
			  )
			: "";
		res.status(404).json({ message: "User1 Not Found !!" });
		return;
	}
	if (user1.modifiedCount == 0) {
		debugMode ? console.log("Unfollow User -> No User was Updated") : "";
		res.status(400).json({ message: "No user1 was Updated" });
		return;
	}

	try {
		user2 = await User.updateOne(
			{ username: unfollowingUser },
			{ $inc: { followsCount: -1 } }
		);
	} catch (err) {
		try {
			user1 = await User.updateOne(
				{ username },
				{ $push: { followingUsers: unfollowingUser } }
			);
		} catch (err) {
			debugMode ? console.log("Unfollow User -> " + err.message) : "";
			res.status(500).json({ message: err.message });
			return;
		}
		debugMode ? console.log("Unfollow User -> " + err.message) : "";
		res.status(500).json({ message: err.message });
		return;
	}
	if (user2.matchedCount == 0) {
		debugMode
			? console.log(
					"Unfollow User -> No User with given username1 exists"
			  )
			: "";
		res.status(404).json({ message: "User2 Not Found !!" });
		try {
			user1 = await User.updateOne(
				{ username },
				{ $push: { followingUsers: unfollowingUser } }
			);
		} catch (err) {
			debugMode ? console.log("Unfollow User -> " + err.message) : "";
			res.status(500).json({ message: err.message });
			return;
		}
		return;
	}
	if (user2.modifiedCount == 0) {
		debugMode ? console.log("Unfollow User -> No User was Updated") : "";
		res.status(400).json({ message: "No user2 was Updated" });
		try {
			user1 = await User.updateOne(
				{ username },
				{ $push: { followingUsers: unfollowingUser } }
			);
		} catch (err) {
			debugMode ? console.log("Unfollow User -> " + err.message) : "";
			res.status(500).json({ message: err.message });
			return;
		}
		return;
	}
	debugMode
		? console.log("Unfollow User -> User Unfollowed Sucessfully !!")
		: "";
	res.status(201).json({
		message: "User Unfollowed Sucessfully !!",
	});
};

// Make Note
export const makeNote = async (req, res) => {
	const { username, title } = req.body;
	if (!title || !username) {
		debugMode ? console.log("Incomplete Response !!") : "";
		res.status(400).json({ message: "Incomplete Response !!" });
		return;
	}
	const note = {
		title,
		content: [],
		color: "#FFFF88",
		createdAt: Date.now(),
	};
	let user;
	try {
		user = await User.updateOne({ username }, { $push: { notes: note } });
	} catch (err) {
		debugMode ? console.log("Make Note -> " + err.message) : "";
		res.status(500).json({ message: err.message });
		return;
	}

	if (user.matchedCount == 0) {
		debugMode
			? console.log("Make Note -> No User with given username exists")
			: "";
		res.status(404).json({ message: "User Not Found !!" });
		return;
	} else if (user.modifiedCount == 0) {
		debugMode ? console.log("Make Note -> No User was Updated") : "";
		res.status(400).json({ message: "No user was Updated" });
		return;
	}
	debugMode ? console.log("Make Note -> Note Made Sucessfully !!") : "";
	res.status(201).json({
		message: "Note Made Sucessfully !!",
	});
};

// Delete Note
export const deleteNote = async (req, res) => {
	const { username, noteID } = req.body;
	if (!noteID || !username) {
		debugMode ? console.log("Incomplete Response !!") : "";
		res.status(400).json({ message: "Incomplete Response !!" });
		return;
	}
	let user;
	try {
		user = await User.findOne({ username });
		if (!user) {
			debugMode
				? console.log(
						"Delete Note -> No User with given username exists"
				  )
				: "";
			res.status(404).json({ message: "User Not Found !!" });
			return;
		}
		console.log(new mongoose.Types.ObjectId(noteID));
		user = await User.updateOne(
			{ username },
			{ $pull: { notes: { _id: new mongoose.Types.ObjectId(noteID) } } }
		);
	} catch (err) {
		debugMode ? console.log("Delete Note -> " + err.message) : "";
		res.status(500).json({ message: err.message });
		return;
	}
	if (user.modifiedCount == 0) {
		debugMode ? console.log("Delete Note -> Note Not Found") : "";
		res.status(400).json({ message: "Note not Found" });
		return;
	}
	debugMode ? console.log("Delete Note -> Note Deleted Sucessfully !!") : "";
	res.status(201).json({
		message: "Note Deleted Sucessfully !!",
	});
};

// Edit Note
export const editNote = async (req, res) => {
	const { username, noteID, newNote } = req.body;
	if (!noteID || !username || !newNote) {
		debugMode ? console.log("Incomplete Response !!") : "";
		res.status(400).json({ message: "Incomplete Response !!" });
		return;
	}
	let user;
	try {
		user = await User.findOne({ username });
		if (!user) {
			debugMode
				? console.log("Edit Note -> No User with given username exists")
				: "";
			res.status(404).json({ message: "User Not Found !!" });
			return;
		}
		console.log(new mongoose.Types.ObjectId(noteID));
		user = await User.updateOne(
			{
				username,
				notes: {
					$elemMatch: { _id: new mongoose.Types.ObjectId(noteID) },
				},
			},
			{
				$set: { "notes.$": newNote },
			}
		);
	} catch (err) {
		debugMode ? console.log("Edit Note -> " + err.message) : "";
		res.status(500).json({ message: err.message });
		return;
	}
	if (user.modifiedCount == 0) {
		debugMode ? console.log("Edit Note -> Note Not Found") : "";
		res.status(400).json({ message: "Note not Found" });
		return;
	}
	debugMode ? console.log("Edit Note -> Note Edit Sucessfully !!") : "";
	res.status(201).json({
		message: "Note Edit Sucessfully !!",
	});
};

// Make Plan
export const makePlan = async (req, res) => {
	const { username, title, time } = req.body;
	if (!title || !username || !time) {
		debugMode ? console.log("Incomplete Response !!") : "";
		res.status(400).json({ message: "Incomplete Response !!" });
		return;
	}
	const newnote = {
		title,
		time,
		createdAt: Date.now(),
	};
	let user;
	try {
		user = await User.updateOne(
			{ username },
			{ $push: { plans: newnote } }
		);
	} catch (err) {
		debugMode ? console.log("Make Plan -> " + err.message) : "";
		res.status(500).json({ message: err.message });
		return;
	}

	if (user.matchedCount == 0) {
		debugMode
			? console.log("Make Plan -> No User with given username exists")
			: "";
		res.status(404).json({ message: "User Not Found !!" });
		return;
	} else if (user.modifiedCount == 0) {
		debugMode ? console.log("Make Plan -> No User was Updated") : "";
		res.status(400).json({ message: "No user was Updated" });
		return;
	}
	debugMode ? console.log("Make Plan -> Plan Made Sucessfully !!") : "";
	res.status(201).json({
		message: "Plan Made Sucessfully !!",
	});
};

// Delete Plan
export const deletePlan = async (req, res) => {
	const { username, planID } = req.body;
	if (!planID || !username) {
		debugMode ? console.log("Incomplete Response !!") : "";
		res.status(400).json({ message: "Incomplete Response !!" });
		return;
	}
	let user;
	try {
		user = await User.findOne({ username });
		if (!user) {
			debugMode
				? console.log(
						"Delete Plan -> No User with given username exists"
				  )
				: "";
			res.status(404).json({ message: "User Not Found !!" });
			return;
		}
		console.log(new mongoose.Types.ObjectId(planID));
		user = await User.updateOne(
			{ username },
			{ $pull: { plans: { _id: new mongoose.Types.ObjectId(planID) } } }
		);
	} catch (err) {
		debugMode ? console.log("Delete Plan -> " + err.message) : "";
		res.status(500).json({ message: err.message });
		return;
	}
	if (user.modifiedCount == 0) {
		debugMode ? console.log("Delete Plan -> Plan Not Found") : "";
		res.status(400).json({ message: "Plan not Found" });
		return;
	}
	debugMode ? console.log("Delete Plan -> Plan Deleted Sucessfully !!") : "";
	res.status(201).json({
		message: "Plan Deleted Sucessfully !!",
	});
};

// Change Theme
export const changeTheme = async (req, res) => {
	const { username, theme } = req.body;
	if (!username || !theme) {
		debugMode ? console.log("Incomplete Request") : "";
		res.status(400).json({ message: "Incomplete Request !!" });
		return;
	}
	let user;
	try {
		user = await User.updateOne({ username }, { theme });
	} catch (err) {
		debugMode ? console.log("Change Theme -> " + err.message) : "";
		res.status(500).json({ message: err.message });
		return;
	}
	if (user.matchedCount == 0) {
		debugMode
			? console.log("Change Theme -> No User with given username exists")
			: "";
		res.status(404).json({ message: "User Not Found !!" });
		return;
	} else if (user.modifiedCount == 0) {
		debugMode ? console.log("Change Theme -> No User was Updated") : "";
		res.status(400).json({ message: "No user was Updated" });
		return;
	}
	debugMode ? console.log("Change Theme -> Theme Changed !!") : "";
	res.status(201).json({
		message: "Theme Changed Sucessfully !!",
	});
};

// Save a Post

// Unsave a Post

// Make Admin
export const makeAdmin = async (req, res) => {
	const { username } = req.body;
	let user;
	try {
		user = await User.updateOne({ username }, { $set: { isAdmin: true } });
	} catch (err) {
		debugMode ? console.log("Make Admin -> " + err.message) : "";
		res.status(500).json({ message: err.message });
		return;
	}
	if (user.matchedCount == 0) {
		debugMode
			? console.log("Make Admin -> No User with given username exists")
			: "";
		res.status(404).json({ message: "User Not Found !!" });
		return;
	} else if (user.modifiedCount == 0) {
		debugMode ? console.log("Make Admin -> User is already an Admin") : "";
		res.status(400).json({ message: "User is already an Admin" });
		return;
	}
	debugMode ? console.log("Make Admin -> The User is now an Admin !!") : "";
	res.status(201).json({
		message: "The User is now an Admin !!",
	});
};

// Remove Admin
export const removeAdmin = async (req, res) => {
	const { username } = req.body;
	let user;
	try {
		user = await User.updateOne({ username }, { $set: { isAdmin: false } });
	} catch (err) {
		debugMode ? console.log("Make Admin -> " + err.message) : "";
		res.status(500).json({ message: err.message });
		return;
	}
	if (user.matchedCount == 0) {
		debugMode
			? console.log("Remove Admin -> No User with given username exists")
			: "";
		res.status(404).json({ message: "User Not Found !!" });
		return;
	} else if (user.modifiedCount == 0) {
		debugMode ? console.log("Remove Admin -> User is not an Admin") : "";
		res.status(400).json({ message: "User is not an Admin" });
		return;
	}
	debugMode
		? console.log("Remove Admin -> The User is not an Admin Anymore !!")
		: "";
	res.status(201).json({
		message: "The User is not an Admin Anymore !!",
	});
};
