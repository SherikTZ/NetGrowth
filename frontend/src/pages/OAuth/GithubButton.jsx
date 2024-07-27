import React from "react";

import Button from "@mui/material/Button";
import GitHubIcon from "@mui/icons-material/GitHub";

const VITE_GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;
const VITE_GITHUB_REDIRECT_URI = import.meta.env.VITE_GITHUB_REDIRECT_URI;

const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${VITE_GITHUB_CLIENT_ID}&redirect_uri=${VITE_GITHUB_REDIRECT_URI}`;

export default function GithubButton() {
  return (
    <Button
      href={githubAuthUrl}
      variant="contained"
      color="secondary"
      target="_blank"
    >
      <GitHubIcon />
    </Button>
  );
}
