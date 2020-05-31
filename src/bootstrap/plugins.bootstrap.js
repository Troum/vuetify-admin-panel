import Vue from "vue";
import HttpService from "@/services/http.service";
import FormDataService from "@/services/form-data.service";
import HandlerService from "@/services/handler.service";
import JWT from "@/services/jwt-token.service";

Vue.use(HttpService);
Vue.use(FormDataService);
Vue.use(HandlerService);
Vue.use(JWT);
