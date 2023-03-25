/** @format */

import User from "./../models/user.js";
import jwt from "jsonwebtoken";

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

export const checkLoginToken = async (req, res, next) => {
    console.log("\nverifying login-token");
    let login_token;
  
    //access login token
    try {
      console.log("\nstoring access token");
      console.log(req.cookies);
      login_token = req.cookies[process.env.LOGIN_COOKIE_NAME];
  
      if (!login_token) throw Error("\nSession expired");
    } catch (error) {
      console.log(error.message);
      next(req, res, { isValid: false });
      return;
    }
    //decoding login token received as cookie
    try {
      console.log("\ndecoding login token");
      const decoded_login_token = jwt.verify(login_token, process.env.JWT_SECRET);
  
      console.log("\ndecoded", decoded_login_token);
  
      const email = decoded_login_token.userEmail;
  
      //check if a user exist with this email
      let existingUser;
  
      try {
        existingUser = await getUserInfo(email);
      } catch (err) {
        console.log(err.message);
        next(req, res, { isValid: false });
        return;
      }
  
      //when no user exist
      if (!existingUser) {
        console.log("\nNo user exists with this email");
        next(req, res, { isValid: false });
        return;
      }
  
      //sending response with userData
      const userData = {
        userEmail: decoded_login_token.userEmail,
        userName: decoded_login_token.userName,
      };
  
      next(req, res, { isValid: true, userData });
    } catch (error) {
      console.log("\nFailed to decode login token");
      console.log("\n", error.message);
      next(req, res, { isValid: false });
    }
  };