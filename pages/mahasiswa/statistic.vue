<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <h3 class="ml-2 title">Dashboard Mahasiswa</h3>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="4" sm="12">
        <v-card class="px-5 py-7 d-flex">
          <v-avatar size="50">
            <img src="/img/logo_activity.png" />
          </v-avatar>
          <div>
            <v-card-text class="py-0">
              <span
                ><b class="orange--text text--lighten-1">{{
                  activity
                }}</b></span
              >
            </v-card-text>
            <v-card-title class="py-0 subtitle-1">
              <span>Activity</span>
            </v-card-title>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" md="4" sm="12">
        <v-card class="px-5 py-7 d-flex">
          <v-avatar size="50">
            <img src="/img/logo_assignment.png" />
          </v-avatar>
          <div>
            <v-card-text class="py-0">
              <span
                ><b>{{ submit }}</b> ({{ (submit / total) * 100 }}%)</span
              >
            </v-card-text>
            <v-card-title class="py-0 subtitle-1">
              <span>Submitted Assignment</span>
            </v-card-title>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" md="4" sm="12">
        <v-card class="px-5 py-7 d-flex">
          <v-avatar size="50">
            <img src="/img/logo_score.png" />
          </v-avatar>
          <div>
            <v-card-text class="py-0">
              <span
                ><b>{{ score }}</b></span
              >
            </v-card-text>
            <v-card-title class="py-0 subtitle-1">
              <span>Overall Score</span>
            </v-card-title>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <h3 class="ml-2 title">Grafik Mahasiswa</h3>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="12" md="12">
        <v-card style="height: 550px">
          <v-card-actions class="float-right ma-2">
            <v-menu 
              v-model="showModal"
              :close-on-content-click="false"
              offset-x
              left
              transition="slide-x-transition"
            >
              <template v-slot:activator="{ on: menu, attrs }">
                <v-tooltip left>
                  <template v-slot:activator="{ on: tooltip }">
                    <v-btn
                      color="#0b668b"
                      class="text-right"
                      icon
                      v-bind="attrs"
                      v-on="{ ...menu, ...tooltip }"
                    >
                      <v-icon size="20">mdi-pencil-outline</v-icon>
                    </v-btn>
                  </template>                  
                  <span>Edit Chart</span>
                </v-tooltip>
              </template>

              <template>
                <v-card style="width: 250px;">                
                  <v-treeview
                    hoverable
                    activatable
                    :items="menu"
                    color="rgb(11, 102, 139)"
                    open-on-click
                    transition
                    @update:active="updateChart"
                  ></v-treeview>
                </v-card>
              </template>
            </v-menu>
          </v-card-actions>
          <div style="max-height: 500px"  class="pa-5 ma-2">
            <canvas id="myChart" height="420"></canvas>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import Chart from 'chart.js'
import chartTemplate from '@/components/statistic_dashboard/chartjsData'

export default {
  middleware: ['auth', 'mahasiswa'],
  data() {
    return {
      chartTemplate,
      activity: null,
      total: null,
      submit: null,
      score: null,
      showModal: false,
      chart: null,
      canvas: null,
      menu: [
        {
          id: 'bar',
          name: 'Bar :',
          children: [
            { id: 'personal-bar', name: 'Personal Score' },
            { id: 'class-bar', name: 'Class Score' },
          ],
        },
        {
          id: 'line',
          name: 'Line :',
          children: [{ id: 'personal-line', name: 'Perconal Score' }],
        },
      ]
    }
  },
  mounted() {
    const id = this.$store.state.user.nomor
    var id_kuliah = 1;
    var jenis_schema = 1;

    // Initialize Chart
    this.chartPersonalScore('bar', id, id_kuliah);

    // ACTIVITY
    this.$axios
      .get('/mahasiswa/overall/activity', {
        params: {
          id,
          id_kuliah,
          jenis_schema,
        },
      })
      .then((res) => {
        if (res.data.activity != null) {
          this.activity = res.data.activity
        } else {
          this.activity = 'null'
        }
      })
      .finally(() => {
        this.loading = false
      })

    // ASSIGNMENT
    this.$axios
      .get('/mahasiswa/submit/assignment', {
        params: {
          id,
          id_kuliah,
        },
      })
      .then((res) => {
        if (res.data.total != null) {
          this.submit = res.data.total
        } else {
          this.submit = 'null'
        }
      })
      .finally(() => {
        this.loading = false
      })

    this.$axios
      .get('/mahasiswa/total/assignment', {
        params: {
          id,
          id_kuliah,
        },
      })
      .then((res) => {
        if (res.data.total != null) {
          this.total = res.data.total
        } else {
          this.total = 'null'
        }
      })
      .finally(() => {
        this.loading = false
      })

    // SCORE
    this.$axios
      .get('/mahasiswa/overall/score', {
        params: {
          id,
          id_kuliah,
        },
      })
      .then((res) => {
        if (res.data.score != null) {
          this.score = res.data.score
        } else {
          this.score = 'null'
        }
      })
      .finally(() => {
        this.loading = false
      })
  },
  methods: {
    initChart(type) {
      if (this.chart != null) {
        this.chart.destroy();
      }
      
      this.canvas = document.getElementById('myChart').getContext('2d');
      if (type == 'bar')
        this.chart = new Chart(this.canvas, chartTemplate.barChart);
      else
        this.chart = new Chart(this.canvas, chartTemplate.lineChart);
      
      this.chart.update();
    },
    updateChart(chartId) {
      var id = this.$store.state.user.nomor;
      var id_kuliah = 1;
      var strId = chartId[0].split("-");
      var data = strId[0];
      var type = strId[1];
      
      if (data == "personal") {
        this.chartPersonalScore(type, id, id_kuliah);
      } else if (data == "class") {
        this.chartClassScore(type, id, id_kuliah);
      }
    },
    chartClassScore(type, id, id_kuliah) {
      this.$axios
        .get('/mahasiswa/chart/data/score/class', {
          params: {
            id,
            id_kuliah,
          },
        })
        .then((res) => {
          var labels;
          var data;

          if (res.data != null) {
            labels = ['Your Score', 'Highest Score', 'Lowest Score', 'Avg Score']
            data = [res.data[0].nilai, res.data[0].nilaiTertinggi, res.data[0].nilaiTerendah, res.data[0].nilaiRatarata]
          } else {
            data = 'null';
          }

          chartTemplate.barChart.data.labels = labels;
          chartTemplate.barChart.data.datasets[0].data = data;
          chartTemplate.barChart.options.scales.yAxes[0].ticks.max = 100;   
          
          this.initChart(type);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    chartPersonalScore(type, id, id_kuliah) {
      this.$axios
        .get('/mahasiswa/chart/data/score/personal', {
          params: {
            id,
            id_kuliah,
          },
        })
        .then((res) => {
          var labels;
          var data;

          if (res.data.data != null) {
            labels = res.data.data.map(function (e) {
              return 'Week ' + e.week;
            });
            data = res.data.data.map(function (e) {
              return e.score;
            });
          } else {
            data = 'null';
          }

          if (type == 'bar') {
            chartTemplate.barChart.data.labels = labels;
            chartTemplate.barChart.data.datasets[0].data = data;
            chartTemplate.barChart.options.scales.yAxes[0].ticks.max = 100;
          } else {
            chartTemplate.lineChart.data.labels = labels;
            chartTemplate.lineChart.data.datasets[0].data = data;   
          }

          this.initChart(type);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
}
</script>
