import React from "react";
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";
import { CssBaseline } from "@mui/material";
import mainTheme from "../../themes/mainTheme";
import { ThemeProvider } from "@mui/material/styles";

const VITE_GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const VITE_GOOGLE_REDIRECT_URI = import.meta.env.VITE_GOOGLE_REDIRECT_URI;
const googleAuthUrl = "https://accounts.google.com/o/oauth2/v2/auth";

export default function GoogleButton() {
  const handleGoogleLogin = () => {
    const params = new URLSearchParams({
      client_id: VITE_GOOGLE_CLIENT_ID,
      redirect_uri: VITE_GOOGLE_REDIRECT_URI,
      response_type: "code",
      scope: "email profile",
      prompt: "select_account",
    });

    const fullUrl = `${googleAuthUrl}?${params.toString()}`;
    window.location.href = fullUrl;
  };

  return (
    <ThemeProvider theme={mainTheme}>
      <CssBaseline />
      <Button
        variant="contained"
        color="primary"
        onClick={handleGoogleLogin}
        startIcon={<GoogleIcon />}
      ></Button>
    </ThemeProvider>
  );
}
