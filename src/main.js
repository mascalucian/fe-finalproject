import { createApp } from "vue";
import { createStore } from "vuex";
import App from "./App.vue";
import portofolios from "./store/modules/portofolios";
import VuexEasyFirestore from "vuex-easy-firestore";
import { Firebase, initFirebase } from "./config/firebase.js";

const app = createApp(App);

const easyFirestore = VuexEasyFirestore([portofolios], {
  logging: true,
  FirebaseDependency: Firebase,
});

// include as PLUGIN in your vuex store
// please note that "myModule" should ONLY be passed via the plugin
const storeData = {
  plugins: [easyFirestore],
  // ... your other store data
};

const store = createStore(storeData);

initFirebase().catch((error) => {
  console.error(error);
});
app.use(store);
app.mount("#app");
