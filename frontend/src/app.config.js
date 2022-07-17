const _config = {
  dev: {
    router_project_api: "http://localhost:8080/api",
    google_client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    google_base_url: process.env.REACT_APP_GOOGLE_BASE_URL,
  }, // "eldobhatos", teszt google app ize jobb lenne dev mode-ban
  prod: {
    router_project_api: process.env.REACT_APP_ROUTER_PROJECT_API,
    google_client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    google_base_url: process.env.REACT_APP_GOOGLE_BASE_URL,
  },
};

const config = process.env.NODE_ENV === "development" ? _config.dev : _config.prod; //a build folyamat allitja be, npm start-kor

export default config;
