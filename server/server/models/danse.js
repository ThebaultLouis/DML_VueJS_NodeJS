var mongoose = require('mongoose')


var DanseSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  youtube: {
    type: String,
    //required: false
  },
  pdf: {
    type: String,
    //required: false
  },
  type: {
    type: Number,
  },
  // type: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Type'
  // },
  cours: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cours'
  }
})

var Danse = mongoose.model('Danse', DanseSchema)
module.exports = {
  Danse
}