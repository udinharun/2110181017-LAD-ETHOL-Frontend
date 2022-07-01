<template>
  <v-container>
    <v-card outlined>
      <v-card-title>Login</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-select v-model="aksesnya" :items="akses"> </v-select>
        <v-text-field
          v-model="keyword"
          :label="labelnya"
          hide-details="auto"
        ></v-text-field>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="primary" :loading="loading" @click="login">Login</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import Cookie from 'js-cookie'
export default {
  layout: 'frontend',
  data() {
    return {
      loading: false,
      aksesnya: null,
      akses: [
        {
          text: 'Mahasiswa',
          value: 'mahasiswa',
        },
        {
          text: 'Dosen',
          value: 'dosen',
        },
        {
          text: 'Baak',
          value: 'baak',
        },
      ],
      labelnya: '',
      keyword: '',
    }
  },
  watch: {
    aksesnya(v) {
      if (v == 'mahasiswa') {
        this.labelnya = 'NRP'
      } else if (v == 'dosen' || v == 'baak') {
        this.labelnya = 'NIP'
      }
    },
  },
  created() {
    if (process.browser) {
      const token = localStorage.getItem('token') || Cookie.get('token')
      if (token) {
        Cookie.set('token', token)
        this.$axios.setHeader('token', token)
        this.$axios.get('/auth/validasi-token').then((res) => {
          if (Object.prototype.hasOwnProperty.call(res.data, 'nomor')) {
            this.$store.dispatch('isiUser', res.data)
            if (res.data.hakAkses.length) {
              Cookie.set('hakAktif', res.data.hakAkses[0])
              this.$store.dispatch('isiHakAktif', res.data.hakAkses[0])
              this.$router.push(`/${res.data.hakAkses[0]}/beranda`)
            }
          }
        })
        localStorage.removeItem('token')
      }
    }
  },
  methods: {
    login() {
      if (this.aksesnya == '' || this.keyword == '') {
        alert('Harap pilih akses dan isi NIP/NRP')
      } else {
        this.loading = true
        let nrp = null
        let nip = null
        if (this.aksesnya == 'mahasiswa') {
          nrp = this.keyword
        } else if (this.aksesnya == 'dosen' || this.aksesnya == 'baak') {
          nip = this.keyword
        }

        this.$axios
          .post('/auth/check', {
            nrp,
            nip,
          })
          .then((res) => {
            if (res.data.nomor != null) {
              this.loading = false
              Cookie.set('token', res.data.token)
              Cookie.set('hakAktif', 'dosen')
              this.$store.dispatch('isiUser', res.data)
              this.$store.dispatch('isiHakAktif', 'dosen')
              window.location.reload()
            } else {
              alert('Data tidak ditemukan')
            }
          })
          .finally(() => {
            this.loading = false
          })
      }
    },
  },
}
</script>
