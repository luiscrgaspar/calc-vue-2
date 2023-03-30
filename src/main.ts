
import Vue from 'vue'
import VueI18n from "vue-i18n";
import App from './App.vue'
import es from "./locales/es-ES.json";
import en from "./locales/en-US.json";
import pt from "./locales/pt-PT.json";
import store from './store'

Vue.config.productionTip = false

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: "en-US",
  fallbackLocale: "en-US",
  messages: { es, en, pt },
  silentFallbackWarn: true,
});

new Vue({
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
