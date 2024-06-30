import bcrypt from "bcryptjs";
import User from "../models/user.js";
import generateJWT from "../utils/generateJWT.js";

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = generateJWT(user);

    const MAX_AGE = 1000 * 60 * 60 * 24 * 7; // 7 days

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: MAX_AGE,
    });

    return res.status(200).json({ message: "User logged in" });
  } catch (error) {
    console.error("Error logging in user", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export default { login };
