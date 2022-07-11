import React from "react";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../providers/auth";
import http from "axios";
import config from "../app.config";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import logger from "../utils/logflare";
import OneRoute from "./OneRoute";
import { Button } from "@mui/material";

const MyRoutes = () => {
  const { token } = useAuth();
  const mapSmallContainer = useRef(null); // my DOM element
  const mapSmall = useRef(null); // rendered element
  const [allRoutes, setAllRoutes] = useState(null);
  const [username, setUsername] = useState(null);
  const [disableGo, setDisableGo] = useState(false);

  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

  const getAllRoutes = async () => {
    try {
      const response = await http.get(config.router_project_api + "/my-routes", {
        headers: {
          authorization: token,
        },
      });
      setAllRoutes(response.data.myRoutes);
      setUsername(response.data.username);
    } catch (err) {
      logger.error("Router API error", err);
      const errStatus = err.response.status;
      const errMessage = err.response.data;

      window.location.reload(false);
      return alert(`
      Code: ${errStatus}
      Message: ${errMessage}
      `);
    }
  };

  const deleteActiveRoute = () => {
    if (mapSmall.current.getLayer("routeLayer")) mapSmall.current.removeLayer("routeLayer");
    if (mapSmall.current.getSource("routeLayer")) mapSmall.current.removeSource("routeLayer");
    if (mapSmall.current.getLayer("layer0")) mapSmall.current.removeLayer("layer0");
    if (mapSmall.current.getSource("source0")) mapSmall.current.removeSource("source0");
    if (mapSmall.current.getLayer("layer1")) mapSmall.current.removeLayer("layer1");
    if (mapSmall.current.getSource("source1")) mapSmall.current.removeSource("source1");
    if (mapSmall.current.getLayer("layer2")) mapSmall.current.removeLayer("layer2");
    if (mapSmall.current.getSource("source2")) mapSmall.current.removeSource("source2");
    if (mapSmall.current.getLayer("layer3")) mapSmall.current.removeLayer("layer3");
    if (mapSmall.current.getSource("source3")) mapSmall.current.removeSource("source3");
    if (mapSmall.current.getLayer("layer4")) mapSmall.current.removeLayer("layer4");
    if (mapSmall.current.getSource("source4")) mapSmall.current.removeSource("source4");
    setDisableGo(false);
  };

  useEffect(() => {
    getAllRoutes();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    /* on site load */
    if (mapSmall.current) return;
    mapSmall.current = new mapboxgl.Map({
      container: mapSmallContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [19.0402, 47.4979], // BP
      zoom: 10,
    });
    // eslint-disable-next-line
  }, [mapSmall.current]);

  return (
    <div className="my-routes">
      <div className="username">
        <h3>
          Hey {username && username}! Click <span> GO! </span> to show actual weather forecast for that route. ☀️🌧️🤞
        </h3>
      </div>
      <div className="my-routes-container">
        <div className="my-routes-left">
          {allRoutes &&
            allRoutes.map((route, i) => (
              <OneRoute
                setAllRoutes={setAllRoutes}
                route={route}
                mapSmall={mapSmall}
                disableGo={disableGo}
                setDisableGo={setDisableGo}
                key={i}
              />
            ))}
          <button className="clear-the-map" onClick={deleteActiveRoute} disabled={!disableGo}>
            clear the map <span>❌</span>
          </button>
        </div>
        <div className="my-routes-right">
          <div ref={mapSmallContainer} className="map-container-small" />
        </div>
      </div>
    </div>
  );
};

export default MyRoutes;
