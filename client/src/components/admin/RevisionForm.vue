<template>
  <div id>
    <h2 class="text-xs-center mt-4">Ajouter un cours de révision</h2>

    <v-layout my-4 row wrap align-center>
      <v-flex xs12 sm10 offset-sm1>
        <v-card class="ma-4 orange lighten-4">
          <v-form class="pa-2">
            <v-flex mb-4 offset-sm2 xs12 sm8>
              <v-date-picker
                width="100%"
                locale="fr-FR"
                v-model="date"
                :landscape="false"
                :reactive="true"
                color="amber lighten-1"
                :no-title="true"
              ></v-date-picker>
            </v-flex>

            <v-flex xs10 offset-xs1>
              <v-select
                v-if="this.niveaux.niveaux"
                v-model="revision.niveaux"
                :attach="true"
                :items="this.niveaux.niveaux"
                item-value="_id"
                item-text="name"
                label="Niveaux"
                multiple
              ></v-select>
            </v-flex>

            <wysiwyg class="mt-4" v-model="revision.description"></wysiwyg>
            <!-- <v-textarea
          v-model="revision.description"

          label="Description"
          required
            ></v-textarea>-->
          </v-form>
        </v-card>
        <v-flex text-xs-center>
          <v-btn
            :loading="loading"
            :disabled="loading"
            large
            v-on:click.native="addRevision()"
            color="amber accent-3"
          >Enregistrer</v-btn>
        </v-flex>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import Axios from "axios";
import config from "@/config.js";

export default {
  name: "",
  beforeMount() {
    //do something before mounting vue instance
    Axios.get(`${config.apiUrl}/niveaux`)
      .then(response => {
        this.niveaux = response.data;
      })
      .catch(e => console.log(e));

    if (this.revisionToModify._id) {
      this.revision = this.revisionToModify;
      this.date = new Date(this.revision.doneAt).toISOString().substr(0, 10);
      this.modified = true;
    }
  },
  props: ["revisionToModify"],
  data: () => ({
    loading: false,
    niveaux: {},
    date: new Date().toISOString().substr(0, 10),
    modified: false,
    revision: {
      doneAt: 0,
      logos: [],
      niveaux: []
    }
  }),
  watch: {
    date: function() {
      this.revision.niveaux = [];
    }
  },
  methods: {
    addRevision() {
      this.loading = true;
      this.revision.doneAt = new Date(this.date).getTime();

      var niveaux = this.niveaux.niveaux.filter(
        niv => this.revision.niveaux.indexOf(niv._id) != -1
      );

      this.revision.logos = niveaux.map(niv => {
        return { id: niv._id, logo: niv.logo };
      });
      // this.revision.niveaux = niveaux.map(niv => niv._id)

      if (this.modified) {
        Axios.patch(
          `${config.apiUrl}/revisions/${this.revision._id}`,
          this.revision
        )
          .then(response => {
            this.loading = false;
            this.$noty.success("La révision a bien été modifié");
            this.revision = {
              doneAt: new Date(),
              logos: [],
              niveaux: []
            };
            this.modified = false;
          })
          .catch(e => console.log(e));
        this.$emit("revisionModified");
      } else {
        Axios.post(`${config.apiUrl}/revisions`, this.revision)
          .then(response => {
            this.loading = false;
            this.$noty.success("La révision a bien été ajouté");
            this.revision = {
              doneAt: new Date(),
              logos: [],
              niveaux: []
            };
          })
          .catch(e => {
            this.loading = false;
            console.log(e);
            this.$noty.warning("La révision n'a pas été ajouté");
          });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
