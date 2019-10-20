var mongoose = require('mongoose')

var NiveauSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  logo: {
    type: String
  },
  index: {
    type: Number
  }

})
var Niveau = mongoose.model('Niveau', NiveauSchema)
module.exports = {
  Niveau
}
