import {
    createApp
} from "vue";
import "firebase/firestore";
import store from "./store";
import router from "./config/router";
import VAnimateCss from 'v-animate-css';



import App from "./App.vue";

const app = createApp(App);
app.use(VAnimateCss);
app.use(store);
app.use(router);
app.mount("#app");