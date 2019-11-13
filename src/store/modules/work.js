import { getWorkList } from '@/api/work'

const state = {
  workList: []
}

const mutations = {
  setWorkList: (state, list) => {
    state.workList = list
  }
}

const actions = {
  getWorkList ({ commit }) {
    return new Promise((resolve, reject) => {
      getWorkList()
        .then(response => {
          const { data } = response
          commit('setWorkList', data)
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
