
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
      <v-layout>
        <v-flex offset-sm1 sm6 xs10 offset-xs1>
          <v-text-field v-model="name" label="Rechercher une danse" prepend-icon="search"></v-text-field>
        </v-flex>
      </v-layout>

      <div class="pa-3">
        <v-layout column v-for="danse in danses" :key="danse._id">
          <v-layout class="my-3" style="min-height:50px;" row wrap justify-center align-center>
            <v-flex class="title" xs6 offset-xs1>{{danse.name}}</v-flex>
            <v-spacer></v-spacer>
            <v-flex xs2>
              <v-btn v-if="danse.youtube" :href="danse.youtube" flat icon>
                <v-icon color="red" size="40" target="__blank">fab fa-youtube</v-icon>
              </v-btn>
            </v-flex>
            <v-flex xs2>
              <v-btn v-if="danse.pdf" :href="danse.pdf" flat icon>
                <v-icon color="red" size="40" target="__blank">fas fa-file-pdf</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
          <v-divider></v-divider>
        </v-layout>
      </div>
    </div>
  </div>
</template>
<script>
import Navbar from "@/components/navbar/general/Navbar";

import { mapState } from "vuex";

export default {
  name: "",
  components: {
    Navbar
  },
  mounted() {
    this.$store.dispatch("danseCountry/fetchDances");
  },

  data: () => ({
    name: ""
  }),
  computed: mapState({
    loading: state => !state.danseCountry.dancesWereFetched,
    danses: state => state.danseCountry.dances
  }),

  watch: {
    name: function() {
      this.$store.dispatch("danseCountry/filterDancesByName", this.name);
    }
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
</style>
