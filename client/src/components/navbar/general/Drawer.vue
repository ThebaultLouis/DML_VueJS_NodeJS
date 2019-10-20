<template>
  <div>
    <v-img src="/Logo/utils/logo.svg" class="brown" height="200"></v-img>

    <v-divider class="amber darken-2"></v-divider>

    <v-list>
      <v-list-tile class="my-2" v-on:click="$router.push('/')">
        <v-list-tile-action>
          <v-icon>home</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>Accueil</v-list-tile-content>
      </v-list-tile>

      <v-list-group class="my-2">
        <template v-slot:activator>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon>fa-horse</v-icon>
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

      <!-- <v-list-group class="my-2">
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
      </v-list-group>-->

      <v-list-tile class="my-2" v-on:click="$router.push('/manifestations')">
        <v-list-tile-action>
          <v-icon>fa-calendar-alt</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>Manifestations</v-list-tile-content>
      </v-list-tile>
      <v-list-tile class="my-2" v-on:click="$router.push('/galeriePhoto')">
        <v-list-tile-action>
          <v-icon>fa-images</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>Galerie Photo</v-list-tile-content>
      </v-list-tile>
      <!-- <v-list-tile class="my-2" v-on:click="$router.push('/infos')">
        <v-list-tile-action>
          <v-icon>home</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>Infos</v-list-tile-content>
      </v-list-tile>-->

      <v-list-group v-if="logged" class="my-2">
        <template v-slot:activator>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon>fa-user-cog</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Admin</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
        <v-list-tile @click="$router.push('/admin/dashboard')">
          <v-list-tile-title>Tableau de bord</v-list-tile-title>
        </v-list-tile>
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
        <v-list-tile @click="logout()">
          <v-list-tile-title>Se déconnecter</v-list-tile-title>
        </v-list-tile>
      </v-list-group>
    </v-list>
  </div>
</template>
<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem("auth");
      this.$router.push("/");
    }
  },
  computed: {
    logged() {
      return localStorage.getItem("auth") ? true : false;
    }
  }
};
</script>