/* eslint-disable prettier/prettier */
/* eslint-disable object-curly-newline */
<template>
  <v-card class="px-5 pb-5">
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-layout column style="height: 350px">
      <v-flex style="overflow: auto; height: 300px">
        <v-data-table
          :headers="headers"
          :items="students"
          :search="search"
          :custom-sort="sortAssignment"
          hide-default-footer
          disable-pagination
        >
          <template v-slot:[`item.score`]="{ item }">
            {{ parseFloat(item.score).toFixed(2) }}
          </template>
          <template v-slot:[`item.absent`]="{ item }">
            <v-chip :color="getColor(item.absent)" dark>
              {{ item.absent }}
            </v-chip>
          </template>
          <template v-slot:[`item.assignment`]="{ item }">
            <v-chip :color="getColor(item.assignment)" dark>
              {{ item.assignment }}
            </v-chip>
          </template>
          <template v-slot:[`item.activity`]="{ item }">
            <v-chip :color="getColor(item.activity)" dark>
              {{ item.activity }}
            </v-chip>
          </template>
          <template v-slot:[`item.submit`]="{ item }">
            <p v-html="printSubmitAssignmentFormat(item)"></p>
          </template>
          <template v-slot:[`item.action`]="{ item }">
            <v-icon small @click.stop="detailProfile(item)"> mdi-eye </v-icon>
          </template>
        </v-data-table>
      </v-flex>
      <!-- Detail Profile modal -->
      <StudentDetailProfile
        :visible="showModalProfile"
        :dataMahasiswa="editedItem"
        @close-modal="close()"
      />
    </v-layout>
  </v-card>
</template>

<script>
import StudentDetailProfile from '@/components/statistic_dashboard/dosen/profil-mahasiswa.vue'
import StudentDetailAssignment from '@/components/statistic_dashboard/dosen/tugas-mahasiswa.vue'

export default {
  components: {
    StudentDetailProfile,
    StudentDetailAssignment,
  },
  props: ['students', 'totalAssignment'],
  data() {
    return {
      showModalProfile: false,
      search: '',
      headers: [
        { text: 'Name', align: 'left', value: 'name', },
        { text: 'Score', align: 'right', value: 'score', },
        { text: 'Absent', align: 'center', value: 'absent', },
        { text: 'Assignment', align: 'center', value: 'assignment', },
        { text: 'Activity', align: 'center', value: 'activity', },
        { text: 'Submit Assignment', align: 'right', value: 'submit', },
        { text: 'Action', align: 'center', value: 'action', sortable: false, },
      ],    
      editedItem: {
        id: '',
        name: '',
        nrp: '',
        class: '',
        nilaiAbsen: '',
        nilaiTugas: '',
        absen: [],
        tugas: [],
        statusAbsen: [],
        statusTugas: [],
      },
      defaultItem: {
        id: '',
        name: '',
        nrp: '',
        class: '',
        absen: [],
        tugas: [],
        statusAbsen: [],
        statusTugas: [],
      },
    }
  },
  methods: {
    getColor(activity) {
      if (activity == 'High') return 'green'
      else if (activity == 'Medium') return 'orange'
      else return 'red'
    },
    detailProfile(item) {
      var id = item.id;
      var id_kuliah = 1;
      // TABEL TUGAS
      this.$axios
        .get('/mahasiswa/detail/tugas', {
          params: { id, id_kuliah },
        })
        .then((res) => {
          if (res.data.tugas != null) {
            this.editedItem.tugas = res.data.tugas;
            this.editedItem.statusTugas = res.data.status;
          } else {
            this.editedItem.tugas = [];
            this.editedItem.statusTugas = [];
          }

          // TABEL ABSEN
          this.$axios
            .get('/mahasiswa/detail/absen', {
              params: { id, id_kuliah },
            })
            .then((res) => {
              if (res.data.absen != null) {
                this.editedItem.absen = res.data.absen;
                this.editedItem.statusAbsen = res.data.status;
                this.editedItem.id = item.id;
                this.editedItem.name = item.name;
                this.editedItem.nrp = item.nrp;
                this.editedItem.class = item.class;
                this.editedItem.nilaiAbsen = item.absent;
                this.editedItem.nilaiTugas = item.assignment;
                this.showModalProfile = true;
              } else {
                this.editedItem.absen = [];
                this.editedItem.statusAbsen = [];
              }
            })
            .finally(() => {
              this.loading = false;
            });          
        })
        .finally(() => {
          this.loading = false;
        });
    },
    close() {
      this.showModalProfile = false
      this.showModalAssignment = false
      this.submitAssignment = 0
      this.editedItem = Object.assign({}, this.defaultItem)
    },
    sortAssignment(items, index, isDesc) {
      items.sort((a, b) => {
        if (index[0] == 'submit') {
          // Get percentage string inside brackets
          var aIndex = a[index]/this.totalAssignment*100;
          var bIndex = b[index]/this.totalAssignment*100;

          if (!isDesc[0]) {
            return bIndex - aIndex
          } else {
            return aIndex - bIndex
          }
        } else if (index[0] == 'score'){
          if (!isDesc[0]) {
            return b[index] - a[index]
          } else {
            return a[index] - b[index]
          }
        } else if (index[0] == 'absent' || index[0] == 'assignment' || index[0] == 'activity'){
          var aIndex = 0;
          var bIndex = 0;

          if (a[index] == 'Low'){
            aIndex = 1;
          } else if (a[index] == 'Medium'){
            aIndex = 2;
          } else{
            aIndex = 3;
          }

          if (b[index] == 'Low'){
            bIndex = 1;
          } else if (b[index] == 'Medium'){
            bIndex = 2;
          } else{
            bIndex = 3;
          }

          if (!isDesc[0]) {
            return bIndex - aIndex;
          } else {
            return aIndex - bIndex;
          }          
        } else if (index[0] == 'name'){
          if (!isDesc[0]) {
            return a[index].toLowerCase().localeCompare(b[index].toLowerCase())
          } else {
            return b[index].toLowerCase().localeCompare(a[index].toLowerCase())
          }
        }
      })
      return items
    },
    printSubmitAssignmentFormat(item) {
      var text = item.submit + '/' + this.totalAssignment + 
                 "<div class='submit-assignment-text'>(" + 
                 (item.submit / this.totalAssignment * 100) + 
                 "%)</div>";
      return text;
    }
  },
}
</script>

<style>
.assignment-btn {
  position: relative;
  text-decoration: none;
  color: rgba(0, 0, 0, 0.87) !important;
}
.assignment-btn:hover {
  color: #0b668b !important;
}
.assignment-btn::before {
  content: '';
  position: absolute;
  display: block;
  width: 100%;
  height: 1px;
  bottom: 0;
  left: 0;
  background-color: #0b668b;
  transform: scaleX(0);
  transition: transform 0.3s ease;
}
.assignment-btn:hover::before {
  transform: scaleX(1);
}
.submit-assignment-text {
  width: fit-content;
  margin-left: 8px;
  margin-right: 0;
  text-align: right;
  display: inline-block;
}
</style>
