import { createApp } from "vue";
import router from "./router/index";

import App from "./App";

const app = createApp(App);

app.use(router);

app.mount("#app");
//上面可以简写成链式调用
//createApp(App).use(router).mount("#app")