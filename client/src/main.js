import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css"; // Ensure you are using css-loader
import cors from "cors";
import store from './store'

Vue.config.productionTip = false

import VueNoty from "vuejs-noty";
import "vuejs-noty/dist/vuejs-noty.css";

Vue.use(VueNoty, {
  killer: true,
  timeout: 3000,
  progressBar: true,
  layout: 'bottomRight',
  theme: 'metroui'
})

import wysiwyg from "vue-wysiwyg";
import "vue-wysiwyg/dist/vueWysiwyg.css";

Vue.use(wysiwyg, {
  hideModules: {
    'image': true
  }
}); // config is optional. more below

Vue.use(cors);
Vue.use(Vuetify);
Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");