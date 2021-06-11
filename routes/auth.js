const express = require("express");
const router = express.Router();
const Shop = require("../models/Shops");
const influencer = require("../models/Influencers");
const sitemanager = require("../models/sitemanager");
const admin = require("../models/admin");
const paymentlog = require("../models/paymentlog");
const { JWT_SECRET } = require("../config/keys");
const jwt = require("jsonwebtoken");
const infrequireLogin = require("../middleware/infrequirelogin");
const adminrequirelogin = require("../middleware/adminrequirelogin");
const managerrequirelogin = require("../middleware/managerrequirelogin");
const brandrequirelogin = require("../middleware/brandrequirelogin");
const consignment = require("../models/consignment");

const { db, count } = require("../models/Shops");
//Influencer...........

router.post("/sigupinf", (req, res) => {
  var {
    name,
    email,
    password,
    phone,
    age,
    city,
    state,
    country,
    instagram,
    instagramURL,
    instagramFollowers,
    instagramEngagementRate,
    facebook,
    facebookURL,
    facebookFollowers,
    facebookEngagementRate,
    twitter,
    twitterURL,
    twitterFollowers,
    twitterEngagementRate,
  } = req.body;

  city = city.toLowerCase();

  if (
    !email ||
    !password ||
    !name ||
    !phone ||
    !age ||
    !city ||
    !state ||
    !country ||
    !instagram ||
    !instagramURL ||
    !instagramFollowers ||
    !instagramEngagementRate ||
    !facebook ||
    !facebookURL ||
    !facebookFollowers ||
    !facebookEngagementRate
  ) {
    return res.status(422).json({ error: "Please fill all the fields" });
  }
  influencer
    .findOne({ email: email })
    .then((savedUser) => {
      if (savedUser) {
        return res
          .status(422)
          .json({ error: "User already exists with this email" });
      }
      const newinf = new influencer({
        name,
        email,
        password,
        phone,
        age,
        city,
        state,
        country,
        instagram,
        instagramURL,
        instagramFollowers,
        instagramEngagementRate,
        facebook,
        facebookURL,
        facebookFollowers,
        facebookEngagementRate,
        twitter,
        twitterURL,
        twitterFollowers,
        twitterEngagementRate,
      });

      newinf
        .save()
        .then((newinf) => {
          res.json({ message: "Registered successfullly." });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/signininf", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "Please add email or password" });
  }

  influencer
    .findOne({ email: email })
    .then((savedUser) => {
      if (!savedUser) {
        return res.status(422).json({ error: "Invalid Email or password" });
      }
      if (savedUser.valid === 0) {
        return res
          .status(425)
          .json({ error: "Verification under process, You can't proceed." });
      }
      if (password === savedUser.password) {
        const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
        const { name } = savedUser;
        res.json({ token, user: { name }, type: "Influencer" });
      } else {
        return res.status(422).json({ error: "Invalid Email or password" });
      }
    })
    .catch((err) => {
      console.log(err);
      return;
    });
});

router.get("/influencers", managerrequirelogin, (req, res) => {
  influencer
    .find({ valid: 0 })
    .then((foundInfluencers) => res.json(foundInfluencers));
});

router.post("/allInfluencersdynamic", (req, res) => {
  let pageNumber = req.body.pageNumber;
  let skip = pageNumber * 8;

  influencer
    .find({ valid: 1 })
    .skip(skip)
    .limit(8)
    .then((foundInfluencers) => {
      res.json(foundInfluencers);
    })
    .catch((err) => {
      res.status(400).json({ err });
      console.log(err);
    });
});

router.get("/search-all-city", (req, res) => {
  influencer
    .find({ valid: 1 })

    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/influencer", (req, res) => {
  const { email } = req.body;
  influencer
    .find({ email })
    .then((foundInfluencer) => res.json(foundInfluencer));
});

router.post("/influencer-search-by-city", (req, res) => {
  const { city } = req.body;
  influencer
    .find({ city })
    .then((foundInfluencer) => res.json(foundInfluencer));
});

router.put("/updateInf", (req, res) => {
  const { email } = req.body;
  influencer
    .findOneAndUpdate(
      { email },
      { $set: { valid: 1 } },
      { new: true },
      (err, doc) => {
        if (err) {
          console.log("Something wrong when updating data!");
        } else {
          res.status(200).json(doc);
        }
      }
    )
    .then((inf) => {})
    .catch((err) => console.log(err));
});

router.delete("/deleteInf", (req, res) => {
  const { email } = req.body;
  influencer
    .findOneAndDelete({ email }, (err) => {
      if (err) {
        console.log("Something wrong when deleting data!");
      }
    })
    .then(() => {
      res.send("deleted successfully");
    })
    .catch((err) => console.log(err));
});

router.get("/editinfluencer", infrequireLogin, (req, res) => {
  const { authorization } = req.headers;
  var id;
  var cnt = influencer.length;

  if (!authorization) {
    return res.status(401).json({ error: "you must be logged in" });
  }

  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(401).json({ error: "you must be logged in" });
    }

    const { _id } = payload;
    id = _id;
  });

  influencer
    .find({ _id: id })
    .select("-name")
    .select("-password")
    .then((data) => res.json(data));
});

