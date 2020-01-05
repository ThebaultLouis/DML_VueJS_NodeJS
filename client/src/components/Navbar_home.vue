<template>
  <div id>
    <template>
      <!-- <v-img src="/Logo/AFFICHE_1.jpg">

      </v-img>-->
      <v-navigation-drawer v-model="drawer" :disable-resize-watcher="true" fixed app>
        <div style="background-color:#ffaf34;">
          <v-img class="xs-only" src="/Logo/utils/logo02.jpg" contain max-height="200"></v-img>
        </div>
        <v-divider class="amber darken-2"></v-divider>

        <v-list dense class="amber darken-1">
          <v-list-tile
            v-for="page in pages"
            :key="page.icon"
            v-on:click="$router.push(page.redirect)"
            class="amber darken-1 my-3"
          >
            <v-list-tile-action>
              <v-icon>{{page.icon}}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="headline">{{page.name}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>

      <!-- <v-toolbar color="brown" dark flat> -->
      <v-toolbar color="transparent" flat>
        <v-toolbar-side-icon @click.stop="drawer = !drawer" class="hidden-md-and-up"></v-toolbar-side-icon>
        <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
        <v-toolbar-title class="hidden-md-and-up">DML Laillé</v-toolbar-title>
        <!-- <v-img  class="hidden-md-and-up" src="/Logo/logo.svg"  contain height="100"></v-img> -->
        <v-spacer></v-spacer>

        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn class="white--text" v-on:click="$router.push('/')" flat>Accueil</v-btn>
          <!-- <v-btn class="white--text" v-on:click="$router.push('/danses')" flat>Danses</v-btn>
          <v-btn class="white--text" v-on:click="$router.push('/cours')" flat>Cours</v-btn>-->

          <v-menu :attach="true" z-index="1" offset-y>
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

          <v-menu :attach="true" z-index="1" offset-y>
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
          </v-menu>

          <!-- <v-btn v-on:click="$router.push('/danses')" flat>Danses</v-btn> -->

          <v-btn
            class="white--text"
            v-on:click="$router.push('/manifestations')"
            flat
          >Manifestations</v-btn>

          <v-btn class="white--text" v-on:click="$router.push('/')" flat>Reportages</v-btn>

          <v-btn class="white--text" v-on:click="$router.push('/infos')" flat>Infos</v-btn>
          <!-- <v-btn
            v-for="page in pages"
            v-bind:key="page.icon"
            flat
            v-on:click="$router.push(page.redirect)"
          >{{page.name}}</v-btn>-->
        </v-toolbar-items>
      </v-toolbar>
    </template>
  </div>
</template>
  </div>
</template>
<script>
export default {
  name: "NavbarHome",
  data: () => ({
    bottomNav: 0,
    drawer: false,
    pages: [
      {
        name: "Accueil",
        icon: "home",
        redirect: "/"
      },
      {
        name: "Danse",
        icon: "music_note",
        redirect: "/danses"
      },
      {
        name: "Manifestation",
        icon: "fa-calendar-alt",
        redirect: "/manifestations"
      },
      {
        name: "Espace Adhérent",
        icon: "fa-users",
        redirect: "/revisions"
      }
    ]
  }),
  props: {
    source: String
  },
  methods: {
    redirectToHome: function() {
      this.$router.push("/");
    },
    redirectToDance: function() {
      this.$router.push("/danses");
    },
    redirectToDemonstration: function() {
      this.$router.push("/manifestations");
    },
    redirectToRevision: function() {
      this.$router.push("/revisions");
    },
    redirectToAdmin() {
      this.$router.push("/admin");
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
