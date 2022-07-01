<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <h3 class="ml-2 title">Dashboard Dosen</h3>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="4" sm="12">
        <v-card class="px-5 py-7 d-flex">
          <v-avatar size="50">
            <img src="/img/logo_underperform.png" />
          </v-avatar>
          <div>
            <v-card-text class="py-0">
              <span>
                <b class="pr-1 text-h6">{{ activity }}</b> 
                <span class="text-subtitle-1">
                  ({{
                    parseFloat((activity / totalStudent) * 100).toFixed(2)
                  }}%)
                </span>
              </span>
            </v-card-text>
            <v-card-title class="py-0 text-body-2">
              <span>Underperforming Student</span>
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
              <span>
                <b class="pr-1 text-h6">{{ submit }}</b> 
                <span class="text-subtitle-1">
                  ({{ printPercentSubmitAssignment() }})
                </span>
              </span>
            </v-card-text>
            <v-card-title class="py-0 text-body-2">
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
              <span>
                <b class="text-h6">{{ parseFloat(score).toFixed(2) }}</b>
              </span>
            </v-card-text>
            <v-card-title class="py-0 text-body-2">
              <span>Overall Score</span>
            </v-card-title>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <h3 class="ml-2 title">Tabel Mahasiswa</h3>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="12" md="12">
        <StudentTable 
          :students="students"
          :totalAssignment="totalAssignment"
        />
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
                <v-card style="width: 150px;">                
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
          <div style="max-height: 500px" class="pa-5 ma-2">
            <canvas id="myChart" height="420" style="margin: auto; height: auto; width: auto"></canvas>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Chart from 'chart.js'
import StudentTable from '@/components/statistic_dashboard/dosen/tabel-mahasiswa.vue'
import chartTemplate from '@/components/statistic_dashboard/chartjsData'

export default {
  components: {
    StudentTable,
  },
  middleware: ['auth', 'dosen'],
  data() {
    return {
      chartTemplate,
      score: null,
      activity: null,
      totalStudent: null,
	    students: [],
      totalAssignment: null,
      submit: null,
      showModal: false,
      chart: null,
      canvas: null,
      menu: [
        {
          id: 'bar',
          name: 'Bar :',
          children: [
            { id: 'bar-score', name: 'Score' },
            { id: 'bar-activity', name: 'Activity' },
          ],
        },
        {
          id: 'line',
          name: 'Line :',
          children: [
            { id: 'line-score', name: 'Score' },
          ],
        },
        {
          id: 'pie',
          name: 'Pie :',
          children: [
            { id: 'pie-activity', name: 'Activity' },
          ],
        },
      ]
    }
  },
  mounted() {
    const id = this.$store.state.user.nomor;
    var id_kuliah = 1;
    var jenis_schema = 1;
   
    // Initialize Chart
    this.chartScore('bar', id, id_kuliah);

    // ACTIVITY
    this.$axios
      .get('/dosen/underperform/student', {
        params: {
          id,
          id_kuliah,
          jenis_schema,
        },
      })
      .then((res) => {
        if (res.data.activity != null) {
          this.activity = res.data.activity;
        } else {
          this.activity = 'null';
        }
      })
      .finally(() => {
        this.loading = false;
      });

    this.$axios
      .get('/dosen/total/student', {
        params: {
          id,
          id_kuliah,
        },
      })
      .then((res) => {
        if (res.data.totalStudent != null) {
          this.totalStudent = res.data.totalStudent;
		      this.students = res.data.students;
        } else {
          this.totalStudent = 'null';
        }
      })
      .finally(() => {
        this.loading = false;
      });

    // ASSIGNMENT        
    this.$axios
      .get('/dosen/submit/assignment', {
        params: {
          id,
          id_kuliah,
        },
      })
      .then((res) => {
        if (res.data.submit != null) {
          this.submit = res.data.submit;
        } else {
          this.submit = 'null';
        }
      })
      .finally(() => {
        this.loading = false;
      });

    this.$axios
      .get('/dosen/total/assignment', {
        params: {
          id,
          id_kuliah,
        },
      })
      .then((res) => {
        if (res.data.totalAssignment != null) {
          this.totalAssignment = res.data.totalAssignment;
        } else {
          this.totalAssignment = 'null';
        }
      })
      .finally(() => {
        this.loading = false;
      });

    // SCORE
    this.$axios
      .get('/dosen/overall/score', {
        params: {
          id,
          id_kuliah,
        },
      })
      .then((res) => {
        if (res.data.score != null) {
          this.score = res.data.score;
        } else {
          this.score = 'null';
        }
      })
      .finally(() => {
        this.loading = false;
      });
  },
  methods: {
    updateChart(id) {
      var id_dosen = this.$store.state.user.nomor;
      var id_kuliah = 1;
      var jenis_schema = 1;
      var type = '';
      var strId = id[0].split("-");
      var data = strId[1];
      type = strId[0];
      
      if (data == "score") {
        this.chartScore(type, id_dosen, id_kuliah);
      } else if (data == "activity") {
        this.chartActivity(type, id_dosen, id_kuliah, jenis_schema);
      }
    },
    chartScore(type, id, id_kuliah) {
      this.$axios
        .get('/dosen/chart/data/score', {
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
          } else if (type == 'line') {
            chartTemplate.lineChart.data.labels = labels;
            chartTemplate.lineChart.data.datasets[0].data = data;            
          } else {
            chartTemplate.pieChart.data.labels = [];
            chartTemplate.pieChart.data.datasets[0].data = [];             
          }
          this.initChart(type);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    chartActivity(type, id, id_kuliah, jenis_schema) {
      this.$axios
        .get('/dosen/chart/data/activity', {
          params: {
            id,
            id_kuliah,
            jenis_schema
          },
        })
        .then((res) => {
          var labels;
          var data;

          if (res.data.activity != null) {
            labels = res.data.activity.map(function (e) {
              return e.label;
            });
            data = res.data.activity.map(function (e) {
              return e.total;
            });
          } else {
            data = 'null';
          }

          if (type == 'bar') {
            chartTemplate.barChart.data.labels = labels;
            chartTemplate.barChart.data.datasets[0].data = data;
            chartTemplate.barChart.options.scales.yAxes[0].ticks.max = this.totalStudent;
          } else if (type == 'pie') {
            chartTemplate.pieChart.data.labels = labels;
            chartTemplate.pieChart.data.datasets[0].data = data;
          } else {
            chartTemplate.pieChart.data.labels = [];
            chartTemplate.pieChart.data.datasets[0].data = [];             
          }
          this.initChart(type);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    printPercentSubmitAssignment() { 
      var text = parseFloat(this.submit / (this.totalAssignment * this.totalStudent) * 100).toFixed(2);
      return text + '%';
    },
    initChart(type) {
      if (this.chart != null) {
        this.chart.destroy();
      }
      
      this.canvas = document.getElementById('myChart').getContext('2d');
      if (type == 'bar')
        this.chart = new Chart(this.canvas, chartTemplate.barChart);
      else if (type == 'line')
        this.chart = new Chart(this.canvas, chartTemplate.lineChart);
      else
        this.chart = new Chart(this.canvas, chartTemplate.pieChart);
      
      this.chart.update();
    },
  },
}
</script>

<style>
  /* Stop unselect action from edit chart menu */
  button.v-treeview-node__toggle + button.v-treeview-node__checkbox {
    display: none !important;
  }
  .v-treeview-node__root.v-treeview-node--active {
    pointer-events: none;
  }
  .v-treeview-node__toggle {
      pointer-events: all;
  }
</style>
