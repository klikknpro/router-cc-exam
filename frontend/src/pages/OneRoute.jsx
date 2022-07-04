import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../providers/auth";
import http from "axios";
import config from "../app.config";
import { Switch, FormGroup, Stack, Typography, Button } from "@mui/material";

const OneRoute = ({ setAllRoutes, route }) => {
  const { token } = useAuth();
  const [checked, setChecked] = useState(false);
  // const [isPublic, setIsPublic] = useState(route.isPublic);

  const switchPublic = async () => {
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
  };

  const deleteRoute = async () => {
    const response = await http.delete(
      config.router_project_api + "/my-routes/" + route._id,
      {
        headers: {
          authorization: token,
        },
      },
      {}
    );
    // console.log(response.data);
    setAllRoutes([...response.data]);
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
