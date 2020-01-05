<template>
  <div id>
    <Navbar></Navbar>
    <h2 class="text-xs-center mt-4">Ajouter un Bal</h2>
    <v-layout my-4 row pa-4>
      <v-flex>
        <v-form class="pa-2">
          <v-flex mb-4 offset-sm2 xs12 sm8 offset-md4 md4>
            <v-date-picker
              width="100%"
              locale="fr-FR"
              v-model="bal.doneAt"
              :landscape="false"
              :reactive="true"
              color="amber lighten-1"
              header-color="primary"
              :no-title="true"
            ></v-date-picker>
          </v-flex>

          <v-layout row wrap>
            <v-flex offset-sm2 sm3>
              <v-text-field v-model="bal.name" label="Titre" required></v-text-field>
            </v-flex>
          </v-layout>
          <v-flex offset-sm2>
            <file-upload :multiple="true" v-model="files" ref="upload">
              <v-btn flat class="red--text subtitle">
                Ajouter des photos
                <v-icon class="ml-3">fa-upload</v-icon>
              </v-btn>
            </file-upload>
            <ul>
              <li v-for="(file, index) in files" :key="index">{{file.name}}</li>
            </ul>
          </v-flex>
          <v-flex text-xs-center>
            <v-btn
              :loading="loading"
              :disabled="loading"
              large
              v-on:click.native="addBal()"
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

const VueUploadComponent = require("vue-upload-component");

export default {
  name: "",
  components: {
    Navbar,
    FileUpload: VueUploadComponent
  },
  data: () => ({
    loading: false,
    bal: {
      name: "",
      doneAt: new Date().toISOString().substr(0, 10),
      photos: []
    },
    files: []
  }),
  methods: {
    /**
     * Has changed
     * @param  Object|undefined   newFile   Read only
     * @param  Object|undefined   oldFile   Read only
     * @return undefined
     */
    inputFile: function(newFile, oldFile) {
      if (newFile && oldFile && !newFile.active && oldFile.active) {
        // Get response data
        console.log("response", newFile.response);
        if (newFile.xhr) {
          //  Get the response status code
          console.log("status", newFile.xhr.status);
        }
      }
    },
    /**
     * Pretreatment
     * @param  Object|undefined   newFile   Read and write
     * @param  Object|undefined   oldFile   Read only
     * @param  Function           prevent   Prevent changing
     * @return undefined
     */
    inputFilter: function(newFile, oldFile, prevent) {
      // Create a blob field
      newFile.blob = "";
      let URL = window.URL || window.webkitURL;
      if (URL && URL.createObjectURL) {
        newFile.blob = URL.createObjectURL(newFile.file);
      }
    },

    async addBal() {
      this.loading = true;
      for (var i = 0; i < this.files.length; i++) {
        const form = new FormData();
        form.append("file", this.files[i].file);
        form.append("upload_preset", process.env.VUE_APP_CLOUDINARY_PRESET);
        form.append("api_key", process.env.VUE_APP_CLOUDINARY_API_KEY);
        await Axios.post(process.env.VUE_APP_CLOUDINARY_URL, form)
          .then(res => {
            this.bal.photos.push(res.data.secure_url);
          })
          .catch(e => console.log(e));
      }
      Axios.post(`${config.apiUrl}/bals`, this.bal, authHeader()).then(
        manif => {
          this.bal = {
            name: "",
            doneAt: new Date().toISOString().substr(0, 10),
            photos: []
          };
          this.files = [];
          this.loading = false;
          this.$noty.success("La manifestation a bien été ajouté");
        }
      );
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
