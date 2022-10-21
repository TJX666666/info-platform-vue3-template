import { createApp } from "vue";
import App from "@/App.vue";

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import { setupRouter } from "@/router";
import { setupStore } from "@/store";

import "@/assets/scss/default.scss";

function setupApp() {
  const app = createApp(App);
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
  setupRouter(app);

  setupStore(app);
  app.use(ElementPlus) 
  app.mount("#app");
}

setupApp();
