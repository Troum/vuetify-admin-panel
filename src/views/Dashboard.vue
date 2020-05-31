<template>
    <v-container fluid>
        <v-row>
            <v-col cols="10" lg="10" xl="8" class="mx-auto">
                <v-card>
                    <v-tabs
                            background-color="primary"
                            align-with-title
                            centered
                            v-model="tab">
                        <v-tab @click="changeTab('not-moderated')">
                            Пользователи с непромодерированными ставками
                        </v-tab>
                        <v-tab @click="changeTab('moderated')">
                            Пользователи с промодерированными ставками
                        </v-tab>
                        <v-tab @click="changeTab('declined')">
                            Пользователи с отклоненными
                        </v-tab>
                    </v-tabs>
                    <v-tabs-items v-model="tab">
                        <v-tab-item key="not-moderated">
                            <moderate-table :status="'not-moderated'"></moderate-table>
                        </v-tab-item>

                        <v-tab-item key="moderated">
                            <moderate-table :status="'moderated'"></moderate-table>
                        </v-tab-item>

                        <v-tab-item key="declined">
                            <moderate-table :status="'declined'"></moderate-table>
                        </v-tab-item>
                    </v-tabs-items>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "Dashboard",
        data() {
            return {
                tab: null
            }
        },
        methods: {
            checkToken() {

            },
            changeTab(tab) {
                this.tab = tab;
                this.$root.$emit('reload-users');
            }
        }
    }
</script>

<style scoped>

</style>
