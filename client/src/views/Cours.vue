<template>
  <div id="">

  <v-layout row wrap class="pt-4 amber lighten-3">

    <v-flex  xs10 offset-xs1 sm3 offset-sm2>

      <v-select v-if="selectLevels"
        v-model="selectedLevel"

        :attach="true"
        :items="this.selectLevels"
        item-value="_id"
        item-text="name"
        label="Niveau"
        solo
      ></v-select>
    </v-flex>
    <v-flex  xs10 offset-xs1 sm3 offset-sm1>
      <v-select
        v-model="selectedYear"

        attach
         :items="this.years"
          item-text="label"
            item-value="value"
         label="Année"
         solo
       ></v-select>
    </v-flex>
    <v-flex offset-xs8 offset-sm0>
      <v-btn flat @click="fetchDanses()">
        <v-icon>fa-sync</v-icon>
      </v-btn>

  </v-flex>

  </v-layout>

    <v-layout row my-4>
    <v-flex xs10 offset-xs1 sm8 offset-sm2 lg8 offset-lg2 xl6 offset-xl3>
      <v-card v-for="danse in danses.danses" :key="danse._id" class="mb-4  amber lighten-4">
          <div>
            <v-card-title  primary-title>
              <div>
                <v-icon large left v-html="danse.logo"></v-icon>
                <div class="ml-2" style="display:inline-block;">
                <span class="headline font-weight-medium">{{danse.name}}</span>
                <br>
                <span class="grey--text title font-weight-light"> {{getTime(danse.teachedAt)}} </span>
                </div>
              </div>
              <v-spacer></v-spacer>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn v-if="danse.pdf" flat color="brown" dark :href="danse.pdf" target="_blank">
                  <v-icon  >fa-file-download</v-icon>
                </v-btn>
                <v-btn v-if="danse.youtube" flat color="red" dark :href="danse.youtube" target="_blank">
                  <v-icon >fa-play-circle</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card-title>
            <!-- <v-divider></v-divider> -->
            <v-list class="amber lighten-4">
              <v-list-tile v-for="danseRevisee in danse._dansesRevisees" :key="danseRevisee._id" class="my-1">
                <span class="headline">
                  {{danseRevisee.name}}
                </span>
                <v-btn v-if="danseRevisee.youtube" color="red" dark flat :href="danseRevisee.youtube" target="_blank">
                  <v-icon >fa-play-circle</v-icon>
                  </v-btn>

                </v-list-tile>
            </v-list>
          </div>
        </v-card-title>
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
  beforeMount () {
    this.getUrl(`${config.apiUrl}/cours/1`)
    Axios.get(`${config.apiUrl}/niveaux`).then(response => {
        console.log(response.data)
      this.niveaux = response.data.niveaux
      this.selectLevels.push( ...this.niveaux)
    })
  },
  data: () => ({
    danses: {},
    niveaux: [],
    page: 1,
    param: {},
    bottomNav: 0,
    totalPage: 5,
    logoArray: ['fa-baby', 'fa-child', 'fa-male'],
    logo: 'fa-baby',
    selectedYear: null,
    selectedLevel: null,
    selectLevels: [
      {
        _id: "",
        name: "Tous"
      }
    ],
    years: [
      {
        label: "Toutes",
        value: 0
      },
      {
        label: "2018-2019",
        value: 2018
      },
      {
        label: "2019-2020",
        value: 2019
      }
    ]
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
      this.getParamUrl(`${config.apiUrl}/cours/${this.page}`, this.param)
    },
    danses: function () {
      this.totalPage = this.danses.totalPage
    }
  },
  methods: {
    getTime (unixTime) {
      var date = new Date(unixTime)
      var year = date.getFullYear()
      var mounth = date.getMonth() + 1
      var day = date.getDate()
      return day + " / " + mounth + " / " + year
    },
    getUrl (url) {
      Axios.get(url).then(res => {
        console.log(res.data)
        this.danses = res.data
      }).catch(e => this.console.log(e))
    },
    getParamUrl (url, param) {
      Axios.get(url, param).then(res => {
        console.log(res.data)
        this.danses = res.data
      }).catch(e => this.console.log(e))
    },
    getNextUrl () {
      this.getUrl(this.danses.nextUrl)
    },
    getPreviousUrl () {
      this.getUrl(this.danses.previousUrl)
    },
    allDance () {
      this.page = 1
      this.param = {}
      this.getUrl(`${config.apiUrl}/cours/1`)
    },
    beginnerDance () {
      this.page = 1
      this.param = {'_niveau': this.niveaux.find(niveau => niveau.index == 0)._id}
      this.getParamUrl(`${config.apiUrl}/cours/1`,this.param)
    },
    initiateDance () {
      this.page = 1
      this.param = {'_niveau': this.niveaux.find(niveau => niveau.index == 1)._id}
      this.getParamUrl(`${config.apiUrl}/cours/1`, this.param)
    },
    confirmateDance () {
      this.page = 1
      this.param = {'_niveau': this.niveaux.find(niveau => niveau.index == 2)._id}
      this.getParamUrl(`${config.apiUrl}/cours/1`, this.param)
    },
    fetchDanses () {
      if (this.selectedLevel) {
        this.param._niveau =  this.selectedLevel
      }
      else {
        this.param = {year: this.param.year}
      }
      this.param.year = this.selectedYear ? this.selectedYear : null

      this.getParamUrl(`${config.apiUrl}/cours/1`, this.param)
    }
  }

}
</script>
<style lang="scss" scoped>
</style>
