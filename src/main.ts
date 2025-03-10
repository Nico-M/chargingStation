import { createApp, watchEffect } from "vue";
import "./style.css";
import App from "./App.vue";
import "virtual:uno.css";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import "dayjs/locale/en";
import i18n from "./i18n";

// dayjs.locale("zh-cn");

type LocalLocale = "zh" | "en";
function setupDayjsLocale(locale: LocalLocale) {
  if (locale === "zh") {
    dayjs.locale("zh-cn");
  } else {
    dayjs.locale("en");
  }
}


setupDayjsLocale("en"); // or "en" based on your application needs

const app = createApp(App);


app.use(i18n);



app.mount("#app");

watchEffect(() => {
    const currentLocale = i18n.global.locale as unknown as  LocalLocale;
    setupDayjsLocale(currentLocale);
  });