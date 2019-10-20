const express = require('express')
const router = express.Router()

var {
    Danse
} = require('./../models/danse')
var {
    Cours
} = require('./../models/cours')
var {
    Niveau
} = require('./../models/niveau')
var {
    Manifestation
} = require('./../models/manifestation')
var {
    Bal
} = require('./../models/bal')



router.get('/', (req, res) => {
    Cours.find({}).then(cours => {
        Danse.find({}).then(danse => {
            Niveau.find({}).then(niveaux => {
                Manifestation.find({}).then(manifestations => {
                    Bal.find({}).then(bals => {
                        res.send({
                            niveaux,
                            danse,
                            cours,
                            manifestations,
                            bals
                        })
                    }).catch(e => res.status(400).send(e))
                }).catch(e => res.status(400).send(e))
            }).catch(e => res.status(400).send(e))
        }).catch(e => res.status(400).send(e))
    }).catch(e => res.status(400).send(e))
})

router.get('/a', (req, res) => {
    res.send("coucou")
})

module.exports = router