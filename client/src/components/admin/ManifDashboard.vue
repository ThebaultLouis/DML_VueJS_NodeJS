<template>
  <div id="">
    <div>
      <div>
        <v-toolbar flat color="white">
          <v-toolbar-title>Manifestations</v-toolbar-title>
        </v-toolbar>
       <v-data-table
         :headers="manifestationsHeaders"
         :items="manifestations.manifestations"
         item-key="_id"
         hide-actions
         class="elevation-1"
         :pagination.sync="pagination"
         :disable-initial-sort="true"
       >
         <template slot="items" slot-scope="props">
           <td>{{ props.item.name }}</td>
           <td class="text-xs-center">{{props.item.city}}</td>
           <td class="text-xs-center">{{ getTime(props.item.doneAt)}}</td>
           <td class="text-xs-center">
             <v-btn v-on:click.native="$emit('modifyManifestationEvent', props.item)" dark color="orange darken-2">
               <v-icon>build</v-icon>
             </v-btn>
           </td>
           <td class="text-xs-center">
             <v-btn v-on:click.native="deleteManifestation(props.item._id)" dark color="red">
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
</div>
</template>
<script>
import Axios from 'axios'
import config from '@/config.js'

export default {
  name: "",
  mounted () {
    this.getUrl(`${config.apiUrl}/manifestations/1`)
  },
  data: () => ({
    pagination: {},
    manifestations: {},
    manifestationsHeaders: [
      {text: 'Nom', value: 'name'},
      {text: 'Ville', value: 'city'},
      {text: 'Date', value: 'doneAt'},
      {text: 'Modifier'},
      {text: 'Supprimer'}
    ],
    totalPage: 5,
    page: 1
  }),
  watch: {
    page: function () {
      this.getUrl(`${config.apiUrl}/manifestations/${this.page}`)
    },
    manifestations: function () {
      this.totalPage = this.manifestations.totalPage
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
        this.manifestations = res.data
      }).catch(e => console.log(e))
    },
    deleteManifestation (ManifestationId) {

      Axios.delete(`${config.apiUrl}/manifestations/${ManifestationId}`).then(manif => {
        this.getUrl(`${config.apiUrl}/manifestations/${this.page}`)
      }).catch(e => console.log(e))
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
