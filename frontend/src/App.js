import { React, useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./routes/Home";

function App() {
  // useEffect(() => {
  //   console.log("This app is in", process.env.NODE_ENV, "mode");
  // }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;

/*

*/
