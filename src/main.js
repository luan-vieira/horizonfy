import App from "./App.vue";
import { createApp } from "vue";

import { registerPlugins } from "@/plugins";

import store from "./store";
import { router } from "./router/index";

const app = createApp(App).use(store).use(router);
registerPlugins(app);
app.mount("#app");
