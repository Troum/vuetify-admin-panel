import Vue from "vue";
import {ValidationObserver, ValidationProvider} from "vee-validate";
import AlertComponent from "@/components/AlertComponent";
import NavigationComponent from "@/components/NavigationComponent";
import ModerateDialog from "@/components/ModerateDialog";
import ModerateTable from "@/components/ModerateTable";
import DeclineDialog from "@/components/DeclineDialog";
import ConfirmDeclineAlert from "@/components/ConfirmDeclineAlert";
import ConfirmApproveAlert from "@/components/ConfirmApproveAlert";

Vue.component('validation-observer', ValidationObserver);
Vue.component('validation-provider', ValidationProvider);
Vue.component('alert-component', AlertComponent);
Vue.component('navigation-component', NavigationComponent);
Vue.component('moderate-dialog', ModerateDialog);
Vue.component('decline-dialog', DeclineDialog);
Vue.component('moderate-table', ModerateTable);
Vue.component('confirm-decline-alert', ConfirmDeclineAlert);
Vue.component('confirm-approve-alert', ConfirmApproveAlert);
