import express from "express";
const router = express.Router();
import registerController from "../controllers/register.js";

router.get("/register", (req, res) => {
  res.send("Registration");
});

router.post("/register", registerController.register);

export default router;
