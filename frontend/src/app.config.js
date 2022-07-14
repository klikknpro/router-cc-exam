const _config = {
  dev: {
    router_project_api: "http://localhost:8080/api",
    google_client_id: "352039495912-igun7ionlvauugjs3vfoa8lg1noq9d8a.apps.googleusercontent.com",
    google_base_url: "https://accounts.google.com/o/oauth2/v2/auth",
  }, // "eldobhatos", teszt google app ize
  prod: {
    router_project_api: process.env.REACT_APP_ROUTER_PROJECT_API || "http://localhost:8080/api",
    google_client_id:
      process.env.REACT_APP_GOOGLE_CLIENT_ID ||
      "352039495912-igun7ionlvauugjs3vfoa8lg1noq9d8a.apps.googleusercontent.com",
    google_base_url: process.env.REACT_APP_GOOGLE_BASE_URL || "https://accounts.google.com/o/oauth2/v2/auth",
  },
};

const config = process.env.NODE_ENV === "development" ? _config.dev : _config.prod; //a build folyamat allitja be, npm start-kor

export default config;
