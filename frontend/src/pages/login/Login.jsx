import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import GitHubIcon from "@mui/icons-material/GitHub";

const VITE_BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;
const VITE_GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;
const VITE_GITHUB_REDIRECT_URI = import.meta.env.VITE_GITHUB_REDIRECT_URI;

const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${VITE_GITHUB_CLIENT_ID}&redirect_uri=${VITE_GITHUB_REDIRECT_URI}`;

export default function Login() {
  const { isLoggedIn, user, loading, checkAuthStatus } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isLoggedIn && user) {
      navigate(`/profile/${user.username}`);
    }
  }, [isLoggedIn, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
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

  return (
    <Box>
      <Typography variant="h1">Login</Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Box>
      <Stack direction="row" spacing={2}>
        <Button
          href={githubAuthUrl}
          variant="contained"
          color="secondary"
          target="_blank"
        >
          <GitHubIcon />
        </Button>
      </Stack>
    </Box>
  );
}
