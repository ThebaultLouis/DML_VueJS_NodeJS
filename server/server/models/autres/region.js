var mongoose = require('mongoose')


var RegionSchema = new mongoose.Schema({
    name: {
        type: String
    }
})

var Region = mongoose.model('Region', RegionSchema)
module.exports = {
    Region
}
