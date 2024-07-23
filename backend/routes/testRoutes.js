import express from "express";
const router = express.Router();

import User from "../models/user.js";

router.get("/api/fetchUsers", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/api/deleteUsers", async (req, res) => {
  try {
    await User.deleteMany();
    res.status(200).json({ message: "All users deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
