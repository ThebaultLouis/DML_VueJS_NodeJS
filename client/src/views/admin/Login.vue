<template>
  <div id>
    <Navbar></Navbar>
    <h1 class="text-xs-center my-3 display-2 orange--text">Administration</h1>
    <v-layout my-4>
      <v-flex xs12 sm6 offset-sm3>
        <v-card class="ma-4 orange lighten-4">
          <v-form class="pa-2" lazy-validation>
            <v-text-field v-model="username" label="Nom d'utilisateur" required></v-text-field>

            <v-text-field v-model="password" type="password" label="Mot de passe" required></v-text-field>
            <div class="text-xs-right">
              <v-btn v-on:click.native="login()" class="amber darken-1 text-xs-right">Validate</v-btn>
            </div>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
    <!-- <div data-aos="fade-right">
      <v-img height="100%" aspect-ratio="2" src="/danse_country.jpg">
        <v-layout my-4>
          <v-flex xs12 sm5 offset-sm0>
            <v-card class="ma-4 orange lighten-4">
              <v-form class="pa-2" lazy-validation>
                <v-text-field v-model="username" label="Nom d'utilisateur" required></v-text-field>

                <v-text-field v-model="password" type="password" label="Mot de passe" required></v-text-field>

                <v-btn v-on:click.native="login()" class="amber darken-1 text-xs-right">Validate</v-btn>
              </v-form>
            </v-card>
          </v-flex>
        </v-layout>
      </v-img>
    </div>-->
    <div style="margin-top:120px;"></div>
  </div>
</template>
<script>
import Axios from "axios";
import config from "@/config.js";

import Navbar from "@/components/navbar/general/Navbar";

export default {
  name: "",
  components: {
    Navbar
  },
  beforeRouteEnter(to, from, next) {
    if (localStorage.getItem("auth")) {
      return next({ path: "/admin/dashboard" });
    }
    next();
  },
  data: () => ({
    username: "",
    password: "",
    loading: false
  }),
  methods: {
    login() {
      this.loading = true;
      Axios.post(`${config.apiUrl}/admin/login`, {
        username: this.username,
        password: this.password
      })
        .then(response => {
          this.loading = false;
          this.$noty.success("Correctement identifié");
          // console.log(response.data.token);
          localStorage.setItem("auth", response.data.token);
          this.$root.auth = response.data.data;

          this.$router.push({ path: "/admin/dashboard" });
        })
        .catch(e => {
          this.loading = false;
          this.password = "";
        });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
