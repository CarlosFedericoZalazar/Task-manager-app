import express from "express";
import {registerUser, loginUser, getProfile} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/getUser", getProfile);

export default router;