router.put("/Editchange", infrequireLogin, (req, res) => {
  const { authorization } = req.headers;
  var id;

  if (!authorization) {
    return res.status(401).json({ error: "you must be logged in" });
  }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(401).json({ error: "you must be logged in" });
    }

    const { _id } = payload;
    id = _id;
  });
  influencer
    .findOneAndUpdate(
      { _id: id },
      { $set: req.body },
      { new: true },
      (err, doc) => {
        if (err) {
          console.log("Something wrong when updating data!");
        } else {
          res.status(200).json(doc);
        }
      }
    )
    .then((inf) => {})
    .catch((err) => console.log(err));
});

router.get("/countInf", adminrequirelogin, (req, res) => {
  let coll = db.collection("influencers");
  coll.countDocuments().then((count) => res.json(count));
});

router.put("/infphoto", infrequireLogin, (req, res) => {
  const { authorization } = req.headers;
  var id;

  if (!authorization) {
    return res.status(401).json({ error: "you must be logged in" });
  }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(401).json({ error: "you must be logged in" });
    }

    const { _id } = payload;
    id = _id;
  });
  influencer
    .findOneAndUpdate(
      { _id: id },
      { $set: req.body },
      { new: true },
      (err, doc) => {
        if (err) {
          console.log("Something wrong when updating data!");
        } else {
          res.status(200).json(doc);
        }
      }
    )
    .then((inf) => {})
    .catch((err) => console.log(err));
});

router.get("/getinfphoto", infrequireLogin, (req, res) => {
  const { _id } = req.influencer;
  id = _id;
  influencer
    .find({ _id: id })
    .select("-password")
    .then((data) => res.json(data));
});

//shops............

