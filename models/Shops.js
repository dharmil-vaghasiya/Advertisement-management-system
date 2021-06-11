const mongoose = require("mongoose");

const shopSchema = {
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
  shopName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  location: {
    type:String,
    required: true,
  },
  photo1: {
    type: String,
    default:"https://bootdey.com/img/Content/avatar/avatar7.png"
  },
  photo2: {
    type: String,
    default:"https://bootdey.com/img/Content/avatar/avatar7.png"
  },
  resetToken: String,
  expireToken: Date,
};

const Shop = mongoose.model("Shop", shopSchema);

module.exports = Shop;
