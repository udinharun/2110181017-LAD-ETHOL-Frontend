<template>
  <v-row justify="center">
    <v-dialog v-model="show" max-width="400px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Custom Chart</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-radio-group v-model="type" row>
              <v-radio
                label="Bar"
                value="bar"
                @click="$emit('chart-type', 'bar')"
              ></v-radio>
              <v-radio
                label="Line"
                value="line"
                @click="$emit('chart-type', 'line')"
              ></v-radio>
              <v-radio
                v-if="this.$store.state.auth.hakAktif == 'mahasiswa'"
                label="Pie"
                value="pie"
                @click="$emit('chart-type', 'pie')"
              ></v-radio>
              <v-radio
                v-if="this.$store.state.auth.hakAktif == 'dosen'"
                label="Radar"
                value="pie"
                @click="$emit('chart-type', 'pie')"
              ></v-radio>
            </v-radio-group>
            <hr style="border-top: 2px darkgray" />
            <v-radio-group v-model="data" row>
              <v-radio
                label="Score"
                value="score"
                @click="$emit('chart-data', 'score')"
              ></v-radio>
              <v-radio
                label="Assignment"
                value="assignment"
                @click="$emit('chart-data', 'assignment')"
              ></v-radio>
              <v-radio
                label="Activity"
                value="activity"
                @click="$emit('chart-data', 'activity')"
              ></v-radio>
            </v-radio-group>
          </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="show = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: ['visible'],
  data() {
    return {
      type: 'bar',
      data: 'score',
    }
  },
  computed: {
    show: {
      get() {
        return this.visible
      },
      set(value) {
        if (!value) {
          this.$emit('close-modal')
        }
      },
    },
  },
}
</script>

<style>
.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000000da;
}
.modal {
  text-align: center;
  background-color: white;
  height: 250px;
  width: 400px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
}

.close {
  margin: 5px;
  cursor: pointer;
  display: flex;
  justify-content: flex-end;
}
.close-icon {
  font-size: 20px;
  color: rgb(100, 100, 100);
}
.close-icon:hover {
  color: #000000;
  transition: ease 0.3s;
}

.chart-type-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1rem;
}
.chart-data,
.chart-type {
  display: flex;
  margin: 20px 10px;
}
.chart-type div,
.chart-data div {
  margin-left: 10px;
  margin-right: 10px;
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.15s ease-in-out;
}
</style>
