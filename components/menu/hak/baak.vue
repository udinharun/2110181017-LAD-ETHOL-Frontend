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
          route: '/baak/beranda',
          icon: 'mdi-home-outline',
        },
        {
          text: 'Jadwal Kuliah',
          icon: 'mdi-format-list-bulleted',
          route: '/baak/jadwal-kuliah',
        },
        {
          text: 'Jadwal Ujian',
          icon: 'mdi-calendar-clock',
          submenu: [
            {
              text: 'UTS',
              route: '/baak/ujian/uts',
            },
            {
              text: 'UAS',
              route: '/baak/ujian/uas',
            },
          ],
        },
        {
          text: 'Rekap Presensi',
          route: '/baak/rekap-presensi',
          icon: 'mdi-calendar-text',
        },
        {
          text: 'Rekap Tugas',
          route: '/baak/rekap-tugas',
          icon: 'mdi-clipboard-text',
        },
      ],
    }
  },
}
</script>
