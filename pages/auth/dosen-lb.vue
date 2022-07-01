<template>
  <v-container class="secondary fill-height ma-0" fluid>
    <v-row class="fill-height" align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="5" xl="4">
        <v-card flat>
          <v-card-title> <v-spacer />Login Dosen LB<v-spacer /> </v-card-title>
          <v-card-title>
            <v-spacer />
            <img
              src="/icon.png"
              class="hidden-lg-and-up"
              height="100"
              width="100"
            />
            <img
              src="/icon.png"
              class="hidden-md-and-down"
              height="150"
              width="150"
            />
            <v-spacer />
          </v-card-title>
          <v-card-text class="pb-5 px-5">
            <v-form ref="form_login" class="mt-10">
              <v-text-field
                v-model="form.username"
                label="Username"
                outlined
                :rules="[(v) => !!v || 'Username wajib diisi']"
                prepend-inner-icon="mdi-account-outline"
              />
              <v-text-field
                v-model="form.password"
                label="Password"
                outlined
                :rules="[(v) => !!v || 'Password wajib diisi']"
                prepend-inner-icon="mdi-key"
                :append-icon="tampilkanPassword ? 'mdi-lock-open' : 'mdi-lock'"
                :type="tampilkanPassword ? 'text' : 'password'"
                @click:append="tampilkanPassword = !tampilkanPassword"
              />
              <v-btn
                block
                large
                :loading="loading"
                text
                class="primary text-none"
                @click="masuk()"
              >
                Masuk
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import Cookie from 'js-cookie'
export default {
  layout: 'empty',
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
      tampilkanPassword: false,
      loading: false,
    }
  },
  methods: {
    masuk() {
      if (this.$refs.form_login.validate()) {
        this.loading = true
        this.$axios
          .post('/auth/dosen-lb', this.form)
          .then(async (res) => {
            if (res.data.status == 'ditemukan') {
              await this.$axios
                .get(
                  `https://ethol.pens.ac.id/auth-php/login.php?hash=${res.data.dataUser.password}&password=${this.form.password}`
                )
                .then(async (resCheckPass) => {
                  if (resCheckPass.data.success == true) {
                    await this.$axios
                      .post(`/auth/token-dosen-lb`, {
                        username: this.form.username,
                        password: res.data.dataUser.password,
                      })
                      .then((resGetToken) => {
                        this.loading = false
                        Cookie.set('token', resGetToken.data.token)
                        Cookie.set('hakAktif', 'dosen')
                        this.$store.dispatch('isiUser', resGetToken.data)
                        this.$store.dispatch('isiHakAktif', 'dosen')
                        this.$router.push('/')
                      })
                  } else {
                    this.loading = false
                    alert('Password Anda Salah !')
                  }
                })
            } else {
              this.loading = false
              alert('Akun tidak ditemukan')
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
