<template>
    <v-app-bar
            app
            dark
            color="accent"
    >
        <div class="d-flex align-center">
                <v-img
                        alt="Vuetify Logo"
                        class="ml-5"
                        src="@/assets/logo.svg"
                        transition="scale-transition"
                        width="60"
                />
        </div>
        <v-spacer></v-spacer>
        <v-btn
                @click="exportData()"
                text
                color="secondary"
                v-if="loggedIn"
        >
            <span class="mr-2">Выгрузить</span>
            <v-icon>mdi-file-export-outline</v-icon>
        </v-btn>
        <v-btn
                @click="logout()"
                target="_blank"
                text
                color="secondary"
                v-if="loggedIn"
        >
            <span class="mr-2">Выйти</span>
            <v-icon>mdi-logout</v-icon>
        </v-btn>
    </v-app-bar>
</template>

<script>
    export default {
        name: "NavigationComponent",
        data() {
          return {
              loggedIn: !!this.$jwt.token()
          }
        },
        mounted() {
            this.$root.$on('login', () => {
                this.loggedIn = true;
            })
        },
        methods: {
            logout() {
                    this.$jwt.remove();
                    this.loggedIn = false;
                    this.$router.push({name: 'home'})
            },
            exportData() {
                this.$root.$emit('export-type');
            }
        }
    }
</script>

<style scoped>

</style>
