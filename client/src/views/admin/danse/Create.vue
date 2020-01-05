<template>
  <div id>
    <Navbar></Navbar>
    <h2 class="text-xs-center mt-4">Ajouter une danse</h2>
    <v-layout my-4>
      <!-- <v-card class="ma-4 orange lighten-4"> -->
      <v-flex>
        <v-form class="pa-2">
          <v-flex xs12 sm5 offset-sm2>
            <v-text-field class="my-3" v-model="danse.name" label="Nom" required></v-text-field>

            <v-text-field class="my-3" v-model="danse.youtube" label="Youtube" required></v-text-field>

            <v-flex class="my-3">
              <v-spacer></v-spacer>
              <label for="file" class="label-file">
                Ajouter un PDF
                <v-icon>fa-upload</v-icon>
              </label>
              <input id="file" class="input-file" type="file" @change="onFileChange" />
              <span class="ml-4" v-if="pdfFile">Un fichier a été ajouté</span>
            </v-flex>
          </v-flex>
        </v-form>
        <!-- </v-card> -->

        <v-flex text-xs-center>
          <v-btn
            :loading="loading"
            :disabled="loading"
            large
            v-on:click.native="addDanse()"
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
import authHeader from "@/store/modules/admin/authHeader";

import Navbar from "@/components/navbar/general/Navbar";

// import FileUpload from 'vue-upload-component'

export default {
  name: "",
  components: {
    Navbar
    // FileUpload,
  },
  data: () => ({
    loading: false,
    loader: null,
    modified: false,
    danse: {
      name: "",
      youtube: "",
      pdf: "",
      type: 0
    },
    pdfFile: ""
  }),
  methods: {
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },
    createImage(file) {
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = e => {
        vm.pdfFile = e.target.result;
      };
      reader.readAsDataURL(file);
    },

    addDanse() {
      this.loading = true;

      if (this.pdfFile) {
        const form = new FormData();

        form.append("file", this.pdfFile);
        form.append("upload_preset", process.env.VUE_APP_CLOUDINARY_PRESET);
        form.append("api_key", process.env.VUE_APP_CLOUDINARY_API_KEY);

        Axios.post(process.env.VUE_APP_CLOUDINARY_URL, form)
          .then(res => {
            this.danse.pdf = res.data.secure_url;

            Axios.post(
              `${config.apiUrl}/danses`,
              this.danse,
              authHeader()
            ).then(response => {
              this.loading = false;
              this.$noty.success("La danse a bien été ajouté");
              this.danse = {
                name: "",
                youtube: "",
                pdf: ""
              };
            });
          })
          .catch(e => {
            this.loading = false;
            console.log(e);
            this.$noty.warning("La danse n'a pas été ajouté");
          });
      } else {
        this.danse.pdf = "";
        Axios.post(`${config.apiUrl}/danses`, this.danse, authHeader())
          .then(response => {
            this.loading = false;
            this.$noty.success("La danse a bien été ajouté");
            this.danse = {
              name: "",
              youtube: "",
              pdf: ""
            };
          })
          .catch(e => {
            this.loading = false;
            console.log(e);
            this.$noty.warning("La danse n'a pas été ajouté");
          });
      }
    }
  }
};
</script>
<style lang="css" scoped>
.label-file {
  cursor: pointer;
  color: red;
  font-weight: bold;
}
.label-file:hover {
  color: #25a5c4;
}

.input-file {
  display: none;
}
</style>
