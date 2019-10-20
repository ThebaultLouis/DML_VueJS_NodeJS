<template>
  <div id>
    <Navbar></Navbar>

    <div v-if="loading" class="my-5">
      <v-layout justify-center>
        <v-progress-circular :size="70" :width="7" color="brown" indeterminate></v-progress-circular>
      </v-layout>
      <div style="margin-top:600px;"></div>
    </div>

    <div v-else>
      <v-layout class="mb-5">
        <v-flex offset-sm6 sm4 xs10 offset-xs1>
          <v-btn
            @click="$router.push({name: 'adminCoursCreate'})"
            color="amber"
            block
          >Ajouter un nouveau cours</v-btn>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex offset-sm-1></v-flex>
        <v-flex xs2 sm1 v-for="niveau in niveaux" :key="niveau._id">
          <v-btn :name="niveau.name" @click="selectedNiveau = niveau._id" icon>
            <v-icon
              size="50"
              :color="selectedNiveau == niveau._id ? 'amber' : 'brown'"
            >{{niveau.logo}}</v-icon>
          </v-btn>
        </v-flex>
        <v-flex>
          <v-spacer></v-spacer>
        </v-flex>
        <v-flex xs2 sm1>
          <v-menu
            ref="menu"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="date"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on">
                <v-icon size="80">event</v-icon>
              </v-btn>
            </template>
            <v-date-picker
              locale="Fr-fr"
              color="brown"
              v-model="date"
              min="2018-06-01"
              max="2022-06-01"
              scrollable
            >
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="date = null">Annuler</v-btn>
              <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
            </v-date-picker>
          </v-menu>
        </v-flex>
        <v-flex hidden-xs-only sm2></v-flex>
      </v-layout>

      <div class="pa-3">
        <v-layout column class="my-4">
          <CoursItem v-for="cours in allCours" :key="cours._id" :cours="cours" :admin="true"></CoursItem>
        </v-layout>
      </div>
    </div>
  </div>
</template>
<script>
import Navbar from "@/components/navbar/general/Navbar";
import CoursItem from "@/components/cours/CoursItem";

import Axios from "axios";
import config from "@/config.js";
import { mapState } from "vuex";

export default {
  name: "",
  components: {
    Navbar,
    CoursItem
  },
  mounted() {
    this.$store.dispatch("adminCours/fetchCours");
  },
  computed: mapState({
    loading: state => state.adminCours.loading,
    allCours: state => state.adminCours.cours,
    niveaux: state => state.adminCours.niveaux
  }),

  data: () => ({
    selectedNiveau: 0,
    date: null
  }),

  watch: {
    date: function() {
      this.$store.dispatch("adminCours/filterCoursByDate", this.date);
    },
    selectedNiveau: function() {
      this.$store.dispatch(
        "adminCours/filterCoursByNiveau",
        this.selectedNiveau
      );
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
