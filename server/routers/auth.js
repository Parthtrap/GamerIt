//setting auth routers
import express from "express";
import { authControllers } from "../controllers/auth.js";

const router = express.Router();

//different auth routers
router.get("/googleAuthLink",authControllers.googleAuthPage);
router.get("/googleAuth",authControllers.redirectGoogleEmail);
router.get("/getOtp",authControllers.createOtp);
router.post("/verifyOtp",authControllers.verifyOtp);
router.get("/tokenLogin",authControllers.verifyLoginToken);
router.post("/login",authControllers.verifyGeneraLogin);

export default router;

