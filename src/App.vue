<template>
  <v-app>
    <navigation-component></navigation-component>
    <v-content class="lays-admin-content">
      <router-view></router-view>
    </v-content>
    <alert-component></alert-component>
    <moderate-dialog></moderate-dialog>
    <decline-dialog></decline-dialog>
    <export-type-dialog></export-type-dialog>
    <confirm-decline-alert></confirm-decline-alert>
    <confirm-approve-alert></confirm-approve-alert>
    <download-file-alert></download-file-alert>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {

    }
  }
};
</script>
