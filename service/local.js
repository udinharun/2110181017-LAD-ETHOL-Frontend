const PRESENSI = 'presensi'
const TUGAS = 'tugas'
export default {
  setPresensi(param) {
    if (process.browser) {
      localStorage.setItem(PRESENSI, JSON.stringify(param))
    }
  },
  getPresensi() {
    let presensi = null
    if (process.browser) {
      presensi = JSON.parse(localStorage.getItem(PRESENSI))
    }
    return presensi
  },
  hapusPresensi() {
    if (process.browser) {
      localStorage.removeItem(PRESENSI)
    }
  },
  setTugas(param) {
    if (process.browser) {
      localStorage.setItem(TUGAS, JSON.stringify(param))
    }
  },
  getTugas() {
    let presensi = null
    if (process.browser) {
      presensi = JSON.parse(localStorage.getItem(TUGAS))
    }
    return presensi
  },
  hapusTugas() {
    if (process.browser) {
      localStorage.removeItem(TUGAS)
    }
  },
}
