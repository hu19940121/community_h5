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
      getWorkList({ pageNum: 1, pageSize: 15 })
        .then(response => {
          const { data } = response
          console.log('data', data)

          commit('setWorkList', data.list)
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
