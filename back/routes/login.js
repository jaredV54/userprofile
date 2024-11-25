import express from "express";
const router = express.Router();
import { userLogin, verifyToken, refreshToken } from "../controls/login.js";

router.post("/login", userLogin);
router.get("/verify-token", verifyToken);
router.post("/refresh-token", refreshToken);

export default router;