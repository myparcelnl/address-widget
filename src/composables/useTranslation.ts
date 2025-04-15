import {ref, watch, computed} from 'vue';
import {useConfig} from './useConfig';
import {useOrThrow} from "@/utils/useOrThrow.ts";

const messages = ref<Record<string, never>>({});
const currentLocale = ref<string>('en');

export function useTranslation() {
    const {locale} = useOrThrow(useConfig, 'useConfig');

    // Load the locale file dynamically
    async function loadLocale(locale: string) {
        try {
            const localeMessages = await import(`../locales/${locale}.json`);
            messages.value = localeMessages.default;
            currentLocale.value = locale;
        } catch (error) {
            console.error(`Failed to load locale file for ${locale}:`, error);
        }
    }

    // Watch for changes in the locale and reload messages
    watch(locale, (newLocale) => {
        if (newLocale) {
            loadLocale(newLocale);
        }
    }, {immediate: true});

    // Translation function
    const t = (key: string): string => {
        return (key.split('.').reduce((acc, part) => acc?.[part], messages.value) || key).toString();
    };

    return {
        t,
        currentLocale: computed(() => currentLocale.value),
    };
}
