import bcrypt from "bcryptjs";
import User from "../models/user.js";
import generateJWT from "../utils/generateJWT.js";
import sendEmail from "../utils/sendEmail.js";

// POST /register

const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingEmail = await User.findOne({ email });
    const existingUsername = await User.findOne({ username });

    if (existingEmail || existingUsername) {
      return res.status(409).json({ message: "User already exists" });
    }

    const SALT_LENGTH = 10;

    const hashedPassword = await bcrypt.hash(password, SALT_LENGTH);

    const user = new User({
      username,
      email,
      passwordHash: hashedPassword,
      authProvider: "local",
    });

    await user.save();

    const token = generateJWT(user);

    const MAX_AGE = 1000 * 60 * 60 * 24 * 7; // 7 days

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: MAX_AGE,
    });

    const verificationLink = `${process.env.FRONTEND_BASE_URL}/verify/${token}`;

    const emailText = `Click on the link to verify your email: ${verificationLink}`;

    await sendEmail(email, "Email Verification", emailText);

    return res.status(201).json({
      message: "User registered successfully. Verification email sent.",
    });
  } catch (error) {
    console.error("Registration error:", error); // Improved logging
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export default { register };
