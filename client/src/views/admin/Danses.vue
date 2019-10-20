
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
      <div v-if="!form">
        <v-layout>
          <v-flex offset-sm1 sm4 xs10 offset-xs1>
            <v-text-field v-model="name" label="Rechercher une danse" prepend-icon="search"></v-text-field>
          </v-flex>
          <v-flex offset-sm2 sm4 xs10 offset-xs1>
            <v-btn @click="addDance()" color="amber" block>Ajouter une nouvelle danse</v-btn>
          </v-flex>
        </v-layout>

        <div class="pa-3">
          <v-layout column v-for="danse in danses" :key="danse._id">
            <v-layout class="my-3" row wrap justify-center align-center>
              <v-flex class="title" offset-xs1 xs-12 sm-3>{{danse.name}}</v-flex>
              <!-- <v-spacer></v-spacer> -->
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
              <v-flex xs2>
                <v-btn @click="modifyDance(danse)" icon>
                  <v-icon color="red" size="40">build</v-icon>
                </v-btn>
              </v-flex>
              <v-flex xs2>
                <v-btn icon>
                  <v-icon color="red" size="40">remove_circle</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
            <v-divider></v-divider>
          </v-layout>
        </div>
      </div>
      <div v-else>
        <Form v-on:done="change()" :danceToModify="selectedDance"></Form>
      </div>
    </div>
  </div>
</template>
<script>
import Navbar from "@/components/navbar/general/Navbar";
import Form from "@/components/admin/danses/Form";

import Axios from "axios";
import config from "@/config.js";

export default {
  name: "",
  components: {
    Navbar,
    Form
  },
  beforeMount() {
    this.fetchDanses();
  },

  data: () => ({
    loading: true,
    fetchedDanses: [],
    danses: [],
    name: null,
    form: false,
    selectedDance: null
  }),

  watch: {
    name: function() {
      this.danses = this.fetchedDanses.filter(danse =>
        danse.name.toLowerCase().includes(this.name.toLowerCase())
      );
    }
  },
  methods: {
    fetchDanses() {
      loading: true,
        Axios.get(`${config.apiUrl}/danses`).then(res => {
          this.fetchedDanses = res.data.danses;
          this.danses = this.fetchedDanses.slice();
          this.loading = false;
        });
    },
    addDance() {
      this.selectedDance = null;
      this.form = true;
    },
    modifyDance(dance) {
      this.selectedDance = dance;
      this.form = true;
    }
  },
  change() {
    this.form = false;
    this.selectedDance = null;
    this.fetchedDanses();
  }
};
</script>
<style lang="scss" scoped>
</style>
