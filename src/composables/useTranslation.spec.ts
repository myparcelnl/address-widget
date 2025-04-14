import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useTranslation } from './useTranslation';
import { useProvideConfig } from './useConfig';
import { withSetup } from '../../tests/withSetup';

vi.mock('../locales/en.json', () => ({
    default: {
        validation: {
            houseNumber: 'House number is invalid.',
            postalCode: 'Postal code is invalid.',
        },
    },
}));

vi.mock('../locales/fr.json', () => ({
    default: {
        validation: {
            houseNumber: 'Le numéro de maison est incorrect',
            postalCode: 'Le code postal est incorrect',
        },
    },
}));

describe('useTranslation', () => {
    let config: ReturnType<typeof useProvideConfig>;

    beforeEach(() => {
        [[config]] = withSetup(useProvideConfig);
        config.setConfig({ locale: 'en' });
    });

    it('loads the default locale messages on initialization', async () => {
        const { t, currentLocale } = useTranslation();

        // Wait for the locale to load
        await vi.dynamicImportSettled();

        expect(currentLocale.value).toBe('en');
        expect(t('validation.houseNumber')).toBe('House number is invalid.');
    });

    it('loads a new locale when the locale changes', async () => {
        const { t, currentLocale } = useTranslation();

        // Change the locale
        config.setConfig({ locale: 'fr' });

        // Wait for the locale to load
        await vi.dynamicImportSettled();

        expect(currentLocale.value).toBe('fr');
        expect(t('validation.houseNumber')).toBe('Le numéro de maison est incorrect');
    });

    it('returns the key if the translation is missing', async () => {
        const { t } = useTranslation();

        // Wait for the locale to load
        await vi.dynamicImportSettled();

        expect(t('nonexistent.key')).toBe('nonexistent.key');
    });

    it('logs an error if the locale file fails to load', async () => {
        const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
        const { t } = useTranslation();

        // Set an invalid locale
        config.setConfig({ locale: 'invalid' });

        // Wait for the locale to attempt loading
        await vi.dynamicImportSettled();

        expect(consoleErrorSpy).toHaveBeenCalledWith(
            'Failed to load locale file for invalid:',
            expect.any(Error)
        );

        // Ensure the `t` function still works with the previous messages
        expect(t('validation.houseNumber')).toBe('House number is invalid.');

        consoleErrorSpy.mockRestore();
    });

    it('handles nested keys in translations', async () => {
        const { t } = useTranslation();

        // Wait for the locale to load
        await vi.dynamicImportSettled();

        expect(t('validation.postalCode')).toBe('Postal code is invalid.');
    });
});