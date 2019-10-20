<template>
  <div id="">
    <div>
      <v-toolbar flat color="white">
        <v-toolbar-title>Danses</v-toolbar-title>
      </v-toolbar>
       <v-data-table
         :headers="dansesHeaders"
         :items="danses.danses"
         item-key="_id"
         hide-actions
         class="elevation-1"
         :pagination.sync="pagination"
         :disable-initial-sort="true"
       >
         <template slot="items" slot-scope="props">
           <td>{{ props.item.name }}</td>
           <td class="text-xs-center">
             <v-icon>{{ props.item.logo}}</v-icon>
           </td>
           <td class="text-xs-center">{{ getTime(props.item.teachedAt)}}</td>
           <td class="text-xs-center">
             <v-btn v-on:click.native="$emit('modifyDanceEvent', props.item)" dark color="orange darken-2">
               <v-icon>build</v-icon>
             </v-btn>
           </td>
           <td class="text-xs-center">
             <v-btn v-on:click.native="deleteDance(props.item._id)" dark color="red">
               <v-icon>remove_circle</v-icon>
             </v-btn>
           </td>
         </template>
       </v-data-table>
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
  </div>
</template>
<script>
import Axios from 'axios'
import config from '@/config.js'

export default {
  name: "",
  mounted () {
    this.getUrl(`${config.apiUrl}/danses/1`)
  },
  data: () => ({
    pagination: {},
    danses: {},
    dansesHeaders: [
      {text: 'Nom', value: 'name'},
      {text: 'Niveau', value: 'logo'},
      {text: 'Date', value: 'teachedAt'},
      {text: 'Modifier'},
      {text: 'Supprimer'}
    ],
    totalPage: 5,
    page: 1
  }),
  watch: {
    page: function () {
      this.getUrl(`${config.apiUrl}/danses/${this.page}`)
    },
    danses: function () {
      this.totalPage = this.danses.totalPage
    }
  },
  methods: {
    getTime (unixTime) {
      var date = new Date(unixTime)
      var year = date.getFullYear()
      var mounth = date.getMonth()
      var day = date.getDate()
      return day + "/" + mounth + "/" + year
    },
    getUrl (url) {
      Axios.post(url).then(res => {
        this.danses = res.data
      }).catch(e => console.log(e))
    },
    deleteDance (danceId) {
      Axios.delete(`${config.apiUrl}/danses/${danceId}`).then(danse => {
        this.getUrl(`${config.apiUrl}/danses/${this.page}`)
      }).catch(e => console.log(e))
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
