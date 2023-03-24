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
    const decoded_email_token = jwt.verify(email_token, process.env.JWT_SECRET);
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
    res
      .status(400)
      .json({ error: "Something went wrong. Please verify again" });
    return;
  }
  //checking email verification
  if (!isVerified) {
    console.log("\nemail not verified");
    res
      .status(400)
      .json({ error: "Email not verified. Please verify your email." });
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
      res.status(400).json({ error: "A user with this email already exists" });
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
      res
        .status(400)
        .json({ error: "A user with this username already exists" });
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
      res
        .status(400)
        .json({ error: "A user with this phone no. already exists" });
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
	  const decoded_email_token = jwt.verify(email_token, process.env.JWT_SECRET);
  
	  console.log("\ndecoded", decoded_email_token);
  
	  //checking email-token request type
	  if (decoded_email_token.isCreatingAccount) {
		console.log("\ncreate account token found\ncan't reset password");
  
		res
		  .status(400)
		  .json({ error: "Token sent to create account, can't reset password" });
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

// Update Email Address

// Update Phone Number

// Follow Community

// Unfollow Community

// Follow User

// Unfollow User

// Make Note

// Delete Note

// Edit Note

// Make Plan

// Delete Plan

// Edit Plan

// Change Theme

// Change Color

// Change Font

// Save a Post

// Unsave a Post

// Make Admin

// Remove Admin
