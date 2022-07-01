<template>
  <v-list-item class="py-3">
    <v-list-item-avatar size="60">
      <v-img src="/user.png" />
    </v-list-item-avatar>
    <v-list-item-content>
      <span class="caption">{{ nama }}</span>
      <span v-if="hakAkses.length === 1" class="caption">{{ hakAktif }}</span>
      <v-menu v-else>
        <template #activator="{ on: menu, attrs }">
          <v-tooltip bottom>
            <template #activator="{ on: tooltip }">
              <span
                class="caption"
                v-bind="attrs"
                v-on="{ ...tooltip, ...menu }"
              >
                {{ hakAktif }} <v-icon>mdi-chevron-down</v-icon>
              </span>
            </template>
            <span>Ubah Hak Akses</span>
          </v-tooltip>
        </template>
        <v-list>
          <v-list-item v-for="item in hakAkses" :key="item">
            <v-list-item-title @click="ubahHakAktif(item)">
              {{ item }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-list-item-content>
  </v-list-item>
</template>
<script>
import Cookie from 'js-cookie'
import teks from '~/mixins/teks'
export default {
  mixins: [teks],
  computed: {
    nama() {
      return this.$store.state.user.nama
    },
    hakAktif() {
      return this.hurufPertamaKapital(this.$store.state.auth.hakAktif)
    },
    hakAkses() {
      return this.$store.state.user.hakAkses
    },
  },
  methods: {
    ubahHakAktif(hak) {
      Cookie.set('hakAktif', hak)
      this.$store.dispatch('isiHakAktif', hak)
      this.$router.push(`/${hak}/beranda`)
    },
  },
}
</script>
