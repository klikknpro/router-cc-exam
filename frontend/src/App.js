import React from "react";

function App() {
  const { REACT_APP_MAPBOX_ROUTER } = process.env;

  return (
    <div className="App">
      <h1>Hello Router</h1>
      <div id="mapbox"></div>
    </div>
  );
}

export default App;

/*

*/
