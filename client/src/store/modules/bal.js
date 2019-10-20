import Axios from 'axios'
import config from "@/config.js";

const getters = {

};
const state = {
    fetchedBals: [],
    bals: [],
    balsWereFetched: false,
    filter: {
        date: null,
    }
};
const mutations = {
    // 
    setFetchedBals(
        state, bals) {
        state.fetchedBals = bals
    },
    setBals(
        state, bals) {
        state.bals = bals
    },
    setBalsWereFetched(
        state
    ) {
        state.balsWereFetched = true
    },
    // Filter
    setFilterDate(state, date) {
        state.filter.date = date
    },
    filterBalsByDate(state) {
        state.bals = state.filter.date ? state.bals.filter(bals => bals.doneAt.split('-').slice(0, 2).join('-') == state.filter.date) : state.bals.slice();
    },
};
const actions = {
    async fetchBals({
        commit,
        state
    }) {
        if (!state.BalsWereFetched) {
            Axios.get(`${config.apiUrl}/bals`).then(res => {
                commit('setFetchedBals', res.data)
                commit('setBals', res.data)
                commit('setBalsWereFetched')
            });

        } else {
            commit('setBals', state.fetchedBals)
        }
    },
    filterBals({
        commit,
        state
    }) {
        commit('setBals', state.fetchedBals)
        commit('filterBalsByDate')
    },
    filterBalsByDate({
        commit,
        dispatch
    }, date) {
        commit('setFilterDate', date)
        dispatch('filterBals')
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}