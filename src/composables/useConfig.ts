import {ref} from 'vue';

export function useConfig() {
  const apiKey = ref<string | null>(import.meta.env.VITE_API_KEY);
  const apiUrl = ref<string | null>(
    import.meta.env.API_URL || 'https://address.api.myparcel.nl',
  );

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
