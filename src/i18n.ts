import {createI18n} from "vue-i18n";
import en from './locales/en.json';
import fr from './locales/fr.json';

export default createI18n({
    legacy: false, // remove when using vue i18n v12
    locale: 'en', // set locale
    fallbackLocale: 'en', // set fallback locale
    globalInjection: true, // enable global injection
    messages: {
        en,
        fr,
    },
});
