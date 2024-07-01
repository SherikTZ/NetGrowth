import express from "express";
const router = express.Router();
import registerController from "../controllers/register.js";

import emailValidator from "../middlewares/validateEmail.js";
import validatePassword from "../middlewares/validatePassword.js";

router.get("/register", (req, res) => {
  res.send("Registration");
});

router.post(
  "/register",
  emailValidator,
  validatePassword,
  registerController.register
);

export default router;
