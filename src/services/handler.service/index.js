import Vue from 'vue';
import Snotify from 'vue-snotify';

Vue.use(Snotify);

const HandlerService = {
    install(Vue) {
        Vue.prototype.$handler = {
            success: (success) => {
                Vue.prototype.$snotify.success(success.data.success)
            },
            error: (error) => {
                Vue.prototype.$snotify.error(error.response.data.error)
            },
            warning: (warning) => {
                Vue.prototype.$snotify.warning(warning.response.data.warning)
            }
        }
    }
};

export default (HandlerService);
