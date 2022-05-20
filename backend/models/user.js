const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true },
    profile_id: { type: String, unique: true },
  },
  { timestamps: true }
);

const AuthEntity = mongoose.model("authEntity", userSchema);

module.exports = AuthEntity;
