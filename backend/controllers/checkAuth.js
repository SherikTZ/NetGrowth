import decryptJWT from "../utils/decryptJWT.js";
import User from "../models/user.js";
import mongoose from "mongoose";

const checkAuth = async (req, res) => {
  try {
    const uid = decryptJWT(req.cookies.token);

    if (!uid) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findOne({ _id: new mongoose.Types.ObjectId(uid) });

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const response = {
      isAuthenticated: true,
      user: {
        username: user.username,
        email: user.email,
      },
    };

    return res.json(response);
  } catch (error) {
    console.error("Error during authentication check:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default { checkAuth };
