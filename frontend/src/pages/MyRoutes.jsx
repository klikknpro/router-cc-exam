import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../providers/auth";
import http from "axios";
import config from "../app.config";
import logger from "../utils/logflare";
import OneRoute from "./OneRoute";

const MyRoutes = () => {
  const { token } = useAuth();
  const [allRoutes, setAllRoutes] = useState(null);
  const [username, setUsername] = useState(null);

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
      logger.error("Router server error", err);
      return alert("Router server error:" + err.status);
    }
  };

  useEffect(() => {
    getAllRoutes();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h4>Username: {username && username}</h4>
      {allRoutes && allRoutes.map((route, i) => <OneRoute setAllRoutes={setAllRoutes} route={route} key={i} />)}
    </div>
  );
};

export default MyRoutes;
