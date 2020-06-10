<template>
    <v-snackbar
            v-model="show"
            color="success"
            multi-line
            center
            top
            :timeout="1000 * 5 * 2"
    >
        <v-row>
            <v-col class="d-flex justify-center align-center" cols="12">
                <span>Файл готов к скачиванию</span>
                <v-spacer></v-spacer>
                <v-btn
                        color="secondary"
                        dark
                        text
                        :href="link"
                >
                    <small>Скачать</small>
                </v-btn>
            </v-col>
        </v-row>
    </v-snackbar>
</template>

<script>
    export default {
        name: "DownloadFileAlert",
        data() {
            return {
                link: '',
                show: false
            }
        },
        mounted() {
            this.$root.$on('download-file', (link) => {
                this.link = `${process.env.VUE_APP_API_URL}${link}`;
                this.show = true;
            })
        },
        methods: {
            closeAlert() {
                this.show = false;
            }
        }
    }
</script>

<style scoped>

</style>
