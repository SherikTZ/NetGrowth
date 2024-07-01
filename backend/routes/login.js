import express from "express";
const router = express.Router();
import loginController from "../controllers/login.js";

import emailValidator from "../middlewares/validateEmail.js";
import validatePassword from "../middlewares/validatePassword.js";

router.get("/login", (req, res) => {
  res.send("Login");
});

router.post("/login", emailValidator, validatePassword, loginController.login);

export default router;
