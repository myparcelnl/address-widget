import type {Alpha2CountryCode} from '@/api-client';
import {zAlpha2CountryCode} from '@/api-client/zod.gen';
import {reactive, ref} from 'vue';
import {z} from 'zod';

export const API_URL_DIRECT = 'https://address.api.myparcel.nl';
/**
 * Provides configuration for the API client, both through the environment and window object.
 */
export const zConfigObject = z.object({
  apiKey: z.string().optional(),
  apiUrl: z.string(),
  country: zAlpha2CountryCode.optional(),
  appIdentifier: z.string().optional(),
});
export type ConfigObject = z.infer<typeof zConfigObject>;

// Define these refs here so they become globals (like a store)
const apiKey = ref<string | null>(import.meta.env.VITE_API_KEY);
const apiUrl = ref<string | null>(import.meta.env.API_URL || API_URL_DIRECT);
const country = ref<Alpha2CountryCode | undefined>('NL');
const appIdentifier = ref<string | undefined>();
const configuration = reactive({apiKey, apiUrl, country});

export function useConfig() {
  /**
   * Ensure incoming configuration is valid using zod.
   * @param config
   * @returns
   */
  function validateConfiguration(config: ConfigObject): ConfigObject {
    // Validate using generated zod types
    const validated = zConfigObject.parse(config);
    return validated;
  }

  /**
   * Validate then set the configuration
   * @param config
   */
  function setConfig(config: ConfigObject) {
    let validatedConfig: ConfigObject | undefined = undefined;
    try {
      validatedConfig = validateConfiguration(config);
    } catch (error) {
      console.error('Invalid configuration:', error);
    }
    apiKey.value = validatedConfig?.apiKey || null;
    apiUrl.value = validatedConfig?.apiUrl || null;
    country.value = validatedConfig?.country;
    appIdentifier.value = validatedConfig?.appIdentifier;
  }

  function setConfigFromWindow() {
    if (typeof window !== 'undefined' && window.MyParcelAddressConfig) {
      setConfig(window.MyParcelAddressConfig);
    }
  }

  return {
    apiKey,
    apiUrl,
    appIdentifier,
    country,
    configuration,
    setConfig,
    setConfigFromWindow,
  };
}
