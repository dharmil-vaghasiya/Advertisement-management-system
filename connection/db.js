const mongoose = require("mongoose");
const { MONGOURL } = require("../config/keys");

const connectDB = async () => {
  await mongoose
    .connect(MONGOURL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => console.log("Database Connected"))
    .catch((err) => console.log(`Database Connection error ${err}`));
};

module.exports = connectDB;
