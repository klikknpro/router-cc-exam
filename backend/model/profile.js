const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({}, { timestamps: true });

const Profile = mongoose.model("profile", profileSchema);

module.exports = Profile;

/*
{
  from: String,
  to: String,
  distance: Number,
  date: String,
  comments: Array
}
*/
