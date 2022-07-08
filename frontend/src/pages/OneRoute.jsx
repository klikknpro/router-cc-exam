import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/auth";
import http from "axios";
import config from "../app.config";
import logger from "../utils/logflare.js";
import { Switch, FormGroup, Stack, Typography, Button } from "@mui/material";
import directions from "../mapbox-features/directions";
import forecast from "../api/openWeatherApi";
import weatherMarkers from "../mapbox-features/weatherMarkers";

const OneRoute = ({ setAllRoutes, route, renderedMap }) => {
  const { token } = useAuth();
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

  const nav = (path) => {
    navigate(path);
  };

  const switchPublic = async () => {
    try {
      const response = await http.patch(
        config.router_project_api + "/my-routes/" + route._id,
        {
          isPublic: !checked,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );
      setChecked(response.data.isPublic);
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

  const deleteRoute = async () => {
    try {
      const response = await http.delete(
        config.router_project_api + "/my-routes/" + route._id,
        {
          headers: {
            authorization: token,
          },
        },
        {}
      );
      setAllRoutes([...response.data]);
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

  const goRoute = async () => {
    const allCoordinates = route.coordinates;
    const section = Math.round(allCoordinates.length / 24);
    const coordinates = [allCoordinates[0]];
    for (let i = 0; i < ; i++) {
      const element = array[i];

    }

    const savedRoute = await directions(route.coordinates, renderedMap);
    // console.log("route data from Directions", route);

    const markersData = await forecast(savedRoute);
    // console.log("markersData from OpenWeather", markersData);

    weatherMarkers(markersData, renderedMap);
    nav("/");
  };

  useEffect(() => {
    setChecked(route.isPublic);
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h4>{route.description}</h4>
      <h4>{route.distance} km</h4>
      <FormGroup>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography>Private</Typography>
          <Switch checked={checked} onChange={switchPublic} />
          <Typography>Public</Typography>
          <Button onClick={deleteRoute} size="small" color="warning">
            Delete route
          </Button>
          <Button onClick={goRoute}>GO!</Button>
        </Stack>
      </FormGroup>
    </div>
  );
};

export default OneRoute;
