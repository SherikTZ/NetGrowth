import axios from "axios";
import User from "../models/user.js";
import generateJWT from "../utils/generateJWT.js";

const exchangeCodeForToken = async (authorizationCode) => {
  const clientId = process.env.MICROSOFT_CLIENT_ID;
  const clientSecret = process.env.MICROSOFT_SECRET;
  const redirectUri = process.env.MICROSOFT_REDIRECT_URI;
  const tenantId = process.env.MICROSOFT_DIRECTORY_ID;

  try {
    const tokenResponse = await axios.post(
      `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
      new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code: authorizationCode,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
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
      "https://graph.microsoft.com/v1.0/me",
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
  const { mail, userPrincipalName } = userData;
  try {
    const existingUser = await User.findOne({
      email: mail || userPrincipalName,
    });
    return existingUser;
  } catch (error) {
    console.error("Error finding existing user:", error);
    return null;
  }
};

const microsoftLogin = async (req, res) => {
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
        username:
          userData.displayName || userData.userPrincipalName.split("@")[0],
        email: userData.mail || userData.userPrincipalName,
        authProvider: "microsoft",
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
    console.error("Error in Microsoft login:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export default { microsoftLogin };
