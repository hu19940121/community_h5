
const state = {
  cachedViews: [], // 缓存的route
  headerNavVisible: true
}

const mutations = {
  addCachedView: (state, view) => {
    if (state.cachedViews.includes(view.name)) return
    if (!view.meta.noCache) {
      state.cachedViews.push(view.name)
    }
  },
  delCachedView: (state, view) => {
    for (const i of state.cachedViews) {
      if (i === view.name) {
        const index = state.cachedViews.indexOf(i)
        state.cachedViews.splice(index, 1)
        break
      }
    }
  },
  setHeaderNavVisible: (state, status) => {
    state.headerNavVisible = status
  }
}

const actions = {
  addCachedView ({ commit }, view) {
    commit('addCachedView', view)
  },
  delCachedView ({ commit, state }, view) {
    return new Promise(resolve => {
      commit('delCachedView', view)
      resolve([...state.cachedViews])
    })
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
