import axios from "axios";
import User from "../models/user.js";
import generateJWT from "../utils/generateJWT.js";

const exchangeCodeForToken = async (authorizationCode) => {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;
  const redirectUri = process.env.GITHUB_CALLBACK_LINK;

  try {
    const tokenResponse = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: clientId,
        client_secret: clientSecret,
        code: authorizationCode,
        redirect_uri: redirectUri,
      },
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    const accessToken = tokenResponse.data.access_token;
    return accessToken;
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
    const userResponse = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `token ${accessToken}`,
      },
    });

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
  const { email, login } = userData;
  try {
    const existingUser = await User.findOne({
      $or: [{ email: email }, { username: login }],
    });

    return existingUser;
  } catch (error) {
    console.error("Error finding existing user:", error);
    return null;
  }
};

const githubLogin = async (req, res) => {
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
        username: userData.login,
        email: userData.email || `${userData.login}@github.com`,
        authProvider: "github",
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
    console.error("Error in GitHub login:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export default { githubLogin };
