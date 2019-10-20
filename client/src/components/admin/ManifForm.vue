<template>
  <div id="">
    <h2 class="text-xs-center mt-4">Ajouter une Manifestation</h2>
    <v-layout my-4 row>
      <v-flex xs12 >
        <v-card class="ma-4 pa-2 orange lighten-4">
          <v-form
            class="pa-2"
          >
          <v-flex mb-4 offset-sm2 xs12 sm8 >
            <v-date-picker width="100%" locale="fr-FR" v-model="date" :landscape="false" :reactive="true" color="amber lighten-1" header-color="primary" :no-title="true"></v-date-picker>
          </v-flex>

          <v-flex sm7>
            <v-text-field
            v-model="manifestation.name"

            label="Nom"
            required
            ></v-text-field>
          </v-flex>
          <v-layout row wrap>
            <v-flex sm7>
              <v-text-field
              v-model="manifestation.club"

              label="Club"
              required
              ></v-text-field>
            </v-flex>

            <v-flex offset-sm2>
              <v-checkbox
              v-model="manifestation.domicile"
              label="Domicile"
              required
              ></v-checkbox>
            </v-flex>

          </v-layout>

          <v-flex sm7>
            <v-text-field
            v-model="manifestation.city"

            label="Ville"
            required
            ></v-text-field>

          </v-flex>
          <v-flex sm7>
            <v-text-field
            v-model="manifestation.zipcode"

            label="Code postal"
            required
            ></v-text-field>

          </v-flex>

            <v-flex>
              <label for="file" class="label-file">
                Ajouter un PDF
                  <v-icon >fa-upload</v-icon>
              </label>
              <input id="file" class="input-file" type="file" @change="onFileChange">
              <span class="ml-4" v-if="pdfFile">Un fichier a été ajouté</span>
            </v-flex>

            <wysiwyg class="mt-4"  v-model="manifestation.description"></wysiwyg>

            <v-flex text-xs-center>
              <v-btn
              :loading="loading"
              :disabled="loading"
              large
              v-on:click.native="addManifestation()"
              color="amber accent-3"
              >
              Enregistrer
            </v-btn>
          </v-flex>

          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import Axios from 'axios'
import config from '@/config.js'

export default {
  name: "",
  props : ['manifestationToModify'],
  beforeMount() {
    //do something before mounting vue instance
    if (this.manifestationToModify._id) {
      this.manifestation = this.manifestationToModify
      this.modified = true
      this.date = new Date(this.manifestation.doneAt).toISOString().substr(0, 10)
    }
  },
  data: () => ({
    loading: false,
    date: new Date().toISOString().substr(0, 10),
    modified: false,
    manifestation: {
      name: '',
      domicile: false,
      doneAt:  0,
      city: '',
      zipcode: '',
      club: '',
      description: '',
      pdf: ''
    },
    pdfFile: ''
  }),
  methods: {
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.createImage(files[0]);
    },
    createImage(file) {
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) => {
        vm.pdfFile = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    addManifestation () {
      this.loading = true
      this.manifestation.doneAt = new Date(this.date).getTime()

      if (this.modified) {
        if (this.pdfFile) {
          this.manifesation.pdf = this.pdfFile
        }
        Axios.patch(`${config.apiUrl}/manifestations/${this.manifestation._id}`, this.manifestation).then(manif => {
          this.loading = false
          this.$noty.success("La manifestation a bien été modifié")
          this.manifestation = {
            name: '',
            domicile: false,
            doneAt: 0,
            city: '',
            zipcode: '',
            club: '',
            description: '',
            pdf: ''
          }
          this.modified = false
          this.$emit('manifestationModified')
        }).catch(e => console.log(e))
      }
    else {

      if (this.pdfFile) {
        const form = new FormData();

        form.append('file', this.pdfFile);

        form.append('upload_preset', process.env.VUE_APP_CLOUDINARY_PRESET);
        form.append('api_key', process.env.VUE_APP_CLOUDINARY_API_KEY);

        Axios.post(process.env.VUE_APP_CLOUDINARY_URL, form).then(res => {
          this.manifestation.pdf = res.data.secure_url

          Axios.post(`${config.apiUrl}/manifestations`, this.manifestation).then(manif => {
            this.loading = false
            this.$noty.success("La manifestation a bien été ajouté")
            this.manifestation = {
              name: '',
              domicile: false,
              doneAt: 0,
              city: '',
              zipcode: '',
              club: '',
              description: '',
              pdf: ''
            }
          })
        }).catch(e => {
          this.loading = false
          console.log(e)
          this.$noty.warning("La manifestation n'a pas été ajouté")
        })
      }
      else {
        this.manifestation.pdf = ""

        Axios.post(`${config.apiUrl}/manifestations`, this.manifestation).then(manif => {
          this.loading = false
          this.$noty.success("La manifestation a bien été ajouté")
          this.manifestation = {
            name: '',
            domicile: false,
            doneAt: 0,
            city: '',
            zipcode: '',
            club: '',
            description: '',
            pdf: ''
          }
      }).catch(e => {
        this.loading = false
        console.log(e)
        this.$noty.warning("La manifestation n'a pas été ajouté")
      })
      }

    }
  }
  }
}
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
