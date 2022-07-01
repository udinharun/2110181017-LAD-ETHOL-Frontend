<template>
  <v-snackbar v-model="snackbar.tampil" :color="snackbar.warna" left bottom>
    {{ snackbar.pesan }}
  </v-snackbar>
</template>
<script>
export default {
  computed: {
    snackbar() {
      return this.$store.state.snackbar
    },
  },
}
</script>
