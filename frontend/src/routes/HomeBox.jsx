import { React, useState, useEffect, useRef } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

// this version is based on the Original MapBox tutorial
const HomeBox = () => {
  // set the map's default state
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(19.040236);
  const [lat, setLat] = useState(47.497913);
  const [zoom, setZoom] = useState(10);

  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
  });

  return <div>HomeBox</div>;
};

export default HomeBox;
