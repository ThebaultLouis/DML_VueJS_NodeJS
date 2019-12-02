<template>
  <div>
    <!-- <div class="mb-3 brown"> -->
    <div class="mb-3" :class="isTransparent ? 'transparent' : 'brown'">
      <v-container class="pt-0 pa-0">
        <v-navigation-drawer v-model="drawer" :disable-resize-watcher="true" app fixed>
          <drawer></drawer>
        </v-navigation-drawer>

        <!-- <v-toolbar color="brown" dark flat> -->
        <v-toolbar :color="isTransparent ? 'transparent' : 'brown'" dark flat>
          <v-toolbar-side-icon @click.stop="drawer = !drawer" class="hidden-md-and-up"></v-toolbar-side-icon>
          <v-toolbar-title v-if="!isTransparent" class="hidden-md-and-up">DML Laillé 35</v-toolbar-title>
          <v-spacer></v-spacer>

          <!-- <items></items> -->
          <v-toolbar-items class="hidden-sm-and-down">
            <v-btn v-on:click="$router.push('/')" flat>Accueil</v-btn>

            <v-menu offset-y>
              <template v-slot:activator="{ on }">
                <v-btn color="white" v-on="on" flat>Country</v-btn>
              </template>
              <v-list class="brown white--text" z-index="-1">
                <v-list-tile @click="$router.push('/country/cours')">
                  <v-list-tile-title>Cours</v-list-tile-title>
                </v-list-tile>
                <v-list-tile @click="$router.push('/country/danses')">
                  <v-list-tile-title>Danses</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>

            <v-btn v-on:click="$router.push('/manifestations')" flat>Manifestations</v-btn>

            <v-btn v-on:click="$router.push('/galeriePhoto')" flat>Galerie Photo</v-btn>

            <v-menu v-if="logged" offset-y>
              <template v-slot:activator="{ on }">
                <v-btn color="white" v-on="on" flat>Admin</v-btn>
              </template>
              <v-list class="brown white--text">
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
  </div>
</template>
<script>
import drawer from "./Drawer";
export default {
  components: {
    drawer
  },
  props: ["isTransparent"],
  data: () => ({
    drawer: false
  }),
  computed: {
    logged() {
      return localStorage.getItem("auth") ? true : false;
    }
  },
  methods: {
    logout() {
      localStorage.removeItem("auth");
      this.$router.push("/");
    }
  }
};
</script>