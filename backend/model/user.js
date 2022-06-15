const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema({
  description: { type: String, required: true }, // input || response.routes[0].legs[0].summary
  uuid: { type: String, required: true }, // response.uuid
  from: { type: String, required: true }, // response.routes[0].geometry.coordinates[0]
  to: { type: String, required: true }, // response.routes[0].geometry.coordinates[lastOne]
  /* if (waypoints < enough) response.routes[0].geometry.coordinates  */
  waypoints: { type: Array, required: true }, // response.routes[0].waypoints
  distance: { type: Number, required: true }, // response.routes[0].distance
  isPublic: { type: Boolean, default: false },
  tFactor: { type: Number, required: true },
});

const userSchema = new mongoose.Schema({
  username: { type: String },
  providers: {
    google: { type: String, sparse: true, unique: true },
  },
  myRoutes: [routeSchema],
});

const User = mongoose.model("user", userSchema);
module.exports = User;

/*
 */
