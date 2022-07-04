import http from "axios";
import config from "../app.config";

const saveRoute = async (completeRoute) => {
  const response = await http.post(config.router_project_api + "/my-routes", completeRoute, {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  });
  console.log(response.data);
};

export default saveRoute;
