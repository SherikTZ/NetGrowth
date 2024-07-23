import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/main/Home";

import Login from "./pages/login/Login";

import Signup from "./pages/signup/Signup";
import Verify from "./pages/signup/Verify";

import Logout from "../src/pages/logout/Logout";

import Profile from "./pages/profile/Profile";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />

        {/* login routes */}
        <Route path="/login" element={<Login />} />

        {/*Sign up routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify/:token" element={<Verify />} />

        {/*Logout routes*/}
        <Route path="/logout" element={<Logout />} />

        {/*Private routes*/}
        <Route path="/profile:username" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
