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
    <!-- <v-list>
      <v-list-tile>
        <v-list-title>Danses</v-list-title>
      </v-list-tile>
    </v-list>-->
    <!-- <v-list>
      <v-list-tile></v-list-tile>
    </v-list>-->
    <!-- <v-card height="55px">
      <v-bottom-nav :active.sync="bottomNav" :color="color" :value="true" absolute dark shift>
        <v-btn v-on:click.native="selectionChange(selectionArray[0])" dark>
          <span>Général</span>
          <v-icon>home</v-icon>
        </v-btn>

        <v-btn v-on:click.native="selectionChange(selectionArray[1])" dark>
          <span>Danse</span>
          <v-icon>music_note</v-icon>
        </v-btn>

        <v-btn v-on:click.native="selectionChange(selectionArray[2])" dark>
          <span>Manifestation</span>
          <v-icon>fa-calendar-alt</v-icon>
        </v-btn>

        <v-btn v-on:click.native="selectionChange(selectionArray[3])" dark>
          <span>Révision</span>
          <v-icon>fa-graduation-cap</v-icon>
        </v-btn>

        <v-btn v-on:click.native="selectionChange(selectionArray[4])" dark>
          <span>Niveaux</span>
          <v-icon>fa-layer-group</v-icon>
        </v-btn>

        <v-btn v-on:click.native="logout()" dark v-if="logged()">
          <span>Admin</span>
          <v-icon>fa-power-off</v-icon>
        </v-btn>
      </v-bottom-nav>
    </v-card>-->
    <!-- <div v-if="selectionArray[0] === selection">
      <DanseDashboard class="mt-4" v-on:modifyDanceEvent="selectDanse($event)"></DanseDashboard>
      <ManifestationDashboard
        class="mt-4"
        v-on:modifyManifestationEvent="selectManifestation($event)"
      ></ManifestationDashboard>
      <RevisionDashboard class="mt-4" v-on:modifyRevisionEvent="selectRevision($event)"></RevisionDashboard>
      <NiveauDashboard class="mt-4" v-on:modifyNiveauEvent="selectNiveau($event)"></NiveauDashboard>
    </div>

    <div v-if="selectionArray[1] === selection">
      <DanseForm :danceToModify="selectedDanse" v-on:danceModified="selectedDanse = {}"></DanseForm>
    </div>

    <div v-if="selectionArray[2] === selection">
      <ManifForm
        :manifestationToModify="selectedManifestation"
        v-on:manifestationModified="selectedManifestation = {}"
      ></ManifForm>
    </div>

    <div v-if="selectionArray[3] === selection">
      <RevisionForm
        :revisionToModify="selectedRevision"
        v-on:revisionModified="selectedRevision = {}"
      ></RevisionForm>
    </div>

    <div v-if="selectionArray[4] === selection">
      <NiveauForm :niveauToModify="selectedNiveau" v-on:niveauModified="selectedNiveau = {}"></NiveauForm>
    </div>-->
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
  mounted() {
    // this.getNiveaux()
    // this.getManifestations()
    // this.getDanses()
  },
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
