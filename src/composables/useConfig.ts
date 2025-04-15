import {zAlpha2CountryCode} from '@/api-client/zod.gen';
import {createInjectionState} from '@vueuse/core';
import {reactive, ref, type Ref} from 'vue';
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

export type InternalConfigObject = {
  [PropertyName in keyof ConfigObject]: Ref<ConfigObject[PropertyName]>;
};

export const [useProvideConfig, useConfig] = createInjectionState(() => {
  const apiKey: InternalConfigObject['apiKey'] = ref();
  const apiUrl: InternalConfigObject['apiUrl'] = ref(API_URL_DIRECT);
  const country: InternalConfigObject['country'] = ref();
  const appIdentifier: InternalConfigObject['appIdentifier'] = ref();
  const classNames: InternalConfigObject['classNames'] = ref();

  const configuration = reactive<InternalConfigObject>({
    apiKey,
    apiUrl,
    country,
    appIdentifier,
    classNames,
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
    Object.assign(configuration, validatedConfig);
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
