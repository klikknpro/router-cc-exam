import http from "axios";
import logger from "../utils/logflare";
import config from "../app.config";

const saveRoute = async (completeRoute, setRouteToSave, token) => {
  try {
    const response = await http.post(config.router_project_api + "/my-routes", completeRoute, {
      headers: {
        authorization: token,
      },
    });
    // (response.data.data)
    return setRouteToSave(null);
  } catch (err) {
    // (err.response)
    logger.error("Router API error", err);
    if (err.response.status === 400) {
      window.location.reload(false);
      return alert("Missing data from request body!");
    }
    if (err.response.status === 404) {
      window.location.reload(false);
      return alert("User not found!");
    }
    if (err.response.status >= 500) {
      window.location.reload(false);
      return alert("Server error! Try again later.");
    }
  }
};

export default saveRoute;
