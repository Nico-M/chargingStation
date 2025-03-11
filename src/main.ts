import { createApp, watchEffect } from "vue";
import "./style.css";
import App from "./App.vue";
import "virtual:uno.css";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import "dayjs/locale/en";
import i18n from "./i18n";

// dayjs.locale("zh-cn");

//get local language setting fro local storage
const localLanguage = localStorage.getItem("localLanguage") as LocalLocale || 'en';

type LocalLocale = "zh" | "en";
function setupLocalLocale(locale: LocalLocale) {
  if (locale === "zh") {
    dayjs.locale("zh-cn");
    i18n.global.locale.value = "zh";
  } else {
    dayjs.locale("en");
    i18n.global.locale.value = "en";
  }
}



setupLocalLocale(localLanguage);

const app = createApp(App);


app.use(i18n);



app.mount("#app");
