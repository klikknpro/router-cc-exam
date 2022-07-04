const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema({
  description: { type: String, required: true }, // input || response.routes[0].legs[0].summary
  from: { type: Array, required: true }, // response.routes[0].geometry.coordinates[0]
  to: { type: Array, required: true }, // response.routes[0].geometry.coordinates[lastOne]
  coordinates: { type: Array, required: true }, // limit this to 25 only! (later)
  distance: { type: Number, required: true }, // response.routes[0].distance
  tFactor: { type: Array, required: true }, // Toughness - Factor
  isPublic: { type: Boolean, default: false },
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
