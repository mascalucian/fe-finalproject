import {
    createApp
} from "vue";
import "firebase/firestore";
import store from "./store";
import router from "./config/router";



import App from "./App.vue";

const app = createApp(App);
app.use(store);
app.use(router);
app.mount("#app");