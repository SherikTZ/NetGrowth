import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/main/Home";

import Login from "./pages/login/Login";

import Signup from "./pages/signup/Signup";

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
      </Routes>
    </Router>
  );
}

export default App;
