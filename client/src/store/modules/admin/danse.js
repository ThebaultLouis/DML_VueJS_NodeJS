import Axios from "axios";
import config from "@/config.js";
import authHeader from "./authHeader";

const getters = {};
const state = {
  fetchedDances: [],
  dances: [],
  dance: null,
  loading: true
};
const mutations = {
  setFetchedDances(state, dances) {
    state.fetchedDances = dances;
  },
  setDances(state, dances) {
    state.dances = dances;
  },
  setLoading(state, loading) {
    state.loading = loading;
  },
  findDanceById(state, id) {
    state.dance = state.fetchedDances.find(dance => dance._id == id);
  }
};
const actions = {
  async fetchDances({ commit }) {
    commit("setLoading", true);
    Axios.get(`${config.apiUrl}/danses`).then(res => {
      commit(
        "setFetchedDances",
        res.data.danses.sort((a, b) =>
          a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        )
      );
      commit("setDances", state.fetchedDances);
      commit("setLoading", false);
    });
  },
  async deleteDance({ dispatch }, id) {
    Axios.delete(`${config.apiUrl}/danses/${id}`, authHeader())
      .then(() => {
        dispatch("fetchDances");
      })
      .catch(e => console.log(e));
  },
  filterDancesByName({ commit, state }, name) {
    commit(
      "setDances",
      state.fetchedDances.filter(danse =>
        danse.name.toLowerCase().includes(name.toLowerCase())
      )
    );
  },
  findDanceById({ state }, id) {
    return state.fetchedDances.find(dance => dance._id == id);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
