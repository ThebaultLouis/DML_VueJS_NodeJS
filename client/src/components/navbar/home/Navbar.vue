<template>
  <div>
    <v-container class="pt-0 pa-0">
      <v-navigation-drawer v-model="drawer" :disable-resize-watcher="true" absolute>
        <drawer></drawer>
      </v-navigation-drawer>

      <v-toolbar color="transparent" dark flat>
        <!-- <v-toolbar color="transparent" flat> -->
        <v-toolbar-side-icon @click.stop="drawer = !drawer" class="hidden-md-and-up"></v-toolbar-side-icon>
        <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
        <!-- <v-toolbar-title class="hidden-sm-and-down">DML Laillé</v-toolbar-title> -->
        <!-- <v-img  class="hidden-md-and-up" src="/Logo/logo.svg"  contain height="100"></v-img> -->
        <v-spacer></v-spacer>

        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn v-on:click="$router.push('/')" flat>Accueil</v-btn>

          <v-menu :attach="true" offset-y z-index="1">
            <template v-slot:activator="{ on }">
              <v-btn color="white" v-on="on" flat>Country</v-btn>
            </template>
            <v-list class="transparent white--text" z-index="-1">
              <v-list-tile @click="$router.push('/country/cours')">
                <v-list-tile-title>Cours</v-list-tile-title>
              </v-list-tile>
              <v-list-tile @click="$router.push('/country/danses')">
                <v-list-tile-title>Danses</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>

          <!-- <v-menu :attach="true" offset-y z-index="1">
            <template v-slot:activator="{ on }">
              <v-btn color="white" v-on="on" flat>Line</v-btn>
            </template>
            <v-list class="transparent white--text">
              <v-list-tile @click="$router.push('/line/cours')">
                <v-list-tile-title>Cours</v-list-tile-title>
              </v-list-tile>
              <v-list-tile @click="$router.push('/line/danses')">
                <v-list-tile-title>Danses</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>-->

          <v-btn v-on:click="$router.push('/manifestations')" flat>Manifestations</v-btn>
          <v-btn v-on:click="$router.push('/galeriePhoto')" flat>Galerie Photo</v-btn>
          <!-- <v-btn v-on:click="$router.push('/infos')" flat>Infos</v-btn> -->

          <v-menu v-if="logged" :attach="true" offset-y z-index="1">
            <template v-slot:activator="{ on }">
              <v-btn color="white" v-on="on" flat>Admin</v-btn>
            </template>
            <v-list class="transparent white--text">
              <v-list-tile @click="$router.push('/admin/dashboard')">
                <v-list-tile-title>Tableau de bord</v-list-tile-title>
              </v-list-tile>
              <v-list-tile @click="$router.push('/admin/danses')">
                <v-list-tile-title>Danses</v-list-tile-title>
              </v-list-tile>
              <v-list-tile @click="$router.push('/admin/cours')">
                <v-list-tile-title>Cours</v-list-tile-title>
              </v-list-tile>
              <v-list-tile @click="$router.push('/admin/manifestations')">
                <v-list-tile-title>Manifestations</v-list-tile-title>
              </v-list-tile>
              <v-list-tile @click="$router.push('/admin/galeriePhoto')">
                <v-list-tile-title>Galerie Photo</v-list-tile-title>
              </v-list-tile>

              <v-list-tile @click="logout()">
                <v-list-tile-title>Se déconnecter</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </v-toolbar-items>
      </v-toolbar>
    </v-container>
  </div>
</template>
<script>
import drawer from "../general/Drawer";

export default {
  components: {
    drawer
  },
  data: () => ({
    drawer: false
  }),
  methods: {
    logout() {
      localStorage.removeItem("auth");
      this.$router.push("/logout");
    }
  },
  computed: {
    logged() {
      return localStorage.getItem("auth") ? true : false;
    }
  }
};
</script>