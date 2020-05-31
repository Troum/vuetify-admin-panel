<template>
    <v-snackbar
            v-model="$store.getters.alert.status"
            :color="$store.getters.alert.type"
            multi-line
            center
            top
            :timeout="$store.getters.alert.type !== 'warning' || $store.getters.alert.type !== 'info' ? 5000 : 1000 * 60"
    >
        {{ $store.getters.alert.message }}
        <v-btn v-if="$store.getters.alert.type !== 'warning' && $store.getters.alert.type !== 'info'"
                dark
                icon
                @click="closeAlert"
        >
            <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-btn v-if="$store.getters.alert.type === 'info' || $store.getters.alert.type === 'warning'"
               dark
               text
               @click="auth"
        ><small>Авторизация</small>
        </v-btn>
    </v-snackbar>
</template>

<script>
    export default {
        name: "AlertComponent",
        methods: {
            closeAlert() {
                this.$store.commit('alert', {status: false, message: '', type: 'success'})
            },
            auth() {
                this.$jwt.remove();
                this.$router.push({name: 'home'});
                this.closeAlert();
            }
        }
    }
</script>

<style scoped>

</style>
