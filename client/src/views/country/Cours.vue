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
      <!-- <v-layout row>
        <v-flex offset-sm2>
          <v-btn icon @click="search = !search">
            <v-icon size="50">fa-search-plus</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>-->

      <!-- <v-slide-y-transition> -->
      <v-layout row wrap>
        <v-flex offset-sm2 sm2>
          <v-layout column>
            <v-flex v-for="niveau in niveaux" :key="niveau._id">
              <v-btn flat large :name="niveau.name" @click="selectedNiveau = niveau._id">
                <v-icon
                  size="40"
                  :color="selectedNiveau == niveau._id ? 'amber' : 'brown'"
                >{{niveau.logo}}</v-icon>
                <div class="ml-2 subheading font-weight-bold">{{niveau.name}}</div>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs10 offset-xs1 sm4 offset-sm2>
          <v-date-picker
            full-width
            locale="Fr-fr"
            color="brown"
            v-model="date"
            min="2018-06-01"
            max="2025-06-01"
            scrollable
          >
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="date = null">Annuler</v-btn>
          </v-date-picker>
        </v-flex>
        <v-flex>
          <v-spacer></v-spacer>
        </v-flex>
        <v-flex hidden-xs-only sm2></v-flex>
      </v-layout>
      <!-- </v-slide-y-transition> -->

      <div class="pa-3">
        <v-layout column class="my-4">
          <CoursItem v-for="cours in allCours" :key="cours._id" :cours="cours"></CoursItem>
        </v-layout>
      </div>
    </div>
  </div>
</template>
<script>
import Navbar from "@/components/navbar/general/Navbar";
import CoursItem from "@/components/cours/CoursItem";

import { mapState } from "vuex";

export default {
  name: "",
  components: {
    Navbar,
    CoursItem
  },
  mounted() {
    this.$store.dispatch("coursCountry/fetchCours");
  },
  computed: mapState({
    loading: state => !state.coursCountry.coursWereFetched,
    allCours: state => state.coursCountry.cours,
    niveaux: state => state.coursCountry.niveaux
  }),

  data: () => ({
    selectedNiveau: 0,
    date: null,
    search: false
  }),

  watch: {
    date: function() {
      this.$store.dispatch("coursCountry/filterCoursByDate", this.date);
    },
    selectedNiveau: function() {
      this.$store.dispatch(
        "coursCountry/filterCoursByNiveau",
        this.selectedNiveau
      );
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
