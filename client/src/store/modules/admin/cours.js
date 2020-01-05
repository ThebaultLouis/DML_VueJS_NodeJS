import Axios from "axios";
import config from "@/config.js";
import authHeader from "./authHeader";

const getters = {};
const state = {
  fetchedCours: [],
  cours: [],
  loading: true,
  selectedCours: {},
  niveaux: [
    {
      name: "tous",
      logo: "clear",
      _id: 0
    }
  ],
  filter: {
    niveau: 0,
    date: null
  }
};
const mutations = {
  //
  setFetchedCours(state, cours) {
    state.fetchedCours = cours;
  },
  setCours(state, cours) {
    state.cours = cours;
  },
  setLoading(state, loading) {
    state.loading = loading;
  },
  findCoursById(state, id) {
    state.selectedCours = state.fetchedCours.find(cours => cours._id == id);
  },
  // Niveau
  setNiveaux(state, niveaux) {
    if (state.niveaux.length > 1) {
      return;
    }
    state.niveaux = state.niveaux.concat(niveaux);
  },
  // Filter
  setFilterNiveau(state, niveau) {
    state.filter.niveau = niveau;
  },
  setFilterDate(state, date) {
    state.filter.date = date;
  },
  filterCoursByDate(state) {
    state.cours = state.filter.date
      ? state.cours.filter(cours => cours.doneAt == state.filter.date)
      : state.cours.slice();
  },
  filterCoursByNiveau(state) {
    state.cours = state.filter.niveau
      ? state.cours.filter(cours => cours.niveau._id == state.filter.niveau)
      : state.cours.slice();
  }
};
const actions = {
  async fetchCours({ commit }) {
    commit("setLoading", true);
    Axios.get(`${config.apiUrl}/cours`).then(res => {
      commit("setNiveaux", res.data.niveaux);
      commit("setFetchedCours", res.data.cours);
      commit("setCours", res.data.cours);
      commit("setLoading", false);
    });
  },
  async addCours({ commit }, cours) {
    commit("setLoading", true);
    Axios.post(`${config.apiUrl}/cours`, cours, authHeader())
      .then(() => {
        commit("setLoading", false);
      })
      .catch(e => console.log(e));
  },
  async modifyCours({ commit }, playload) {
    commit("setLoading", true);
    Axios.patch(
      `${config.apiUrl}/cours/${playload.id}`,
      playload.cours,
      authHeader()
    )
      .then(() => {
        commit("setLoading", false);
      })
      .catch(e => console.log(e));
  },
  async deleteCours({ commit, dispatch }, id) {
    commit("setLoading", true);
    Axios.delete(`${config.apiUrl}/cours/${id}`, authHeader())
      .then(() => {
        dispatch("fetchCours");
      })
      .catch(e => console.log(e));
  },
  filterCours({ commit, state }) {
    commit("setCours", state.fetchedCours);
    commit("filterCoursByDate");
    commit("filterCoursByNiveau");
  },
  filterCoursByDate({ commit, dispatch }, date) {
    commit("setFilterDate", date);
    dispatch("filterCours");
  },
  filterCoursByNiveau({ commit, dispatch }, niveau) {
    commit("setFilterNiveau", niveau);
    dispatch("filterCours");
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
