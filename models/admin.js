const mongoose = require("mongoose");

const adminSchema = {
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  resetToken: String,
  expireToken: Date,
};

const admin = mongoose.model("admin", adminSchema);

module.exports = admin;
