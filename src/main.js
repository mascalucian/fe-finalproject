import { createApp } from "vue";
import "firebase/firestore";
import store from "./store";

import App from "./App.vue";

const app = createApp(App);

app.use(store);
app.mount("#app");
