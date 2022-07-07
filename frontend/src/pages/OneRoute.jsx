import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../providers/auth";
import http from "axios";
import config from "../app.config";
import logger from "../utils/logflare.js";
import { Switch, FormGroup, Stack, Typography, Button } from "@mui/material";

const OneRoute = ({ setAllRoutes, route }) => {
  const { token } = useAuth();
  const [checked, setChecked] = useState(false);
  // const [isPublic, setIsPublic] = useState(route.isPublic);

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
      // (err.response)
      logger.error("Router API error", err);
      if (err.response.status === 400) {
        window.location.reload(false);
        return alert("Cannot change the nothing!");
      }
      if (err.response.status === 404 && err.response.data === "Route id is missing") {
        window.location.reload(false);
        return alert("Route id is missing!");
      }
      if (err.response.status === 404 && err.response.data === "User not found.") {
        window.location.reload(false);
        return alert("User not found!");
      }
      if (err.response.status === 404 && err.response.data === "Route not found.") {
        window.location.reload(false);
        return alert("Route not found!");
      }
      if (err.response.status >= 500) {
        window.location.reload(false);
        return alert("Server error! Try again later.");
      }
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
      // (err.response)
      logger.error("Router API error", err);
      if (err.response.status === 400) {
        window.location.reload(false);
        return alert("Route id is missing!");
      }
      if (err.response.status === 404 && err.response.data === "User not found.") {
        window.location.reload(false);
        return alert("User not found!");
      }
      if (err.response.status === 404 && err.response.data === "Route not found") {
        window.location.reload(false);
        return alert("Route not found!");
      }
      if (err.response.status >= 500) {
        window.location.reload(false);
        return alert("Server error! Try again later.");
      }
    }
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
        </Stack>
      </FormGroup>
    </div>
  );
};

export default OneRoute;
