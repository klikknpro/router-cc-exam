import axios from "axios";
// import config from "../app.config";

export const routerProjectApi = () => {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_ROUTER_PROJECT_API,
    timeout: 3000,
  });

  const post = async (path, data) => {
    try {
      const response = await instance.post(path, data, {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      });
      return response;
    } catch (err) {
      if (!err.response) return err;
      return err.response;
    }
  };

  const get = async (path) => {
    try {
      const resp = await instance.get(path, {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      });
      return resp;
    } catch (error) {
      console.log(error.response.status);
      console.log(error.response.data);
      return error.response;
    }
  };
  return { post, get };
};

/*

*/
