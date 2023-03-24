/** @format */

import User from "./../models/user.js";

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
