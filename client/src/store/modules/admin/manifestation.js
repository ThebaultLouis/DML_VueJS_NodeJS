import Axios from "axios"
import config from "@/config.js"
import authHeader from "./authHeader"

const getters = {}
const state = {
  fetchedManifestations: [],
  manifestations: [],
  manifestation: {},
  loading: false,
  types: [
    {
      name: "tous",
      logo: "clear",
      id: 0
    },
    {
      name: "A domicile",
      logo: "home",
      isAtHome: true,
      id: 1
    },
    {
      name: "A l'exterieur",
      logo: "fa-plane",
      isAtHome: true,
      id: 2
    }
  ],
  filter: {
    type: 0,
    date: null
  }
}
const mutations = {
  //
  setFetchedManifestations (state, manifestations) {
    state.fetchedManifestations = manifestations
  },
  setManifestations (state, manifestations) {
    state.manifestations = manifestations
  },
  setLoading (state, loading) {
    state.loading = loading
  },
  // Filter
  findManifestationById (state, id) {
    state.manifestation = state.manifestations.find(manif => manif._id == id)
  },
  setFilterType (state, type) {
    state.filter.type = type
  },
  setFilterDate (state, date) {
    state.filter.date = date
  },
  filterManifestationsByDate (state) {
    state.manifestations = state.filter.date
      ? state.manifestations.filter(
        manifestations =>
          manifestations.doneAt
            .split("-")
            .slice(0, 2)
            .join("-") == state.filter.date
      )
      : state.manifestations.slice()
  },
  filterManifestationsByType (state) {
    switch (state.filter.type) {
      case 0:
        state.manifestations = state.manifestations.slice()
        break
      case 1:
        state.manifestations = state.manifestations.filter(
          manif => manif.domicile
        )
        break
      case 2:
        state.manifestations = state.manifestations.filter(
          manif => !manif.domicile
        )
    }
  }
}
const actions = {
  async fetchManifestations ({ commit }) {
    commit("setLoading", true)
    Axios.get(`${config.apiUrl}/manifestations/admin`).then(res => {
      commit("setFetchedManifestations", res.data)
      commit("setManifestations", res.data)
      commit("setLoading", false)
    })
  },
  async deleteManifestation ({ commit, dispatch }, id) {
    commit("setLoading", true)
    Axios.delete(`${config.apiUrl}/manifestations/${id}`, authHeader())
      .then(() => {
        dispatch("fetchManifestations")
      })
      .catch(e => console.log(e))
  },
  filterManifestations ({ commit, state }) {
    commit("setManifestations", state.fetchedManifestations)
    commit("filterManifestationsByDate")
    commit("filterManifestationsByType")
  },
  filterManifestationsByDate ({ commit, dispatch }, date) {
    commit("setFilterDate", date)
    dispatch("filterManifestations")
  },
  filterManifestationsByType ({ commit, dispatch }, type) {
    commit("setFilterType", type)
    dispatch("filterManifestations")
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
