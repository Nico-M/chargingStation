import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import "virtual:uno.css";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";

dayjs.locale("zh-cn");

createApp(App).mount("#app");
