const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const errorHandler = require("./middleware/errorHandler");

const corsOptions = {
  origin: process.env.APP_URL, // a FE localhost kell ide
  optionsSuccessStatus: 200,
};

morgan.token("host", function (req, res) {
  return req.hostname;
});

app.use(express.json());
app.use(cors(corsOptions));
app.use(morgan(":method :url :status - HOST: :host  - :response-time ms"));

/* === ROUTES === */
const myRoutesRoutes = require("./route/myRoutes");
app.use("/api/my-routes", myRoutesRoutes);
const userRoutes = require("./route/user.js");
app.use("/api/user", userRoutes);
/* === *** === */

app.get("/", (req, res) => {
  console.log("Health check completed");
  res.sendStatus(200);
});

app.use(errorHandler);

module.exports = app;
