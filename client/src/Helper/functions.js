/** @format */

export const ValidateEmail = (mail) => {
  // eslint-disable-next-line
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  return false;
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
