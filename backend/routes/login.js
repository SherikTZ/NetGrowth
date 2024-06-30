import express from "express";
const router = express.Router();
import loginController from "../controllers/login.js";
import emailValidator from "../middlewares/validateEmail.js";

router.get("/login", (req, res) => {
  res.send("Login");
});

router.post("/login", emailValidator, loginController.login);

export default router;
