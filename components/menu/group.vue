<template>
  <v-list-group :prepend-icon="icon">
    <template #activator>
      <v-list-item-title class="subtitle-2 font-weight-regular" v-text="text" />
    </template>
    <v-list-item-group>
      <v-list-item v-for="item in submenu" :key="item.route" :to="item.route">
        <v-list-item-icon />
        <v-list-item-title
          class="subtitle-2 font-weight-regular"
          v-text="item.text"
        />
      </v-list-item>
    </v-list-item-group>
  </v-list-group>
</template>
<script>
export default {
  props: {
    icon: {
      type: String,
      default: 'mdi-home-outline',
    },
    text: {
      type: String,
      default: 'Menu',
    },
    submenu: {
      type: Array,
      default: () => {
        return [
          {
            text: 'Sub Menu',
            route: '/',
          },
        ]
      },
    },
  },
}
</script>
