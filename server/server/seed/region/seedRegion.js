// const { ObjectID } = require('mongodb')

// var regions = require('./regions.json')
// const { Region } = require('./../../models/region')


// populateRegion = () => {

//     options = { upsert: true, new: true, setDefaultsOnInsert: true };

//     for (var i = 0; i < regions.length; i++) {

//         Region.findOneAndUpdate({
//             "name": regions[i].name
//         },
//             {},
//             options,
//         )
//             .catch(e => console.log(e))
//     }

// }

// populateRegion()