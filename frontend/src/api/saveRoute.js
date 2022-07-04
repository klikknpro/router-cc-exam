import http from "axios";
import config from "../app.config";

const saveRoute = async (completeRoute, setRouteToSave, token) => {
  const response = await http.post(config.router_project_api + "/my-routes", completeRoute, {
    headers: {
      authorization: token,
    },
  });
  setRouteToSave(null);
};

export default saveRoute;
