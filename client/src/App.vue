<template>
  <div id="app">
    <v-app id="color">
      <router-view />
    </v-app>
    <v-layout column justify-end>
      <Footbar></Footbar>
    </v-layout>
  </div>
</template>

<script>
// import Axios from "axios";
// import config from "@/config.js";
// import authHeader from "./store/modules/admin/authHeader";
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
