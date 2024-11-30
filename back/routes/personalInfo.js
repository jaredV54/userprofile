import express from "express";
const router = express.Router();
import { getUserPersonalInfo, updatePersonalInfo } from "../controls/personalInfo.js";

router.get("/user-personal-info/:userId", getUserPersonalInfo);
router.put("/update/:userId", updatePersonalInfo);

export default router;