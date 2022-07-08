import React from "react";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../providers/auth";
import http from "axios";
import config from "../app.config";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import logger from "../utils/logflare";
import OneRoute from "./OneRoute";

const MyRoutes = ({ renderedMap }) => {
  const { token } = useAuth();
  const mapContainer = useRef(null); // my DOM element
  const map = useRef(null); // rendered element
  const [allRoutes, setAllRoutes] = useState(null);
  const [username, setUsername] = useState(null);

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

  useEffect(() => {
    getAllRoutes();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    /* on site load */
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [19.0402, 47.4979], // BP
      zoom: 10,
    });
    // eslint-disable-next-line
  }, [map.current]);

  return (
    <div>
      <h4>Username: {username && username}</h4>
      {allRoutes &&
        allRoutes.map((route, i) => <OneRoute setAllRoutes={setAllRoutes} route={route} renderedMap={map} key={i} />)}
      <div ref={mapContainer} className="map-container-small" />
    </div>
  );
};

export default MyRoutes;
