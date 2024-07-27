import axios from "axios";
import User from "../models/user.js";
import generateJWT from "../utils/generateJWT.js";

const exchangeCodeForToken = async (authorizationCode) => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = process.env.GOOGLE_CALLBACK_LINK;

  try {
    const tokenResponse = await axios.post(
      "https://oauth2.googleapis.com/token",
      {
        client_id: clientId,
        client_secret: clientSecret,
        code: authorizationCode,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return tokenResponse.data.access_token;
  } catch (error) {
    console.error(
      "Token exchange error:",
      error.response ? error.response.data : error.message
    );
    return null;
  }
};

const fetchUserData = async (accessToken) => {
  try {
    const userResponse = await axios.get(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return userResponse.data;
  } catch (error) {
    console.error(
      "User data fetch error:",
      error.response ? error.response.data : error.message
    );
    return null;
  }
};

const findExistingUser = async (userData) => {
  const { email } = userData;
  try {
    const existingUser = await User.findOne({ email: email });
    return existingUser;
  } catch (error) {
    console.error("Error finding existing user:", error);
    return null;
  }
};

const googleLogin = async (req, res) => {
  const { code } = req.body;
  if (!code) {
    return res.status(400).json({ message: "Authorization code not provided" });
  }

  try {
    const accessToken = await exchangeCodeForToken(code);
    if (!accessToken) {
      return res.status(500).json({
        message: "Failed to exchange authorization code for access token",
      });
    }

    const userData = await fetchUserData(accessToken);
    if (!userData) {
      return res.status(500).json({ message: "Failed to fetch user data" });
    }

    const existingUser = await findExistingUser(userData);
    let user = existingUser;

    if (!existingUser) {
      user = new User({
        username: userData.email.split("@")[0], // Using email as username
        email: userData.email,
        authProvider: "google",
      });
      await user.save();
    }

    const token = generateJWT(user);
    const MAX_AGE = 1000 * 60 * 60 * 24 * 7; // 7 days

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: MAX_AGE,
    });

    return res.status(existingUser ? 200 : 201).json(user);
  } catch (error) {
    console.error("Error in Google login:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export default { googleLogin };
