<template>
  <v-container>Halaman Mahasiswa</v-container>
</template>
<script>
export default {
  middleware: ['auth', 'mahasiswa'],
}
</script>
