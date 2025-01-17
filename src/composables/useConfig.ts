import {ref} from 'vue';
export const API_URL_DIRECT = 'https://address.api.myparcel.nl';

export function useConfig() {
  const apiKey = ref<string | null>(import.meta.env.VITE_API_KEY);
  const apiUrl = ref<string | null>(import.meta.env.API_URL || API_URL_DIRECT);

  function setConfig(config: {apiKey?: string; apiUrl?: string}) {
    // @TODO validate incoming config in runtime
    if (config.apiKey) {
      apiKey.value = config.apiKey;
    }
    if (config.apiUrl) {
      apiUrl.value = config.apiUrl;
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
    setConfig,
    setConfigFromWindow,
  };
}
