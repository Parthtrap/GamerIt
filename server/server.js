/** @format */

import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

// Import Routes from Routes Folder
import userRoutes from "./routers/user.js";
import postRoutes from "./routers/post.js";
import authRoutes from "./routers/auth.js";
import communityRoutes from "./routers/community.js";

const app = express();

//parsering cookies
app.use(cookieParser());

//parsering json and url encoded requests
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

//allowing cors requests
const corsOptions = {
  origin: process.env.UI_ROOT_URI, //can't set to '*' when allowing credentials
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Database connection
const CONNECTION_URL = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster1.iktpdhw.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;

const port = process.env.PORT;

// Defining Routes
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/community", communityRoutes);

mongoose
  .connect(CONNECTION_URL)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => console.log(error.message));

//starting server
app.listen(port, () => console.log(`Server Running on Port : ${port}`));
