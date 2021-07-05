import Vue from 'vue'
import Vuex from 'vuex'
import createStore from "./modules/create";
import { globalStore } from '@todo/style'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    globalStore,
    createStore
  }
})

