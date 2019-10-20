require('./config/config')
require('./createAdmin')
// require('./seed/region/seedRegion')
// require('./seed/dance/danceSeed')

var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var _ = require('lodash')

// var {Niveau} = require('./models/niveau')
// var {Manifestation} = require('./models/manifestation')
// var {Danse} = require('./models/danse')

var app = express()
app.use(cors())
app.use(bodyParser.json())

app.get('/api/seed', (req, res) => {
  require('./seed/dance/danceSeed')
  res.send("The db has been seeded")
})

// Niveau
const saves = require('./routes/save')

app.use('/api/save', saves)

// Niveau
const niveaux = require('./routes/niveaux')

app.use('/api/niveaux', niveaux)

// Manifestation
const manifestations = require('./routes/manifestations')

app.use('/api/manifestations', manifestations)

// Danse
const danses = require('./routes/danses')

app.use('/api/danses', danses)

// Danse
const cours = require('./routes/cours')

app.use('/api/cours', cours)

// Revision
const revisions = require('./routes/revisions')

app.use('/api/revisions', revisions)

// Revision
const bals = require('./routes/bals')

app.use('/api/bals', bals)

// Admin
const admin = require('./routes/admin')

app.use('/api/admin', admin)


app.listen(process.env.PORT, () => {
  console.log(`Started in port ${process.env.PORT}`)
})

module.exports.app = app