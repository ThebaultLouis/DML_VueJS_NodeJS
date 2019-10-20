import Axios from 'axios'
import config from "@/config.js";

const getters = {

};
const state = {
    fetchedDances: [],
    dances: [],
    dancesWereFetched: false,
};
const mutations = {
    setFetchedDances(
        state, dances) {
        state.fetchedDances = dances
    },
    setDances(
        state, dances) {
        state.dances = dances
    },
    setDancesWereFetched(
        state
    ) {
        state.dancesWereFetched = true
    }
};
const actions = {
    async fetchDances({
        commit,
        state
    }) {
        if (!state.dancesWereFetched) {
            Axios.get(`${config.apiUrl}/danses`, {
                params: {
                    type: 0
                }
            }).then(res => {
                commit('setFetchedDances', res.data.danses.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase())))
                commit('setDances', state.fetchedDances)
                commit('setDancesWereFetched')
            });
        } else {
            commit('setDances', state.fetchedDances)
        }
    },
    filterDancesByName({
            commit,
            state
        },
        name) {
        commit('setDances', state.fetchedDances.filter(danse =>
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