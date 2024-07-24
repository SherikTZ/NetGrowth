import axios from "axios";
import { useState, useEffect } from "react";

const VITE_BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

export default function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get(`${VITE_BACKEND_API_URL}/checkAuth`, {
        withCredentials: true,
      });

      setIsLoggedIn(true);
      setUser(response.data.user);
    } catch (error) {
      setIsLoggedIn(false);
      setUser(null);

      if (error.response && error.response.status === 401) {
        console.log("User is not authenticated");
      } else {
        console.error("Auth check failed:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  return { isLoggedIn, user, loading, checkAuthStatus };
}
