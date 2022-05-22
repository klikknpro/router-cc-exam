import { React, useState, useEffect } from "react";
import Map from "react-map-gl";
import { Button } from "@mui/material";

// this is a Controlled map by the "react-map-gl" module
const HomeMapGl = () => {
  const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

  const [viewState, setViewState] = useState({
    longitude: 19.040236,
    latitude: 47.497913,
    zoom: 10,
  });

  return (
    <div>
      <h1>Hello Router</h1>
      <div className="sidebar">
        Longitude: {viewState.longitude} | Latitude: {viewState.latitude} | Zoom: {viewState.zoom}
      </div>
      <Map
        {...viewState}
        onMove={(e) => setViewState(e.viewState)}
        style={{ width: 800, height: 600 }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={MAPBOX_TOKEN}></Map>
      <Button onClick={() => setViewState({ longitude: -0.127758, latitude: 51.507351, zoom: 10 })}>London</Button>
    </div>
  );
};

export default HomeMapGl;

/*
lng -0.127758
lat 51.507351
*/
