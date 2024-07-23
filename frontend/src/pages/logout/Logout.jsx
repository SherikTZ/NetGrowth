import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VITE_BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";

export default function Logout() {
  const navigate = useNavigate();
  const { checkAuthStatus } = useContext(AuthContext);

  useEffect(() => {
    const logout = async () => {
      try {
        await axios.post(
          `${VITE_BACKEND_API_URL}/logout`,
          {},
          {
            withCredentials: true,
          }
        );
        // Update the auth state using checkAuthStatus
        await checkAuthStatus();
        // Then navigate
        navigate("/");
      } catch (error) {
        console.error("Logout error:", error);
      }
    };
    logout();
  }, [navigate, checkAuthStatus]);

  return null;
}
