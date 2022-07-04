import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../providers/auth";
import http from "axios";
import config from "../app.config";
import { Switch } from "@mui/material";

const OneRoute = ({ route }) => {
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

  useEffect(() => {
    setChecked(route.isPublic);
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h4>{route.description}</h4>
      <h4>{route.distance} km</h4>
      <Switch checked={checked} onChange={switchPublic} />
    </div>
  );
};

export default OneRoute;
