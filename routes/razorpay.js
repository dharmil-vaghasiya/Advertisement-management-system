var express = require("express");
var router = express.Router();

const Razorpay = require("razorpay");
const request = require("request");
const consignment = require("../models/consignment");
const paymentlog = require("../models/paymentlog");
const Shop = require("../models/Shops");
const influencer = require("../models/Influencers");

const keys = require("../config/keys");
//ngrok.exe http 9000
const razorInstance = new Razorpay({
  key_id: keys.razorIdkey,
  key_secret: keys.razorIdSecret,
});
router.post("/order", async (req, res) => {
  var info = req.body.Amount;
  var amt = parseInt(info, 10);
  var _id = req.body.consid;
  try {
    const options = {
      amount: amt * 100,
      currency: "INR",
      receipt: "receipt#1",
      payment_capture: 0, //1
    };
    razorInstance.orders.create(options, function (err, order) {
      if (err) {
        return res.status(500).json({
          message: "Something error!s",
        });
      }
      return res.status(200).json(order);
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something error!s",
    });
  }
});

router.post("/capture/:paymentId", (req, res) => {
  var info = req.body.Amount;
  var amt = parseInt(info, 10);
  try {
    return request(
      {
        method: "POST",
        url: `https://${keys.razorIdkey}:${keys.razorIdSecret}@api.razorpay.com/v1/payments/${req.params.paymentId}/capture`,
        form: {
          amount: amt * 100,
          currency: "INR",
        },
      },
      async function (err, response, body) {
        if (err) {
          return res.status(500).json({
            message: "Something error!s",
          });
        }
        return res.status(200).json(body);
      }
    );
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

router.post("/verification", async (req, res) => {
  const secret = "Abhishek&Dharmil";
  console.log("Verification");
  const crypto = require("crypto");

  const shasum = crypto.createHmac("sha256", secret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");

  if (digest === req.headers["x-razorpay-signature"]) {
    const { payload } = req.body;
    const { payment } = payload;
    const { entity } = payment;
    var pid = entity.id;
    var amo = entity.amount;
    var consid = entity.description;
    var oid = entity.order_id;
    amo = amo / 100;

    var shopid;
    var infid;
    var shopemail;
    var infemail;
    await consignment
      .findOneAndUpdate(
        { _id: consid },
        {
          $set: {
            order_id: oid,
            Amount: amo,
            paymentstatus: 1,
            shoprequest: 2,
          },
        },
        { new: true },
        (err, doc) => {
          if (err) {
            console.log("Something wrong when updating data!");
          } else {
          }
        }
      )
      .then(async (cons) => {
        // console.log(cons);
        shopid = cons.shopid;
        infid = cons.influencerid;
        await Shop.findById(shopid)
          .then((data1) => {
            shopemail = data1.email;
          })
          .catch((err) => console.log(err));

        await influencer
          .findById(infid)
          .then((data1) => {
            infemail = data1.email;
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        return res.status(500).json({
          message: "Something error!",
        });
      });
    var d = new Date().toLocaleString(undefined, { timeZone: "Asia/Kolkata" });

    const newlog = new paymentlog({
      consid,
      paymentid: pid,
      Amount: amo,
      paymentstatus: 1,
      order_id: oid,
      date: d,
      senderemail: shopemail,
      receiveremail: infemail,
    });
    await newlog
      .save()
      .then((nlog) => {
        console.log(nlog);
        res.json({ status: "ok" });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    // pass it
    res.json({ status: "ok" });
  }
});

router.post("/paymentfailed", async (req, res) => {
  const secret = "Abhishek&Dharmil";
  console.log("payment failed");
  const crypto = require("crypto");
  const shasum = crypto.createHmac("sha256", secret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");

  if (digest === req.headers["x-razorpay-signature"]) {
    const { payload } = req.body;
    const { payment } = payload;
    const { entity } = payment;
    var pid = entity.id;
    var amo = entity.amount;
    var consid = entity.description;
    var oid = entity.order_id;
    amo = amo / 100;
    var shopid;
    var infid;
    var shopemail;
    var infemail;
    await consignment
      .findOneAndUpdate(
        { _id: consid },
        { $set: { order_id: oid, Amount: 0, paymentstatus: 0 } },
        { new: true },
        (err, doc) => {
          if (err) {
            console.log("Something wrong when updating data!");
            res.json();
          } else {
          }
        }
      )
      .then(async (cons) => {
        console.log(cons);
        shopid = cons.shopid;
        infid = cons.influencerid;
        await Shop.findById(shopid)
          .then((data1) => {
            shopemail = data1.email;
          })
          .catch((err) => console.log(err));

        await influencer
          .findById(infid)
          .then((data1) => {
            infemail = data1.email;
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        return res.status(500).json({
          message: "Something error!",
        });
      });
    var d = new Date().toLocaleString(undefined, { timeZone: "Asia/Kolkata" });

    const newlog = new paymentlog({
      consid,
      paymentid: pid,
      Amount: amo,
      paymentstatus: 0,
      order_id: oid,
      date: d,
      senderemail: shopemail,
      receiveremail: infemail,
    });
    await newlog
      .save()
      .then((nlog) => {
        console.log(nlog);
        res.json({ status: "ok" });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    // pass it
    res.json({ status: "ok" });
  }
});

module.exports = router;
