import express from "express";
const router = express.Router();
import loginController from "../controllers/login.js";

router.get("/login", (req, res) => {
  res.send("Login");
});

router.post("/login", loginController.login);

export default router;
