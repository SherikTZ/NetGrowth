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

const VITE_BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

export default function Signup() {
  const { isLoggedIn, user, checkAuthStatus } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isLoggedIn && user) {
      navigate(`/profile/${user.username}`);
    }
  }, [isLoggedIn, user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${VITE_BACKEND_API_URL}/register`,
        formData,
        { withCredentials: true }
      );
      if (response.status === 200) {
        await checkAuthStatus();
      }
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <Box>
      <ThemeProvider theme={mainTheme}>
        <CssBaseline />
        <Typography variant="h1">Sign Up</Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <TextField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
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
