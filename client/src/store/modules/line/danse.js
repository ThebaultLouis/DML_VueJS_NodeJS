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
                    type: 1
                }
            }).then(res => {
                commit('setFetchedDances', res.data.danses)
                commit('setDances', res.data.danses)
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