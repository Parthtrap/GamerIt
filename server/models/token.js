/** @format */

// Extracting mongoose module
import mongoose from "mongoose";

//Schema for Otp
const tokenSchema = new mongoose.Schema({
  email: String,
  otp: String,
  createAt: Date,
  expiresAt: Date,
});

//exporting token modal
export default mongoose.model("Token", tokenSchema);
