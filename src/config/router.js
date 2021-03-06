import Home from "../components/Home.vue";
import Login from "../components/Login.vue";
import Portofolios from "../components/Portofolios.vue";
import HelloWorld from "../components/HelloWorld.vue";
import CreatePortofolio from "../components/CreatePortofolio.vue";
import ViewPortofolio from "../components/ViewPortofolio.vue";
import AboutUs from "../components/AboutUs.vue";
import Contact from "../components/Contact.vue";
import NotFound from "../components/NotFound.vue";
import store from "../store";

import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
  {
    path: "/auth/:returnUrl?",
    name: "Login",
    component: Login,
  },
  {
    path: "/portofolios",
    component: Portofolios,
  },
  {
    path: "/test",
    component: HelloWorld,
  },
  {
    path: "/portofolios/manage",
    component: CreatePortofolio,
    meta: {
      requiresLogin: true,
    },
  },
  {
    path: "/portofolios/:id",
    component: ViewPortofolio,
  },
  {
    path: "/aboutus",
    component: AboutUs,
  },
  {
    path: "/contact",
    component: Contact,
  },
];

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  routes, // short for `routes: routes`
  history: createWebHashHistory(),
  scrollBehavior() {
    document.getElementById("app").scrollIntoView();
  },
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresLogin)) {
    if (!store.getters.isLoggedin)
      next({
        name: "Login",
        params: { returnUrl: to.fullPath },
      });
    else next();
  } else {
    next();
  }
});

export default router;
