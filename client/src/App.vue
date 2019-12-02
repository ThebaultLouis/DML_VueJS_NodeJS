<template>
  <div id="app">
    <!-- <div style="background-color:#ffaf34;">
      <v-img
      class="hidden-xs-only"
      src="/Logo/utils/logo02.jpg"
      contain
      max-height="400"
      >
      </v-img>
    </div>-->
    <!-- <div>
      <v-container class="pt-0 pa-0">
        <Navbar></Navbar>
      </v-container>
    </div>-->
    <!-- <div class="brown">
      <v-container class="pt-0 pa-0">
        <Navbar></Navbar>
      </v-container>
    </div>-->
    <v-app id="color">
      <router-view />
    </v-app>
    <!-- <v-app id="color">
      <router-view />
    </v-app>-->
    <!-- <v-container class="pt-0 pa-0"></v-container> -->
    <v-layout column justify-end>
      <Footbar></Footbar>
    </v-layout>
  </div>
</template>

<script>
// import Navbar from "@/components/Navbar";
import Footbar from "@/components/Footbar";

export default {
  name: "",
  data: () => ({}),
  components: {
    Footbar
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}
#color {
  background-color: #fff8e1;
}
</style>
