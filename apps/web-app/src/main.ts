import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createI18n } from "vue-i18n";
import en from "../src/assets/locales/en.json";
import de from "../translations/de.json";

const messages = { en, de };

export const i18n = createI18n({
  legacy: false,
  locale: "de",
  //   fallbackLocale: "en", // set fallback locale
  global: true,
  globalInjection: true,
  messages,
  //   en: {
  //     Hello: "hello world",
  //   },
  //   de: {
  //     Hello: "Guten Tag",
  //   },
});

createApp(App)
  .use(i18n as any)
  .mount("#app");
