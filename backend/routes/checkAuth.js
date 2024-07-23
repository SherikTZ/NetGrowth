import express from "express";
const router = express.Router();

import checkAuthController from "../controllers/checkAuth.js";

router.get("/api/checkAuth", checkAuthController.checkAuth);

export default router;
