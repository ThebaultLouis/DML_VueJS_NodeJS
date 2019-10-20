<template>
  <div>
    <template>
      <div class="brown mb-5">
        <v-container class="pt-0 pa-0">
          <v-navigation-drawer v-model="drawer" :disable-resize-watcher="true" fixed app>
            <v-img src="/Logo/utils/logo.svg" class="brown" height="200"></v-img>

            <v-divider class="amber darken-2"></v-divider>

            <v-list>
              <v-list-tile class="my-2" v-on:click="$router.push('/')">
                <v-list-tile-action>
                  <v-icon>home</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>Home</v-list-tile-content>
              </v-list-tile>

              <v-list-group class="my-2">
                <template v-slot:activator>
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon>home</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>Country</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </template>
                <v-list-tile @click="$router.push('/country/danses')">
                  <v-list-tile-content>
                    <v-list-tile-title>Danses</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile @click="$router.push('/country/cours')">
                  <v-list-tile-content>
                    <v-list-tile-title>Cours</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list-group>

              <v-list-group class="my-2">
                <template v-slot:activator>
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon>home</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>Line</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </template>
                <v-list-tile @click="$router.push('/line/danses')">
                  <v-list-tile-content>
                    <v-list-tile-title>Danses</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile @click="$router.push('/line/cours')">
                  <v-list-tile-content>
                    <v-list-tile-title>Cours</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list-group>

              <v-list-tile class="my-2" v-on:click="$router.push('/manifestations')">
                <v-list-tile-action>
                  <v-icon>home</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>Manifestations</v-list-tile-content>
              </v-list-tile>
              <v-list-tile class="my-2" v-on:click="$router.push('/galeriePhoto')">
                <v-list-tile-action>
                  <v-icon>home</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>Galerie Photo</v-list-tile-content>
              </v-list-tile>

              <v-list-group v-if="logged" class="my-2">
                <template v-slot:activator>
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon>home</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>Admin</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </template>
                <v-list-tile @click="$router.push('/admin/danses')">
                  <v-list-tile-content>
                    <v-list-tile-title>Danses</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile @click="$router.push('/admin/cours')">
                  <v-list-tile-content>
                    <v-list-tile-title>Cours</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile @click="$router.push('/admin/manifestations')">
                  <v-list-tile-content>
                    <v-list-tile-title>Manifestations</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile @click="$router.push('/admin/galeriePhoto')">
                  <v-list-tile-content>
                    <v-list-tile-title>Galerie Photo</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list-group>
            </v-list>

            <!-- <v-list dense class="amber darken-1">
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
            </v-list>-->
          </v-navigation-drawer>

          <v-toolbar color="brown" dark flat>
            <!-- <v-toolbar color="transparent" flat> -->
            <v-toolbar-side-icon @click.stop="drawer = !drawer" class="hidden-md-and-up"></v-toolbar-side-icon>
            <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
            <v-toolbar-title class="hidden-md-and-up">DML Laillé</v-toolbar-title>
            <!-- <v-img  class="hidden-md-and-up" src="/Logo/logo.svg"  contain height="100"></v-img> -->
            <v-spacer></v-spacer>

            <v-toolbar-items class="hidden-sm-and-down">
              <v-btn v-on:click="$router.push('/')" flat>Accueil</v-btn>

              <v-menu :attach="true" offset-y z-index="1">
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

              <v-menu :attach="true" offset-y z-index="1">
                <template v-slot:activator="{ on }">
                  <v-btn color="white" v-on="on" flat>Line</v-btn>
                </template>
                <v-list class="brown white--text">
                  <v-list-tile @click="$router.push('/line/cours')">
                    <v-list-tile-title>Cours</v-list-tile-title>
                  </v-list-tile>
                  <v-list-tile @click="$router.push('/line/danses')">
                    <v-list-tile-title>Danses</v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>

              <!-- <v-btn v-on:click="$router.push('/danses')" flat>Danses</v-btn> -->

              <v-btn flat>Manifestations</v-btn>
              <!-- <v-btn v-on:click="$router.push('/manifestations')" flat>Manifestations</v-btn> -->

              <v-btn flat>Reportages</v-btn>
              <!-- <v-btn v-on:click="$router.push('/')" flat>Reportages</v-btn> -->

              <v-btn v-on:click="$router.push('/infos')" flat>Infos</v-btn>

              <v-menu v-if="logged" :attach="true" offset-y z-index="1">
                <template v-slot:activator="{ on }">
                  <v-btn color="white" v-on="on" flat>Admin</v-btn>
                </template>
                <v-list class="brown white--text">
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
      <br class="mt-5" />
    </template>
  </div>
</template>
  </div>
</template>
<script>
export default {
  name: "Navbar",
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
      // {
      //   name: "Révision",
      //   icon: "fa-graduation-cap",
      //   redirect: "/revisions"
      // },
    ]
  }),
  props: {
    source: String
  },
  methods: {
    logout() {
      localStorage.removeItem("auth");
      this.$router.push("/");
    },
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
    redirectToAdmin: function() {
      this.$router.push("/admin");
    }
  },
  computed: {
    logged() {
      return localStorage.getItem("auth") ? true : false;
    },
    color() {
      switch (this.bottomNav) {
        case 0:
          return "#FFCC80";
        case 1:
          return "#FB8C00";
        case 2:
          return "#EF6C00";
        case 3:
          return "#E65100";
      }
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
