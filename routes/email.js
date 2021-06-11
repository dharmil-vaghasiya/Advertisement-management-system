const express = require("express");
const router = express.Router();
const crypto = require("crypto");

const Shop = require("../models/Shops");
const influencer = require("../models/Influencers");
const sitemanager = require("../models/sitemanager");

const infrequireLogin = require("../middleware/infrequirelogin");

const nodemailer = require("nodemailer");
const keys = require("../config/keys");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: keys.emailId,
    pass: emailPassword,
  },
});

router.post("/add", function (req, res) {
  console.log(req.body.email);
  const mailOptions = {
    from: keys.emailId,
    to: `${req.body.email}`,
    subject: "Account verification",
    text: "Congratulations, Your Account is verified by Advera Manager. Now you can use our system.",
  };
  transporter.sendMail(mailOptions, function (err, res) {
    if (err) {
      console.error("there was an error: ", err);
    } else {
      console.log("here is the res: ", res);
    }
  });
  res.json("mail send successfully");
});

router.post("/remove", function (req, res) {
  const mailOptions = {
    from: keys.emailId,
    to: `${req.body.email}`,
    subject: "Account verification",
    text: "Oops!!, Your Request for SignUp in Advera is rejected due to invalid details.",
  };
  transporter.sendMail(mailOptions, function (err, res) {
    if (err) {
      console.error("there was an error: ", err);
    } else {
      console.log("here is the res: ", res);
    }
  });
  res.json("mail send successfully");
});

router.post("/reset-password-inf", (req, res) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
    }
    const token = buffer.toString("hex");
    influencer.findOne({ email: req.body.email }).then((user) => {
      if (!user) {
        return res
          .status(422)
          .json({ error: "User dont exists with that email" });
      }
      user.resetToken = token;
      user.expireToken = Date.now() + 3600000;
      user.save().then((result) => {
        transporter.sendMail({
          to: user.email,
          from: keys.emailId,
          subject: "password reset",
          html: `
                  <p>You requested for password reset</p>
                  <h5>click in this <a href="http://localhost:3000/resetInf/${token}">link</a> to reset password</h5>
                  `,
        });
        res.json({ message: "check your email" });
      });
    });
  });
});

router.post("/new-password-inf", (req, res) => {
  const newPassword = req.body.password;
  const sentToken = req.body.token;
  influencer
    .findOne({ resetToken: sentToken, expireToken: { $gt: Date.now() } })
    .then((user) => {
      if (!user) {
        return res.status(422).json({ error: "Try again session expired" });
      }
      user.password = newPassword;
      user.resetToken = undefined;
      user.expireToken = undefined;
      user.save().then((saveduser) => {
        res.json({ message: "password updated success" });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/reset-password-shop", (req, res) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
    }
    const token = buffer.toString("hex");
    Shop.findOne({ email: req.body.email }).then((user) => {
      if (!user) {
        return res
          .status(422)
          .json({ error: "User dont exists with that email" });
      }
      user.resetToken = token;
      user.expireToken = Date.now() + 3600000;
      user.save().then((result) => {
        transporter.sendMail({
          to: user.email,
          from: keys.emailId,
          subject: "password reset",
          html: `
                  <p>You requested for password reset</p>
                  <h5>click in this <a href="http://localhost:3000/resetShop/${token}">link</a> to reset password</h5>
                  `,
        });
        res.json({ message: "check your email" });
      });
    });
  });
});

router.post("/new-password-shop", (req, res) => {
  const newPassword = req.body.password;
  const sentToken = req.body.token;
  Shop.findOne({ resetToken: sentToken, expireToken: { $gt: Date.now() } })
    .then((user) => {
      if (!user) {
        return res.status(422).json({ error: "Try again session expired" });
      }
      user.password = newPassword;
      user.resetToken = undefined;
      user.expireToken = undefined;
      user.save().then((saveduser) => {
        res.json({ message: "password updated success" });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/reset-password-manager", (req, res) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
    }
    const token = buffer.toString("hex");
    sitemanager.findOne({ email: req.body.email }).then((user) => {
      if (!user) {
        return res
          .status(422)
          .json({ error: "User dont exists with that email" });
      }
      user.resetToken = token;
      user.expireToken = Date.now() + 3600000;
      user.save().then((result) => {
        transporter.sendMail({
          to: user.email,
          from: keys.emailId,
          subject: "password reset",
          html: `
                  <p>You requested for password reset</p>
                  <h5>click in this <a href="http://localhost:3000/resetManager/${token}">link</a> to reset password</h5>
                  `,
        });
        res.json({ message: "check your email" });
      });
    });
  });
});

router.post("/new-password-manager", (req, res) => {
  const newPassword = req.body.password;
  const sentToken = req.body.token;
  sitemanager
    .findOne({ resetToken: sentToken, expireToken: { $gt: Date.now() } })
    .then((user) => {
      if (!user) {
        return res.status(422).json({ error: "Try again session expired" });
      }
      user.password = newPassword;
      user.resetToken = undefined;
      user.expireToken = undefined;
      user.save().then((saveduser) => {
        res.json({ message: "password updated success" });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/acceptReq", infrequireLogin, function (req, res) {
  const { _id } = req.influencer;

  influencer.findOne({ _id }).then((data) => {
    const mailOptions = {
      from: keys.emailId,
      to: `${req.body.email}`,
      subject: "Request Accepted",
      text:
        data.name + " has accepted your request, kindly check your dashboard.",
    };
    transporter.sendMail(mailOptions, function (err, res) {
      if (err) {
        console.error("there was an error: ", err);
      }
    });
    res.json({ message: "send successfullly." });
  });
});

router.post("/rejectReq", infrequireLogin, function (req, res) {
  const { _id } = req.influencer;

  influencer.findOne({ _id }).then((data) => {
    const mailOptions = {
      from: keys.emailId,
      to: `${req.body.email}`,
      subject: "Request Decline",
      text: data.name + " has Decline your request.",
    };
    transporter.sendMail(mailOptions, function (err, res) {
      if (err) {
        console.error("there was an error: ", err);
      }
    });
    res.json({ message: "send successfullly." });
  });
});

module.exports = router;
