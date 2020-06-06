<template>
    <v-dialog
            scrollable
            v-model="$store.getters.decline.status"
            max-width="800"
    >
        <v-card :loading="confirmed">
            <validation-observer ref="obs" v-slot="{ invalid, passes }">
                <v-card-title>Отказ в модерации</v-card-title>
                <v-card-subtitle>Пожалуйста, выберите причину отказа</v-card-subtitle>
                <v-card-text>
                    <v-form>
                        <validation-provider name="Причина отказа" rules="required" v-slot="{ errors }">
                            <v-radio-group
                                    v-model="form.reason"
                                    :error-messages="errors">
                                <v-radio
                                        v-for="reason in reasons"
                                        :key="reason.label"
                                        :label="`Причина: ${reason.label}`"
                                        :value="reason.value"
                                ></v-radio>
                            </v-radio-group>
                        </validation-provider>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text color="red darken-1" @click="passes(submit)">Отказать</v-btn>
                    <v-btn text @click="closeDecline()">Закрыть</v-btn>
                </v-card-actions>
            </validation-observer>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: "DeclineDialog",
        data() {
            return {
                confirmed: null,
                form: {
                    user_id: null,
                    bet_id: null,
                    reason: null
                },
                reasons: [
                    {
                        label: 'изображение нечеткое',
                        value: 1
                    },
                    {
                        label: 'зарегистрированная информация не совпадает с информацией на чеке',
                        value: 2
                    },
                    {
                        label: 'на загруженном чеке отсутствует необходимая информация',
                        value: 3
                    },
                    {
                        label: 'данный чек уже принял участие в розыгрыше призов',
                        value: 4
                    },
                    {
                        label: 'в чеке должны быть видны дата и время совершения покупки (начало и конец чека)',
                        value: 5
                    },
                    {
                        label: 'в чеке должны быть видны наименования 2 (двух) игровых продуктов',
                        value: 6
                    }
                ]
            }
        },
        mounted() {
          this.$root.$on('confirmed', (color) => {
              this.confirmed = color;
          });
          this.$root.$on('successfully-declined', () => {
              this.closeDecline();
          })
        },
        methods: {
            submit() {
                this.form.user_id = this.$store.getters.decline.data.user_id;
                this.form.bet_id = this.$store.getters.decline.data.id;
                this.$root.$emit('confirm', this.form, `Отказать пользователю по причине:
                ${this.reason()}?`)
            },
            reason() {
                let reason = '';
                this.reasons.filter(item => {
                    if (item.value === this.form.reason) {
                        reason = item.label;
                    }
                })
                return reason;
            },
            closeDecline() {
                this.$store.commit('decline',
                    {status: false, data: {}});
                this.$root.$emit('close-confirm');
            }
        }
    }
</script>

<style scoped>

</style>
