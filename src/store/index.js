import Vue from 'vue'
import Vuex from 'vuex'
import JWT from "@/services/jwt-token.service";

Vue.use(JWT);
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    overlay: false,
    authentication: !!Vue.prototype.$jwt.token(),
    alert: {
      type: 'success',
      message: '',
      status: false
    },
    dialog: {
      status: false,
      data: {}
    },
    decline: {
      status: false,
      data: {}
    },
    approve: {
      status: false,
      data: {}
    }
  },
  mutations: {
    loading(state, data) {
      state.loading = data;
    },
    overlay(state, data) {
      state.overlay = data;
    },
    authentication(state, data) {
      state.authentication = data;
    },
    alert(state, data){
      state.alert.status = data.status;
      state.alert.type = data.type;
      state.alert.message = data.message;
    },
    dialog(state, data) {
      state.dialog = data
    },
    decline(state, data) {
      state.decline = data
    },
    approve(state, data) {
      state.approve = data
    }
  },
  getters: {
    loading(state) {
      return state.loading;
    },
    overlay(state) {
      return state.overlay;
    },
    authentication(state) {
      return state.authentication;
    },
    alert(state) {
      return state.alert;
    },
    dialog(state) {
      return state.dialog;
    },
    decline(state) {
      return state.decline;
    },
    approve(state) {
      return state.approve;
    }
  },
  modules: {
  }
})
