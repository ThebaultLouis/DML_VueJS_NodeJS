var mongoose = require('mongoose')


var TypeSchema = new mongoose.Schema({
    name: {
        type: String
    },
    index: {
        type: Number
    },

})

var Type = mongoose.model('Type', TypeSchema)
module.exports = {
    Type
}
