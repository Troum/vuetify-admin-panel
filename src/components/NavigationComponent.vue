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
              loggedIn: this.$jwt.token()
          }
        },
        methods: {
            logout() {
                    this.$jwt.remove();
                    this.$router.push({name: 'home'})
            }
        }
    }
</script>

<style scoped>

</style>
