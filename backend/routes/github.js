import express from "express";

import githubController from "../controllers/github.js";

const router = express.Router();

router.post("/api/oauth/github/callback", githubController.githubLogin);

export default router;
