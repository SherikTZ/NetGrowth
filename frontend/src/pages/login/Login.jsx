import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";

const VITE_BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

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
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
