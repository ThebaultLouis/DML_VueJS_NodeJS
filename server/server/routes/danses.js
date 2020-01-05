const express = require("express");
const router = express.Router();
const { mongoose } = require("./../db/mongoose");
const _ = require("lodash");
const faker = require("faker");
const { ObjectID } = require("mongodb");

var { Danse } = require("./../models/danse");

var { Type } = require("./../models/type");
var { authenticate } = require("./../middleware/authenticate");

router.post("/", authenticate, (req, res) => {
  var body = _.pick(req.body, ["name", "youtube", "pdf", "type"]);

  var danse = new Danse({
    name: body.name,
    youtube: body.youtube,
    pdf: body.pdf,
    type: body.type ? body.type : 0
  });

  danse
    .save()
    .then(doc => {
      res.send(doc);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

router.get("/", (req, res) => {
  body = _.pick(req.query, ["type"]);

  param = {
    sort: {
      name: 1
    }
  };
  Danse.find(body, null, param)
    .then(danses => {
      res.send({
        danses
      });
    })
    .catch(e => res.status(400).send(e));
});

router.delete("/:id", authenticate, (req, res) => {
  console.log(req.headers);
  Danse.findByIdAndDelete(ObjectID(req.params.id))
    .then(danse => {
      if (!danse) {
        return res.status(404).send();
      }
      res.send(danse);
    })
    .catch(e => res.status(400).send(e));
});

router.patch("/:id", authenticate, (req, res) => {
  var body = _.pick(req.body, ["name", "youtube", "pdf", "type"]);
  body.type = body.type ? body.type : 0;
  Danse.findOneAndUpdate(
    {
      _id: req.params.id
    },
    {
      $set: body
    },
    {
      new: true
    }
  )
    .then(danse => {
      if (!danse) {
        return res.status(404).send();
      }
      res.send(danse);
    })
    .catch(e => res.status(400).send());
});

module.exports = router;
