import { React, useState, useEffect } from "react";
import Map, { Source, Layer } from "react-map-gl";
import { Button } from "@mui/material";
import tornado from "../icons/iconmonstr-weather-88-32.png";

// this is a Controlled map by the "react-map-gl" module
const HomeMapGl = () => {
  const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

  const [viewState, setViewState] = useState({
    // Budapest as initial map view on load
    longitude: 19.040236,
    latitude: 47.497913,
    zoom: 10,
  });

  const london = { longitude: -0.127758, latitude: 51.507351, zoom: 10 };
  const ormezo = { longitude: 19.015674, latitude: 47.460726 };
  const kelenfold = { longitude: 19.040925, latitude: 47.465008 };

  const geojson = {
    type: "FeatureCollection",
    features: [
      // can be filled with an array of waypoint coordinate objects
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [19.015674, 47.460726],
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [19.040925, 47.465008],
        },
      },
    ],
  };

  const layerStyle = {
    id: "weather",
    type: "symbol",
    "icon-image": tornado,
    "text-field": "tornado",
  };

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
        mapboxAccessToken={MAPBOX_TOKEN}>
        <Source id="waypoints" type="geojson" data={geojson}>
          <Layer {...layerStyle} />
        </Source>
      </Map>
    </div>
  );
};

export default HomeMapGl;

/*
      <Button onClick={() => setViewState(london)} variant="contained">
        London
      </Button>
*/
