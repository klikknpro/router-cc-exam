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
    if (response.status === 200) return setRouteToSave(null);
  } catch (err) {
    logger.error("Router server error", err);
    return alert("Router server error:" + err.status);
  }
};

export default saveRoute;
