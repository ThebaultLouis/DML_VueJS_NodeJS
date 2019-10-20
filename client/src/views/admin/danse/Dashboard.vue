
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
      <div>
        <v-layout>
          <v-flex offset-sm1 sm4 xs10 offset-xs1>
            <v-text-field v-model="name" label="Rechercher une danse" prepend-icon="search"></v-text-field>
          </v-flex>
          <v-flex offset-sm2 sm4 xs10 offset-xs1>
            <v-btn
              @click="$router.push({name: 'adminDanceCreate'})"
              color="amber"
              block
            >Ajouter une nouvelle danse</v-btn>
          </v-flex>
        </v-layout>

        <div class="pa-3">
          <v-layout column v-for="danse in danses" :key="danse._id">
            <v-layout class="my-3" row wrap justify-center align-center style="min-height:50px;">
              <v-flex class="title" offset-xs1 xs-11 sm-3>{{danse.name}}</v-flex>
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
                <v-btn
                  @click="$router.push({name: 'adminDanceModify', params: {id: danse._id}})"
                  icon
                >
                  <v-icon color="red" size="40">build</v-icon>
                </v-btn>
              </v-flex>
              <v-flex xs2>
                <v-btn icon>
                  <v-icon @click="remove(danse._id)" color="red" size="40">remove_circle</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
            <v-divider></v-divider>
          </v-layout>
        </div>
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
    this.$store.dispatch("adminDanse/fetchDances");
  },
  data: () => ({
    name: ""
  }),
  computed: mapState({
    loading: state => state.adminDanse.loading,
    danses: state => state.adminDanse.dances
  }),

  watch: {
    name: function() {
      this.$store.dispatch("adminDanse/filterDancesByName", this.name);
    }
  },
  methods: {
    remove(id) {
      this.$store.dispatch("adminDanse/deleteDance", id);
    }
  }
};
</script>
<style lang="scss" scoped>
</style>