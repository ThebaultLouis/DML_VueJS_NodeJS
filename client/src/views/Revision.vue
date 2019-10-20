<template>
  <div id="">
    <!-- <v-card height="50px">
      <v-bottom-nav
        :active.sync="bottomNav"
        :color="color"
        :value="true"
        absolute
        dark
        shift
      >
      <v-btn v-on:click.native="allRevision()" dark>
        <span>Toutes</span>
        <v-icon>fa-align-justify</v-icon>
      </v-btn>

        <v-btn v-on:click.native="beginnerRevision()" dark>
          <span>Débutant</span>
          <v-icon>fa-baby</v-icon>
        </v-btn>

        <v-btn v-on:click.native="initiateRevision()" dark>
          <span>Initié</span>
          <v-icon>fa-child</v-icon>
        </v-btn>

        <v-btn v-on:click.native="confirmateRevision()" dark>
          <span>Confirmé</span>
          <v-icon>fa-male</v-icon>
        </v-btn>

      </v-bottom-nav>
    </v-card> -->
    <br>

    <v-layout row my-4>
    <v-flex  xs10 offset-xs1 sm8 offset-sm2 >
      <v-card v-for="revision in revisions.revisions" :key="revision._id" class="mb-4 pa-3 amber lighten-4">
          <div>
              <!-- <v-icon v-for="logo in revision.logos" :keys="logo._id" large left v-html="logo.logo"></v-icon> -->
              <div class="d-inline-block ml-1 center">
                <span class="headline font-weight-medium">
                  {{getTime(revision.doneAt)}}
                </span>
              </div>
              <div class="text-xs-center">
                <span class=" headline font-weight-bold orange--text text--darken-3">{{revision.name}}</span>
                <div>
                </div>
            </div>
          </div>
          <div v-if="revision.description" class="pa-2">
            <p class="headline" v-html="revision.description"></p>
          </div>

      </v-card>
    </v-flex>
  </v-layout>

    <div class="text-xs-center">
      <v-pagination
        v-model="page"
          :length="totalPage"
          :total-visible="5"
          color="#FB8C00"
          circle
      ></v-pagination>
  </div>

  </div>
</template>
<script>
import Axios from 'axios';
import config from '@/config.js'

export default {
  name: "",
  mounted () {
    this.getUrl(`${config.apiUrl}/revisions/1`)
    Axios.get(`${config.apiUrl}/niveaux`).then(response => {
      this.niveaux = response.data.niveaux
    })
  },
  data: () => ({
    revisions: {},
    niveaux: {},
    page: 1,
    param: {},
    bottomNav: 0,
    totalPage: 5,
    jours: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"],
    mois: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
    logoArray: ['fa-baby', 'fa-child', 'fa-male'],
    logo: 'fa-baby'
  }),
  computed: {
      color () {
        switch (this.bottomNav) {
          case 0: return '#FFCC80'
          case 1: return '#FB8C00'
          case 2: return '#EF6C00'
          case 3: return '#E65100'
        }
      }
  },
  watch: {
    page: function () {
      this.getParamUrl(`${config.apiUrl}/revisions/${this.page}`, this.param)
    },
    revisions: function () {
      this.totalPage = this.revisions.totalPage
    }
  },
  methods: {
    getTime (unixTime) {
      var date = new Date(unixTime)
      var year = date.getFullYear()
      var mounth = date.getMonth()
      var dayMounth = date.getDate()
      var day = date.getDay()
      return this.jours[day] + " " + dayMounth + " "+ this.mois[mounth] + " " + year
    },
    getUrl (url) {
      Axios.post(url).then(res => {
        this.revisions = res.data
      }).catch(e => this.console.log(e))
    },
    getParamUrl (url, param) {
      Axios.post(url, param).then(res => {
        this.revisions = res.data
      }).catch(e => this.console.log(e))
    },
    getNextUrl () {
      this.getUrl(this.revisions.nextUrl)
    },
    getPreviousUrl () {
      this.getUrl(this.revisions.previousUrl)
    },
    allRevision () {
      this.page = 1
      this.param = {}
      this.getUrl(`${config.apiUrl}/revisions/1`)
    },
    beginnerRevision () {
      this.page = 1
      this.param = {'_niveau': this.niveaux[0]._id}
      this.getParamUrl(`${config.apiUrl}/revisions/1`,this.param)
    },
    initiateRevision () {
      this.page = 1
      this.param = {'_niveau': this.niveaux[1]._id}
      this.getParamUrl(`${config.apiUrl}/revisions/1`, this.param)
    },
    confirmateRevision () {
      this.page = 1
      this.param = {'_niveau': this.niveaux[2]._id}
      this.getParamUrl(`${config.apiUrl}/revisions/1`, this.param)
    }
  }

}
</script>
<style lang="scss" scoped>
</style>
