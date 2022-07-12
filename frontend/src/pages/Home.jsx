import React from "react";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../providers/auth";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import geolocateFeature from "../mapbox-features/geolocate";
import navigationFeature from "../mapbox-features/navigation";
import drawFeature from "../mapbox-features/draw";
import directions from "../mapbox-features/directions";
import forecast from "../api/openWeatherApi";
import weatherMarkers from "../mapbox-features/weatherMarkers";
import saveRoute from "../api/saveRoute";
import cyclist from "../img/Router-main-img-fill.png";
import pointer from "../img/iconmonstr-cursor-31-120.png";

const Home = () => {
  const { token } = useAuth();
  const mapContainer = useRef(null); // my DOM element
  const map = useRef(null); // rendered element
  const [routeToSave, setRouteToSave] = useState(null);
  const [message, setMessage] = useState(false);

  /* for infobar only */
  const [lngInfo, setLngInfo] = useState(19.0402);
  const [latInfo, setLatInfo] = useState(47.4979);
  const [zoomInfo, setZoomInfo] = useState(10);

  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

  const appendRouteData = (route, markersData) => {
    const weatherCodes = markersData.map((marker) => marker.weatherCode);

    setRouteToSave({
      description: route.legs[0].summary,
      from: route.geometry.coordinates[0],
      to: route.geometry.coordinates[route.geometry.coordinates.length - 1],
      coordinates: route.geometry.coordinates,
      distance: parseInt((route.distance / 1000).toFixed(1)),
      tFactor: weatherCodes,
    });
  };

  const geolocateStart = () => {
    console.log("register geolocate event at []");
    geolocateFeature.on("geolocate", (data) => {
      // console.log("set geolocate data");
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
    /* on site load */
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [19.0402, 47.4979], // BP
      zoom: 10,
    });

    map.current.addControl(geolocateFeature);
    map.current.addControl(navigationFeature);
    map.current.addControl(drawFeature);

    /* for infobar */
    map.current.on("move", () => {
      setLngInfo(map.current.getCenter().lng.toFixed(4));
      setLatInfo(map.current.getCenter().lat.toFixed(4));
      setZoomInfo(map.current.getZoom().toFixed(2));
    });

    /* main sh1t happens here */
    map.current.on("draw.create", async (e) => {
      const drawCoordinates = e.features[0].geometry.coordinates;
      const route = await directions(drawCoordinates, map);
      // console.log("route data from Directions", route);

      const markersData = await forecast(route);
      // console.log("markersData from OpenWeather", markersData);

      appendRouteData(route, markersData);

      weatherMarkers(markersData, map);
    });

    map.current.on("draw.delete", (e) => {
      console.log("draw.delete event", e);
      if (map.current.getLayer("routeLayer")) map.current.removeLayer("routeLayer");
      if (map.current.getSource("routeLayer")) map.current.removeSource("routeLayer");
      if (map.current.getLayer("layer0")) map.current.removeLayer("layer0");
      if (map.current.getSource("source0")) map.current.removeSource("source0");
      if (map.current.getLayer("layer1")) map.current.removeLayer("layer1");
      if (map.current.getSource("source1")) map.current.removeSource("source1");
      if (map.current.getLayer("layer2")) map.current.removeLayer("layer2");
      if (map.current.getSource("source2")) map.current.removeSource("source2");
      if (map.current.getLayer("layer3")) map.current.removeLayer("layer3");
      if (map.current.getSource("source3")) map.current.removeSource("source3");
      if (map.current.getLayer("layer4")) map.current.removeLayer("layer4");
      if (map.current.getSource("source4")) map.current.removeSource("source4");
      setMessage(false);
    });
    // eslint-disable-next-line
  }, [map.current]);

  useEffect(() => {
    geolocateStart();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="main">
      <div className="about">
        <h3>
          Welcome <span>Cyclist!</span> Plan your route using that tool on the right <span>👉</span> and see how the
          weather will change during your training. <span>😉</span>
        </h3>
      </div>
      <div className="home-container">
        <div className="home-left">
          <img src={cyclist} alt="cyclist thinking about route" />
          {localStorage.getItem("token") && (
            <button
              onClick={() => {
                saveRoute(routeToSave, setRouteToSave, token);
                setMessage(true);
              }}
              disabled={routeToSave === null ? true : false}>
              save route
            </button>
          )}
          {message && (
            <p>
              we saved it to
              <br />
              MY ROUTES! 👍
            </p>
          )}
        </div>
        <div className="home-right">
          <div ref={mapContainer} className="map-container" />
          <div className="map-sidebar">
            Longitude: {lngInfo} | Latitude: {latInfo} | Zoom: {zoomInfo}
          </div>
        </div>
        <img className="home-pointer" src={pointer} alt="pointer" />
      </div>
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
