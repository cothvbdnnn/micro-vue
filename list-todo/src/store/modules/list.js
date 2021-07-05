const state = {
  listItem: [
    { name: "listItem", number: 1 },
  ]
}

const getters = {
  listItem: (state) => {
    return state.listItem
  },
}

const mutations = {
  SET_LIST(state, newList) {
    state.listItem.push(newList)
  }
}

const actions = {
  setList({ commit }, newList) {
    commit('SET_LIST', newList)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}