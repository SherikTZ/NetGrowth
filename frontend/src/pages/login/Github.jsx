import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const VITE_BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

export default function Github() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleGithubLogin = async () => {
      const code = new URLSearchParams(window.location.search).get("code");
      if (!code) {
        return;
      }

      try {
        const response = await axios.post(
          `${VITE_BACKEND_API_URL}/oauth/github/callback`,
          { code },
          { withCredentials: true }
        );
        const user = response.data;
        navigate(`/profile/${user.username}`);
      } catch (error) {
        console.error("GitHub login error:", error);
        if (error.response) {
          console.error("Error response:", error.response.data);
        }
      }
    };

    handleGithubLogin();
  }, [navigate]);

  return null;
}
