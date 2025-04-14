import type {Alpha2CountryCode} from '@/api-client';
import {zAlpha2CountryCode} from '@/api-client/zod.gen';
import {createInjectionState} from '@vueuse/core';
import {reactive, ref} from 'vue';
import {z} from 'zod';

export const API_URL_DIRECT = 'https://address.api.myparcel.nl';
/**
 * Provides configuration for the API client, both through the environment and window object.
 */
export const zClassNames = z.object({
  fieldWrapper: z.array(z.string()).optional(),
});
export const zConfigObject = z.object({
  apiKey: z.string().optional().nullable(),
  apiUrl: z.string().optional(),
  country: zAlpha2CountryCode.optional(),
  appIdentifier: z.string().optional().nullable(),
  classNames: zClassNames.optional(),
});
export type ConfigObject = z.infer<typeof zConfigObject>;

export const [useProvideConfig, useConfig] = createInjectionState(() => {
  const apiKey = ref<string | null>();
  const apiUrl = ref<string>(API_URL_DIRECT);
  const country = ref<Alpha2CountryCode | undefined>();
  const appIdentifier = ref<string | undefined | null>();
  const configuration = reactive({apiKey, apiUrl, country, appIdentifier});
  const classNames = ref<z.infer<typeof zClassNames> | undefined>();

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

    /**
     * If the config was never specified or invalid, don't set it.
     */
    if (validatedConfig?.apiKey !== undefined) {
      apiKey.value = validatedConfig.apiKey;
    }
    if (validatedConfig?.apiUrl !== undefined) {
      apiUrl.value = validatedConfig.apiUrl;
    }
    if (validatedConfig?.country !== undefined) {
      country.value = validatedConfig.country;
    }
    if (validatedConfig?.appIdentifier !== undefined) {
      appIdentifier.value = validatedConfig.appIdentifier;
    }
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
    classNames,
    setConfig,
    setConfigFromWindow,
  };
});
