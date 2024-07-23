import axios from "axios";
import { useState, useEffect } from "react";

export default function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/checkAuth", {
        withCredentials: true,
      });
      setIsLoggedIn(response.data.isAuthenticated);
      setUser(response.data.user);
    } catch (error) {
      console.error("Auth check failed:", error);
      setIsLoggedIn(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return { isLoggedIn, user, loading, checkAuthStatus };
}
