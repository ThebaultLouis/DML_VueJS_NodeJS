import Axios from "axios";
import config from "@/config.js";
import authHeader from "./authHeader";

const getters = {};
const state = {
  fetchedBals: [],
  bals: [],
  loading: false,
  filter: {
    date: null
  }
};
const mutations = {
  //
  setFetchedBals(state, bals) {
    state.fetchedBals = bals;
  },
  setBals(state, bals) {
    state.bals = bals;
  },
  setLoading(state, loading) {
    state.loading = loading;
  },
  // Filter
  setFilterDate(state, date) {
    state.filter.date = date;
  },
  filterBalsByDate(state) {
    state.bals = state.filter.date
      ? state.bals.filter(
          bals =>
            bals.doneAt
              .split("-")
              .slice(0, 2)
              .join("-") == state.filter.date
        )
      : state.bals.slice();
  }
};
const actions = {
  async fetchBals({ commit }) {
    commit("setLoading", true);
    Axios.get(`${config.apiUrl}/bals`).then(res => {
      commit("setFetchedBals", res.data);
      commit("setBals", res.data);
      commit("setLoading", false);
    });
  },
  async deleteBal({ commit, dispatch }, id) {
    commit("setLoading", true);
    Axios.delete(`${config.apiUrl}/bals/${id}`, authHeader())
      .then(() => {
        dispatch("fetchBals");
      })
      .catch(e => console.log(e));
  },
  filterBals({ commit, state }) {
    commit("setBals", state.fetchedBals);
    commit("filterBalsByDate");
  },
  filterBalsByDate({ commit, dispatch }, date) {
    commit("setFilterDate", date);
    dispatch("filterBals");
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
