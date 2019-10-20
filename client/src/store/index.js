import Vue from 'vue'
import Vuex from 'vuex'

// import example from './module-example'
import danse from './modules/danse'
import cours from './modules/cours'
import manifestation from './modules/manifestation'
import bal from './modules/bal'
import danseCountry from './modules/country/danse'
import coursCountry from './modules/country/cours'

import adminDanse from './modules/admin/danse'
import adminCours from './modules/admin/cours'
import adminManifestation from './modules/admin/manifestation'
import adminBal from './modules/admin/bal'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */
export default new Vuex.Store({
    modules: {
        danse,
        cours,
        manifestation,
        bal,
        danseCountry,
        coursCountry,
        adminDanse,
        adminCours,
        adminManifestation,
        adminBal
        // example
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
})
// export default function ( /* { ssrContext } */ ) {
//     const store = 

//     return store
// }