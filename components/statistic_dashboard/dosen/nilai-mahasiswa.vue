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
        <v-layout 
            column
            style="height: 350px"
        >
            <v-flex style="overflow: auto">
                <v-data-table
                    :headers="headers"
                    :items="students"
                    :search="search"
                    hide-default-footer
                    disable-pagination
                >
                </v-data-table>
            </v-flex>
        </v-layout>
    </v-card>
</template>

<script>
export default {
    data() {
        return {
            search: '',
            headers: [
                { text: 'Name', align: 'start', value: 'name' },
                { text: 'Score', align: 'right', value: 'score'},
            ],
            students: [
                {
                    name: 'Agus', 
                    score: 8.2,
                },
                {
                    name: 'Budi',
                    score: 6.0,
                },
                {
                    name: 'Carla',
                    score: 7.8,
                },
                {
                    name: 'Frans',
                    score: 9.0,
                },
                {
                    name: 'Galang',
                    score: 8.0,
                },
                {
                    name: 'Angga',
                    score: 8.4,
                },
                {
                    name: 'Tude',
                    score: 8.8,
                },
                {
                    name: 'Agus', 
                    score: 8.2,
                },
                {
                    name: 'Budi',
                    score: 6.0,
                },
                {
                    name: 'Carla',
                    score: 7.8,
                },
                {
                    name: 'Frans',
                    score: 9.0,
                },
                {
                    name: 'Galang',
                    score: 8.0,
                },
                {
                    name: 'Angga',
                    score: 8.4,
                },
                {
                    name: 'Tude',
                    score: 8.8,
                },
            ]
        }
    },
    methods: {
        getColor(activity) {
            if (activity == 'High') return 'green'
            else if (activity == 'Medium') return 'orange'
            else return 'red'
        }
    }
}
</script>