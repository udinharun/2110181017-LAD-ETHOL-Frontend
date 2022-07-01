<template>
  <v-container class="container-wrapper" fluid>
    <v-row
      class="fill-height"
      justify="center"
      align="center"
      align-content="center"
    >
      <v-col cols="4" sm="6" md="4" lg="4" xl="3">
        <v-img src="/404.png" />
      </v-col>
      <v-col cols="12" sm="12" md="12" lg="12" xl="12" class="text-center">
        <span class="subtitle-2 hidden-md-and-up">
          Halaman yang anda minta rusak atau tidak tersedia
        </span>
        <span class="title hidden-sm-and-down">
          Halaman yang anda minta rusak atau tidak tersedia
        </span>
      </v-col>
      <v-col cols="12" sm="12" md="12" lg="12" xl="12" class="text-center">
        <v-btn color="primary" class="text-none" to="/">
          Kembali ke Beranda
          <v-icon class="ml-3"> mdi-home-outline </v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  layout: 'empty',
  head() {
    return 'Halaman yang anda minta rusak atau tidak tersedia'
  },
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
.container-wrapper {
  background: #81d4fa;
  width: 100vw;
  height: 100vh;
}
</style>
