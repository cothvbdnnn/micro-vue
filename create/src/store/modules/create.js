const state = {
  createItem: [
    { name: "createItem", number: 1 }
  ]
}

const getters = {
  createItem: (state) => {
    return state.createItem
  },
}

const mutations = {
  SET_CREATE(state, newCreate) {
    state.dogs.push(newCreate)
  }
}

const actions = {
  setCreate({ commit }, newCreate) {
    commit('SET_CREATE', newCreate)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}