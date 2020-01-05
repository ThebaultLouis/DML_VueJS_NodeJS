const express = require("express");
const router = express.Router();
const { mongoose } = require("./../db/mongoose");
const _ = require("lodash");
const { ObjectID } = require("mongodb");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

var { User } = require("./../models/user");
var { authenticate } = require("./../middleware/authenticate");

router.post("/login", (req, res) => {
  var body = _.pick(req.body, ["username", "password"]);

  User.findByCredentials(body.username, body.password)
    .then(user => {
      var access = "auth";
      var token = jwt.sign(
        { _id: user._id.toHexString(), access },
        process.env.JWT_SECRET,
        { expiresIn: "1w" }
      );
      // .toString();
      // user.token = token;

      res
        .status(200)
        // .header("x-auth", token)
        .send({ user, token });
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

router.get("/isAlive", authenticate, (req, res) => {
  res.send(200);
});

// router.delete("/login", authenticate, (req, res) => {
//   req.user
//     .removeToken(req.token)
//     .then(() => {
//       res.status(200).send();
//     })
//     .catch(e => res.status(400).send());
// });

module.exports = router;
