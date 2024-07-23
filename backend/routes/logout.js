import express from "express";
const router = express.Router();
import logoutController from "../controllers/logout.js";

router.post("/api/logout", logoutController.logout);

export default router;