router.post("/sigupshop", (req, res) => {
  const {
    name,
    email,
    password,
    phone,
    shopName,
    address,
    location,
    photo1,
    photo2,
  } = req.body;

  if (
    !email ||
    !password ||
    !name ||
    !phone ||
    !shopName ||
    !address ||
    !photo1 ||
    !photo2 ||
    !location
  ) {
    return res.status(422).json({ error: "Please fill all the fields" });
  }
  Shop.findOne({ email: email })
    .then((savedUser) => {
      if (savedUser) {
        return res
          .status(422)
          .json({ error: "User already exists with this email" });
      }
      const newShop = new Shop({
        name,
        email,
        password,
        phone,
        shopName,
        address,
        location,
        photo1,
        photo2,
      });
      newShop
        .save()
        .then((newShop) => {
          res.json({ message: "Registered successfullly." });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/signinshop", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "Please add email or password" });
  }
  Shop.findOne({ email: email })
    .then((savedUser) => {
      if (!savedUser) {
        return res.status(422).json({ error: "Invalid Email or password" });
      }
      if (password === savedUser.password) {
        // res.json({message:"successfully signed in"})
        const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
        const { name } = savedUser;
        res.json({ token, user: { name }, type: "Shop" });
        return;
      } else {
        return res.status(422).json({ error: "Invalid Email or password" });
      }
    })
    .catch((err) => {
      console.log(err);
      return;
    });
});

router.post("/shop", (req, res) => {
  const { email } = req.body;
  Shop.find({ email }).then((foundInfluencer) => res.json(foundInfluencer));
});

router.get("/shops", (req, res) => {
  Shop.find().then((foundShops) => res.json(foundShops));
});

router.get("/countShop", adminrequirelogin, (req, res) => {
  let coll = db.collection("shops");
  coll.countDocuments().then((count) => res.json(count));
});

//site manager............

router.post("/addManager", (req, res) => {
  const { name, email, password, phone } = req.body;
  if (!email || !password || !name || !phone) {
    return res.status(422).json({ error: "Please fill all the fields" });
  }
  sitemanager
    .findOne({ email: email })
    .then((savedUser) => {
      if (savedUser) {
        return res
          .status(422)
          .json({ error: "User already exists with this email" });
      }
      const newSiteManager = new sitemanager({
        name,
        email,
        password,
        phone,
      });

      newSiteManager
        .save()
        .then((newSiteManager) => {
          res.json({ message: "Registered successfullly." });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/managersignin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "Please add email or password" });
  }
  admin
    .findOne({ email: email })
    .then((savedUser) => {
      if (savedUser) {
        if (password === savedUser.password) {
          const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
          const { name } = savedUser;
          return res.json({ token, user: { name }, type: "Admin" });
        } else {
          return res.status(422).json({ error: "Invalid Email or password" });
        }
      } else {
        sitemanager
          .findOne({ email: email })
          .then((savedUser) => {
            if (!savedUser) {
              return res
                .status(422)
                .json({ error: "Invalid Email or password" });
            }
            if (password === savedUser.password) {
              const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
              const { name } = savedUser;
              res.json({
                token,
                user: { name },
                type: "Site Manager",
              });
              return;
            } else {
              return res
                .status(422)
                .json({ error: "Invalid Email or password" });
            }
          })
          .catch((err) => {
            console.log(err);
            return;
          });
      }
    })
    .catch((err) => {
      console.log(err);
      return;
    });
});

router.get("/siteManagers", (req, res) => {
  sitemanager.find().then((foundSiteManager) => res.json(foundSiteManager));
});

router.delete("/deleteManager", managerrequirelogin, (req, res) => {
  const { email } = req.body;
  sitemanager
    .findOneAndDelete({ email }, (err) => {
      if (err) {
        console.log("Something wrong when deleting data!");
      }
    })
    .then(() => {
      res.send("deleted successfully");
    })
    .catch((err) => console.log(err));
});

// Consignment

router.post("/sendrequest", (req, res) => {
  const { authorization } = req.headers;
  let shopid;
  const { influencerid } = req.body;
  if (!authorization) {
    return res.status(401).json({ error: "you must be logged in" });
  }

  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(401).json({ error: "you must be logged in" });
    }

    const { _id } = payload;
    shopid = _id;
  });

  const newRequest = new consignment({
    shopid,
    influencerid,
  });

  newRequest
    .save()
    .then((newRequest) => {
      res.json({ message: "Registered successfullly." });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/removeconnection", brandrequirelogin, (req, res) => {
  let infid = req.body.infid;

  consignment
    .findOneAndDelete(
      {
        _id: infid,
      },
      (err) => {
        if (err) {
          console.log("Something wrong when deleting data!");
        }
      }
    )
    .then(() => {
      res.json({ message: "deleted successfully." });
    })
    .catch((err) => console.log(err));
});

router.get("/allrequest", infrequireLogin, (req, res) => {
  const { _id } = req.influencer;
  let id = _id;
  var array = [];
  consignment
    .find({
      shoprequest: 0,
      influencerid: id,
    })
    .then(async (data) => {
      for (i = 0, len = data.length; i < len; i++) {
        var sid = data[i].shopid;
        await Shop.findById(sid)
          .select("-password")
          .then((data1) => {
            array.push(data1);
          });
      }
      res.json(array);
    })
    .catch((err) => console.log(err));
});

router.put("/updateConsignment", infrequireLogin, (req, res) => {
  const { sid } = req.body;
  const { _id } = req.influencer;
  let influencerid = _id;

  consignment
    .findOneAndUpdate(
      {
        shopid: sid,
        influencerid: influencerid,
      },
      { $set: { shoprequest: 1 } },
      { new: true },
      (err, doc) => {
        if (err) {
          console.log("Something wrong when updating data!");
        } else {
          res.status(200).json(doc);
        }
      }
    )
    .then((req) => {
      console.log(req);
    })
    .catch((err) => console.log(err));
});

router.delete("/deleteConsignment", infrequireLogin, (req, res) => {
  const { sid } = req.body;
  const { _id } = req.influencer;
  let influencerid = _id;

  consignment
    .findOneAndDelete(
      {
        shopid: sid,
        influencerid: influencerid,
      },
      (err) => {
        if (err) {
          console.log("Something wrong when deleting data!");
        }
      }
    )
    .then(() => {
      res.send("deleted successfully");
    })
    .catch((err) => console.log(err));
});

router.get("/infconsignment", infrequireLogin, (req, res) => {
  const { _id } = req.influencer;
  let influencerid = _id;
  var array = [];
  var array1 = [];
  function jsonConcat(o1, o2) {
    for (var key in o2) {
      o1[key] = o2[key];
    }
    return o1;
  }
  consignment
    .find({ influencerid, shoprequest: 1 })
    .then(async (data) => {
      for (i = 0, len = data.length; i < len; i++) {
        var sid = data[i].shopid;
        await Shop.findById(sid)
          .select("-password")
          .then((data1) => {
            data1["_id"] = data[i]._id;
            array.push(data1);
            array1.push(data[i].Amount);
          });
      }
      var arr = [];
      // array1=[2,3];
      arr.push(array);
      arr.push(array1);
      res.json(arr);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/infCurrentconsignment", infrequireLogin, (req, res) => {
  const { _id } = req.influencer;
  let influencerid = _id;
  var array = [];
  var array1 = [];
  var array2 = [];
  var array3 = [];

  var d = new Date();
  var year = String(d.getFullYear());
  var month = String(d.getMonth() + 1);
  var day = String(d.getDate() + 1);
  if (month < 10) {
    var date = year.concat("-0", month, "-", day);
  } else {
    var date = year.concat("-", month, "-", day);
  }

  consignment
    .find({ influencerid, shoprequest: 2, endDate: { $gte: date } })
    .sort({ endDate: 1 })
    .then(async (data) => {
      for (i = 0, len = data.length; i < len; i++) {
        var sid = data[i].shopid;
        await Shop.findById(sid)
          .select("-password")
          .then((data1) => {
            array.push(data1);
            array1.push(data[i].Amount);
            array2.push(data[i].startDate);
            array3.push(data[i].endDate);
          });
      }
      var arr = [];
      arr.push(array);
      arr.push(array1);
      arr.push(array2);
      arr.push(array3);
      res.json(arr);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/infConsignmentHistory", infrequireLogin, (req, res) => {
  const { _id } = req.influencer;
  let influencerid = _id;
  var array = [];
  var array1 = [];
  var array2 = [];
  var array3 = [];

  var d = new Date();
  var year = String(d.getFullYear());
  var month = String(d.getMonth() + 1);
  var day = String(d.getDate() + 1);
  if (month < 10) {
    var date = year.concat("-0", month, "-", day);
  } else {
    var date = year.concat("-", month, "-", day);
  }

  consignment
    .find({ influencerid, shoprequest: 2, endDate: { $lt: date } })
    .sort({ endDate: -1 })
    .then(async (data) => {
      for (i = 0, len = data.length; i < len; i++) {
        var sid = data[i].shopid;
        await Shop.findById(sid)
          .select("-password")
          .then((data1) => {
            array.push(data1);
            array1.push(data[i].Amount);
            array2.push(data[i].startDate);
            array3.push(data[i].endDate);
          });
      }
      var arr = [];
      arr.push(array);
      arr.push(array1);
      arr.push(array2);
      arr.push(array3);

      res.json(arr);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/shopPendingRequests", brandrequirelogin, (req, res) => {
  let shopid = req.Shop._id;

  var array = [];

  consignment
    .find({ shopid, shoprequest: 0 })
    .then(async (data) => {
      for (i = 0, len = data.length; i < len; i++) {
        await influencer
          .findById(data[i].influencerid)
          .select("-password")
          .then((data1) => {
            data1["_id"] = data[i]._id;

            array.push(data1);
          })
          .catch((err) => console.log(err));
      }

      res.json(array);
    })
    .catch((err) => console.log(err));
});

router.get("/shopconsignment", brandrequirelogin, (req, res) => {
  let shopid = req.Shop._id;

  var array = [];

  consignment
    .find({ shopid, shoprequest: 1 })
    .then(async (data) => {
      for (i = 0, len = data.length; i < len; i++) {
        await influencer
          .findById(data[i].influencerid)
          .select("-password")
          .then((data1) => {
            data1["_id"] = data[i]._id;
            data1["valid"] = data[i].Amount;
            array.push(data1);
          })
          .catch((err) => console.log(err));
      }

      res.json(array);
    })
    .catch((err) => console.log(err));
});

router.get("/shopCurrentConsignments", brandrequirelogin, (req, res) => {
  let shopid = req.Shop._id;

  var array = [];
  var array1 = [];
  var array2 = [];
  var array3 = [];
  var array4 = [];

  var d = new Date();
  var year = String(d.getFullYear());
  var month = String(d.getMonth() + 1);
  var day = String(d.getDate() + 1);
  if (month < 10) {
    var date = year.concat("-0", month, "-", day);
  } else {
    var date = year.concat("-", month, "-", day);
  }

  consignment
    .find({ shopid, shoprequest: 2, endDate: { $gte: date } })
    .sort({ endDate: 1 })
    .then(async (data) => {
      for (i = 0, len = data.length; i < len; i++) {
        await influencer
          .findById(data[i].influencerid)
          .select("-password")
          .then((data1) => {
            data1["_id"] = data[i]._id;
            data1["valid"] = data[i].Amount;
            data1["age"] = data[i].review;
            data1["city"] = data[i].rating;
            array3.push(data[i].startDate);
            array4.push(data[i].endDate);
            if (data1["city"] == 0) {
              data1["state"] = false;
              array2.push(data1["state"]);
            } else {
              data1["state"] = true;
              array2.push(data1["state"]);
            }
            array.push(data1);
          })
          .catch((err) => console.log(err));
      }
      array1.push(array);
      array1.push(array2);
      array1.push(array3);
      array1.push(array4);
      res.json(array1);
    })
    .catch((err) => console.log(err));
});

router.get("/shopConsignmentHistory", brandrequirelogin, (req, res) => {
  let shopid = req.Shop._id;

  var array = [];
  var array1 = [];
  var array2 = [];
  var array3 = [];

  var d = new Date();
  var year = String(d.getFullYear());
  var month = String(d.getMonth() + 1);
  var day = String(d.getDate() + 1);
  if (month < 10) {
    var date = year.concat("-0", month, "-", day);
  } else {
    var date = year.concat("-", month, "-", day);
  }

  consignment
    .find({ shopid, shoprequest: 2, endDate: { $lt: date } })
    .sort({ endDate: -1 })
    .then(async (data) => {
      for (i = 0, len = data.length; i < len; i++) {
        await influencer
          .findById(data[i].influencerid)
          .select("-password")
          .then((data1) => {
            data1["_id"] = data[i]._id;
            data1["valid"] = data[i].Amount;
            data1["age"] = data[i].review;
            data1["city"] = data[i].rating;
            array2.push(data[i].startDate);
            array3.push(data[i].endDate);

            array.push(data1);
          })
          .catch((err) => console.log(err));
      }
      array1.push(array);
      array1.push(array2);
      array1.push(array3);
      res.json(array1);
    })
    .catch((err) => console.log(err));
});

router.put("/shopFeedback", (req, res) => {
  const { consid, review, value } = req.body;

  consignment
    .findOneAndUpdate(
      { _id: { $eq: consid } },
      { $set: { review: review, rating: value } },
      { new: true },
      (err, doc) => {
        if (err) {
          console.log("Something wrong when updating data!");
        } else {
          res.status(200).json(doc);
          influencer.findOne({ _id: doc.influencerid }).then((doc1) => {
            doc1.rating = doc1.rating + value;
            doc1.count = doc1.count + 1;

            doc1.save();
          });
        }
      }
    )
    .then((data) => {
      console.log(data);
    })
    .catch((err) => console.log(err));
});

router.post("/influencerReview", (req, res) => {
  var { infid } = req.body;

  var array = [];
  var array1 = [];

  consignment
    .find({ influencerid: infid })
    .then(async (data) => {
      for (i = 0, len = data.length; i < len; i++) {
        if (data[i].rating !== 0) {
          await Shop.findById(data[i].shopid)
            .select("shopName")
            .then((data1) => {
              array.push(data1.shopName);
              array1.push(data[i]);
            })
            .catch((err) => console.log(err));
        }
      }
      var arr = [];
      arr.push(array);
      arr.push(array1);
      res.json(arr);
    })
    .catch((err) => console.log(err));
});

router.delete("/shopRemoveRequest", brandrequirelogin, (req, res) => {
  const { consignmentid } = req.body;

  consignment
    .findOneAndDelete(
      {
        _id: consignmentid,
      },
      (err) => {
        if (err) {
          console.log("Something wrong when deleting data!");
        }
      }
    )
    .then(() => {
      res.send("deleted successfully");
    })
    .catch((err) => console.log(err));
});

router.delete("/infRemoveRequest", infrequireLogin, (req, res) => {
  const { consignmentid } = req.body;

  consignment
    .findOneAndDelete(
      {
        _id: consignmentid,
      },
      (err) => {
        if (err) {
          console.log("Something wrong when deleting data!");
        }
      }
    )
    .then(() => {
      res.send("deleted successfully");
    })
    .catch((err) => console.log(err));
});

router.post("/consignmentdate", (req, res) => {
  const { consid, sdate, edate } = req.body;

  consignment
    .findOneAndUpdate(
      { _id: consid },
      { $set: { startDate: sdate, endDate: edate } },
      { new: true },
      (err, doc) => {
        if (err) {
          console.log("Something wrong when updating data!");
        } else {
          res.status(200).json(doc);
        }
      }
    )
    .then((cons) => {
      console.log(cons);
    })
    .catch((err) => console.log(err));
});

router.post("/transactionHistory", (req, res) => {
  var { shopemail } = req.body;
  var { infemail } = req.body;

  shopemail = shopemail.trim();
  infemail = infemail.trim();

  if (shopemail === "" && infemail === "") {
    return res.status(422).json({ error1: "Please fill all the fields" });
  }
  if (shopemail != "" && infemail != "") {
    paymentlog
      .find({ $and: [{ receiveremail: infemail }, { senderemail: shopemail }] })
      .then((data) => {
        res.json(data);
      })
      .catch((err) => console.log(err));
  } else if (infemail != "") {
    paymentlog
      .find({ receiveremail: infemail })
      .then((data) => {
        res.json(data);
      })
      .catch((err) => console.log(err));
  } else {
    paymentlog
      .find({ senderemail: shopemail })
      .then((data) => {
        res.json(data);
      })
      .catch((err) => console.log(err));
  }
});

// Admin

router.get("/adminverification", adminrequirelogin, (req, res) => {});

module.exports = router;
