var mongoose = require('mongoose')


var BalSchema = new mongoose.Schema({
    doneAt: {
        type: String
    },
    name: {
        type: String
    },
    photos: [{
        type: String
    }],
    youtube: {
        type: String
    }
})

var Bal = mongoose.model('Bal', BalSchema)
module.exports = {
    Bal
}