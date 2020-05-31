import Vue from 'vue';
import JWT from '@/services/jwt-token.service';

Vue.use(JWT);

export default function auth({next, store}){
  if(!store.getters.authentication && !Vue.prototype.$jwt.token()) {
      return next({
          name: 'main'
      })
  }
  return next()
}
