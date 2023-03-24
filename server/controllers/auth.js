/** @format */
const debugMode = true;
//importing and setting modules
import querystring from "querystring";
import axios from "axios";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

//created reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_NODEMAILER,
    pass: process.env.PASSWORD_NODEMAILER,
  },
  port: 465,
  host: "smtp.gmail.com",
});

//importing functions and modals
import { getUserInfo } from "./function.js";
import Token from "../models/token.js";
const redirectURI = process.env.GOOGLE_AUTH_REDIRECT_URI;

//for getting url of google authentication page
const googleAuthPage = async (req, res, next) => {
  console.log("\n", "google auth page request hit");

  //return google auth link
  function getGoogleAuthURL() {
    const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
    const options = {
      redirect_uri: `${process.env.SERVER_ROOT_URI}/${redirectURI}`,
      client_id: process.env.GOOGLE_CLIENT_ID,
      access_type: "offline",
      response_type: "code",
      prompt: "consent",
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
      ].join(" "),
    };

    return `${rootUrl}?${querystring.stringify(options)}`;
  }
  debugMode ? console.log("\n", "sending googleAuthPage link") : "";
  return res.status(200).json({ url: getGoogleAuthURL() });
};

//fetching google user data (for login and creating account)
const redirectGoogleEmail = async (req, res, next) => {
  console.log("\n", "redirect api hit");
  debugMode ? console.log("\n", "got the user code of the google user") : "";

  //code of user got after redirecting google auth page
  const code = req.query.code;

  //fetching access token and id token of user form google server with user code

  try {
    async function getTokens({ code, clientId, clientSecret, redirectUri }) {
      const url = "https://oauth2.googleapis.com/token";
      const values = {
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      };

      return axios
        .post(url, querystring.stringify(values), {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then((res) => {
          debugMode
            ? console.log("\n", "got the access-token of the google user")
            : "";
          return res.data;
        })
        .catch((error) => {
          console.error(
            `\nFailed to fetch auth tokens while doint axios post request`
          );
          debugMode ? console.log("\n", error.message) : "";

          throw Error(
            "Failed to fetch auth tokens while doint axios post request"
          );
        });
    }
    const { id_token, access_token } = await getTokens({
      code,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      redirectUri: `${process.env.SERVER_ROOT_URI}/${redirectURI}`,
    });

    // Fetch the user's profile with the access token and bearer
    const googleUser = await axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
        {
          headers: {
            Authorization: `Bearer ${id_token}`,
          },
        }
      )
      .then((res) => {
        debugMode
          ? console.log("\n", "got the user data from google auth")
          : "";
        return res.data;
      })
      .catch((error) => {
        console.error(`\nFailed to fetch user using axios get request`);
        debugMode ? console.log("\n", error.message) : "";
        throw Error("Failed to fetch user using axios get request");
      });

    debugMode ? console.log("google user : ", googleUser) : "";

    try {
      debugMode ? console.log("\n", "checking if the user exist") : "";
      //check if a user exist with this google email
      const existingUser = await getUserInfo(googleUser.email);

      debugMode ? console.log("\n", "existingUser : ", existingUser) : "";

      //if doesn't exist then redirect to create account page
      if (!existingUser) {
        debugMode ? console.log("\n", "user is new") : "";
        const userData = {
          userEmail: googleUser.email,
          isVerified: googleUser.verified_email,
          isGoogleVerified: true,
        };

        //creating jwt token
        const token = jwt.sign(userData, process.env.JWT_SECRET);

        //sending cookies to client side
        debugMode ? console.log("\ncreating email token") : "";
        res.cookie(process.env.EMAIL_COOKIE_NAME, token, {
          expires: new Date(Date.now() + 60 * 60 * 1000), //milliseconds
          httpOnly: true, //prevents client-side scripts from accessing cookie
          secure: false, //so that it can be used in http requests
        });
        res.cookie("email", googleUser.email, {
          expires: new Date(Date.now() + 60 * 60 * 1000), //milliseconds
          httpOnly: false, //prevents client-side scripts from accessing cookie
          secure: false, //so that it can be used in http requests
        });
        debugMode
          ? console.log("\n", "redirecting to signup page with email token")
          : "";
        res.redirect(`${process.env.UI_ROOT_URI}/signup`);
        return;
      }

      //if exist then redirect to home page with login
      else {
        debugMode ? console.log("\nUser exists") : "";
        const userData = {
          userEmail: existingUser.email,
          userName: existingUser.username,
        };

        //creating jwt token
        const token = jwt.sign(userData, process.env.JWT_SECRET);

        //sending cookies to client side
        debugMode ? console.log("\nCreating login token") : "";
        res.cookie(process.env.LOGIN_COOKIE_NAME, token, {
          maxAge: 10 * 24 * 60 * 60 * 1000,
          httpOnly: true,
          secure: false,
        });
        debugMode
          ? console.log("\nredirecting to home page with login token")
          : "";
        res.redirect(`${process.env.UI_ROOT_URI}`);
        return;
      }
    } catch (error) {
      debugMode
        ? console.log("Failed to create token using google data\n")
        : "";
      console.log("\n", error.message);
      const response = { error: "Google Authentication error" };
      res.status(500).json(response);
      return;
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Google Authentication error" });
    return;
  }
};
