<template>
    <v-snackbar
            v-model="alert.show"
            color="accent"
            multi-line
            center
            top
            :timeout="1000 * 60 * 60"
    >
        <v-row>
            <v-col cols="12">
                {{ alert.message }}
            </v-col>
            <v-col class="d-flex justify-end" cols="12">
                <v-btn
                        color="secondary"
                        dark
                        text
                        @click="submit()"
                >
                    <small>Подтвердить</small>
                </v-btn>
                <v-btn
                        dark
                        text
                        @click="closeAlert()"
                ><small>Отменить</small>
                </v-btn>
            </v-col>
        </v-row>
    </v-snackbar>
</template>

<script>
    export default {
        name: "ConfirmAlert",
        data() {
            return {
                alert: {
                    show: false,
                    message: ''
                },
                form: {}
            }
        },
        mounted() {
            this.$root.$on('confirm', (data, message) => {
                this.form = data;
                this.alert.message = message;
                this.alert.show = true;
            });
            this.$root.$on('close-confirm', () => {
                this.closeAlert();
            })
        },
        methods: {
            submit() {
                this.$root.$emit('confirmed', '#3f51b5');
                this.alert.show = false;
                this.$httpService.post('api/v2/auth/user/decline', this.$fdService.fill(this.form))
                .then(response => {
                    this.$root.$emit('successfully-declined');
                    this.$store.commit('alert', {status: true, message: response.data.success, type: 'success'});
                    this.$root.$emit('reload-users');
                })
                .finally(() => {
                    this.$root.$emit('confirmed', null);
                })
            },
            closeAlert() {
                this.alert = {
                    show: false,
                    message: ''
                };
                this.form = {};
            }
        }
    }
</script>

<style scoped>

</style>
