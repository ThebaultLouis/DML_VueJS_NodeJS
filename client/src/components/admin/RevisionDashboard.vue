<template>
  <div id="">
    <div>
      <v-toolbar flat color="white">
        <v-toolbar-title>Révisions</v-toolbar-title>
      </v-toolbar>
       <v-data-table
         :headers="revisionsHeaders"
         :items="revisions.revisions"
         item-key="_id"
         hide-actions
         class="elevation-1"
         :pagination.sync="pagination"
         :disable-initial-sort="true"

       >
         <template slot="items" slot-scope="props">
           <td class="text-xs-center">
             <v-icon v-for="logo in props.item.logos" :keys="logo._id" large left v-html="logo.logo"></v-icon>
           </td>
           <td class="text-xs-center">{{ getTime(props.item.doneAt)}}</td>
           <td class="text-xs-center">
             <v-btn v-on:click.native="$emit('modifyRevisionEvent', props.item)" dark color="orange darken-2">
               <v-icon>build</v-icon>
             </v-btn>
           </td>
           <td class="text-xs-center">
             <v-btn v-on:click.native="deleteRevision(props.item._id)" dark color="red">
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
    this.getUrl(`${config.apiUrl}/revisions/1`)
  },
  data: () => ({
    pagination: {},
    revisions: {},
    revisionsHeaders: [
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
      this.getUrl(`${config.apiUrl}/revisions/${this.page}`)
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
      var day = date.getDate()
      return day + "/" + mounth + "/" + year
    },
    getUrl (url) {
      Axios.post(url).then(res => {
        this.revisions = res.data
      }).catch(e => console.log(e))
    },
    deleteRevision (revisionId) {
      Axios.delete(`${config.apiUrl}/revisions/${revisionId}`).then(danse => {
        this.getUrl(`${config.apiUrl}/revisions/${this.page}`)
      }).catch(e => console.log(e))
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
