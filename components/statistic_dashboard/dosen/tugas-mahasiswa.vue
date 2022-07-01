<template>
    <v-row justify="center">
        <v-dialog
            v-model="show"
            max-width="550px"
        >
            <v-card>
                <v-card-title>
                    <span class="text-h5">Student Submitted Assignment</span>
                </v-card-title>
                <v-card-text>
                    <v-simple-table fixed-header>
                        <template>
                            <thead>
                                <tr>
                                    <th class="text-left">
                                        Upload File
                                    </th>
                                    <th class="text-left">
                                        Assignment Title
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    class="text-left"
                                    v-for="(upload, index) in total"
                                    :key="index"
                                >
                                    <td><a href="#">{{ item.uploadName }}</a></td>
                                    <td>{{ item.assignmentTitle }}</td>
                                </tr>
                            </tbody>
                        </template>
                </v-simple-table>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn 
                        color="blue darken-1"
                        text
                        @click="show = false"
                    >
                        Close
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
export default {
    data() {
        return {
            type: 'bar',
            data: 'score',
            item: {
                uploadName: 'Tugas.pdf',
                assignmentTitle: 'Tugas minggu x'
            }
        }
    },
    props: ['visible', 'total'],
    computed: {
        show: {
            get() {
                return this.visible
            },
            set(value) {
                if (!value) {
                    this.$emit('close-modal')
                }
            }
        }
    }
}
</script>