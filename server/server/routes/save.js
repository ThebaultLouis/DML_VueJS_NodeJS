const express = require("express");
const router = express.Router();

var { Danse } = require("./../models/danse");
var { Cours } = require("./../models/cours");
var { Niveau } = require("./../models/niveau");
var { Manifestation } = require("./../models/manifestation");
var { Bal } = require("./../models/bal");

var save = require("./../backup/save.json");

router.get("/", (req, res) => {
  Cours.find({})
    .then(cours => {
      Danse.find({})
        .then(danse => {
          Niveau.find({})
            .then(niveaux => {
              Manifestation.find({})
                .then(manifestations => {
                  Bal.find({})
                    .then(bals => {
                      res.send({
                        niveaux,
                        danse,
                        cours,
                        manifestations,
                        bals
                      });
                    })
                    .catch(e => res.status(400).send(e));
                })
                .catch(e => res.status(400).send(e));
            })
            .catch(e => res.status(400).send(e));
        })
        .catch(e => res.status(400).send(e));
    })
    .catch(e => res.status(400).send(e));
});

router.get("/manifestations", (req, res) => {
  Manifestation.deleteMany({}).then(() => {
    manifestationsJson = save["manifestations"];
    manifs = [];
    for (var i = 0; i < manifestationsJson.length; i++) {
      manif = new Manifestation(manifestationsJson[i]);
      manifs.push(manif);
    }
    Manifestation.insertMany(manifs)
      .then(result => {
        res.send({ success: "Les manifestations ont bien été ajouté" });
      })
      .catch(e => console.log(e));
  });
});
router.get("/bals", (req, res) => {
  Bal.deleteMany({}).then(() => {
    balsJson = save["bals"];
    bals = [];
    for (var i = 0; i < balsJson.length; i++) {
      bal = new bal(balsJson[i]);
      bals.push(manif);
    }
    Bal.insertMany(bals)
      .then(result => {
        res.send({ success: "Les bals ont bien été ajouté" });
      })
      .catch(e => console.log(e));
  });
});

router.get("/a", (req, res) => {
  res.send("coucou");
});

module.exports = router;
