export default {
  data() {
    return {
      warnaTeks: ['#2E9386', '#0B668B', '#02027a', '#70020d', '#7a4100'],
      listWarna: [
        { color: 'blue darken-2' },
        { color: 'cyan darken-3' },
        { color: 'brown' },
        { color: 'blue-grey darken-2' },
        { color: 'green darken-1' },
        { color: 'light-blue darken-4' },
        { color: 'red darken-3' },
        { color: 'blue' },
        { color: 'blue darken-2' },
        { color: 'cyan darken-3' },
        { color: 'brown' },
        { color: 'blue-grey darken-2' },
        { color: 'green darken-1' },
        { color: 'light-blue darken-4' },
        { color: 'red darken-3' },
        { color: 'blue' },
        { color: 'blue darken-2' },
        { color: 'cyan darken-3' },
        { color: 'brown' },
        { color: 'blue-grey darken-2' },
        { color: 'green darken-1' },
        { color: 'light-blue darken-4' },
        { color: 'red darken-3' },
        { color: 'blue' },
      ],
      statusPengumpulanTugas: [
        'Belum Mengumpulkan',
        'Mengumpulkan',
        'Mengumpulkan Terlambat',
      ],
    }
  },
  computed: {
    menit() {
      const mnt = [
        '00',
        '05',
        '10',
        '15',
        '20',
        '25',
        '30',
        '35',
        '40',
        '45',
        '50',
        '55',
        '59',
      ]
      return mnt
    },
    jam() {
      const jam = []
      for (let no = 1; no < 24; no++) {
        let n = no.toString()
        if (n.length == 1) {
          n = '0' + n
        }
        jam.push(n)
      }
      return jam
    },
  },
  filters: {
    filterExtensiFile(value) {
      if (!value) return ''
      return value.split('.').pop()
    },
  },
  methods: {
    hurufPertamaKapital(teks) {
      if (!teks) {
        return ' '
      } else {
        return teks.charAt(0).toUpperCase() + teks.slice(1)
      }
    },
    hapusStringNull(val) {
      if (val) {
        if (val != null) {
          return val
        } else {
          return ''
        }
      } else {
        return ''
      }
    },
    akronim(str) {
      const matches = str.match(/\b(\w)/g)
      const akronim = matches.join('')
      return akronim
    },
    limitDuaTigaKarakter(str) {
      if (str.length >= 3) {
        return str.substring(0, 3)
      } else if (str.length == 2) {
        return str.substring(0, 2)
      } else {
        return str.substring(0, 1)
      }
    },
    warnaAcak() {
      return this.warnaTeks[Math.floor(Math.random() * this.warnaTeks.length)]
    },
    getExtensiFile(url) {
      if (!url) return ''
      return url.split('.').pop()
    },
    getNamaFile(url) {
      if (!url) return ''
      return url.split('/').pop()
    },
    hurufKapitalSemua(str) {
      if (!str) return ''
      return str.toUpperCase()
    },
  },
}
