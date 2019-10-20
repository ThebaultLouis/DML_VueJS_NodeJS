import Axios from 'axios'
import config from "@/config.js";

const getters = {

};
const state = {
    fetchedCountryCours: [],
    countryCours: [],
    countryCoursWereFetched: false,
    fetchedLineCours: [],
    lineCours: [],
    lineCoursWereFetched: false,
    niveaux: [{
        name: "tous",
        logo: "clear",
        _id: 0
    }],
    countryFilter: {
        niveau: 0,
        date: null,
    }
};
const mutations = {
    // Country
    setFetchedCountryCours(
        state, cours) {
        state.fetchedCountryCours = cours
    },
    setCountryCours(
        state, cours) {
        state.countryCours = cours
    },
    setCountryCoursWereFetched(
        state
    ) {
        state.countryCoursWereFetched = true
    },
    // line
    setFetchedLineCours(
        state, cours) {
        state.fetchedLineCours = cours
    },
    setLineCours(
        state, cours) {
        state.lineCours = cours
    },
    setLineCoursWereFetched(
        state
    ) {
        state.lineCoursWereFetched = true
    },
    // Niveau
    setNiveaux(state, niveaux) {
        state.niveaux = state.niveaux.concat(niveaux)
    },
    // Filter
    // Country
    setCountryFilterNiveau(state, niveau) {
        state.countryFilter.niveau = niveau
    },
    setCountryFilterDate(state, date) {
        state.countryFilter.date = date
    },
    filterCountryCoursByDate(state) {
        state.countryCours = state.countryFilter.date ? state.countryCours.filter(cours => cours.doneAt == state.countryFilter.date) : state.countryCours.slice();
    },
    filterCountryCoursByNiveau(state) {
        state.countryCours = state.countryFilter.niveau ? state.countryCours.filter(cours => cours.niveau._id == state.countryFilter.niveau) : state.countryCours.slice();
    }

};
const actions = {
    async fetchCountryCours({
        commit,
        state
    }) {
        if (!state.countryCoursWereFetched) {
            Axios.get(`${config.apiUrl}/cours`, {
                params: {
                    type: 0
                }
            }).then(res => {
                commit('setNiveaux', res.data.niveaux)
                commit('setFetchedCountryCours', res.data.cours)
                commit('setCountryCours', res.data.cours)
                commit('setCountryCoursWereFetched')
            });

        } else {
            commit('setCountryCours', state.fetchedCountryCours)
        }
    },
    filterCountryCours({
        commit,
        state
    }) {
        commit('setCountryCours', state.fetchedCountryCours)
        commit('filterCountryCoursByDate')
        commit('filterCountryCoursByNiveau')
    },
    filterCountryCoursByDate({
        commit,
        dispatch
    }, date) {
        commit('setCountryFilterDate', date)
        dispatch('filterCountryCours')
    },
    filterCountryCoursByNiveau({
        commit,
        dispatch
    }, niveau) {
        commit('setCountryFilterNiveau', niveau)
        dispatch('filterCountryCours')
    },

    // filterCountryCours({
    //     commit,
    //     state
    // }) {
    //     commit('setCountryCours', state.fetchedCountryCours)
    //     commit('setCountryCours', filterCoursByDate(state.countryCours, state.filter.date))
    //     commit('setCountryCours', filterCoursByNiveau(state.countryCours, state.filter.niveau))
    // },
    // filterCountryCoursByDate({
    //     commit,
    //     dispatch
    // }, date) {
    //     commit('setCountryFilterDate', date)
    //     dispatch('filterCountryCours')
    // },
    // filterCountryCoursByNiveau({
    //     commit,
    //     dispatch
    // }, niveau) {
    //     commit('setCountryFilterNiveau', niveau)
    //     dispatch('filterCountryCours')
    // },

    async fetchLineCours({
        commit,
        state
    }) {
        if (!state.lineCoursWereFetched) {
            Axios.get(`${config.apiUrl}/cours`, {
                params: {
                    type: 1
                }
            }).then(res => {
                commit('setFetchedLineCours', res.data.cours)
                commit('setLineCours', res.data.cours)
                commit('setLineCoursWereFetched')
            });

        } else {
            commit('setLineCours', state.fetchedLineCours)
        }
    },
    filterCountryCoursByName({
            commit,
            state
        },
        name) {
        commit('setCountryCours', state.fetchedCountryCours.filter(danse =>
                danse.name.toLowerCase().includes(name.toLowerCase()))

        )
    },
    filterLineCoursByName({
            commit,
            state
        },
        name) {
        commit('setLineCours', state.fetchedLineCours.filter(danse =>
                danse.name.toLowerCase().includes(name.toLowerCase()))

        )
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}