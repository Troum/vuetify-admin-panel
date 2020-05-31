const JWT = {
    install(Vue) {
        Vue.prototype.$jwt = {
            store: (token) => {
                localStorage.setItem('_token', token);
            },
            setAdmin: () => {
                localStorage.setItem('_admin', 'true');
            },
            remove: () => {
                localStorage.removeItem('_token');
                localStorage.removeItem('_admin');
            },
            token: () => {
                return '_token' in localStorage;
            },
            admin: () => {
                return '_admin' in localStorage;
            },
            bearer: () => {
                return localStorage.getItem('_token')
            },
            refresh: () => {
                return localStorage.getItem('_refresh')
            }
        }
    }

};

export default (JWT);
