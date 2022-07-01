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
          text: 'UTS Online',
          route: '/mahasiswa/uts',
          icon: 'mdi-asterisk',
        },
        {
          text: 'Statistic Dashboard',
          route: '/mahasiswa/statistic',
          icon: 'mdi-home-outline',
        },
        {
          text: 'Beranda',
          route: '/mahasiswa/beranda',
          icon: 'mdi-home-outline',
        },
        {
          text: 'Matakuliah',
          route: '/mahasiswa/matakuliah',
          icon: 'mdi-book-outline',
        },
        {
          text: 'Jadwal Online',
          route: '/mahasiswa/jadwal-online',
          icon: 'mdi-calendar-outline',
        },
        {
          text: 'Tugas Online',
          route: '/mahasiswa/tugas-online',
          icon: 'mdi-pencil-box-outline',
        },
      ],
    }
  },
}
</script>
