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
  Type
} = require('./../models/type')
var {
  authenticate
} = require('./../middleware/authenticate')



router.post('/', (req, res) => {
  var body = _.pick(req.body, [
    'name',
    'youtube',
    'pdf',
    'type'
  ])

  var danse = new Danse({
    name: body.name,
    youtube: body.youtube,
    pdf: body.pdf,
    type: body.type
  })

  danse.save().then(doc => {
    res.send(doc)
  }).catch(e => {
    res.status(400).send(e)
  })
})

router.get('/', (req, res) => {
  body = _.pick(req.query, ['type'])
  // var body = {
  //   type: req.query.type
  // }

  param = {
    sort: {
      name: 1
    },
  }
  Danse.find(body, null, param).then(danses => {
    res.send({
      danses
    })

  }).catch(e => res.status(400).send(e))

  // var yearBody = req.query.year

  // if (yearBody) {
  //   var year = Number(yearBody.year)
  //   var dateMax = new Date(year + 1, 06, 01);
  //   var dateMin = new Date(year, 06, 01);

  //   body.teachedAt = {
  //     $gt: dateMin,
  //     $lt: dateMax
  //   }
  // }

  //   Danse.countDocuments(body).then(total => {
  //     Danse.find(body, null, param).then(danses => {
  //       res.send({
  //         nextUrl: `${url}/${n + 1}`,
  //         previousUrl: n ? `${url}/${n - 1}`: null,
  //         totalPage: Math.ceil(total/numberToSkip),
  //         danses
  //       })
  //     })
  //   }).catch(e => res.status(400).send(e))
})

// router.post('/:n', (req, res) => {

//   n = Number(req.params.n)
//   var url = `${process.env.URL}:${process.env.PORT}/api/danses`
//   var numberToSkip = 6

//   var body = _.pick(req.body, ['_niveau'])
//   body.revisee = false
//   var yearBody = _.pick(req.body, ['year'])

//   param = {
//     sort: {teachedAt: -1},
//     limit: numberToSkip,
//     skip: (n - 1) * numberToSkip
//    }

//   if (yearBody.year) {
//     var year = Number(yearBody.year)
//     var dateMax = new Date(year + 1, 06, 01);
//     var dateMin = new Date(year, 06, 01);

//     body.teachedAt = {
//       $gt: dateMin,
//       $lt: dateMax
//     }

//   }

//   Danse.countDocuments(body).then(total => {
//     Danse.find(body, null, param).then(danses => {
//       res.send({
//         nextUrl: `${url}/${n + 1}`,
//         previousUrl: n ? `${url}/${n - 1}`: null,
//         totalPage: Math.ceil(total/numberToSkip),
//         danses
//       })
//     })
//   }).catch(e => res.status(400).send(e))
// })

router.delete('/:id', (req, res) => {
  Danse.findByIdAndDelete(ObjectID(req.params.id)).then(danse => {
    if (!danse) {
      return res.status(404).send()
    }
    res.send(danse)
  }).catch(e => res.status(400).send(e))
})

router.patch('/:id', (req, res) => {
  var body = _.pick(req.body, [
    'name',
    'youtube',
    'pdf',
    'type'
  ])
  Danse.findOneAndUpdate({
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