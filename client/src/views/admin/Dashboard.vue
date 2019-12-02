<template>
  <div>
    <Navbar></Navbar>
    <v-flex offset-sm2 sm8>
      <v-layout column>
        <v-btn
          @click="$router.push('/admin/danses')"
          color="red"
          text-color="white"
          flat
          class="display-3 my-4"
        >Danses</v-btn>
        <v-btn
          @click="$router.push('/admin/cours')"
          color="red"
          text-color="white"
          flat
          class="display-3 my-4"
        >Cours</v-btn>
        <v-btn
          @click="$router.push('/admin/manifestations')"
          color="red"
          text-color="white"
          flat
          class="display-3 my-4"
        >Manifestations</v-btn>
        <v-btn
          @click="$router.push('/admin/galeriePhoto')"
          color="red"
          text-color="white"
          flat
          class="display-3 my-4"
        >Bals</v-btn>
      </v-layout>
    </v-flex>
  </div>
</template>
<script>
import Axios from "axios";

import Navbar from "@/components/navbar/general/Navbar";

import DanseDashboard from "@/components/admin/DanseDashboard";
import ManifestationDashboard from "@/components/admin/ManifDashboard";
import NiveauDashboard from "@/components/admin/NiveauDashboard";
import RevisionDashboard from "@/components/admin/RevisionDashboard";

import RevisionForm from "@/components/admin/RevisionForm";
import DanseForm from "@/components/admin/DanseForm";
import ManifForm from "@/components/admin/ManifForm";
import NiveauForm from "@/components/admin/NiveauForm";

export default {
  name: "",
  mounted() {},
  components: {
    Navbar,
    DanseDashboard,
    ManifestationDashboard,
    NiveauDashboard,
    RevisionDashboard,
    RevisionForm,
    DanseForm,
    ManifForm,
    NiveauForm
  },
  data: () => ({
    selectedNiveau: {},
    selectedManifestation: {},
    selectedDanse: {},
    selectedRevision: {},
    bottomNav: 0,
    selectionArray: ["home", "danse", "manifestation", "revision", "niveau"],
    selection: "home"
  }),
  computed: {
    color() {
      switch (this.bottomNav) {
        case 0:
          return "#FFCC80";
        case 1:
          return "#FB8C00";
        case 2:
          return "#EF6C00";
        case 3:
          return "#E65100";
        case 4:
          return "#E65200";
      }
    }
  },

  methods: {
    selectionChange(select) {
      this.selection = select;
    },
    selectDanse(danse) {
      this.selectedDanse = danse;
      this.selection = this.selectionArray[1];
    },
    selectManifestation(manifestation) {
      this.selectedManifestation = manifestation;
      this.selection = this.selectionArray[2];
    },
    selectRevision(revision) {
      this.selectedRevision = revision;
      this.selection = this.selectionArray[3];
    },
    selectNiveau(niveau) {
      this.selectedNiveau = niveau;
      this.selection = this.selectionArray[4];
    },
    logged() {
      if (localStorage.getItem("auth")) {
        return true;
      }
      return false;
    },
    logout() {
      localStorage.removeItem("auth");
      this.$router.push("/");
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
