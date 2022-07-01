export default {
  data() {
    return {
      hariEthol: [
        {
          value: 1,
          text: 'Senin',
        },
        {
          value: 2,
          text: 'Selasa',
        },
        {
          value: 3,
          text: 'Rabu',
        },
        {
          value: 4,
          text: 'Kamis',
        },
        {
          value: 5,
          text: "Jum'at",
        },
        {
          value: 6,
          text: 'Sabtu',
        },
        {
          value: 0,
          text: 'Minggu',
        },
      ],
      bulanIndonesia: [
        {
          value: 1,
          text: 'Januari',
        },
        {
          value: 2,
          text: 'Februari',
        },
        {
          value: 3,
          text: 'Maret',
        },
        {
          value: 4,
          text: 'April',
        },
        {
          value: 5,
          text: 'Mei',
        },
        {
          value: 6,
          text: 'Juni',
        },
        {
          value: 7,
          text: 'Juli',
        },
        {
          value: 8,
          text: 'Agustus',
        },
        {
          value: 9,
          text: 'September',
        },
        {
          value: 10,
          text: 'Oktober',
        },
        {
          value: 11,
          text: 'November',
        },
        {
          value: 12,
          text: 'Desember',
        },
      ],
    }
  },
  computed: {
    semesterAktif() {
      return this.$store.getters.semester
    },
    semesterGanjilGenap() {
      if (this.semesterAktif == '1') {
        return 'Ganjil'
      } else if (this.semesterAktif == '2') {
        return 'Genap'
      }
    },
    tahunAjaranAktif() {
      const tahun = this.$store.getters.tahun
      let tahunAktif = ''
      for (let i = 0; i < 10; i++) {
        const nilai = tahun - i
        const teksTahunAjaran = `${tahun - i}/${tahun - i + 1}`
        if (nilai == tahun) {
          tahunAktif = teksTahunAjaran
          break
        }
      }
      return tahunAktif
    },
    tahunAjaranAktifOnly() {
      const tahun = this.$store.getters.tahun
      let tahunAktif = ''
      for (let i = 0; i < 10; i++) {
        const nilai = tahun - i
        const teksTahunAjaran = `${tahun - i}/${tahun - i + 1}`
        if (nilai == tahun) {
          tahunAktif = teksTahunAjaran
          break
        }
      }
      return tahunAktif.substring(0, 4)
    },
  },
  methods: {
    convert_full_string_date(date) {
      const d = new Date(date)
      let month = '' + (d.getMonth() + 1)
      let day = '' + d.getDate()
      const year = d.getFullYear()
      let hours = '' + d.getHours()
      let minute = '' + d.getMinutes()
      if (month.length < 2) month = '0' + month
      if (day.length < 2) day = '0' + day
      if (hours.length < 2) hours = '0' + hours
      if (minute.length < 2) minute = '0' + minute

      return [year, month, day].join('-') + ' ' + hours + ':' + minute
    },
  },
}
