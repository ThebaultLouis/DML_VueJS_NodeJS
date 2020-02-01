const express = require("express");
const { mongoose } = require("./../db/mongoose");
const _ = require("lodash");
const faker = require("faker");
const { ObjectID } = require("mongodb");

var { Manifestation } = require("./../models/manifestation");
var { authenticate } = require("./../middleware/authenticate");

const router = express.Router();

router.post("/", authenticate, (req, res) => {
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

  var manifestation = new Manifestation({
    doneAt: body.doneAt,

    domicile: body.domicile,
    city: body.city,
    zipcode: body.zipcode,
    club: body.club,

    pdfAffiche: body.pdfAffiche,
    pdfPlaylist: body.pdfPlaylist,
    youtube: body.youtube
  });

  manifestation
    .save()
    .then(manifestation => {
      res.send(manifestation);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

router.get("/", (req, res) => {
  param = {
    sort: {
      doneAt: 1
    }
  };
  var now = new Date(Date.now());
  var month = now.getMonth() + 1;
  month = month >= 10 ? month : "0" + month
  now = now.getFullYear() + "-" + month + "-00";

  Manifestation.find({ doneAt: { $gt: now } }, null, param)
    .then(manifestations => {
      res.send(manifestations);
    })
    .catch(e => res.status(400).send(e));
});

router.get("/admin", (req, res) => {
  param = {
    sort: {
      doneAt: 1
    }
  }
 
  Manifestation.find({}, null, param)
    .then(manifestations => {
      res.send(manifestations)
    })
    .catch(e => res.status(400).send(e))
});

router.delete("/:id", authenticate, (req, res) => {
  Manifestation.findByIdAndDelete(ObjectID(req.params.id))
    .then(manifestation => {
      if (!manifestation) {
        return res.status(404).send();
      }
      res.send(manifestation);
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
// router.post('/:n', (req, res) => {

//   n = Number(req.params.n)
//   var url = `${process.env.URL}:${process.env.PORT}/api/manifestations`
//   var numberToSkip = 6

//   var body = _.pick(req.body, ['domicile'])

//   Manifestation.countDocuments(body).then(total => {
//     Manifestation.find(body, null, {
//       validUntil: {
//         $gte: new Date()
//       },
//       sort: {
//         doneAt: 1
//       },
//       limit: numberToSkip,
//       skip: (n - 1) * numberToSkip
//     }).then(manifestations => {

//       res.send({
//         nextUrl: `${url}/${n + 1}`,
//         previous: n - 1 ? `${url}/${n - 1}` : null,
//         total,
//         totalPage: Math.ceil(total / numberToSkip),
//         manifestations
//       })
//     })
//   }).catch(e => res.status(400).send(e))
// })
