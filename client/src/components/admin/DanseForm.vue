<template>
  <div id>
    <h2 class="text-xs-center mt-4">Ajouter une danse</h2>
    <v-layout my-4>
      <v-flex xs12 sm8 offset-sm2>
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
                header-color="primary"
                :no-title="true"
              ></v-date-picker>
            </v-flex>
            <v-text-field v-model="danseApprise.name" label="Nom" required></v-text-field>

            <v-select
              v-if="this.niveaux.niveaux"
              v-model="danseApprise._niveau"
              :attach="true"
              :items="this.niveaux.niveaux"
              item-value="_id"
              item-text="name"
              label="Niveau"
              required
            ></v-select>

            <v-text-field v-model="danseApprise.youtube" label="Youtube" required></v-text-field>

            <v-flex>
              <label for="file" class="label-file">
                Ajouter un PDF
                <v-icon>fa-upload</v-icon>
              </label>
              <input id="file" class="input-file" type="file" @change="onFileChange" />
              <span class="ml-4" v-if="pdfFile">Un fichier a été ajouté</span>
            </v-flex>
          </v-form>
        </v-card>
        <v-layout>
          <v-flex text-xs-right>
            <v-btn
              v-if="danseApprise._dansesRevisees.length"
              color="red"
              fab
              dark
              v-on:click.native="removeDanseRevisee()"
            >
              <v-icon>remove</v-icon>
            </v-btn>

            <v-btn color="green" fab dark v-on:click.native="addDanseRevisee()">
              <v-icon>add</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>

        <v-card
          v-for="(danse, index) in danseApprise._dansesRevisees"
          class="ma-4 orange lighten-3"
          :key="index"
        >
          <v-form class="pa-2">
            <v-text-field v-model="danse.name" label="Nom" required></v-text-field>

            <v-text-field v-model="danse.youtube" label="Youtube" required></v-text-field><v-text-field
          </v-form>
        </v-card>

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

// import FileUpload from 'vue-upload-component'

export default {
  name: "",
  components: {
    // FileUpload,
  },
  beforeMount() {
    //do something before mounting vue instance
    Axios.get(`${config.apiUrl}/niveaux`)
      .then(response => {
        this.niveaux = response.data;
      })
      .catch(e => console.log(e));

    if (this.danceToModify._id) {
      this.danseApprise = this.danceToModify;
      this.modified = true;
      this.date = new Date(this.danseApprise.teachedAt)
        .toISOString()
        .substr(0, 10);
    }
  },
  props: ["danceToModify"],
  data: () => ({
    loading: false,
    loader: null,
    date: new Date().toISOString().substr(0, 10),
    niveaux: {},
    modified: false,
    danseRevisee: {
      name: "",
      youtube: "",
      danseApprise: "",
      revisee: true
    },
    danseApprise: {
      name: "",
      teachedAt: 0,
      youtube: "",
      pdf: "",
      revisee: false,
      _dansesRevisees: [],
      _niveau: "",
      logo: ""
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
    addDanseRevisee() {
      var danseRevisee = {
        name: "",
        youtube: "",
        revisee: true
      };
      this.danseApprise._dansesRevisees.push(danseRevisee);

      // this.danseApprise.niveaux = []
    },
    removeDanseRevisee() {
      this.danseApprise._dansesRevisees.pop();
    },
    addDanse() {
      this.loading = true;
      this.danseApprise.teachedAt = new Date(this.date).getTime();

      if (this.modified) {
        if (this.pdfFile) {
          this.danseApprise.pdf = this.pdfFile;
        }
        Axios.patch(
          `${config.apiUrl}/danses/${this.danseApprise._id}`,
          this.danseApprise
        )
          .then(response => {
            this.$noty.success("La danse a bien été modifé");
            this.loading = false;
            this.danseApprise = {
              name: "",
              teachedAt: 0,
              youtube: "",
              pdf: "",
              revisee: false,
              _dansesRevisees: [],
              _niveau: "",
              logo: ""
            };
            this.modified = false;
            this.$emit("danceModified");
          })
          .catch(e => console.log(e));
      } else {
        var niveau = this.niveaux.niveaux.find(
          niv => niv._id == this.danseApprise._niveau
        );
        this.danseApprise.logo = niveau.logo;

        if (this.pdfFile) {
          const form = new FormData();

          form.append("file", this.pdfFile);

          form.append("upload_preset", process.env.VUE_APP_CLOUDINARY_PRESET);
          form.append("api_key", process.env.VUE_APP_CLOUDINARY_API_KEY);
          Axios.post(process.env.VUE_APP_CLOUDINARY_URL, form)
            .then(res => {
              this.danseApprise.pdf = res.data.secure_url;

              Axios.post(`${config.apiUrl}/danses`, this.danseApprise).then(
                response => {
                  this.loading = false;
                  this.$noty.success("La danse a bien été ajouté");
                  this.danseApprise = {
                    name: "",
                    teachedAt: 0,
                    youtube: "",
                    pdf: "",
                    revisee: false,
                    _dansesRevisees: [],
                    _niveau: "",
                    logo: ""
                  };
                }
              );
            })
            .catch(e => {
              this.loading = false;
              console.log(e);
              this.$noty.warning("La danse n'a pas été ajouté");
            });
        } else {
          this.danseApprise.pdf = "";
          Axios.post(`${config.apiUrl}/danses`, this.danseApprise)
            .then(response => {
              this.loading = false;
              this.$noty.success("La danse a bien été ajouté");
              this.danseApprise = {
                name: "",
                teachedAt: 0,
                youtube: "",
                pdf: "",
                revisee: false,
                _dansesRevisees: [],
                _niveau: "",
                logo: ""
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
