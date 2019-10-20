<template>
  <div id="">
    <h2 class="text-xs-center mt-4">Ajouter un niveau</h2>
    <v-layout my-4 wrap align-center>
      <v-flex xs12 sm8 offset-sm2 >
        <v-card class="ma-4 orange lighten-4">
          <v-form
            class="pa-2"
          >
            <v-text-field
              v-model="niveau.name"

              label="Nom"
              required
            ></v-text-field>

            <v-text-field
              v-model="niveau.jour"

              label="Jour"
              required
            ></v-text-field>

            <v-text-field
              v-model="niveau.heureDebut"

            label="Heure début"
            required
            ></v-text-field>
            <v-text-field
              v-model="niveau.heureFin"

            label="Heure fin"
            required
            ></v-text-field>

            <v-text-field
              v-model="niveau.logo"

            label="Logo"
            required
            ></v-text-field>

          </v-form>
        </v-card>
        <v-flex text-xs-center>
          <v-btn
          :loading="loading"
          :disabled="loading"
          large
          v-on:click.native="addNiveau()"
          color="amber accent-3"
          >
          Enregistrer
        </v-btn>
      </v-flex>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import Axios from 'axios'
import config from '@/config.js'

export default {
  name: "",
  props : ['niveauToModify'],
  beforeMount() {
    //do something before mounting vue instance
    if (this.niveauToModify._id) {
      this.niveau = this.niveauToModify
      this.modified = true
    }
  },
  data: () => ({
    loading: false,
    jours: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"],
    modified: false,
    niveau: {
      name: '',
      jour: '',
      heureDebut: '',
      heureFin: '',
      logo: ''
    }
  }),
  methods: {
    addNiveau () {
      this.loading = true
      if (this.modified) {
        Axios.patch(`${config.apiUrl}/niveaux/${this.niveau._id}`, this.niveau).then(niveau => {
          this.loading = false
          this.$noty.success("Le niveau a bien été modifié")
          this.niveau = {
            name: '',
            jour: '',
            heureDebut: '',
            heureFin: '',
            logo: ''
          }
          this.modified = false
          this.$emit('niveauModified')
        }).catch(e => console.log(e))
      }
      else {
        Axios.post(`${config.apiUrl}/niveaux`, this.niveau).then(niveau => {
          this.loading = false
          this.$noty.success("Le niveau a bien été ajouté")
          this.niveau = {
            name: '',
            jour: '',
            heureDebut: '',
            heureFin: '',
            logo: ''
          }
        }).catch(e => {
          this.loading = false
          console.log(e)
          this.$noty.warning("Le niveau n'a pas été ajouté")
        })

      }
    }

  }
}
</script>
<style lang="scss" scoped>
</style>
