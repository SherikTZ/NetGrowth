import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { CssBaseline } from "@mui/material";
import mainTheme from "../../themes/mainTheme";
import { ThemeProvider } from "@mui/material/styles";

import GithubButton from "../OAuth/GithubButton";
import GoogleButton from "../OAuth/GoogleButton";
import MicrosoftButton from "../OAuth/MicrosoftButton";

import ReCAPTCHA from "react-google-recaptcha";

const VITE_BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RE_CAPTCHA_SITE_KEY;

export default function Login() {
  const { isLoggedIn, user, checkAuthStatus } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showRecaptcha, setShowRecaptcha] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn && user) {
      navigate(`/profile/${user.username}`);
    }

    const random_recaptcha = Math.random();

    if (random_recaptcha < 0.15) {
      setShowRecaptcha(true);
    }
  }, [isLoggedIn, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (showRecaptcha && !captchaValue) {
      alert("Please complete the reCAPTCHA");
      return;
    }

    if (showRecaptcha && captchaValue) {
      try {
        const recaptchaResponse = await axios.post(
          `${VITE_BACKEND_API_URL}/api/recaptcha`,
          { captcha: captchaValue }
        );

        if (!recaptchaResponse.data.success) {
          alert(recaptchaResponse.data.message);
          return;
        }
      } catch (error) {
        console.error("reCAPTCHA verification error:", error);
        alert("reCAPTCHA verification failed");
        return;
      }
    }

    try {
      const response = await axios.post(
        `${VITE_BACKEND_API_URL}/login`,
        { email, password },
        { withCredentials: true }
      );
      if (response.status === 200) {
        await checkAuthStatus();
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleCaptchaVerify = (value) => {
    setCaptchaValue(value);
  };

  return (
    <Box>
      <ThemeProvider theme={mainTheme}>
        <CssBaseline />
        <Typography variant="h1">Login</Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
          />
          {showRecaptcha && (
            <ReCAPTCHA
              sitekey={RECAPTCHA_SITE_KEY}
              onChange={handleCaptchaVerify}
            />
          )}
          <Button type="submit" color="info" variant="contained">
            Submit
          </Button>
        </Box>
        <Stack direction="row" spacing={2}>
          <GithubButton />
          <GoogleButton />
          <MicrosoftButton />
        </Stack>
      </ThemeProvider>
    </Box>
  );
}
