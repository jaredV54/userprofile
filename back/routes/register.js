import express from "express";
const router = express.Router();
import { register, verifyCode } from "../controls/register.js";

router.post("/register", register);
router.post("/verify-code", verifyCode);

export default router;