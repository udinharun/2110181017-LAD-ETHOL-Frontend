<template>
  <v-dialog v-model="visibility" width="400">
    <v-card>
      <v-card-title> Konfirmasi {{ judul }} </v-card-title>
      <v-card-text> Apakah anda yakin ingin {{ pesan }} ? </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer />
        <v-btn
          class="text-none error"
          :loading="loading"
          @click="$emit('aksi')"
        >
          Ya
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    judul: {
      type: String,
      required: true,
    },
    pesan: {
      type: String,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    dialog: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      visibility: false,
    }
  },
  watch: {
    dialog(v) {
      this.visibility = v
    },
    visibility(v) {
      if (!v) {
        this.$emit('close')
      }
    },
  },
}
</script>
