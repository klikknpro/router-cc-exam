import { React, useState, useEffect } from "react";
import Map from "react-map-gl";

// this is a Controlled map by the "react-map-gl" module
const HomeReactMapGl = () => {
  const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

  const [viewState, setViewState] = useState({
    latitude: 47.497913,
    longitude: 19.040236,
    zoom: 10,
  });

  return (
    <div>
      <h1>Hello Router</h1>
      <Map
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        style={{ width: 800, height: 600 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={MAPBOX_TOKEN}></Map>
    </div>
  );
};

export default HomeReactMapGl;
