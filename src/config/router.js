import Home from "../components/Home.vue";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
import Portofolios from "../components/Portofolios.vue";
import HelloWorld from "../components/HelloWorld.vue";
import CreatePortofolio from "../components/CreatePortofolio.vue";
import ViewPortofolio from "../components/ViewPortofolio.vue";
import AboutUs from "../components/AboutUs.vue";
import Contact from "../components/Contact.vue";
import NotFound from "../components/NotFound.vue";
import store from "../store";

import {
    createRouter,
    createWebHashHistory
} from "vue-router";

const routes = [{
        path: "/",
        component: Home
    },
    {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: NotFound
    },
    {
        path: "/login",
        component: Login
    },
    {
        path: "/register",
        component: Register
    },
    {
        path: "/portofolios",
        component: Portofolios
    },
    {
        path: "/test",
        component: HelloWorld
    },
    {
        path: "/portofolios/create",
        component: CreatePortofolio,
        meta: {
            requiresLogin: true
        },
    },
    {
        path: "/portofolios/:id",
        component: ViewPortofolio
    },
    {
        path: "/aboutus",
        component: AboutUs
    },
    {
        path: "/contact",
        component: Contact
    },
];

const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    routes, // short for `routes: routes`
    history: createWebHashHistory(),
});

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresLogin)) {
        if (!store.getters.isLoggedin) next({
            path: "/login"
        });
        else next();
    } else {
        next();
    }
});

export default router;