var mongoose = require('mongoose')


var CoursSchema = new mongoose.Schema({
    doneAt: {
        type: String
    },
    danseApprise: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Danse'
    },
    dansesRevisees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Danse'
    }],
    niveau: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Niveau'
    },
    type: {
        type: Number
    }
})

var Cours = mongoose.model('Cours', CoursSchema)
module.exports = {
    Cours
}