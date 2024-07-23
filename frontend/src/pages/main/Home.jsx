import React from "react";
import Navbar from "./Navbar";

import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";

export default function Home() {
  const { isLoggedIn, user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="home">
      <Navbar />
    </div>
  );
}
