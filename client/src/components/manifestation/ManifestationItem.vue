<template lang="">
    <div>
        <v-divider></v-divider>
         <v-layout row class="my-2">
          <v-flex xs12 sm9 offset-sm2>
            <!-- <v-card> -->
              <v-card-title primary-title>
                <v-layout row>
                      <v-icon class="mr-4" color="brown" size="40">{{logo}}</v-icon>
                    <v-layout column>
                      <v-flex>
                            <span class="headline">{{doneAt}} </span>
                      </v-flex>
                      <v-flex>
                            <span class="">{{manifestation.club}} </span>
                      </v-flex>
                      <v-flex>
                            <span class="grey--text">{{subHeadline}} </span>
                      </v-flex>
                    </v-layout>
                <v-spacer></v-spacer>
                <v-flex xs2>
                  <v-btn 
                  v-if="manifestation.pdfAffiche"
                  :href="manifestation.pdfAffiche"
                    target="__blank"
                  flat icon>
                    <v-icon color="brown" size="40">fas fa-file-image</v-icon>
                  </v-btn>
                </v-flex>
                <v-flex xs2>
                  <v-btn 
                  v-if="manifestation.pdfPlaylist"
                  :href="manifestation.pdfPlaylist"
                    target="__blank"
                  flat icon>
                    <v-icon color="brown" size="40">fa-list</v-icon>
                  </v-btn>
                </v-flex>
                <!-- <v-flex xs2>
                  <v-btn 
                  v-if="manifestation.youtube"
                  :href="manifestation.youtube"
                  target="__blank"
                  flat icon >
                    <v-icon color="red" size="40">fab fa-youtube</v-icon>
                  </v-btn>
                </v-flex> -->
                <v-flex xs1 v-if="admin">
                  <v-btn
                    @click="$router.push({name: 'adminManifestationModify', params: {id: manifestation._id}})"
                    icon
                  >
                    <v-icon color="red" size="40">build</v-icon>
                  </v-btn>
                </v-flex>
                <v-flex xs1 v-if="admin">
                  <v-btn icon>
                    <v-icon @click="remove(manifestation._id)" color="red" size="40">remove_circle</v-icon>
                  </v-btn>
                </v-flex>
                </v-layout>
              </v-card-title>
            <!-- </v-card> -->
          </v-flex>
        </v-layout>
        
    </div>
</template>
<script>
import utils from "@/utils/string.js";

export default {
  name: "ManifestationItem",
  props: ["manifestation", "admin"],

  computed: {
    doneAt() {
      return utils.getDate(this.manifestation.doneAt);
    },
    subHeadline() {
      return this.manifestation.zipcode + "  " + this.manifestation.city;
    },
    logo() {
      return this.manifestation.domicile ? "home" : "fa-plane";
    }
  },
  methods: {
    remove(id) {
      this.$store.dispatch("adminManifestation/deleteManifestation", id);
    }
  }
};
</script>