import Cookie from 'js-cookie'
export default function ({ $axios, store, redirect }) {
  $axios.setHeader('token', store.state.auth.token)
  $axios.onResponse((res) => {
    if (
      Object.prototype.hasOwnProperty.call(res.data, 'sukses') &&
      !Object.prototype.hasOwnProperty.call(res.data, 'data')
    ) {
      store.dispatch('tampilkanSnackbar', {
        warna: res.data.sukses ? 'success' : 'error',
        pesan: res.data.pesan,
      })
    }
  })
  $axios.onError((err) => {
    if (err.response) {
      if (err.response.status === 401) {
        store.dispatch('tampilkanSnackbar', {
          warna: 'error',
          pesan: 'Harap melakukan login terlebih dahulu',
        })
        Cookie.remove('token')
        Cookie.remove('hakAkses')
        redirect('/')
      } else if (err.response.status === 400) {
        // store.dispatch('tampilkanSnackbar', {
        //   warna: 'error',
        //   pesan: 'Token tidak valid',
        // })
      }
    }
  })
}
