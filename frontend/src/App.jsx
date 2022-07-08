import React from "react";
import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import NavbarComp from "./components/NavbarComp";
import Home from "./pages/Home";
import Protected from "./components/Protected";
import MyRoutes from "./pages/MyRoutes";
import Register from "./pages/Register";
import Callback from "./pages/Callback";

function App() {
  // useEffect(() => {
  //   console.log("This app is in", process.env.NODE_ENV, "mode");
  // }, []);
  const [renderedMap, setRenderedMap] = useState(null);

  return (
    <div className="App">
      <NavbarComp />
      <Routes>
        <Route path="/" element={<Home setRenderedMap={setRenderedMap} />} />
        <Route
          path="/my-routes"
          element={
            <Protected>
              <MyRoutes renderedMap={renderedMap} />
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
