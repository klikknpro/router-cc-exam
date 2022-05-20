import { React, useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./routes/Home";
import HomeBox from "./routes/HomeBox";

function App() {
  // useEffect(() => {
  //   console.log("This app is in", process.env.NODE_ENV, "mode");
  // }, []);

  return (
    <div className="App">
      <h1>Hello Router</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/box" element={<HomeBox />} />
      </Routes>
    </div>
  );
}

export default App;

/*

*/
