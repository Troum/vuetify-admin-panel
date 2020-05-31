<template>
    <v-dialog
            scrollable
            v-model="$store.getters.dialog.status"
            max-width="800"
    >
        <v-card :loading="confirmed">
            <v-card-title class="headline">
                Модерация
                <v-spacer></v-spacer>
                <v-btn @click="closeDialog" color="primary" icon dark>
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-subtitle>Пожалуйста, проверьте данные</v-card-subtitle>

            <v-card-text>
                <v-row>
                    <v-col class="grey lighten-1 pa-0"
                           :style="`min-height: ${width}px; overflow: hidden`" cols="7">
                        <v-skeleton-loader
                                v-show="$store.getters.overlay"
                                :loading="$store.getters.overlay"
                                type="image">
                        </v-skeleton-loader>
                        <img @load="imageLoad"
                             :style="`transform: rotate(${rotation}deg); width: ${width}px`"
                             class="d-block mx-auto lays-image-fluid" alt="Bet"
                             :src="$store.getters.dialog.status ? `${url}${$store.getters.dialog.data.check}` : ''">
                    </v-col>
                    <v-col cols="5" class="pl-10">
                        <p><span class="subtitle-2">Ставка на приз:</span> {{ $store.getters.dialog.data.bet }}</p>
                        <p><span class="subtitle-2">Дата покупки:</span> {{ $store.getters.dialog.data.bought_date }}</p>
                        <p><span class="subtitle-2">Время покупки:</span> {{ $store.getters.dialog.data.bought_time }}</p>
                        <p class="subtitle-2 mb-0">Увеличить изображение</p>
                        <v-slider v-model="width" min="200" max="440" step="1"></v-slider>
                        <p class="subtitle-2 mb-0">Поверните изображение</p>
                        <v-btn color="primary" dark text @click="rotate(90)">
                            <v-icon>
                                mdi-reload
                            </v-icon>
                            <small>Вправо</small>
                        </v-btn>
                        <v-btn color="primary" dark text @click="rotate(-90)">
                            <v-icon style="transform: scaleX(-1)">
                                mdi-reload
                            </v-icon>
                            <small>Влево</small>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                        color="red darken-1"
                        text
                        @click="decline()"
                >
                    Отклонить
                </v-btn>
                <v-btn
                        color="green darken-1"
                        text
                        @click="approve()"
                >
                    Одобрить
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: "ModerateDialog",
        data() {
            return {
                rotation: 0,
                confirmed: null,
                width: 400,
                url: `${process.env.VUE_APP_API_URL}/api/v2/auth/user/`,
                form: {
                    user_id: null,
                    bet_id: null
                }
            }
        },
        mounted() {
            this.$root.$on('successfully-approved', () => {
                this.closeDialog();
            })
            this.$root.$on('confirmed', (color) => {
                this.confirmed = color;
            });
        },
        methods: {
            closeDialog() {
                this.width = 200;
                this.$store.commit('dialog', {status: false, data: {}})
            },
            imageLoad() {
                this.$store.commit('overlay', false);
            },
            decline() {
                this.$store.commit('decline',
                    {status: true, data: this.$store.getters.dialog.data});
                this.closeDialog();
            },
            approve() {
                this.form.user_id = this.$store.getters.dialog.data.user_id;
                this.form.bet_id = this.$store.getters.dialog.data.id;
                this.$root.$emit('confirm-approve', this.form, 'Одобрить ставку пользователя?');
            },
            rotate(angle) {
                this.rotation += angle;
            }

        }
    }
</script>

<style scoped>

</style>
