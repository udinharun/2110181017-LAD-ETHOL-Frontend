import user from './modules/user'
const rp = require('request-promise')
const cookieparser = process.server ? require('cookieparser') : undefined
export default {
  state() {
    return {
      auth: {
        token: null,
        hakAktif: null,
      },
      snackbar: {
        tampil: false,
        warna: 'primary',
        pesan: '',
      },
      socket: {
        id: null,
        isConnected: false,
        reconnectError: false,
      },
    }
  },
  mutations: {
    TAMPILKAN_SNACKBAR(state, payload) {
      state.snackbar.tampil = true
      state.snackbar.warna = payload.warna
      state.snackbar.pesan = payload.pesan
    },
    SEMBUNYIKAN_SNACKBAR(state) {
      state.snackbar.tampil = false
    },
    ISI_TOKEN(state, payload) {
      state.auth.token = payload
    },
    ISI_HAK_AKTIF(state, payload) {
      state.auth.hakAktif = payload
    },
    SOCKET_ONOPEN(state, event) {
      state.socket.isConnected = true
    },
    SOCKET_ONCLOSE(state, event) {
      state.socket.isConnected = false
    },
    SOCKET_ONERROR(state, event) {},
    SOCKET_ONMESSAGE(state, event) {},
    SOCKET_RECONNECT(state, count) {},
    SOCKET_RECONNECT_ERROR(state) {
      state.socket.reconnectError = true
    },
  },
  getters: {
    production() {
      return process.env.NODE_ENV === 'production'
    },
    development() {
      return process.env.NODE_ENV === 'development'
    },
    semester() {
      const date = new Date()
      const month = date.getMonth() + 1
      if (month >= 2 && month <= 7) {
        return 2
      } else {
        return 1
      }
    },

    tahun() {
      const date = new Date()
      const month = date.getMonth() + 1
      const year = date.getUTCFullYear()
      if (month >= 2 && month <= 7) {
        return year - 1
      } else {
        return year
      }
    },
    admin(state) {
      return state.auth.hakAktif === 'admin'
    },
    baak(state) {
      return state.auth.hakAktif === 'baak'
    },
    dosen(state) {
      return state.auth.hakAktif === 'dosen'
    },
    kaprodi(state) {
      return state.auth.hakAktif === 'kaprodi'
    },
    mahasiswa(state) {
      return state.auth.hakAktif === 'mahasiswa'
    },
  },
  actions: {
    async nuxtServerInit({ commit, state }, { req }) {
      // console.log('req.headers.cookie', req.headers.cookie)
      if (req.headers.cookie) {
        const parsed = cookieparser.parse(req.headers.cookie)
        const { token, hakAktif } = parsed
        if (token) {
          commit('ISI_TOKEN', token)
          if (!state.user.id) {
            try {
              const optionsRP = {
                method: 'GET',
                uri: 'https://ethol.pens.ac.id/api/auth/validasi-token',
                json: true,
                proxy: false,
                headers: {
                  token,
                },
              }
              const user = await rp(optionsRP)
                .then((parsedBody) => parsedBody)
                .catch(function (err) {
                  console.log('validasi-token-error', err)
                  return null
                })
              if (Object.prototype.hasOwnProperty.call(user, 'nomor')) {
                commit('ISI_USER', user)
                if (hakAktif) {
                  if (user.hakAkses.includes(hakAktif)) {
                    commit('ISI_HAK_AKTIF', hakAktif)
                  } else {
                    commit('ISI_HAK_AKTIF', user.hakAkses[0])
                  }
                } else {
                  commit('ISI_HAK_AKTIF', user.hakAkses[0])
                }
              } else {
                // commit('TAMPILKAN_SNACKBAR', {
                //   tampil: true,
                //   warna: 'primary',
                //   pesan: 'Token tidak valid',
                // })
              }
            } catch (error) {
              console.log('error di catch', error)
            }
          }
        }
      }
    },
    tampilkanSnackbar({ commit }, payload) {
      commit('TAMPILKAN_SNACKBAR', payload)
      setTimeout(() => {
        commit('SEMBUNYIKAN_SNACKBAR')
      }, 2000)
    },
    hapusToken({ commit }) {
      commit('ISI_TOKEN', null)
    },
    isiHakAktif({ commit }, payload) {
      commit('ISI_HAK_AKTIF', payload)
    },
  },
  modules: { user },
}
