<template>
  <v-app>
    <Snackbar />
    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
import Snackbar from '~/components/utils/snackbar.vue'
export default {
  components: {
    Snackbar,
  },
}
</script>
