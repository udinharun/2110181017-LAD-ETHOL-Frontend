<template>
  <v-row>
    <v-dialog
      v-model="show"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar
          dark
          color="#0b668b"
        >
          <v-btn
            icon
            dark
            @click="show = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Student Profile</v-toolbar-title>
        </v-toolbar>
        <v-card-text class="pa-5">
          <div class="header-content">
            <v-avatar size="100" class="user-avatar mr-5">
              <img src="/user.png" />
            </v-avatar>
            <v-simple-table class="user-info">
              <template>
                <tr>
                  <th class="text-left">Nama</th>
                  <td class="pr-4 pl-4 text-center">:</td>
                  <td class="text-left">{{ dataMahasiswa.name }}</td>
                  
                </tr>
                <tr>
                  <th class="text-left">NRP</th>
                  <td class="pr-4 pl-4 text-center">:</td>
                  <td class="text-left">{{ dataMahasiswa.nrp }}</td>
                </tr>
                <tr>
                  <th class="text-left">Kelas</th>
                  <td class="pr-4 pl-4 text-center">:</td>
                  <td class="text-left">{{ dataMahasiswa.class }}</td>
                </tr>
              </template>
            </v-simple-table>
          </div>
          <v-card style="margin: 1rem 0 2rem 0;">
            <div class="absent-content">
              <v-card-title>
                Tabel Absen
              </v-card-title>
              <div class="px-5">
                <v-col class="user-activity">
                  <v-simple-table fixed-header>
                    <template>
                      <tr>
                        <th class="text-left"><h3>Absent</h3></th>
                        <td class="pr-4 pl-4 text-center"><h3>:</h3></td>
                        <td class="text-left">
                          <h3
                            :class="{'green--text': dataMahasiswa.nilaiAbsen === 'High', 
                                    'orange--text': dataMahasiswa.nilaiAbsen === 'Medium',
                                    'red--text': dataMahasiswa.nilaiAbsen === 'Low',}"
                          >
                            {{ dataMahasiswa.nilaiAbsen }}
                          </h3>
                        </td>
                      </tr>
                    </template>
                  </v-simple-table>
                </v-col>
              </div>
              <v-simple-table
                class="pb-4 px-5"
                fixed-header
                height="300px"
                style="max-height: 320px; overflow-y: auto;"
              >
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Minggu</th>
                      <th>Dibuka</th>
                      <th>Absen</th>
                      <th class="text-center" style="width: 250px">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(item, index) in dataMahasiswa.absen"
                      :key="item.name"
                    >
                      <td>{{ index + 1 }}</td>
                      <td>{{ item.minggu }}</td>
                      <td>{{ item.dibuka }}</td>
                      <td>{{ item.absen == '' ? '-' : item.absen }}</td>
                      <td
                        class="text-center font-weight-bold"
                        :class="{'red--text': item.status === 'TERLAMBAT', 
                                'red white--text': item.status === 'TIDAK HADIR'}"
                        v-html="item.status"
                      ></td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </div>
          </v-card>
          <v-card>
            <div class="assignment-content">
              <v-card-title>
                Tabel Tugas
              </v-card-title>
              <div class="px-5">
                <v-col class="user-activity">
                  <v-simple-table>
                    <template>
                      <tr>
                        <th class="text-left"><h3>Assignment</h3></th>
                        <td class="pr-4 pl-4 text-center"><h3>:</h3></td>
                        <td class="text-left">
                          <h3
                            :class="{'green--text': dataMahasiswa.nilaiTugas === 'High', 
                                    'orange--text': dataMahasiswa.nilaiTugas === 'Medium',
                                    'red--text': dataMahasiswa.nilaiTugas === 'Low',}"
                          >
                            {{ dataMahasiswa.nilaiTugas }}
                          </h3>
                        </td>
                      </tr>
                    </template>
                  </v-simple-table>
                </v-col>
              </div>
              <v-simple-table
                class="pb-4 px-5"
                fixed-header
                height="300px"
                style="max-height: 320px; overflow-y: auto;"
              >
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Tugas</th>
                      <th>Minggu</th>
                      <th>Deadline</th>
                      <th>Mengumpulkan</th>
                      <th class="text-center" style="width: 250px">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(item, index) in dataMahasiswa.tugas"
                      :key="item.name"
                    >
                      <td>{{ index + 1 }}</td>
                      <td>{{ item.judul }}</td>
                      <td>{{ item.minggu }}</td>
                      <td>{{ item.tenggat }}</td>
                      <td>{{ item.mengumpulkan == '' ? '-' : item.mengumpulkan }}</td>
                      <td
                        class="text-center font-weight-bold"
                        :class="{'red--text': item.status === 'TERLAMBAT'}"
                        v-html="item.status"
                      ></td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </div>
          </v-card>
          <v-row class="mt-5">
            <v-col md="6" class="d-flex flex-column" style="align-items: center">
              <h2>Diagram Absen</h2>
              <div style="max-height: 400px" class="pa-2 ma-2">
                <canvas id="diagramAbsen" height="250" style="margin: auto; height: auto; width: auto"></canvas>
              </div>
            </v-col>
            <v-col md="6" class="d-flex flex-column" style="align-items: center">
              <h2>Diagram Tugas</h2>
              <div style="max-height: 400px" class="pa-2 ma-2">
                <canvas id="diagramTugas" height="250" style="margin: auto; height: auto; width: auto"></canvas>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import Chart from 'chart.js'
import pieChartProfile from '@/components/statistic_dashboard/pieChartProfile'

export default {
  props: ['visible', 'dataMahasiswa'],
  data() {
    return {
      chartTemplateAbsen: pieChartProfile.pieChart,
      chartTemplateTugas: pieChartProfile.pieChart2Data,
      dataAbsen: [],
      dataTugas: [],
      chartAbsen: null,
      chartTugas: null,
      canvasAbsen: null,
      canvasTugas: null,
      labelAbsen: ['OK', 'TERLAMBAT', 'TIDAK HADIR'],
      labelTugas: ['OK', 'TERLAMBAT'],
    }
  },
  updated() {
    if (this.show) {
      if (this.chartAbsen != null && this.chartTugas !=null) {
        this.chartAbsen.destroy();
        this.chartTugas.destroy();
      }

      this.canvasAbsen = document.getElementById('diagramAbsen').getContext('2d');
      this.dataAbsen = this.dataMahasiswa.statusAbsen;
      this.chartTemplateAbsen.data.labels = this.labelAbsen;
      this.chartTemplateAbsen.data.datasets[0].data = this.dataAbsen;
      this.chartAbsen = new Chart(this.canvasAbsen, this.chartTemplateAbsen);

      this.canvasTugas = document.getElementById('diagramTugas').getContext('2d');
      this.dataTugas = this.dataMahasiswa.statusTugas;
      this.chartTemplateTugas.data.labels = this.labelTugas;
      this.chartTemplateTugas.data.datasets[0].data = this.dataTugas;
      this.chartTugas = new Chart(this.canvasTugas, this.chartTemplateTugas);
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
  methods: {
    updateTabelAbsen(event) {
      console.log(event)
    }
  }
}
</script>
<style>
  .header-content {
    padding: 1rem 1.5rem 1.5rem 1.5rem;
    display: flex;
  }
  .user-info{
    width: 300px;
  }
  .user-info table{
    height: 100px;
  }
  .user-activity {
    display: flex;
    height: 80px;
    width: 100%;
    align-items: center;
  }
</style>