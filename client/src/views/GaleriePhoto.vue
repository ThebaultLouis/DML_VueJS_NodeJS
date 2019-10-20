<template>
  <div>
    <Navbar></Navbar>
    <div v-if="loading" class="my-5">
      <v-layout justify-center>
        <v-progress-circular :size="70" :width="7" color="brown" indeterminate></v-progress-circular>
      </v-layout>
      <div style="margin-top:600px;"></div>
    </div>
    <div v-else>
      <!-- <v-layout row>
        <v-flex xs10 offset-xs1 sm4 offset-sm4>
          <v-date-picker
            full-width
            locale="Fr-fr"
            color="brown"
            v-model="date"
            type="month"
            min="2018-06-01"
            max="2022-06-01"
            scrollable
          >
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="date = null">Annuler</v-btn>
          </v-date-picker>
        </v-flex>
      </v-layout>-->
      <v-layout row>
        <v-spacer></v-spacer>
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
                <v-icon size="50">event</v-icon>
              </v-btn>
            </template>
            <v-date-picker
              locale="Fr-fr"
              color="brown"
              v-model="date"
              type="month"
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
      <div class="pa-1">
        <v-layout column>
          <v-flex v-for="bal in bals" :key="bal._id">
            <BalItem :bal="bal"></BalItem>
          </v-flex>
        </v-layout>
      </div>
    </div>
  </div>
</template>
<script>
import Navbar from "@/components/navbar/general/Navbar";
import BalItem from "@/components/galeriePhoto/GaleriePhotoItem";

import { mapState } from "vuex";

export default {
  name: "",
  components: {
    Navbar,
    BalItem
  },
  mounted() {
    this.$store.dispatch("bal/fetchBals");
  },
  computed: mapState({
    loading: state => !state.bal.balsWereFetched,
    bals: state => state.bal.bals
  }),

  data: () => ({
    date: null
  }),

  watch: {
    date: function() {
      this.$store.dispatch("bal/filterBalsByDate", this.date);
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
