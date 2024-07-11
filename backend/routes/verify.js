import express from "express";
const router = express.Router();
import verifyController from "../controllers/verify.js";
import checkVerified from "../middlewares/checkVerified.js";

router.get("/verify/:token", checkVerified, verifyController);

export default router;
