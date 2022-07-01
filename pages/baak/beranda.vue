<template>
  <v-container>
    <v-row>
      <v-col>Baak</v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  middleware: ['auth', 'baak'],
}
</script>
