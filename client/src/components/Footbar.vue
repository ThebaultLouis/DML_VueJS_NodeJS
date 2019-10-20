<template>
  <div id>
    <!-- <v-footer app dark height="auto" style="z-index:-1;"> -->
    <v-footer dark height="auto">
      <v-card style="width:100%;" flat tile class="orange darken-1 white--text text-xs-center">
        <v-card-text>
          <v-btn
            v-for="reseau in reseaux"
            :key="reseau.link"
            class="mx-3 white--text"
            icon
            :href="reseau.link"
            target="_blank"
          >
            <v-icon size="24px">{{ reseau.icon }}</v-icon>
          </v-btn>
        </v-card-text>

        <!-- <v-card-text class="white--text pt-0">
       DML: Danse et musique de Laillé 35
        fondée en 2008 par le groupe de musique: Les Cox Arthroses
        ( Association loi 1901) <br>
        Valérie animatrice à partir de 2018
        </v-card-text>-->

        <v-divider></v-divider>

        <v-card-text class="white--text">
          {{new Date().getFullYear()}} —
          <strong>Association DML Laillé Country</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </div>
</template>
<script>
export default {
  name: "",
  data: () => ({
    reseaux: [
      {
        link: "https://www.facebook.com/groups/229838757694940/",
        icon: "fab fa-facebook"
      },
      {
        link: "https://www.linkedin.com/in/louis-thebault-9340b9167/",
        icon: "fab fa-linkedin"
      }
    ]
  })
};
</script>
<style lang="css" scoped>
</style>
