/** @format */

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
const debugMode = true;
const redirectURI = process.env.GOOGLE_AUTH_REDIRECT_URI; 
