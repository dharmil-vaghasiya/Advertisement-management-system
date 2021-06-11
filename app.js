const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//port number
const port = process.env.PORT || 9000;

//DB connection
const connectDB = require("./connection/db");
connectDB();

app.use("/api", require("./routes/auth"));
app.use("/email", require("./routes/email"));
app.use("/razorpay", require("./routes/razorpay"));

app.listen(port, () => {
  console.log(`server is running...`, port);
});
