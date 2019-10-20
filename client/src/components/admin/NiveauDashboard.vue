<template>
  <div id="">
    <div>
        <v-toolbar flat color="white">
          <v-toolbar-title>Niveaux</v-toolbar-title>
        </v-toolbar>
       <v-data-table
         :headers="niveauxHeaders"
         :items="niveaux.niveaux"
         item-key="_id"
         hide-actions
         class="elevation-1"
         :disable-initial-sort="true"
       >
         <template slot="items" slot-scope="props">
           <td>{{ props.item.name }}</td>
           <td class="text-xs-center">
             <v-icon>{{ props.item.logo}}</v-icon>
           </td>
           <td class="text-xs-center">{{props.item.jour}}</td>
           <td class="text-xs-center">{{props.item.heureDebut}}</td>
           <td class="text-xs-center">{{props.item.heureFin}}</td>
           <td class="text-xs-center">
             <v-btn v-on:click.native="$emit('modifyNiveauEvent', props.item)" dark color="orange darken-2">
               <v-icon>build</v-icon>
             </v-btn>
           </td>
           <td class="text-xs-center">
             <v-btn v-on:click.native="deleteNiveau(props.item._id)" dark color="red">
               <v-icon>remove_circle</v-icon>
             </v-btn>
           </td>
         </template>
       </v-data-table>

     </div>
  </div>
</template>
<script>
import Axios from 'axios'
import config from '@/config.js'

export default {
  name: "",
  mounted () {
    this.getUrl(`${config.apiUrl}/niveaux`)
  },
  data: () => ({
    niveaux: {},
    niveauxHeaders: [
      {text: 'Nom', value: 'name'},
      {text: 'Logo', value: 'logo'},
      {text: 'Jour', value: 'jour'},
      {text: 'Debut', value: 'heureDebut'},
      {text: 'Fin', value: 'heureFin'},
      {text: 'Modifier'},
      {text: 'Supprimer'}
    ],
    totalPage: 1,
    page: 1
  }),
  methods: {

    getUrl (url) {
      Axios.get(url).then(res => {
        this.niveaux = res.data
      }).catch(e => console.log(e))
    },
    deleteNiveau (niveauId) {
      Axios.delete(`${config.apiUrl}/niveaux/${niveauId}`).then(danse => {
        this.getUrl(`${config.apiUrl}/niveaux`)
      }).catch(e => console.log(e))
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
