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

export default saveRoute;
