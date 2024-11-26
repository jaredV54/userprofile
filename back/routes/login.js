import express from "express";
const router = express.Router();
import { userLogin, verifyToken, refreshToken, logoutUser } from "../controls/login.js";

router.post("/login", userLogin);
router.get("/verify-token", verifyToken);
router.post("/refresh-token", refreshToken);
router.post("/logout", logoutUser);

export default router;