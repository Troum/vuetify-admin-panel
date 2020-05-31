import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from "vuetify/lib/util/colors";
import ru from 'vuetify/es5/locale/ru';
Vue.use(Vuetify);

export default new Vuetify({
    lang: {
        locales: { ru },
        current: 'ru'
    },
    theme: {
        themes: {
            light: {
                primary: colors.indigo.lighten1,
                secondary: colors.yellow.darken2,
                accent: colors.indigo.base,
                danger: colors.red.darken4,
                success: colors.green.darken1
            },
        },
    }
});
