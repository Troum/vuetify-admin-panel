import axios from 'axios';
import Vue from "vue";
import JWT from "@/services/jwt-token.service";
import store from '@/store';

Vue.use(JWT);

let $http = axios.create({
    baseURL: `${process.env.VUE_APP_API_URL}`,
    headers: {
        'X-Requested-With' : 'XMLHttpRequest'
    },
    withCredentials: false,
    crossDomain: false,
    params: {}
});

$http.interceptors.request.use(request => {
    if(request.url.includes('auth')) {
        request.headers.Authorization = `Bearer ${Vue.prototype.$jwt.bearer()}`;
    }
    return request;
}, error => {
    Vue.prototype.$handler.error(error);
});

$http.interceptors.response.use(response => {
    return response;
}, error => {
        switch (error.response.status) {
            case 403:
            case 409:
                return store.commit('alert', {status: true, message: error.response.data.error, type: 'warning'});
            case 404:
                return store.commit('alert', {status: true, message: error.response.data.error, type: 'error'});
            case 400:
            case 401:
            case 417:
            case 500:
                return store.commit('alert', {status: true, message: error.response.data.error, type: 'info'});

        }
});

const HttpService = {
    install(Vue) {
        Vue.prototype.$httpService = $http;
    }
};

export default (HttpService);
