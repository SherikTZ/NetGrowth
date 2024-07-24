import decryptJWT from "../utils/decryptJWT.js";
import User from "../models/user.js";
import mongoose from "mongoose";

const checkAuth = async (req, res) => {
  try {
    if (!req.cookies || !req.cookies.token) {
      return res.status(401).json({
        isAuthenticated: false,
        message: "No authentication token provided",
      });
    }

    const uid = decryptJWT(req.cookies.token);
    if (!uid) {
      return res.status(401).json({
        isAuthenticated: false,
        message: "Invalid authentication token",
      });
    }

    const user = await User.findOne({ _id: new mongoose.Types.ObjectId(uid) });
    if (!user) {
      return res.status(401).json({
        isAuthenticated: false,
        message: "User not found",
      });
    }

    const response = {
      isAuthenticated: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    };
    return res.json(response);
  } catch (error) {
    console.error("Error during authentication check:", error);
    return res.status(500).json({
      isAuthenticated: false,
      message: "Internal Server Error",
    });
  }
};

export default { checkAuth };
