import {
    createApp
} from "vue";
import "firebase/firestore";
import store from "./store";
import router from "./config/router";
import VueLoading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

import App from "./App.vue";

const app = createApp(App);
app.use(store);
app.use(router);
app.use(
    VueLoading, {
        color: "#fd7905",
        backgroundColor: "#fed28a",
    }, {
        // slots
    }
);
app.mount("#app");