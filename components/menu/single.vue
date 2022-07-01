<template>
  <v-list-item
    :to="prefixRouteAkses == true ? '/' + auth.hakAktif + route : route"
    color="primary"
  >
    <v-list-item-action>
      <v-icon size="24">{{ icon }}</v-icon>
    </v-list-item-action>
    <v-list-item-content>
      <v-list-item-title class="subtitle-2 font-weight-regular" v-text="text" />
    </v-list-item-content>
  </v-list-item>
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: {
    text: {
      type: String,
      default: 'Menu',
    },
    icon: {
      type: String,
      default: 'mdi-home-outline',
    },
    route: {
      type: String,
      default: '/',
    },
    prefixRouteAkses: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState(['auth']),
  },
}
</script>
