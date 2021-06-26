import Vue from 'vue';
import singleSpaVue from 'single-spa-vue';

import App from './App.vue';

window['bizfly-ui'].default.install(Vue)
Vue.config.productionTip = false;

const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    render(h) {
      return h(App, {
        props: {},
      });
    },
  },
});

export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;
