const mongoose = require("mongoose");

const googleUserSchema = new mongoose.Schema(
  {
    googleId: String,
    displayName: String,
    email: String,
    image: String,
  },
  { timestamps: true }
);

const googleUser = mongoose.model("GoogleUser", googleUserSchema);

module.exports = googleUser;
