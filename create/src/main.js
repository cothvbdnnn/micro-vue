import Vue from "vue";
import singleSpaVue from "single-spa-vue";
import store from "./store";
import Cookies from "js-cookie";
import App from "./App.vue";

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
    store,
  },
});

export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;
