import createPersistedState from 'vuex-persistedstate'
import SecureLS from 'secure-ls'

const secureLS = new SecureLS({
  encodingType: 'aes',
  encryptionSecret: '@ethopensjoss99',
})

export default ({ store, req }) => {
  createPersistedState({
    key: 'ethol_pens', // key yang tampil di local storage
    paths: [
      'modules.ruangUmum',
    ], // path store yang ingin di encrypt
    storage: {
      getItem: (key) => secureLS.get(key),
      setItem: (key, value) => secureLS.set(key, value),
      removeItem: (key) => secureLS.remove(key),
    },
  })(store)
}
