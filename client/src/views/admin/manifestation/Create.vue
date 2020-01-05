<template>
  <div id>
    <Navbar></Navbar>
    <h2 class="text-xs-center mt-4">Ajouter une Manifestation</h2>
    <v-layout my-4 row pa-4>
      <v-flex>
        <v-form class="pa-2">
          <v-flex mb-4 offset-sm2 xs12 sm8 offset-md4 md4>
            <v-date-picker
              width="100%"
              locale="fr-FR"
              v-model="manifestation.doneAt"
              :landscape="false"
              :reactive="true"
              color="amber lighten-1"
              header-color="primary"
              :no-title="true"
            ></v-date-picker>
          </v-flex>

          <v-layout row wrap>
            <v-flex offset-sm2 sm3>
              <v-text-field v-model="manifestation.club" label="Club" required></v-text-field>
            </v-flex>

            <v-flex offset-sm1>
              <v-checkbox v-model="manifestation.domicile" label="Domicile" required></v-checkbox>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex offset-sm2 sm3>
              <v-text-field v-model="manifestation.city" label="Ville" required></v-text-field>
            </v-flex>
            <v-flex offset-sm1 sm3>
              <v-text-field v-model="manifestation.zipcode" label="Code postal" required></v-text-field>
            </v-flex>
          </v-layout>
          <v-flex offset-sm2 class="my-3">
            <label for="file1" class="label-file">
              Ajouter une affiche
              <v-icon class="ml-3">fa-upload</v-icon>
            </label>
            <input id="file1" class="input-file" type="file" @change="onAfficheChange" />
            <span class="ml-4" v-if="manifestation.pdfAffiche">Une affiche a été ajouté</span>
          </v-flex>
          <v-flex offset-sm2>
            <label for="file2" class="label-file">
              Ajouter une playlist
              <v-icon class="ml-3">fa-upload</v-icon>
            </label>
            <input id="file2" class="input-file" type="file" @change="onPlaylistChange" />
            <span class="ml-4" v-if="manifestation.pdfPlaylist">Une playlist a été ajouté</span>
          </v-flex>

          <v-flex text-xs-center>
            <v-btn
              :loading="loading"
              :disabled="loading"
              large
              v-on:click.native="addManifestation()"
              color="amber accent-3"
              class="mt-5"
            >Enregistrer</v-btn>
          </v-flex>
        </v-form>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import Navbar from "@/components/navbar/general/Navbar";
import { mapState } from "vuex";
import authHeader from "@/store/modules/admin/authHeader";

import Axios from "axios";
import config from "@/config.js";

export default {
  name: "",
  components: {
    Navbar
  },
  data: () => ({
    loading: false,
    date: new Date().toISOString().substr(0, 10),
    modified: false,
    manifestation: {
      domicile: false,
      doneAt: new Date().toISOString().substr(0, 10),
      city: "",
      zipcode: "",
      club: "",
      pdfAffiche: "",
      pdfPlaylist: ""
    },
    pdfFile: ""
  }),
  methods: {
    onAfficheChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createAffiche(files[0]);
    },
    createAffiche(file) {
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = e => {
        vm.manifestation.pdfAffiche = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    onPlaylistChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      console.log(files);
      if (!files.length) return;
      this.createPlaylist(files[0]);
    },
    createPlaylist(file) {
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = e => {
        vm.manifestation.pdfPlaylist = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    async addManifestation() {
      this.loading = true;

      if (this.manifestation.pdfAffiche) {
        const form = new FormData();
        form.append("file", this.manifestation.pdfAffiche);
        form.append("upload_preset", process.env.VUE_APP_CLOUDINARY_PRESET);
        form.append("api_key", process.env.VUE_APP_CLOUDINARY_API_KEY);
        await Axios.post(process.env.VUE_APP_CLOUDINARY_URL, form)
          .then(res => {
            this.manifestation.pdfAffiche = res.data.secure_url;
          })
          .catch(e => console.log(e));
      }
      if (this.manifestation.pdfPlaylist) {
        const form = new FormData();
        form.append("file", this.manifestation.pdfPlaylist);
        form.append("upload_preset", process.env.VUE_APP_CLOUDINARY_PRESET);
        form.append("api_key", process.env.VUE_APP_CLOUDINARY_API_KEY);
        await Axios.post(process.env.VUE_APP_CLOUDINARY_URL, form)
          .then(res => {
            this.manifestation.pdfPlaylist = res.data.secure_url;
          })
          .catch(e => console.log(e));
      }
      Axios.post(
        `${config.apiUrl}/manifestations`,
        this.manifestation,
        authHeader()
      ).then(manif => {
        this.loading = false;
        this.$noty.success("La manifestation a bien été ajouté");
        this.manifestation = {
          domicile: false,
          doneAt: 0,
          city: "",
          zipcode: "",
          club: "",
          pdfAffiche: "",
          pdfPlaylist: ""
        };
      });
    }
  }
};
</script>
<style lang="css" scoped>
.label-file {
  cursor: pointer;
  color: red;
  font-weight: bold;
  font-size: 20px;
}
.label-file:hover {
  color: #25a5c4;
}

.input-file {
  display: none;
}
</style>
