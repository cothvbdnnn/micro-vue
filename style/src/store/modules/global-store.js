const state = {
  globalItem: [
    { title: "item 1" }
  ]
}

const getters = {
  global: (state) => {
    return state.globalItem
  },
}

const mutations = {
  SET_GLOBAL(state, newGlobal) {
    state.globalItem.push(newGlobal)
  },
  REMOVE_GLOBAL(state, index) {
    state.globalItem.splice(index, 1)
  },
  EDIT_GLOBAL(state, value) {
    state.globalItem[value.index].title = value.title
  },
  ADD_GLOBAL(state, value) {
    state.globalItem.unshift({ title: value })
  }
}

const actions = {
  setGlobal({ commit }, newGlobal) {
    commit('SET_GLOBAL', newGlobal)
  },
  removeGlobal({ commit }, index) {
    commit('REMOVE_GLOBAL', index)
  },
  editGlobal({ commit }, value) {
    commit('EDIT_GLOBAL', value)
  },
  addGlobal({ commit }, value) {
    commit('ADD_GLOBAL', value)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}