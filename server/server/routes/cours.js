const express = require('express')
const router = express.Router()
const {
    mongoose
} = require('./../db/mongoose')
const _ = require('lodash')
const faker = require('faker')
const {
    ObjectID
} = require('mongodb')

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
    Bal
} = require('./../models/bal')





router.post('/', (req, res) => {
    var body = _.pick(req.body,
        [
            'doneAt',
            'niveau',
            'danseApprise',
            'dansesRevisees',
            'type'
        ])

    var cours = new Cours({
        doneAt: body.doneAt,
        niveau: body.niveau,
        danseApprise: body.danseApprise,
        dansesRevisees: body.dansesRevisees,
        type: body.type
    })

    cours.save().then(doc => {
        res.send(doc)
    }).catch(e => {
        res.status(400).send(e)
    })
})

router.get('/', (req, res) => {
    niveauParam = {
        sort: {
            index: 1
        },
    }
    coursParam = {
        sort: {
            doneAt: -1
        },
    }
    Niveau.find({}, null, niveauParam).then(niveaux => {
        Cours.find({}, null, coursParam).populate('dansesRevisees').populate('danseApprise').populate('niveau', '_id logo').then(cours => {
            res.send({
                cours,
                niveaux
            })

        })
    }).catch(e => res.status(400).send(e))
})

router.get('/:n', (req, res) => {

    n = Number(req.params.n)
    var url = `${process.env.URL}:${process.env.PORT}/api/cours`
    var numberToSkip = 6

    var body = _.pick(req.body, ['_niveau'])
    var yearBody = _.pick(req.body, ['year'])

    param = {
        sort: {
            teachedAt: -1
        },
        limit: numberToSkip,
        skip: (n - 1) * numberToSkip
    }

    if (yearBody.year) {
        var year = Number(yearBody.year)
        var dateMax = new Date(year + 1, 06, 01);
        var dateMin = new Date(year, 06, 01);

        body.teachedAt = {
            $gt: dateMin,
            $lt: dateMax
        }

    }
    console.log(body)
    var revisions = []

    Cours.find(body, null, param).then(cours => {

        for (var i = 0; i < cours.length; i++) {

            Danse.find({
                '_id': {
                    $in: [cours[i]._danseApprise, ...cours[i]._dansesRevisees]
                }
            }).then(danses => {
                revisions.push({
                    cours: cours[i],
                    danses
                })
            })
        }



        res.send({
            nextUrl: `${url}/${n + 1}`,
            previousUrl: n - 1 ? `${url}/${n - 1}` : null,
            totalPage: Math.ceil(cours.length / numberToSkip),
            cours
        })

    }).catch(e => res.status(400).send(e))
    // Cours.countDocuments(body).then(total => {
    //     Cours.find(body, null, param).then(cours => {
    //         res.send({
    //             nextUrl: `${url}/${n + 1}`,
    //             previousUrl: n ? `${url}/${n - 1}` : null,
    //             totalPage: Math.ceil(total / numberToSkip),
    //             cours
    //         })
    //     })
    // }).catch(e => res.status(400).send(e))
})

router.delete('/:id', (req, res) => {
    Cours.findByIdAndDelete(ObjectID(req.params.id)).then(cours => {
        if (!cours) {
            return res.status(404).send()
        }
        res.send(cours)
    }).catch(e => res.status(400).send(e))
})

router.patch('/:id', (req, res) => {
    var body = _.pick(req.body,
        [
            'doneAt',
            'niveau',
            'danseApprise',
            'dansesRevisees',
            'type'
        ])
    Cours.findOneAndUpdate({
        _id: req.params.id
    }, {
        $set: body
    }, {
        new: true
    }).then(danse => {
        if (!danse) {
            return res.status(404).send()
        }
        res.send(danse)
    }).catch(e => res.status(400).send())
})

module.exports = router