import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";

import AuthContext from "../../contexts/AuthContext";

export default function Navbar() {
  const { isLoggedIn, user, loading } = useContext(AuthContext);

  return (
    <div className="home">
      <nav>
        {isLoggedIn ? (
          <>
            <Link to="/profile">Profile ({user.username})</Link>
            <Link to="/logout">Log Out</Link>
          </>
        ) : (
          <>
            <Link to="/login">Log In</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </nav>
    </div>
  );
}
