import { createI18n } from 'vue-i18n';

const loadLocaleMessages = async (locale: string) => {
    const messages = await import(`./locales/${locale}.json`);
    return messages.default;
};

const i18n = createI18n({
    locale: 'en', // set default locale
    fallbackLocale: 'en', // set fallback locale
    messages: {}, // initially empty
});

export const setLocale = async (locale: string) => {
    const messages = await loadLocaleMessages(locale);
    i18n.global.setLocaleMessage(locale, messages);
    i18n.global.locale = locale;
};

export default i18n;
