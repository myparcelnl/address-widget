import {zAddress} from '@/api-client/zod.gen';
import {createInjectionState} from '@vueuse/core';
import {ref} from 'vue';
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
  appIdentifier: z.string().optional().nullable(),
  classNames: zClassNames.optional(),
  address: zAddress.partial().optional(),
});
export type ConfigObject = z.infer<typeof zConfigObject>;

export const [useProvideConfig, useConfig] = createInjectionState(() => {
  const configuration = ref<ConfigObject>({
    apiKey: undefined,
    apiUrl: API_URL_DIRECT,
    appIdentifier: undefined,
    classNames: undefined,
    address: undefined,
  });

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

    Object.assign(configuration.value, validatedConfig);
  }

  /**
   * Set the configuration from the window object.
   */
  function setConfigFromWindow() {
    if (typeof window !== 'undefined' && window.MyParcelAddressConfig) {
      setConfig(window.MyParcelAddressConfig);
    }
  }

  return {
    configuration,
    setConfig,
    setConfigFromWindow,
  };
});
