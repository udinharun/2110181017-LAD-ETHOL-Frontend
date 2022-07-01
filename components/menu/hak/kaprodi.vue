<template>
  <div>
    <div v-for="(menu, i) in menus" :key="i">
      <MenuGroup
        v-if="Object.prototype.hasOwnProperty.call(menu, 'submenu')"
        :text="menu.text"
        :icon="menu.icon"
        :submenu="menu.submenu"
      />
      <MenuSingle
        v-else
        :text="menu.text"
        :icon="menu.icon"
        :route="menu.route"
      />
    </div>
  </div>
</template>
<script>
import MenuSingle from '@/components/menu/single.vue'
import MenuGroup from '@/components/menu/group.vue'
export default {
  components: {
    MenuSingle,
    MenuGroup,
  },
  data() {
    return {
      menus: [
        {
          text: 'Beranda',
          route: '/kaprodi/beranda',
          icon: 'mdi-home-outline',
        },
        {
          text: 'Rekap',
          icon: 'mdi-calendar-clock',
          submenu: [
            {
              text: 'Materi',
              route: '/kaprodi/rekap/materi',
            },
            {
              text: 'Video',
              route: '/kaprodi/rekap/video',
            },
            {
              text: 'Tugas',
              route: '/kaprodi/rekap/tugas',
            },
            {
              text: 'Presensi',
              route: '/kaprodi/rekap/presensi',
            },
          ],
        },
      ],
    }
  },
}
</script>
