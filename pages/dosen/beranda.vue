<template>
  <v-container>Halaman Dosen</v-container>
</template>
<script>
export default {
  middleware: ['auth', 'dosen'],
}
</script>
