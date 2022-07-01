<template>
  <v-app dark>
    <Snackbar />
    <div class="hidden-lg-and-up" style="margin-bottom: 45px">
      <v-app-bar class="primary" dark fixed>
        <v-app-bar-nav-icon @click="drawer = true" />
        <v-toolbar-title class="title pl-1" v-text="title" />
        <v-spacer />
        <v-btn icon @click="toHome()">
          <v-icon>mdi-home-outline</v-icon>
        </v-btn>
      </v-app-bar>
    </div>
    <v-main>
      <nuxt />
    </v-main>
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list-item class="primary hidden-md-and-down" dark>
        <v-list-item-avatar tile>
          <img src="/penswhite.png" contain />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="font-weight-bold" v-text="title" />
        </v-list-item-content>
        <v-list-item-action>
          <v-tooltip bottom>
            <template #activator="{ on }">
              <v-btn icon @click="toHome()" v-on="on">
                <v-icon>mdi-home</v-icon>
              </v-btn>
            </template>
            <span>Kembali ke Beranda</span>
          </v-tooltip>
        </v-list-item-action>
      </v-list-item>
      <v-list nav dense>
        <div v-for="(menu, i) in menus" :key="i">
          <MenuSingle
            v-if="menu.show"
            :text="menu.text"
            :icon="menu.icon"
            :route="menu.route"
            :prefix-route-akses="menu.prefixRouteAkses"
          />
        </div>
        <div>
          <MenuGroup
            v-if="dosen"
            text="Rekap Nilai"
            icon="mdi-checkbox-multiple-marked-outline"
            :submenu="[
              { text: 'Tugas', route: '/dosen/kuliah/rekap-nilai/tugas' },
              { text: 'UTS', route: '/dosen/kuliah/rekap-nilai/uts' },
              { text: 'UAS', route: '/dosen/kuliah/rekap-nilai/uas' },
            ]"
          />
        </div>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>
<script>
import MenuSingle from '@/components/menu/single.vue'
import Snackbar from '@/components/utils/snackbar.vue'
import MenuGroup from '@/components/menu/group.vue'
import { mapGetters, mapState } from 'vuex'
export default {
  components: {
    MenuSingle,
    MenuGroup,
    Snackbar,
  },
  data() {
    return {
      drawer: null,
      title: 'Ruang Kuliah',
      menus: [
        {
          text: 'Kuliah Online',
          icon: 'mdi-school-outline',
          route: '/kuliah/detail',
          show: true,
          prefixRouteAkses: true,
        },
        {
          text: 'UTS Online',
          icon: 'mdi-asterisk',
          route: '/uts',
          show: true,
          prefixRouteAkses: true,
        },
        {
          text: 'Materi',
          icon: 'mdi-book-open-variant',
          route: '/kuliah/materi',
          show: true,
          prefixRouteAkses: true,
        },
        {
          text: 'Video',
          icon: 'mdi-play-box-outline',
          route: '/kuliah/video',
          show: true,
          prefixRouteAkses: true,
        },
        {
          text: 'Tugas',
          icon: 'mdi-pencil-box-outline',
          route: '/kuliah/tugas',
          show: true,
          prefixRouteAkses: true,
        },
        {
          text: 'Pengumuman',
          icon: 'mdi-information-outline',
          route: '/kuliah/pengumuman',
          show: true,
          prefixRouteAkses: true,
        },
      ],
    }
  },
  computed: {
    ...mapGetters(['dosen']),
    ...mapState(['auth']),
  },
  methods: {
    toHome() {
      this.$router.push('/' + this.auth.hakAktif + '/beranda')
    },
  },
}
</script>
<style scoped>
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
