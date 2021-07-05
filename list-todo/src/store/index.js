import Vue from 'vue'
import Vuex from 'vuex'
import listStore from "./modules/list";
import { globalStore } from '@todo/style'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    globalStore,
    listStore
  }
})

