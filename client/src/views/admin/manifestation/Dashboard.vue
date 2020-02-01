<template>
  <div>
    <Navbar></Navbar>
    <div
      v-if="loading"
      class="my-5"
    >
      <v-layout justify-center>
        <v-progress-circular
          :size="70"
          :width="7"
          color="brown"
          indeterminate
        ></v-progress-circular>
      </v-layout>
      <div style="margin-top:600px;"></div>
    </div>
    <div v-else>
      <v-layout class="mb-5">
        <v-flex
          offset-sm6
          sm4
          xs10
          offset-xs1
        >
          <v-btn
            @click="$router.push({name: 'adminManifestationCreate'})"
            color="amber"
            block
          >Ajouter une nouvelle manifestation</v-btn>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex
          offset-sm-1
          offset-xs-0
        ></v-flex>
        <v-flex
          xs2
          sm1
          v-for="type in types"
          :key="type.id"
        >
          <v-btn
            :name="type.name"
            @click="selectedType = type.id"
            icon
          >
            <v-icon
              size="50"
              :color="selectedType == type.id ? 'amber' : 'brown'"
            >{{type.logo}}</v-icon>
          </v-btn>
        </v-flex>
        <v-flex>
          <v-spacer></v-spacer>
        </v-flex>
        <v-flex
          xs2
          sm1
        >
          <v-menu
            ref="menu"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="date"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-btn
                icon
                v-on="on"
              >
                <v-icon size="50">event</v-icon>
              </v-btn>
            </template>
            <v-date-picker
              locale="Fr-fr"
              color="brown"
              v-model="date"
              type="month"
              min="2018-06-01"
              max="2022-06-01"
              scrollable
            >
              <v-spacer></v-spacer>
              <v-btn
                flat
                color="primary"
                @click="date = null"
              >Annuler</v-btn>
              <v-btn
                flat
                color="primary"
                @click="$refs.menu.save(date)"
              >OK</v-btn>
            </v-date-picker>
          </v-menu>
        </v-flex>
        <v-flex
          hidden-xs-only
          sm2
        ></v-flex>
      </v-layout>

      <div class="pa-3">
        <v-layout
          column
          class="my-4"
        >
          <ManifestationItem
            v-for="manifestation in manifestations"
            :key="manifestation._id"
            :manifestation="manifestation"
            :admin="true"
          ></ManifestationItem>
        </v-layout>
      </div>
    </div>
  </div>
</template>
<script>
import Navbar from "@/components/navbar/general/Navbar"
import ManifestationItem from "@/components/manifestation/ManifestationItem"

import { mapState } from "vuex"

export default {
  name: "",
  components: {
    Navbar,
    ManifestationItem
  },
  mounted () {
    this.$store.dispatch("adminManifestation/fetchManifestations")
  },
  computed: mapState({
    loading: state => state.adminManifestation.loading,
    manifestations: state => state.adminManifestation.manifestations,
    types: state => state.adminManifestation.types
  }),

  data: () => ({
    selectedType: 0,
    date: null
  }),

  watch: {
    date: function () {
      this.$store.dispatch(
        "adminManifestation/filterManifestationsByDate",
        this.date
      )
    },
    selectedType: function () {
      this.$store.dispatch(
        "adminManifestation/filterManifestationsByType",
        this.selectedType
      )
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
