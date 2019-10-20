<template lang="">
    <div>
         <v-layout row class="my-2">
          <v-flex xs12 sm8 offset-sm2>
            <v-card>
              <v-card-title primary-title>
                <v-layout row>
                  <v-flex>
                    <v-layout row>
                      <!-- <v-flex xs1 class="text-xs-left"> -->
                      <v-icon class="mr-4" color="brown" size="40">{{cours.niveau.logo}}</v-icon>
                      <!-- </v-flex> -->
                      <v-layout column>
                        <span class="headline">{{cours.danseApprise ? cours.danseApprise.name : 'Cours de révision'}} </span>
                        <span class="grey--text">{{doneAt}}</span>
                      </v-layout>
                    </v-layout>
                  </v-flex>
                <v-spacer></v-spacer>

                <v-flex xs2 v-if="cours.danseApprise">
                  <v-btn 
                  v-if="cours.danseApprise.youtube"
                  :href="cours.danseApprise.youtube"
                  target="__blank"
                  flat icon >
                    <v-icon color="red" size="40">fab fa-youtube</v-icon>
                  </v-btn>
                </v-flex>
                <v-flex xs2 v-if="cours.danseApprise">
                  <v-btn 
                  v-if="cours.danseApprise.pdf"
                  :href="cours.danseApprise.pdf"
                    target="__blank"
                  flat icon>
                    <v-icon color="red" size="40">fas fa-file-pdf</v-icon>
                  </v-btn>
                  </v-flex>
                <v-flex xs1 v-if="admin">
                        <v-btn
                          @click="$router.push({name: 'adminCoursModify', params: {id: cours._id}})"
                          icon
                        >
                          <v-icon color="red" size="40">build</v-icon>
                        </v-btn>
                      </v-flex>
                      <v-flex xs1 v-if="admin">
                        <v-btn icon>
                          <v-icon @click="remove(cours._id)" color="red" size="40">remove_circle</v-icon>
                        </v-btn>
                      </v-flex>
                </v-layout>
              </v-card-title>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn icon @click="show = !show">
                  <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
                </v-btn>
              </v-card-actions>
              <v-slide-y-transition>
                <v-card-text v-show="show">
                  <v-divider></v-divider>
                  <v-list>
                    <v-list-tile v-for="danse in cours.dansesRevisees"
                    class="my-3">
                      <v-layout class="my-3" row wrap justify-center align-center>
                        <v-flex class="title" xs8>{{danse.name}}</v-flex>
                        <v-spacer></v-spacer>
                        <v-flex xs2>
                          <v-btn 
                  v-if="danse.youtube"
                  :href="danse.youtube"
                    target="__blank"
                  flat icon >
                    <v-icon color="red" size="40">fab fa-youtube</v-icon>
                  </v-btn>
                        </v-flex>
                        <v-flex xs2>
                          <v-btn 
                  v-if="danse.pdf"
                  :href="danse.pdf"
                    target="__blank"
                  flat icon>
                    <v-icon color="red" size="40">fas fa-file-pdf</v-icon>
                  </v-btn>
                        </v-flex>
                      </v-layout>
                    </v-list-tile>
                  </v-list>
                </v-card-text>
              </v-slide-y-transition>
            </v-card>
          </v-flex>
        </v-layout>
    </div>
</template>
<script>
import utils from "@/utils/string.js";

export default {
  name: "coursItem",
  props: ["cours", "admin"],
  data: () => ({
    show: false
  }),
  computed: {
    doneAt() {
      return utils.getDate(this.cours.doneAt);
    }
  },
  methods: {
    remove(id) {
      this.$store.dispatch("adminCours/deleteCours", id);
    }
  }
};
</script>