<template>
    <v-card flat>
        <v-card-title>
            <v-spacer></v-spacer>
            <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Поиск"
                    single-line
                    hide-details
            ></v-text-field>
        </v-card-title>
        <v-card-text>
            <v-data-table
                    :loading="$store.getters.loading" loading-text="Загрузка... Пожалуйста, подождите"
                    :headers="headers"
                    :items="users"
                    :single-expand="singleExpand"
                    :expanded.sync="expanded"
                    :search="search"
                    show-expand
                    :fixed-header="true"
                    :items-per-page="5"
            >
                <template v-slot:top>
                    <v-toolbar flat>
                        <v-spacer></v-spacer>
                        <v-switch v-model="singleExpand" label="Режим одиночного просмотра" class="mt-2"></v-switch>
                    </v-toolbar>
                </template>
                <template v-slot:expanded-item="{ headers, item }">
                    <td class="pa-0" :colspan="headers.length">
                        <v-simple-table>
                            <template v-slot:default>
                                <thead>
                                <tr>
                                    <th class="text-center">Индекс</th>
                                    <th class="text-center">Область</th>
                                    <th class="text-center">Район</th>
                                    <th class="text-center">Населенный пункт</th>
                                    <th class="text-center">Улица</th>
                                    <th class="text-center">Номер дома</th>
                                    <th class="text-center">Корпус</th>
                                    <th class="text-center">Номер квартиры</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td class="text-center">{{ item.address.postcode | isEmpty}}</td>
                                    <td class="text-center">{{ item.address.region | isEmpty}}</td>
                                    <td class="text-center">{{ item.address.district | isEmpty}}</td>
                                    <td class="text-center">{{ item.address.place | isEmpty}}</td>
                                    <td class="text-center">{{ item.address.street | isEmpty}}</td>
                                    <td class="text-center">{{ item.address.house | isEmpty}}</td>
                                    <td class="text-center">{{ item.address.building | isEmpty}}</td>
                                    <td class="text-center">{{ item.address.apartment | isEmpty}}</td>
                                </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                        <v-data-table
                                fixed-header
                                :headers="betHeaders"
                                :items="formatBet(item.bet)"
                        >
                            <template v-slot:item.actions="{ item }">
                                <v-icon
                                        small
                                        class="mr-2"
                                        @click="showImage(item)"
                                >
                                    mdi-image
                                </v-icon>
                            </template>
                        </v-data-table>
                    </td>
                </template>
            </v-data-table>
        </v-card-text>
    </v-card>
</template>

<script>

    export default {
        name: "ModerateTable",
        props: {
          status: null
        },
        data() {
            return {
                expanded: [],
                singleExpand: false,
                headers: [
                    {
                        text: 'Фамилия',
                        align: 'center',
                        sortable: true,
                        value: 'surname',
                    },
                    { text: 'Имя', value: 'name',align: 'center', sortable: true },
                    { text: 'Отчество', value: 'second_name',align: 'center', sortable: true },
                    { text: 'Пол', value: 'sex',align: 'center', sortable: true },
                    { text: 'E-mail', value: 'email',align: 'center', sortable: true },
                    { text: 'Номер телефона', value: 'phone',align: 'center', sortable: true },
                    { text: '', value: 'data-table-expand', sortable: true },
                ],
                betHeaders: [
                    {
                        text: 'Дата покупки',
                        align: 'center',
                        sortable: true,
                        value: 'bought_date',
                    },
                    { text: 'Время покупки', value: 'bought_time',align: 'center', sortable: true },
                    { text: 'Ставка', value: 'bet',align: 'center', sortable: true },
                    { text: 'Действия', value: 'actions', align: 'center', sortable: false }
                ],
                users: [],
                search: ''
            }
        },
        mounted() {
            this.getUsers();
            this.$root.$on('reload-users', () => {
                this.getUsers();
            })

        },
        methods: {
            getUsers() {
                this.$store.commit('loading', true);
                setTimeout(() => {
                    this.$httpService.get(`api/v2/auth/users/${this.status}`)
                        .then(response => {
                            this.users = [...response.data.users];
                        })
                        .finally(() => {
                            this.$store.commit('loading', null);
                        })
                }, 3000)
            },
            showImage(item) {
                this.$store.commit('overlay', true);
                this.$store.commit('dialog', {status: true, data: item});
            },
            formatBet(items) {
                    if (items.length > 0) {
                        return items.map((bet) => {
                            let object = {};
                            object['bet'] = this.$options.filters.bet(bet.bet);
                            object['bought_date'] = bet.bought_date;
                            object['bought_time'] = bet.bought_time;
                            object['check'] = bet.check;
                            object['user_id'] = bet.user_id;
                            object['id'] = bet.id;
                            object['status'] = bet.status;
                            return object;
                        });
                    } else {
                        return [];
                    }
            }
        }

    }
</script>

<style scoped>

</style>
