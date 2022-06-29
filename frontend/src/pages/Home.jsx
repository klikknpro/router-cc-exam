import React from "react";
import { useState, useEffect, useRef } from "react";
import http from "axios";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import geolocateFeature from "../map-features/geolocate";
import navigationFeature from "../map-features/navigation";
import drawFeature from "../map-features/draw";
import directions from "../map-features/directions";
import { Button } from "@mui/material";

/* this version is based on the Original MapBox tutorial */
const Home = () => {
  const mapContainer = useRef(null); // my DOM element
  const map = useRef(null); // rendered element
  const [lngStart, setLngStart] = useState(null); // for direction api
  const [latStart, setLatStart] = useState(null); // for direction api
  const [lngCurrent, setLngCurrent] = useState(null); // from geolocate
  const [latCurrent, setLatCurrent] = useState(null); // from geolocate

  /* for sidebar */
  const [lngInfo, setLngInfo] = useState(19.0402);
  const [latInfo, setLatInfo] = useState(47.4979);
  const [zoomInfo, setZoomInfo] = useState(10);

  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

  const geolocateStart = () => {
    console.log("register geolocate event at [] only!");
    geolocateFeature.on("geolocate", (data) => {
      console.log("set geolocate data");
      setLngStart(null);
      setLatStart(null);

      setLngCurrent(data.coords.longitude.toFixed(4));
      setLatCurrent(data.coords.latitude.toFixed(4));
      // console.log(data.coords.longitude.toFixed(4), data.coords.latitude.toFixed(4));
      map.current.flyTo({
        center: [data.coords.longitude, data.coords.latitude],
        zoom: 13,
      });
    });

    map.current.on("load", () => {
      console.log("trigger geolocate");
      geolocateFeature.trigger();
    });
  };

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
    map.current.addControl(drawFeature);

    // for sidebar
    map.current.on("move", () => {
      setLngInfo(map.current.getCenter().lng.toFixed(4));
      setLatInfo(map.current.getCenter().lat.toFixed(4));
      setZoomInfo(map.current.getZoom().toFixed(2));
    });

    map.current.on("draw.create", (e) => {
      // console.log(e.features[0].geometry.coordinates);
      const drawCoordinates = e.features[0].geometry.coordinates;
      directions(drawCoordinates, map);
    });

    map.current.on("draw.delete", (e) => {
      map.current.removeLayer("routeLayer");
      map.current.removeSource("routeLayer");
    });
    // eslint-disable-next-line
  }, [map.current]);

  useEffect(() => {
    geolocateStart();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // or will set lngStart from a click (user input)
    if (!lngStart && !latStart) {
      setLngStart(lngCurrent);
      setLatStart(latCurrent);
    }
    // eslint-disable-next-line
  }, [lngCurrent, latCurrent]);

  return (
    <div>
      <div className="sidebar">
        Longitude: {lngInfo} | Latitude: {latInfo} | Zoom: {zoomInfo}
      </div>
      <div ref={mapContainer} className="map-container" />
      <Button onClick={() => console.log(lngStart, latStart)}>Start Coordinates</Button>
      <Button onClick={() => drawFeature.trash()}>Trash line</Button>
    </div>
  );
};

export default Home;

/*

useEffect(() => {
    console.log("click event useEffect");
    if (lngStart && latStart) {
      // console.log(hanyszor futsz le? ha valtozik a location (elmozdul a device VAGY manualisat allitok be start poziciot), akkor is ujraregisztralod ezt a click eventet??)
      console.log("register click event");
      map.current.on("click", (event) => {
        let endCoords = [];
        for (const key in event.lngLat) {
          endCoords.push(event.lngLat[key]);
        }
        console.log("from", lngStart, latStart);
        console.log("to", endCoords);
        // ez igy mukodott f@szan, csak mindig ujabb es ujabb click eventet regisztralt
      });
    }
  }, [lngStart, latStart]); // ??? re-register click event?

useEffect(() => {
    if (lngStart && latStart) {
      // init LineString tool
      drawFeature.changeMode("draw_line_string");

      const featureCollection = drawFeature.getAll();
      const currentFeatureId = featureCollection.features[0].id;
      console.log(currentFeatureId, typeof currentFeatureId);

      drawFeature.changeMode("draw_line_string", {
        featureId: currentFeatureId,
        // couldn't find this featureId, but its there...
        from: [lngStart, latStart],
      });
      console.log("linestring activated");
    }

    // eslint-disable-next-line
  }, [lngStart, latStart]);

  */
