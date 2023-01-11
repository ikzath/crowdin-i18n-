import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createI18n } from "vue-i18n";

const i18n: any = createI18n({
  legacy: false,
  locale: "de",
  //   fallbackLocale: "en", // set fallback locale
  //   global: true,
  messages: {
    en: {
      Hello: "hello world",
    },
    de: {
      Hello: "Guten Tag",
    },
  },
});

createApp(App).use(i18n).mount("#app");
