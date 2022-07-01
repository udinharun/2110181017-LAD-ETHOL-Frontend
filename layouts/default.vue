<template>
  <v-app dark>
    <Snackbar />
    <v-app-bar
      fixed
      clipped-left
      app
      style="background-color: #0b668b; color: white"
      dark
    >
      <v-app-bar-nav-icon class="hidden-lg-and-up" @click="drawer = true" />
      <v-avatar class="hidden-md-and-down mr-3" tile>
        <v-img src="/penswhite.png" contain />
      </v-avatar>
      <div>
        <p class="ethol-nav-brand">
          {{ brand }}
        </p>
        <p class="ethol-nav-long-brand">
          <small>{{ long_brand }}</small>
        </p>
      </div>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app clipped>
      <UserProfile />
      <v-divider />
      <v-list nav dense>
        <MenuAdmin v-if="admin" />
        <MenuBaak v-else-if="baak" />
        <MenuDosen v-else-if="dosen" />
        <MenuKaprodi v-else-if="kaprodi" />
        <MenuMahasiswa v-else-if="mahasiswa" />
        <MenuLogout />
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>
<script>
import Snackbar from '@/components/utils/snackbar.vue'
import UserProfile from '@/components/user/profil.vue'
import MenuLogout from '@/components/menu/logout.vue'
import MenuAdmin from '@/components/menu/hak/admin.vue'
import MenuBaak from '@/components/menu/hak/baak.vue'
import MenuDosen from '@/components/menu/hak/dosen.vue'
import MenuKaprodi from '@/components/menu/hak/kaprodi.vue'
import MenuMahasiswa from '@/components/menu/hak/mahasiswa.vue'
import { mapGetters } from 'vuex'
export default {
  components: {
    Snackbar,
    UserProfile,
    MenuLogout,
    MenuAdmin,
    MenuBaak,
    MenuDosen,
    MenuKaprodi,
    MenuMahasiswa,
  },
  data() {
    return {
      brand: process.env.BRAND_SINGKATAN,
      long_brand: process.env.BRAND_KEPANJANGAN,
      drawer: null,
    }
  },
  computed: {
    ...mapGetters(['admin', 'baak', 'dosen', 'kaprodi', 'mahasiswa']),
  },
}
</script>
<style>
.ethol-nav-brand {
  margin-bottom: 0px !important;
  font-weight: bold;
  font-size: 14pt;
}
.ethol-nav-long-brand {
  margin-bottom: 0px !important;
  margin-top: -10px;
  font-size: 12pt;
}
.ethol-th-table {
  background-color: rgb(240, 255, 250) !important;
}
.swal2-container {
  font-family: sans-serif;
}
.table-noborder,
.table-noborder tr,
.table-noborder th,
.table-noborder td {
  border: none !important;
  text-align: left;
  padding: 5px;
}
.slide-bottom-enter-active,
.slide-bottom-leave-active {
  transition: opacity 0.25s ease-in-out, transform 0.25s ease-in-out;
}
.slide-bottom-enter,
.slide-bottom-leave-to {
  opacity: 0;
  transform: translate3d(0, 15px, 0);
}
</style>
