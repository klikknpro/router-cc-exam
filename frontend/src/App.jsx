import React from "react";
import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Protected from "./components/Protected";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Callback from "./pages/Callback";

function App() {
  // useEffect(() => {
  //   console.log("This app is in", process.env.NODE_ENV, "mode");
  // }, []);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/profile"
          element={
            <Protected>
              <Profile />
            </Protected>
          }
        />
        <Route
          path="/register"
          element={
            <Protected>
              <Register />
            </Protected>
          }
        />
        <Route path="/callback/google" element={<Callback />} />
      </Routes>
    </div>
  );
}

export default App;

/*

*/
