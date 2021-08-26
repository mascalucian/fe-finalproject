import { createApp } from "vue";
import "firebase/firestore";
import store from "./store";
import router from "./config/router";
import VueLoading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import VueGoogleMap from "vuejs-google-maps";
import "vuejs-google-maps/dist/vuejs-google-maps.css";

import App from "./App.vue";

const app = createApp(App);
app.use(store);
app.use(router);
app.use(
  VueLoading,
  {
    color: "#fd7905",
    backgroundColor: "#fed28a",
  },
  {
    // slots
  }
);
app.use(VueGoogleMap, {
  load: {
    apiKey: "AIzaSyChAjp5DnMOrs3YFbiR2-RYtjKSiOWkG5E",
    libraries: [
      /* rest of libraries */
    ],
  },
});
app.mount("#app");
