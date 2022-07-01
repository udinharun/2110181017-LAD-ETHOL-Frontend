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
          route: '/admin/beranda',
          icon: 'mdi-home-outline',
        },
        {
          text: 'Data Master',
          icon: 'mdi-database',
          submenu: [
            {
              text: 'MIS',
              route: '/admin/master/mis',
            },
            {
              text: 'Server Conference',
              route: '/admin/master/server-conference',
            },
            {
              text: 'Room Meeting',
              route: '/admin/master/room-meeting',
            },
          ],
        },
        {
          text: 'Jadwal Kuliah',
          icon: 'mdi-format-list-bulleted',
          route: '/admin/jadwal-kuliah',
        },
        {
          text: 'Jadwal Ujian',
          icon: 'mdi-calendar-clock',
          submenu: [
            {
              text: 'UTS',
              route: '/admin/ujian/uts',
            },
            {
              text: 'UAS',
              route: '/admin/ujian/uas',
            },
          ],
        },
        {
          text: 'Rekap Presensi',
          route: '/admin/rekap-presensi',
          icon: 'mdi-calendar-text',
        },
        {
          text: 'Pengaturan',
          icon: 'mdi-wrench',
          submenu: [
            {
              text: 'Tanggal Libur',
              route: '/admin/pengaturan/tanggal-libur',
            },
          ],
        },
        {
          text: 'Bantuan',
          icon: 'mdi-help',
          submenu: [
            {
              text: 'Generate Token',
              route: '/admin/bantuan/generate-token',
            },
          ],
        },
      ],
    }
  },
}
</script>
