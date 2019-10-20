<template>
  <div id>
    <Navbar></Navbar>
    <h2 class="text-xs-center mt-4">Ajouter une danse</h2>
    <v-layout my-4>
      <!-- <v-card class="ma-4 orange lighten-4"> -->
      <v-form class="pa-2">
        <v-flex offset-sm3 sm6>
          <v-date-picker
            width="100%"
            locale="fr-FR"
            v-model="cours.doneAt"
            :landscape="false"
            :reactive="true"
            color="amber lighten-1"
            header-color="primary"
            :no-title="true"
          ></v-date-picker>
        </v-flex>
        <v-flex offset-sm3 sm3>
          <v-select
            v-model="cours.niveau"
            :attach="true"
            :items="niveaux"
            item-value="_id"
            item-text="name"
            label="Niveau"
            required
          ></v-select>
        </v-flex>
        <v-flex offset-sm3 sm3>
          <v-select
            v-model="cours.danseApprise"
            :attach="true"
            :items="danses"
            item-value="_id"
            item-text="name"
            label="Danse apprise"
            required
          ></v-select>
        </v-flex>
        <v-layout row align-center>
          <v-flex class="title" offset-sm3>Ajouter les danses révisées</v-flex>
          <v-flex>
            <v-btn color="red" fab dark v-on:click.native="removeDanseRevisee()">
              <v-icon>remove</v-icon>
            </v-btn>
            <v-btn color="green" fab dark v-on:click="addDanseRevisee()">
              <v-icon>add</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>

        <v-flex offset-sm3 sm3 v-for="index in (cours.dansesRevisees.length)" :key="index">
          <v-select
            v-model="cours.dansesRevisees[index - 1]"
            :attach="true"
            :items="danses"
            item-value="_id"
            item-text="name"
            required
          ></v-select>
        </v-flex>

        <v-flex text-xs-center>
          <v-btn
            :loading="loading"
            :disabled="loading"
            large
            v-on:click.native="addCours()"
            color="amber accent-3"
          >Enregistrer</v-btn>
        </v-flex>
      </v-form>
    </v-layout>
  </div>
</template>
<script>
import Navbar from "@/components/navbar/general/Navbar";
import { mapState } from "vuex";

export default {
  name: "",
  components: {
    Navbar
  },
  mounted() {
    this.$store.dispatch("coursCountry/fetchCours");
    this.$store.dispatch("adminDanse/fetchDances");
  },
  computed: mapState({
    niveaux: state => state.coursCountry.niveaux.slice(1),
    danses: state => state.adminDanse.dances
  }),
  data: () => ({
    selectedNiveau: 0,
    date: null,
    loading: false,
    cours: {
      danseApprise: null,
      dansesRevisees: [""],
      doneAt: new Date().toISOString().substr(0, 10),
      niveau: null,
      type: 0
    }
  }),
  methods: {
    addDanseRevisee() {
      this.cours.dansesRevisees.push("");
    },
    removeDanseRevisee() {
      this.cours.dansesRevisees.pop();
    },
    async addCours() {
      await this.$store.dispatch("adminCours/addCours", this.cours);
      this.$noty.success("Le cours a bien été crée");
      this.cours = {
        danseApprise: null,
        dansesRevisees: [""],
        doneAt: "",
        niveau: null,
        type: 0
      };
      // this.$router.push({ name: "adminCours" });
    }
  }
};
</script>

