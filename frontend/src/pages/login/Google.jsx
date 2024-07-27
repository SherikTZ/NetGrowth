import react from "react";

import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const VITE_BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

export default function GoogleCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleGoogleLogin = async () => {
      const code = new URLSearchParams(window.location.search).get("code");
      if (!code) {
        return;
      }

      try {
        const response = await axios.post(
          `${VITE_BACKEND_API_URL}/oauth/google/callback`,
          { code },
          { withCredentials: true }
        );

        const user = response.data;
        navigate(`/profile/${user.username}`);
      } catch (error) {
        console.error("Google login error:", error);
        if (error.response) {
          console.error("Error response:", error.response.data);
        }
      }
    };

    handleGoogleLogin();
  }, [navigate]);

  return null;
}
