import express from "express";

const router = express.Router();

import reCaptchaController from "../controllers/reCaptcha.js";

router.post("/api/recaptcha", reCaptchaController.verifyRecaptcha);

export default router;
