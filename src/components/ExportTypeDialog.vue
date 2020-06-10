<template>
    <v-dialog
            scrollable
            v-model="show"
            max-width="800"
    >
        <v-card :loading="confirmed">
            <validation-observer ref="obs" v-slot="{ invalid, passes }">
                <v-card-title>Выберите, какие данные вы хотите выгрузить</v-card-title>
                <v-card-subtitle>Данные будут выгружены в формате .xlsx</v-card-subtitle>
                <v-card-text>
                    <v-form>
                        <validation-provider name="Тип данных" rules="required" v-slot="{ errors }">
                            <v-radio-group
                                    v-model="form.type"
                                    :error-messages="errors">
                                <v-radio
                                        v-for="type in types"
                                        :key="type.text"
                                        :label="type.text"
                                        :value="type.value"
                                ></v-radio>
                            </v-radio-group>
                        </validation-provider>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text color="red darken-1" @click="passes(submit)">Выгрузить</v-btn>
                    <v-btn text @click="closeExportType()">Закрыть</v-btn>
                </v-card-actions>
            </validation-observer>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: "ExportTypeDialog",
        data() {
            return {
                show: false,
                confirmed: false,
                form: {
                    type: null
                },
                types: [
                    {
                        text: 'Данные положительно промодерированных',
                        value: 1
                    },
                    {
                        text: 'Данные отрицательно промодерированных',
                        value: 2
                    },
                    {
                        text: 'Данные со ставками',
                        value: 0
                    },
                    {
                        text: 'Данные всех зарегистрированных пользователей',
                        value: 3
                    }
                ]
            }
        },
        mounted() {
            this.$root.$on('export-type', () => {
                this.show = true;
            })
        },
        methods: {
            closeExportType() {
                this.show = false;
            },
            submit() {
                this.confirmed = true;
                setTimeout(() => {
                    this.link =`/api/v2/auth/export/${this.form.type}`
                    this.$root.$emit('download-file', this.link);
                    this.closeExportType();
                    this.confirmed = false;
                }, 1500);

            }
        }
    }
</script>

<style scoped>

</style>
