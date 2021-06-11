const mongoose = require("mongoose");

const sitemanagerSchema = {
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

const sitemanager = mongoose.model("sitemanager", sitemanagerSchema);

module.exports = sitemanager;
