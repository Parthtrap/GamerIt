/** @format */

import User from "./../models/user.js";
import jwt from "jsonwebtoken";

const debugMode = true;

 //find user using only email
export const getUserInfo = async (email) => {
  //finding user with email;
  let existingUser;
  try {
    console.log("\n", "finding in database");
    existingUser = await User.findOne({ email: email });
    return existingUser;
  } catch (err) {
    console.log(err);
    return NULL;
  }
};

//for removing spaces at last and end
export const removeSpaces = (data) => {
  //removing spaces at start
  var st = 0;
  for (var i = 0; i < data.length; i++) {
    if (data[i] === " ") st++;
    else break;
  }
  //removing spaces from last
  var end = data.length - 1;
  for (var i = end; i >= 0; i--) {
    if (data[i] === " ") end--;
    else break;
  }
  let updatedData = "";
  for (var i = st; i <= end; i++) {
    updatedData = updatedData + data[i];
  }

  return updatedData;
};


//checking login token
export const checkLoginToken = async (req, res) => {
  debugMode ? console.log("\nverifying login-token") : "";
  let login_token;

  //access login token
  try {
    debugMode ? console.log("\nstoring access token") : "";
    debugMode ? console.log(req.cookies) : "";
    login_token = req.cookies[process.env.LOGIN_COOKIE_NAME];

    if (!login_token) throw Error("\nSession expired");
  } catch (error) {
    debugMode ? console.log(error.message) : "";
    return { isValid: false };
  }
  //decoding login token received as cookie
  try {
    debugMode ? console.log("\ndecoding login token") : "";
    const decoded_login_token = jwt.verify(login_token, process.env.JWT_SECRET);

    debugMode ? console.log("\ndecoded", decoded_login_token) : "";

    const email = decoded_login_token.userEmail;

    //check if a user exist with this email
    let existingUser;

    try {
      existingUser = await getUserInfo(email);
    } catch (err) {
      debugMode ? console.log(err.message) : "";
      return { isValid: false };
    }

    //when no user exist
    if (!existingUser) {
      debugMode ? console.log("\nNo user exists with this email") : "";
      return { isValid: false };
    }

    //sending response with userData
    const userData = {
      userEmail: decoded_login_token.userEmail,
      userName: decoded_login_token.userName,
    };
    debugMode ? console.log(userData) : "";
    return { isValid: true, userData };
  } catch (error) {
    console.log("\nFailed to decode login token");
    return { isValid: false };
  }
};
