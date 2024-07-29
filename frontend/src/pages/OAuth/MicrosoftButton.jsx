import React from "react";
import Button from "@mui/material/Button";
import MicrosoftIcon from "@mui/icons-material/Microsoft";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import mainTheme from "../../themes/mainTheme";

const VITE_MICROSOFT_CLIENT_ID = import.meta.env.VITE_MICROSOFT_CLIENT_ID;
const VITE_MICROSOFT_REDIRECT_URI = import.meta.env.VITE_MICROSOFT_REDIRECT_URI;
const VITE_MICROSOFT_DIRECTORY_ID = import.meta.env.VITE_MICROSOFT_DIRECTORY_ID;

const microsoftAuthUrl = `https://login.microsoftonline.com/${VITE_MICROSOFT_DIRECTORY_ID}/oauth2/v2.0/authorize?client_id=${VITE_MICROSOFT_CLIENT_ID}&response_type=code&redirect_uri=${VITE_MICROSOFT_REDIRECT_URI}&response_mode=query&scope=openid%20profile%20email%20User.Read`;

export default function MicrosoftButton() {
  return (
    <ThemeProvider theme={mainTheme}>
      <CssBaseline />
      <Button
        href={microsoftAuthUrl}
        variant="contained"
        color="primary"
        target="_blank"
      >
        <MicrosoftIcon />
      </Button>
    </ThemeProvider>
  );
}
