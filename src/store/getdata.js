export default {
  namespaced: true,
  state: {
    datalist: [],
  },
  mutations: {
    setData (state, res) {
      state.datalist = res
    }
  },
  actions: {
    getList ({ commit, rootState, state }, options) {
      return commit('setData', ['1', '2'])
    }
  }
}