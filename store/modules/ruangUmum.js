import createPersistedState from 'vuex-persistedstate'
export const plugins = () => [createPersistedState()]
export default {
  state: () => {
    return {
      listRuangUmum: [],
    }
  },
  mutations: {
    ASSIGN_RUANG_UMUM(state, dataParams) {
      state.listRuangUmum = dataParams
    },
    DELETE_RUANG_UMUM(state) {
      state.listRuangUmum = []
    },
  },
  actions: {
    simpan_ruang_umum({ commit }, dataParams) {
      commit('ASSIGN_RUANG_UMUM', dataParams)
    },
    hapus_ruang_umum({ commit }) {
      commit('DELETERUANG_UMUM')
    },
  },
}
