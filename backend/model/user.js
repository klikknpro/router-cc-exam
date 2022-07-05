const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema({
  description: { type: String, required: true },
  from: { type: Array, required: true },
  to: { type: Array, required: true },
  coordinates: { type: Array, required: true },
  distance: { type: Number, required: true },
  tFactor: { type: Array, required: true },
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
