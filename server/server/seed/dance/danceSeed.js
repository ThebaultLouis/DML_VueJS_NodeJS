var json_danses = require('./danses.json')
var niveaux = require('./niveaux.json')
var types = require('./types.json')
var manifestations = require('./manifestations.json')

const {
  Niveau
} = require('../../models/niveau')
const {
  Type
} = require('../../models/type')
const {
  Danse
} = require('../../models/danse')
const {
  Cours
} = require('../../models/cours')
const {
  Manifestation
} = require('../../models/manifestation')

function seedNiveaux() {

  options = {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true
  };

  for (var i = 0; i < niveaux.length; i++) {

    Niveau.findOneAndUpdate({
        "index": i
      }, {
        "index": i,
        "name": niveaux[i].name,
        "logo": niveaux[i].logo
      },
      options,
    ).catch(e => console.log(e))

  }
  console.log("Niveaux inserted")
}

function seedType() {
  options = {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true
  };

  for (var i = 0; i < types.length; i++) {

    Type.findOneAndUpdate({
        "index": i
      }, {
        "index": i,
        "name": types[i].name,
        "logo": types[i].logo
      },
      options,
    ).catch(e => console.log(e))
  }
  console.log("Types inserted")
}


function seedDanse() {

  options = {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true
  };

  Type.find({}).then(types => {

    for (var i = 0; i < json_danses.length; i++) {
      var danse = json_danses[i]
      // console.log(types.find(e => e.index == 0)._id)
      var body = {
        "name": danse.name,
        "type": 0,
      }
      if (danse.pdf_link) {
        body.pdf = danse.pdf_link
      }
      if (danse.youtube) {
        body.youtube = danse.youtube
      }
      Danse.findOneAndUpdate({
          "name": danse.name,

          // "type": types.find(e => e.index == 0)._id
        },
        body
        // {
        //   "name": danse.name,
        //   "type": 0,
        //   "youtube": danse.youtube,
        //   "pdf": danse.pdf_link,
        // }
        ,
        options).catch(e => console.log(e))
    }
    console.log("Dances inserted")
  }).catch(e => console.log(e))
}

function getDate(date_unparsed) {
  date_parsed = date_unparsed.split('/')
  return date_parsed[2] + "-" + date_parsed[1] + "-" + date_parsed[0]
}

function seedCours() {

  options = {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true
  };

  cours_array = [Cours()]
  Niveau.find({}).then(niveaux => {
    Type.find({}).then(types => {
      Danse.find({}).then(danses => {
        for (var i = 0; i < json_danses.length; i++) {

          danse = json_danses[i]
          // console.log(niveaux.find(e => e.index == danse.niveau)._id)
          // console.log(danses.find(e => e.name == danse.name)._id)
          switch (danse.revision) {
            case 0:
              cours_array.unshift(new Cours({
                doneAt: getDate(danse.date),
                niveau: niveaux.find(e => e.index == danse.niveau)._id,
                danseApprise: danses.find(e => e.name == danse.name)._id,
                dansesRevisees: []
              }))

              break;
            case 1:
              cours_array[0].dansesRevisees.push(
                danses.find(e => e.name == danse.name)._id
              )
              break;
            case 2:
              cours_array.unshift(new Cours({
                doneAt: getDate(danse.date),
                niveau: niveaux.find(e => e.index == danse.niveau)._id,
                dansesRevisees: [danses.find(e => e.name == danse.name)._id]
              }))
              break;
            default:
          }
        }
        //console.log(cours_array)
        cours_array = cours_array.slice(0, cours_array.length - 1)
        cours_array.map(cours => Cours.findOneAndUpdate({
            danseApprise: cours.danseApprise,
            dansesRevisees: cours.dansesRevisees,
            doneAt: cours.doneAt,
            niveau: cours.niveau,
            type: 0
          }, {

          },
          options
        ).catch(e => console.log(e)))
        console.log('Cours inserted')
      })
    })
  }).catch(e => console.log(e))
}

async function seedManifestations() {
  options = {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true
  };

  // Manifestation.deleteMany({}).then(() => {
  for (var i = 0; i < manifestations.length; i++) {
    Manifestation.findOneAndUpdate({
        doneAt: getDate(manifestations[i].date),
        club: manifestations[i].club,
        domicile: manifestations[i].domicile == 1 ? true : false,
        city: manifestations[i].ville,
        zipcode: manifestations[i].cp,
      }, {
        doneAt: getDate(manifestations[i].date),
        domicile: manifestations[i].domicile == 1 ? true : false,
        city: manifestations[i].ville,
        zipcode: manifestations[i].cp,
        club: manifestations[i].club,
      },
      options).catch(e => console.log(e))
    // manifestation = new Manifestation({
    //   doneAt: getDate(manifestations[i].date),
    //   domicile: manifestations[i].domicile == 1 ? true : false,
    //   city: manifestations[i].ville,
    //   zipcode: manifestations[i].cp,
    //   club: manifestations[i].club,
    // })
    // manifestation.save()

  }
  console.log('Manifestations inserted')
  // }).catch(e => console.log(e))
}

// function seed() {
//   seedNiveaux()
//   seedType()
//   seedDanse()
//   // seedCours()
// }
// await seedNiveaux()
// await seedType()
// await seedDanse()
// await seedCours()
// await seedManifestations()

async function seed() {
  await seedNiveaux()
  await seedType()
  await seedDanse()
  await seedCours()
  await seedManifestations()
}
seed()

// if (process.env.NEED_SEED_DANCE) {
//   seed()
// }