const mongoose = require('mongoose')

const ManifestationSchema = new mongoose.Schema({

  doneAt: {
    type: String,
  },
  domicile: {
    type: Boolean,
  },
  city: {
    type: String,
  },
  zipcode: {
    type: String,
  },
  club: {
    type: String,
  },
  pdfAffiche: {
    type: String,
  },
  pdfPlaylist: {
    type: String,
  },
  youtube: {
    type: String,
  },
})

var Manifestation = mongoose.model('Manifestation', ManifestationSchema)

module.exports = {
  Manifestation
}