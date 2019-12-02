import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Infos from "./views/Infos.vue";
// import Logout from "./views/Logout.vue";

import CountryDanse from "./views/country/Danse.vue";
import CountryCours from "./views/country/Cours.vue";
import LineDanse from "./views/line/Danse.vue";
import LineCours from "./views/line/Cours.vue";

// import Revision from "./views/Revision.vue";

import Manifestation from "./views/Manifestation.vue";
import GaleriePhoto from "./views/GaleriePhoto.vue";
import GaleriePhotoDetail from "./views/GaleriePhotoDetail.vue";

import AdminLogin from "./views/admin/Login.vue";
import AdminDashboard from "./views/admin/Dashboard.vue";

import AdminDanceDashboard from "./views/admin/danse/Dashboard.vue";
import AdminDanceCreate from "./views/admin/danse/Create.vue";
import AdminDanceModify from "./views/admin/danse/Modify.vue";

import AdminCoursDashboard from "./views/admin/cours/Dashboard.vue";
import AdminCoursCreate from "./views/admin/cours/Create.vue";
import AdminCoursModify from "./views/admin/cours/Modify.vue";

import AdminManifestationDashboard from "./views/admin/manifestation/Dashboard.vue";
import AdminManifestationCreate from "./views/admin/manifestation/Create.vue";
import AdminManifestationModify from "./views/admin/manifestation/Modify.vue";

import AdminBalDashboard from "./views/admin/bal/Dashboard.vue";
import AdminBalCreate from "./views/admin/bal/Create.vue";
// import AdminBalModify from "./views/admin/bal/Modify.vue";
// import AdminCours from "./views/admin/Cours.vue";
// import AdminGaleriePhoto from "./views/admin/GaleriePhoto.vue";
// import AdminManifestations from "./views/admin/Manifestations.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/country/danses",
      name: "countryDanse",
      component: CountryDanse
    },
    {
      path: "/country/cours",
      name: "countryCours",
      component: CountryCours
    },
    {
      path: "/line/danses",
      name: "lineDanse",
      component: LineDanse
    },
    {
      path: "/line/cours",
      name: "lineCours",
      component: LineCours
    },
    {
      path: "/manifestations",
      name: "manifestations",
      component: Manifestation
    },
    {
      path: "/galeriePhoto",
      name: "galeriePhoto",
      component: GaleriePhoto
    },
    {
      path: "/galeriePhoto/:id",
      name: "galeriePhotoDetail",
      component: GaleriePhotoDetail
    },
    {
      path: "/infos",
      name: "infos",
      component: Infos
    },
    {
      path: "/logout",
      redirect: {
        name: "home"
      }
    },
    {
      path: "/admin",
      name: "adminLogin",
      component: AdminLogin
    },
    {
      path: "/admin/dashboard",
      name: "adminDashboard",
      component: AdminDashboard,
      beforeEnter: (to, from, next) => {
        if (!localStorage.getItem("auth")) {
          next("/");
        }
        next();
      }
    },
    {
      path: "/admin/danses",
      name: "adminDance",
      component: AdminDanceDashboard,
      beforeEnter: (to, from, next) => {
        if (!localStorage.getItem("auth")) {
          next("/");
        }
        next();
      }
    },
    {
      path: "/admin/danses/create",
      name: "adminDanceCreate",
      component: AdminDanceCreate,
      beforeEnter: (to, from, next) => {
        if (!localStorage.getItem("auth")) {
          next("/");
        }
        next();
      }
    },
    {
      path: "/admin/danses/modify/:id",
      name: "adminDanceModify",
      component: AdminDanceModify,
      beforeEnter: (to, from, next) => {
        if (!localStorage.getItem("auth")) {
          next("/");
        }
        next();
      }
    },
    {
      path: "/admin/cours",
      name: "adminCours",
      component: AdminCoursDashboard,
      beforeEnter: (to, from, next) => {
        if (!localStorage.getItem("auth")) {
          next("/");
        }
        next();
      }
    },
    {
      path: "/admin/cours/create",
      name: "adminCoursCreate",
      component: AdminCoursCreate,
      beforeEnter: (to, from, next) => {
        if (!localStorage.getItem("auth")) {
          next("/");
        }
        next();
      }
    },
    {
      path: "/admin/cours/modify/:id",
      name: "adminCoursModify",
      component: AdminCoursModify,
      beforeEnter: (to, from, next) => {
        if (!localStorage.getItem("auth")) {
          next("/");
        }
        next();
      }
    },
    {
      path: "/admin/manifestations",
      name: "adminManifestation",
      component: AdminManifestationDashboard,
      beforeEnter: (to, from, next) => {
        if (!localStorage.getItem("auth")) {
          next("/");
        }
        next();
      }
    },
    {
      path: "/admin/manifestations/create",
      name: "adminManifestationCreate",
      component: AdminManifestationCreate,
      beforeEnter: (to, from, next) => {
        if (!localStorage.getItem("auth")) {
          next("/");
        }
        next();
      }
    },
    {
      path: "/admin/manifestations/modify/:id",
      name: "adminManifestationModify",
      component: AdminManifestationModify,
      beforeEnter: (to, from, next) => {
        if (!localStorage.getItem("auth")) {
          next("/");
        }
        next();
      }
    },
    {
      path: "/admin/galeriePhoto",
      name: "adminBal",
      component: AdminBalDashboard,
      beforeEnter: (to, from, next) => {
        if (!localStorage.getItem("auth")) {
          next("/");
        }
        next();
      }
    },
    {
      path: "/admin/galeriePhoto/create",
      name: "adminBalCreate",
      component: AdminBalCreate,
      beforeEnter: (to, from, next) => {
        if (!localStorage.getItem("auth")) {
          next("/");
        }
        next();
      }
    },
    // {
    //   path: "/admin/cours",
    //   name: "adminCours",
    //   component: AdminCours
    // },
    // {
    //   path: "/admin/manifestations",
    //   name: "adminManifestations",
    //   component: AdminManifestations
    // },
    // {
    //   path: "/admin/galeriePhoto",
    //   name: "adminGaleriePhoto",
    //   component: AdminGaleriePhoto
    // },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
