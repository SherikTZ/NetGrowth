import express from "express";

import googleController from "../controllers/google.js";

const router = express.Router();

router.post("/api/oauth/google/callback", googleController.googleLogin);

export default router;
