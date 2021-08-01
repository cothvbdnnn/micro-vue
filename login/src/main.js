import Vue from "vue";
import singleSpaVue from "single-spa-vue";
import App from "./App.vue";
import Cookies from "js-cookie";
import router from "./router";

const bizflyUI = window["bizfly-ui"].default;

const {
  BfButton,
  BfForm,
  BfInput,
  BfPagination,
  BfRadio,
  BfRadioGroup,
  locale,
  languages,
} = bizflyUI;
Vue.component("BfButton", BfButton);
Vue.component("BfForm", BfForm);
Vue.component("BfInput", BfInput);
Vue.component("BfPagination", BfPagination);
Vue.component("BfRadio", BfRadio);
Vue.component("BfRadioGroup", BfRadioGroup);

locale(languages[Cookies.get("lang")]);

Vue.config.productionTip = false;

const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    render(h) {
      return h(App, {
        props: {},
      });
    },
    router,
  },
});

export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;
