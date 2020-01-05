const express = require("express");
const { mongoose } = require("./../db/mongoose");
const _ = require("lodash");
const faker = require("faker");
const { ObjectID } = require("mongodb");
var { authenticate } = require("./../middleware/authenticate");

var { Bal } = require("./../models/bal");

const router = express.Router();

router.post("/", authenticate, (req, res) => {
  var body = _.pick(req.body, ["doneAt", "name", "photos"]);

  var bal = new Bal({
    doneAt: body.doneAt,
    name: body.name,
    photos: body.photos
  });

  bal
    .save()
    .then(bal => {
      res.send(bal);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

router.get("/", (req, res) => {
  param = {
    sort: {
      doneAt: -1
    }
  };
  Bal.find({}, null, param)
    .then(bals => {
      res.send(bals);
    })
    .catch(e => res.status(400).send(e));
});

router.delete("/:id", authenticate, (req, res) => {
  Bal.findByIdAndDelete(ObjectID(req.params.id))
    .then(bal => {
      if (!bal) {
        return res.status(404).send();
      }
      res.send(bal);
    })
    .catch(e => res.status(400).send(e));
});

router.patch("/:id", authenticate, (req, res) => {
  var body = _.pick(req.body, [
    "doneAt",

    "domicile",
    "city",
    "zipcode",
    "club",

    "pdfAffiche",
    "pdfPlaylist",
    "youtube"
  ]);

  Manifestation.findOneAndUpdate(
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
    .then(manifestation => {
      if (!manifestation) {
        return res.status(404).send();
      }
      res.send(manifestation);
    })
    .catch(e => res.status(400).send());
});

module.exports = router;
