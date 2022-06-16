const mongoose = require("mongoose");

// const checkpointSchema = new mongoose.Schema({
//   routeId: { type: String, required: true, unique: true },
//   coordinates: { type: String, required: true }, // response.routes[0].legs(iterate!).steps(iterate!).geometry.coordinates[1]
//   duration: { type: Number, required: true },
// });

const routeSchema = new mongoose.Schema({
  description: { type: String, required: true }, // input || response.routes[0].legs[0].summary
  uuid: { type: String, required: true }, // response.uuid
  from: { type: String, required: true }, // response.routes[0].geometry.coordinates[0]
  to: { type: String, required: true }, // response.routes[0].geometry.coordinates[lastOne]
  coordinates: { type: Array, required: true }, // response.routes[0].geometry.coordinates
  checkpoints: [checkpointSchema],
  distance: { type: Number, required: true }, // response.routes[0].distance
  isPublic: { type: Boolean, default: false },
  tFactor: { type: Number, required: true }, // Toughness - Factor
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
inkabb a "legs"-et hasznalom majd
 */
