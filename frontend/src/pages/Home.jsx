import React from "react";
import { useState, useEffect, useRef } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import http from "axios";
import { Button } from "@mui/material";

/* this version is based on the Original MapBox tutorial */
const Home = () => {
  const mapContainer = useRef(null); // my DOM element
  const map = useRef(null); // rendered element
  const [lngStart, setLngStart] = useState(null);
  const [latStart, setLatStart] = useState(null);

  /* for sidebar */
  const [lngInfo, setLngInfo] = useState(19.0402);
  const [latInfo, setLatInfo] = useState(47.4979);
  const [zoomInfo, setZoomInfo] = useState(10);

  const geolocateStart = () => {
    console.log("running start");

    geolocateFeature.on("geolocate", (data) => {
      setLngStart(data.coords.longitude.toFixed(4));
      setLatStart(data.coords.latitude.toFixed(4));
      // console.log(data.coords.longitude.toFixed(4), data.coords.latitude.toFixed(4));
    });

    map.current.on("load", () => {
      geolocateFeature.trigger();
    });
  };

  /* === >>> locate button <<< === */
  const geolocateFeature = new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true,
    },
    trackUserLocation: false,
    style: {
      right: 10,
      top: 10,
    },
    position: "bottom-left",
    showUserHeading: true,
  });

  /* === >>> navigation buttons <<< === */
  const navigationFeature = new mapboxgl.NavigationControl();

  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

  /* === >>> initialize map (only once) <<< === */
  useEffect(() => {
    // on site load
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [19.0402, 47.4979],
      zoom: 10,
    });

    map.current.addControl(geolocateFeature);
    map.current.addControl(navigationFeature);

    // for sidebar
    map.current.on("move", () => {
      setLngInfo(map.current.getCenter().lng.toFixed(4));
      setLatInfo(map.current.getCenter().lat.toFixed(4));
      setZoomInfo(map.current.getZoom().toFixed(2));
    });

    // eslint-disable-next-line
  }, [map.current]);

  useEffect(() => {
    console.log("start useeffect");
    geolocateStart();
    // eslint-disable-next-line
  }, []);

  // useEffect(() => {
  //   // setlngStart from a click (user input)
  //   if (!lngStart && !latStart) setLngStart(current) setLatStart(current)
  // }, [lngCurrent, latCurrent]); // geolocateFeature ezt allitja

  useEffect(() => {
    if (lngStart && latStart) {
      // console.log(hanyszor futsz le? ha valtozik a location (elmozdul a device VAGY manualisat allitok be start poziciot), akkor is ujraregisztralod ezt a click eventet??)
      map.current.on("click", (event) => {
        let endCoords = [];
        for (const key in event.lngLat) {
          endCoords.push(event.lngLat[key]);
        }
        console.log("from", lngStart, latStart);
        console.log("to", endCoords);
      });
    }
  }, [lngStart, latStart]); // ??? re-register click event?

  return (
    <div>
      <div className="sidebar">
        Longitude: {lngInfo} | Latitude: {latInfo} | Zoom: {zoomInfo}
      </div>
      <div ref={mapContainer} className="map-container" />
      <Button onClick={() => console.log(lngStart, latStart)}>Start</Button>
    </div>
  );
};

export default Home;

/*
geolocateFeature.on('geolocate', () => {
console.log('A geolocate event has occurred.');
});
*/
