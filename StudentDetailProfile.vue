<template>
    <v-row justify="center">
        <v-dialog
            v-model="show"
            max-width="400px"
        >
            <v-card>
                <v-card-title>
                    <span class="text-h5">Student Profile</span>
                </v-card-title>
                <v-card-text>
                    <v-container class="text-center">
                        <v-avatar
                            size="100"
                            class="mb-3"
                        >
                            <img :src="require('~/assets/user.png')">
                        </v-avatar>
                        <v-simple-table style="width: 250px" class="mx-auto">
                            <template>
                                <tr>
                                    <th class="text-left">Nama</th>
                                    <td class="pr-4 text-center">:</td>
                                    <td class="text-left">{{ item.name }}</td>
                                </tr>
                                <tr>
                                    <th class="text-left">NRP</th>
                                    <td class="pr-4 text-center">:</td>
                                    <td class="text-left">{{ item.nrp }}</td>
                                </tr>
                                <tr>
                                    <th class="text-left">Kelas</th>
                                    <td class="pr-4 text-center">:</td>
                                    <td class="text-left">{{ item.class }}</td>
                                </tr>
                                <tr>
                                    <th class="text-left">No. Telp</th>
                                    <td class="pr-4 text-center">:</td>
                                    <td class="text-left">{{ item.phone }}</td>
                                </tr>
                            </template>
                        </v-simple-table>
                    </v-container>
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
        }
    },
    props: ['visible', 'item'],
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