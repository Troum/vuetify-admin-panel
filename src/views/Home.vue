<template>
    <v-container class="" fluid>
        <v-row>
            <v-col cols="10" lg="6" xl="8" class="d-flex justify-center mx-auto">
                <v-card loader-height="5px" :loading="$store.getters.loading" width="100%">
                    <validation-observer ref="obs" v-slot="{ invalid, passes }">
                        <v-card-title>Форма входа администратора</v-card-title>
                        <v-card-subtitle>Введите авторизационные данные</v-card-subtitle>
                        <v-card-text>
                            <v-form>
                                <validation-provider name="Логин (e-mail)" rules="required|email" v-slot="{ errors, valid }">
                                    <v-text-field
                                            v-model="form.email"
                                            :error-messages="errors"
                                            :success="valid"
                                            label="Логин (e-mail)"
                                            autocomplete="off"
                                            placeholder="Введите логин (e-mail)"
                                            required
                                    ></v-text-field>
                                </validation-provider>
                                <validation-provider name="Пароль" rules="required" v-slot="{ errors, valid }">
                                    <v-text-field
                                            v-model="form.password"
                                            :error-messages="errors"
                                            :success="valid"
                                            label="Пароль"
                                            placeholder="Введите пароль"
                                            type="password"
                                            required
                                    ></v-text-field>
                                </validation-provider>
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" @click="passes(submit)">Войти</v-btn>
                        </v-card-actions>
                    </validation-observer>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: 'Home',
        data() {
            return {
                form: {
                    email: null,
                    password: null
                }
            }
        },
        methods: {
            submit() {
                this.$store.commit('loading', true);
                setTimeout(() => {
                    this.$httpService.post('api/v2/auth/login', this.$fdService.fill(this.form))
                        .then((response) => {
                            this.$jwt.store(response.data.token);
                            this.$jwt.setAdmin();
                            this.$root.$emit('login');
                            this.$store.commit('authentication', response.data.token);
                            this.$store.commit('alert', {status: true, message: response.data.success, type: 'success'});
                            this.$router.push({name: 'dashboard'});
                        })
                        .finally(() => {
                            this.$store.commit('loading', null)
                        })
                }, 3000);

            }
        }
    }
</script>
