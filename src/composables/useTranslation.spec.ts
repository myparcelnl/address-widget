import {describe, it, expect, vi} from 'vitest';
import {withSetup} from '../../tests/withSetup';
import {useProvideConfig} from './useConfig';
import {useTranslation} from './useTranslation';

vi.mock('../locales/en.json', () => ({
    default: {
        greeting: 'Hello',
        farewell: 'Goodbye',
    },
}));

vi.mock('../locales/fr.json', () => ({
    default: {
        greeting: 'Bonjour',
        farewell: 'Au revoir',
    },
}));

describe('useTranslation', () => {
    it('translates keys for the default locale', async () => {
        const [[, {t}]] = withSetup({composable: useProvideConfig}, {composable: useTranslation});

        await vi.dynamicImportSettled();

        expect(t('greeting')).toBe('Hello');
        expect(t('farewell')).toBe('Goodbye');
    });

    it('switches locale and translates keys', async () => {
        const [[{t}]] = withSetup({
            composable: () => {
                const config = useProvideConfig();
                config.setConfig({locale: 'fr'});
                return useTranslation();
            }
        });

        await vi.dynamicImportSettled();

        expect(t('greeting')).toBe('Bonjour');
        expect(t('farewell')).toBe('Au revoir');
    });

    it('returns the key if translation is missing', async () => {
        const [[, {t}]] = withSetup({composable: useProvideConfig}, {composable: useTranslation});

        await vi.dynamicImportSettled();

        expect(t('nonexistent.key')).toBe('nonexistent.key');
    });

    it('falls back to default locale and warns if locale file fails to load', async () => {
        vi.spyOn(console, 'warn');
        console.warn = vi.fn();

        const [[{t}]] = withSetup({
            composable: () => {
                const config = useProvideConfig();
                config.setConfig({locale: 'gr'});
                return useTranslation();
            }
        });

        await vi.dynamicImportSettled();

        expect(console.warn).toHaveBeenCalledWith(
            'Failed to load locale file for gr:',
            expect.any(Error)
        );

        expect(t('greeting')).toBe('Hello');
        expect(t('farewell')).toBe('Goodbye');

        vi.restoreAllMocks();
    });
});
