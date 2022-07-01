export default {
  state: () => {
    return {
      nomor: null,
      nipnrp: null,
      nama: null,
      hakAkses: [],
    }
  },
  mutations: {
    ISI_USER(state, payload) {
      state.nomor = payload.nomor
      state.nipnrp = payload.nipnrp
      state.nama = payload.nama
      state.hakAkses = payload.hakAkses
    },
    HAPUS_USER(state) {
      state.nomor = null
      state.nipnrp = null
      state.nama = null
      state.hakAkses = []
    },
  },
  actions: {
    isiUser({ commit }, payload) {
      commit('ISI_USER', payload)
    },
    hapusUser({ commit }) {
      commit('HAPUS_USER')
    },
  },
}
