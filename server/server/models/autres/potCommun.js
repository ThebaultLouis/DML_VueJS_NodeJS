var mongoose = require('mongoose')


var PotCommunSchema = new mongoose.Schema({
    year: {
        type: Number
    },
    pdf: {
        type: String
    },
    _region: {
        type: mongoose.Schema.Types.ObjectId,
        required: false
    }
})

var PotCommun = mongoose.model('PotCommun', PotCommunSchema)
module.exports = {
    PotCommun
}
