import Axios from 'axios'
import config from "@/config.js";

// filterCoursByDate = function (cours, date) {
//     return;
// }

// filterCoursByNiveau = function (cours, niveau) {
//     return niveau ? cours.filter(cours => cours.niveau._id == niveau) : cours.slice();
// }

const getters = {

};
const state = {
    fetchedCours: [],
    cours: [],
    coursWereFetched: false,
    niveaux: [{
        name: "tous",
        logo: "home",
        _id: 0
    }],
    filter: {
        niveau: 0,
        date: null,
    }
};
const mutations = {
    // 
    setFetchedCours(
        state, cours) {
        state.fetchedCours = cours
    },
    setCours(
        state, cours) {
        state.cours = cours
    },
    setCoursWereFetched(
        state
    ) {
        state.coursWereFetched = true
    },
    // Niveau
    setNiveaux(state, niveaux) {
        state.niveaux = state.niveaux.concat(niveaux)
    },
    // Filter
    setFilterNiveau(state, niveau) {
        state.filter.niveau = niveau
    },
    setFilterDate(state, date) {
        state.filter.date = date
    },
    filterCoursByDate(state) {
        state.cours = state.filter.date ? state.cours.filter(cours => cours.doneAt == state.filter.date) : state.cours.slice();
    },
    filterCoursByNiveau(state) {
        state.cours = state.filter.niveau ? state.cours.filter(cours => cours.niveau._id == state.filter.niveau) : state.cours.slice();
    }

};
const actions = {
    async fetchCours({
        commit,
        state
    }) {
        if (!state.CoursWereFetched) {
            Axios.get(`${config.apiUrl}/cours`, {
                params: {
                    type: 1
                }
            }).then(res => {
                commit('setNiveaux', res.data.niveaux)
                commit('setFetchedCours', res.data.cours)
                commit('setCours', res.data.cours)
                commit('setCoursWereFetched')
            });

        } else {
            commit('setCours', state.fetchedCours)
        }
    },
    filterCours({
        commit,
        state
    }) {
        commit('setCours', state.fetchedCours)
        commit('filterCoursByDate')
        commit('filterCoursByNiveau')
    },
    filterCoursByDate({
        commit,
        dispatch
    }, date) {
        commit('setFilterDate', date)
        dispatch('filterCours')
    },
    filterCoursByNiveau({
        commit,
        dispatch
    }, niveau) {
        commit('setFilterNiveau', niveau)
        dispatch('filterCours')
    },

};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}