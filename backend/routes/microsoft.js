import express from "express";

import microsoftController from "../controllers/microsoft.js";

const router = express.Router();

router.post(
  "/api/oauth/microsoft/callback",
  microsoftController.microsoftLogin
);

export default router;
