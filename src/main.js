import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/route/router";
import { createPinia } from "pinia";
import "es6-promise/auto";
import { i18n } from "@/localization";
// import { store } from "@/store";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000";
import VueCookies from "vue3-cookies";
import BootstrapVue3 from "bootstrap-vue-3";
import vClickOutside from "click-outside-vue3";
import ContentHeader from "@/components/layout/content-header.vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";

import { axiosInterceptor } from "@/utils/axios.interceptor";
import loadScript from "vue-plugin-load-script";

// cmm components
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

import EmojiPicker from "vue3-emoji-picker";
import "/node_modules/vue3-emoji-picker/dist/style.css";

import * as MathLive from "https://unpkg.com/mathlive/dist/mathlive.min.mjs";
import VueMathfield from "https://unpkg.com/mathlive/dist/vue-mathlive.mjs";

import Button from "@/components/cmm/Button.vue";

const app = createApp(App);
app.config.globalProperties.axios = axios;

app
  .use(createPinia())
  .use(router)
  .use(i18n)
  .use(vClickOutside)
  .use(VueMathfield, MathLive)
  .component("content-header", ContentHeader)
  .component("mathlive-mathfield", VueMathfield)
  .component("Datepicker", Datepicker)
  .component("EmojiPicker", EmojiPicker)
  .component("Button", Button)
  .use(loadScript)
  .use(BootstrapVue3)
  .use(VueCookies, {
    expireTimes: "30d",
    path: "/eln",
    domain: "elncookies",
    secure: true,
    sameSite: "None",
  })
  .mount("#app");

axiosInterceptor.regist(); // loading bar
