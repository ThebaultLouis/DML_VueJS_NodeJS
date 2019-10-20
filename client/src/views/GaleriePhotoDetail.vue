<template>
  <div>
    <Navbar></Navbar>
    <div>
      <v-layout>
        <v-flex offset-sm2>
          <v-btn @click="$router.go(-1)" icon flat>
            <v-icon size="30">fa-arrow-left</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </div>
    <div v-if="!bal" class="my-5">
      <v-layout justify-center>
        <v-progress-circular :size="70" :width="7" color="brown" indeterminate></v-progress-circular>
      </v-layout>
      <div style="margin-top:600px;"></div>
    </div>
    <div v-else>
      <div class="title pa-2 text-xs-center">{{ bal.name }}</div>
      <div class="pa-1">
        <!-- <v-card max-width="800" class="mx-auto my-3 transparent" elevation="0" flat> -->
        <div class="mx-auto my-3" style="max-width:800px;">
          <v-carousel
            hide-delimiters
            elevation="0"
            class="transparent"
            height="1080"
            style="box-shadow: none"
          >
            <v-carousel-item v-for="(item,i) in bal.photos" :key="i">
              <!-- <v-carousel-item v-for="(item,i) in bal.photos" :key="i" :src="item"> -->

              <v-layout fill-height justify-center align-center>
                <v-img max-width="1080" contain :src="item"></v-img>
              </v-layout>
            </v-carousel-item>
          </v-carousel>
        </div>
        <!-- </v-card> -->
      </div>
    </div>
  </div>
</template>
<script>
import Navbar from "@/components/navbar/general/Navbar";

import { mapState } from "vuex";

export default {
  name: "",
  beforeMount: function() {
    this.bal = this.bals.find(bal => bal._id == this.$route.params.id);
  },
  data: () => ({
    bal: {}
  }),
  components: {
    Navbar
  },
  mounted() {
    this.$store.dispatch("bal/fetchBals");
  },
  computed: mapState({
    bals: state => state.bal.bals
  })
};
</script>
<style lang="scss" scoped>
</style>
